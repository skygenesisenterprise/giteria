"use client";

import * as React from "react";
import { use, useEffect, useState, useCallback } from "react";
import { Tag, GitCommit, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface TagsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface TagData {
  id: string;
  name: string;
  commitSha: string;
  message: string;
  author: string;
  authorAvatar?: string;
  date: string;
  source: "local" | "github";
}

export default function TagsPage({ params }: TagsPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [tags, setTags] = useState<TagData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [tagMessage, setTagMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("main");

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  const loadGithubTags = useCallback(async () => {
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

      const [tagsResponse, branchesResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}/tags?per_page=100`, {
          headers,
        }),
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}/branches`, { headers }),
      ]);

      if (branchesResponse.ok) {
        const branchesData = await branchesResponse.json();
        setBranches(branchesData.map((b: { name: string }) => b.name));
      }

      if (!tagsResponse.ok) return [];

      const tagsData = await tagsResponse.json();

      const tagList: TagData[] = await Promise.all(
        tagsData.map(async (tag: { name: string; commit: { sha: string } }) => {
          try {
            const commitResponse = await fetch(
              `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits/${tag.commit.sha}`,
              { headers }
            );

            if (commitResponse.ok) {
              const commitData = await commitResponse.json();
              return {
                id: `${repoFullName}-${tag.name}`,
                name: tag.name,
                commitSha: tag.commit.sha,
                message: commitData.commit?.message || "",
                author: commitData.commit?.author?.name || commitData.author?.login || "unknown",
                authorAvatar: commitData.author?.avatar_url,
                date: commitData.commit?.author?.date || "",
                source: "github" as const,
              };
            }
          } catch {
            // Skip commit details if failed
          }

          return {
            id: `${repoFullName}-${tag.name}`,
            name: tag.name,
            commitSha: tag.commit.sha,
            message: "",
            author: "unknown",
            authorAvatar: undefined,
            date: "",
            source: "github" as const,
          };
        })
      );

      return tagList;
    } catch (error) {
      console.error("Failed to load GitHub tags:", error);
      return [];
    }
  }, [repo?.mirrorFrom, repoFullName]);

  const loadLocalTags = useCallback(async () => {
    try {
      const localTags = await db.getAllByIndex<{
        name: string;
        message: string;
        commitSha: string;
      }>(STORES.TAGS, "repoFullName", repoFullName);
      return localTags.map((t) => ({
        id: `${repoFullName}-${t.name}`,
        name: t.name,
        commitSha: t.commitSha || "",
        message: t.message || "",
        author: "currentUser",
        date: new Date().toISOString(),
        source: "local" as const,
      }));
    } catch (error) {
      console.error("Failed to load local tags:", error);
      return [];
    }
  }, [repoFullName]);

  const loadAllTags = useCallback(async () => {
    const [localTags, githubTags] = await Promise.all([loadLocalTags(), loadGithubTags()]);

    const allTags = [...localTags, ...githubTags];
    const uniqueTags = allTags.filter(
      (tag, index, self) => index === self.findIndex((t) => t.name === tag.name)
    );

    setTags(uniqueTags);
  }, [loadLocalTags, loadGithubTags]);

  const createTagOnGithub = useCallback(
    async (tagName: string, message: string, branch: string) => {
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

        const commitResponse = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits/${branch}`,
          { headers }
        );

        if (!commitResponse.ok) return false;
        const commitData = await commitResponse.json();
        const sha = commitData.sha;

        const tagResponse = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/git/tags`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              tag: tagName,
              message: message || `Release ${tagName}`,
              object: sha,
              type: "commit",
            }),
          }
        );

        if (!tagResponse.ok) return false;
        const tagData = await tagResponse.json();

        const refResponse = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/git/refs`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              ref: `refs/tags/${tagName}`,
              sha: tagData.sha,
            }),
          }
        );

        return refResponse.ok;
      } catch (error) {
        console.error("Failed to create tag on GitHub:", error);
        return false;
      }
    },
    [repo?.mirrorFrom]
  );

  const saveTagLocally = useCallback(
    async (tag: TagData) => {
      try {
        await db.put(STORES.TAGS, {
          ...tag,
          repoFullName,
        });
      } catch (error) {
        console.error("Failed to save tag locally:", error);
      }
    },
    [repoFullName]
  );

  const handleCreateTag = useCallback(async () => {
    if (!newTagName.trim()) return;

    setIsCreating(true);
    try {
      const tag: TagData = {
        id: `${repoFullName}-${newTagName}`,
        name: newTagName,
        commitSha: "",
        message: tagMessage || `Release ${newTagName}`,
        author: "currentUser",
        date: new Date().toISOString(),
        source: "local",
      };

      await saveTagLocally(tag);

      if (repo?.mirrorFrom) {
        const success = await createTagOnGithub(newTagName, tagMessage, selectedBranch);
        if (success) {
          tag.source = "github";
        }
      }

      setNewTagName("");
      setTagMessage("");
      setSelectedBranch("main");
      setIsCreateDialogOpen(false);
      loadAllTags();
    } catch (error) {
      console.error("Failed to create tag:", error);
    } finally {
      setIsCreating(false);
    }
  }, [
    newTagName,
    tagMessage,
    selectedBranch,
    repoFullName,
    repo?.mirrorFrom,
    saveTagLocally,
    createTagOnGithub,
    loadAllTags,
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
      loadAllTags();
    }
  }, [repo, loadAllTags]);

  useEffect(() => {
    if (!repo?.mirrorFrom) return;

    const interval = setInterval(
      () => {
        loadAllTags();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [repo?.mirrorFrom, loadAllTags]);

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-2xl font-semibold">Tags</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {tags.length} tag{tags.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new tag</DialogTitle>
                <DialogDescription>Create a new tag for {repoFullName}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tag name</label>
                  <Input
                    placeholder="v1.0.0"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target branch</label>
                  <select
                    className="w-full p-2 border border-border rounded-md bg-background"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                  >
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tag message (optional)</label>
                  <Input
                    placeholder="Release version 1.0.0"
                    value={tagMessage}
                    onChange={(e) => setTagMessage(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTag} disabled={isCreating || !newTagName.trim()}>
                  {isCreating ? "Creating..." : "Create tag"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-75">
            <Input
              placeholder="Filter tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredTags.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <Tag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No tags found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTags.map((tag) => (
              <TagRow
                key={tag.name}
                tag={tag}
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

interface TagRowProps {
  tag: TagData;
  owner: string;
  repo: string;
}

function TagRow({ tag, owner, repo }: TagRowProps) {
  return (
    <div className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
      <Tag className="w-5 h-5 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={`/${owner}/${repo}/tree/${tag.name}`}
            className="font-medium hover:text-blue-600 truncate"
          >
            {tag.name}
          </a>
          {tag.source === "local" && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Local</span>
          )}
        </div>
        {tag.message && (
          <div className="text-sm text-muted-foreground mt-1 truncate">
            {tag.message.split("\n")[0]}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
        <GitCommit className="w-3 h-3" />
        <span className="font-mono">{tag.commitSha.slice(0, 7)}</span>
      </div>
    </div>
  );
}
