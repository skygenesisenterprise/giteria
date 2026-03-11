"use client";

import * as React from "react";
import { use, useEffect, useState, useCallback, useRef } from "react";
import { GitBranch, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface BranchesPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface Branch {
  id: string;
  name: string;
  protected: boolean;
  commitSha: string;
  commitMessage: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  source: "local" | "github";
}

export default function BranchesPage({ params }: BranchesPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newBranchName, setNewBranchName] = useState("");
  const [baseBranch, setBaseBranch] = useState("main");
  const [isCreating, setIsCreating] = useState(false);
  const [availableBranches, setAvailableBranches] = useState<string[]>([]);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;
  const prevBranchesLength = useRef<number>(0);

  const loadLocalBranches = useCallback(async () => {
    try {
      const localBranches = await db.getAllByIndex<Branch>(
        STORES.BRANCHES,
        "repoFullName",
        repoFullName
      );
      return localBranches.map((b) => ({ ...b, source: "local" as const }));
    } catch (error) {
      console.error("Failed to load local branches:", error);
      return [];
    }
  }, [repoFullName]);

  const saveBranchToLocal = useCallback(async (branch: Branch) => {
    try {
      await db.put(STORES.BRANCHES, branch);
    } catch (error) {
      console.error("Failed to save branch locally:", error);
    }
  }, []);

  const loadGithubBranches = useCallback(async () => {
    if (!repo?.mirrorFrom) return [];

    const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) return [];

    const [, mirrorOwner, mirrorRepo] = githubMatch;
    const repoName = mirrorRepo.replace(/\.git$/, "");

    try {
      const token = await getGitHubToken();
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const branchesResponse = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/branches`,
        { headers }
      );

      if (!branchesResponse.ok) return [];

      const branchesData = await branchesResponse.json();

      const branchList: Branch[] = await Promise.all(
        branchesData.map(
          async (branchData: { name: string; protected: boolean; commit: { sha: string } }) => {
            try {
              const commitResponse = await fetch(
                `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits/${branchData.commit.sha}`,
                { headers }
              );

              if (commitResponse.ok) {
                const commitData = await commitResponse.json();
                return {
                  id: `${repoFullName}-${branchData.name}`,
                  name: branchData.name,
                  protected: branchData.protected,
                  commitSha: branchData.commit.sha,
                  commitMessage: commitData.commit?.message || "",
                  author: commitData.commit?.author?.name || commitData.author?.login || "unknown",
                  authorAvatar: commitData.author?.avatar_url,
                  createdAt: commitData.commit?.author?.date || "",
                  source: "github" as const,
                };
              }
            } catch {
              // Skip commit details if failed
            }

            return {
              id: `${repoFullName}-${branchData.name}`,
              name: branchData.name,
              protected: branchData.protected,
              commitSha: branchData.commit.sha,
              commitMessage: "",
              author: "unknown",
              authorAvatar: undefined,
              createdAt: "",
              source: "github" as const,
            };
          }
        )
      );

      return branchList;
    } catch (error) {
      console.error("Failed to load GitHub branches:", error);
      return [];
    }
  }, [repo?.mirrorFrom, repoFullName]);

  const loadAllBranches = useCallback(async () => {
    const [localBranches, githubBranches] = await Promise.all([
      loadLocalBranches(),
      loadGithubBranches(),
    ]);

    const allBranches = [...localBranches, ...githubBranches];
    const uniqueBranches = allBranches.filter(
      (branch, index, self) => index === self.findIndex((b) => b.name === branch.name)
    );

    setBranches(uniqueBranches);
    setAvailableBranches(uniqueBranches.map((b) => b.name));
  }, [loadLocalBranches, loadGithubBranches]);

  const createBranchOnGithub = useCallback(
    async (branchName: string, baseBranch: string) => {
      if (!repo?.mirrorFrom) return false;

      const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
      if (!githubMatch) return false;

      const [, mirrorOwner, mirrorRepo] = githubMatch;
      const repoName = mirrorRepo.replace(/\.git$/, "");

      try {
        const token = await getGitHubToken();
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const baseBranchResponse = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/git/refs/heads/${baseBranch}`,
          { headers }
        );

        if (!baseBranchResponse.ok) return false;

        const baseBranchData = await baseBranchResponse.json();
        const baseSha = baseBranchData.object.sha;

        const createResponse = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/git/refs`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              ref: `refs/heads/${branchName}`,
              sha: baseSha,
            }),
          }
        );

        return createResponse.ok;
      } catch (error) {
        console.error("Failed to create branch on GitHub:", error);
        return false;
      }
    },
    [repo?.mirrorFrom]
  );

  const handleCreateBranch = useCallback(async () => {
    if (!newBranchName.trim()) return;

    setIsCreating(true);
    try {
      const branch: Branch = {
        id: `${repoFullName}-${newBranchName}`,
        name: newBranchName,
        protected: false,
        commitSha: "",
        commitMessage: `Branch created from ${baseBranch}`,
        author: "currentUser",
        createdAt: new Date().toISOString(),
        source: "local",
      };

      await saveBranchToLocal(branch);

      if (repo?.mirrorFrom) {
        const success = await createBranchOnGithub(newBranchName, baseBranch);
        if (success) {
          branch.source = "github";
        }
      }

      setNewBranchName("");
      setBaseBranch("main");
      setIsCreateDialogOpen(false);
      loadAllBranches();
    } catch (error) {
      console.error("Failed to create branch:", error);
    } finally {
      setIsCreating(false);
    }
  }, [
    newBranchName,
    baseBranch,
    repoFullName,
    repo?.mirrorFrom,
    saveBranchToLocal,
    createBranchOnGithub,
    loadAllBranches,
  ]);

  useEffect(() => {
    async function fetchRepo() {
      try {
        const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
        setRepo(repository);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  useEffect(() => {
    if (repo) {
      loadAllBranches();
    }
  }, [repo, loadAllBranches]);

  useEffect(() => {
    if (!repo?.mirrorFrom) return;

    const interval = setInterval(
      () => {
        loadAllBranches();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [repo?.mirrorFrom, loadAllBranches]);

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    if (prevBranchesLength.current !== branches.length) {
      prevBranchesLength.current = branches.length;
    }
  }, [branches.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Branches</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {branches.length} branch{branches.length !== 1 ? "es" : ""}
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New branch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new branch</DialogTitle>
                <DialogDescription>Create a new branch for {repoFullName}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Branch name</label>
                  <Input
                    placeholder="feature/my-branch"
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Create from</label>
                  <Select value={baseBranch} onValueChange={setBaseBranch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select base branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBranches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateBranch} disabled={isCreating || !newBranchName.trim()}>
                  {isCreating ? "Creating..." : "Create branch"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-75">
            <Input
              placeholder="Filter branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredBranches.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <GitBranch className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No branches found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredBranches.map((branch) => (
              <BranchRow
                key={branch.name}
                branch={branch}
                owner={resolvedParams.owner}
                repo={resolvedParams.repo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface BranchRowProps {
  branch: Branch;
  owner: string;
  repo: string;
}

function BranchRow({ branch, owner, repo }: BranchRowProps) {
  return (
    <div className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
      <GitBranch className="w-5 h-5 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={`/${owner}/${repo}/tree/${branch.name}`}
            className="font-medium hover:text-blue-600 truncate"
          >
            {branch.name}
          </a>
          {branch.protected && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
              Protected
            </span>
          )}
          {branch.source === "local" && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Local</span>
          )}
        </div>
        <div className="text-sm text-muted-foreground mt-1 truncate">
          {branch.commitMessage.split("\n")[0]}
        </div>
      </div>
      <div className="text-xs text-muted-foreground shrink-0 font-mono">
        {branch.commitSha.slice(0, 7)}
      </div>
    </div>
  );
}
