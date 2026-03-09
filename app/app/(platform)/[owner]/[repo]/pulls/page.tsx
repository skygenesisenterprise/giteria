"use client";

import * as React from "react";
import { use, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { GitPullRequest, GitMerge, Plus } from "lucide-react";
import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";
import { RepoCountsContext } from "../layout";

interface PullsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface PRTemplate {
  name: string;
  path: string;
  content: string;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  body: string;
  state: "open" | "closed" | "merged";
  repoFullName: string;
  author: string;
  authorAvatar?: string;
  baseBranch: string;
  headBranch: string;
  isDraft: boolean;
  createdAt: number;
  updatedAt: number;
  commentsCount: number;
  commitsCount: number;
  additions: number;
  deletions: number;
}

export default function PullsPage({ params }: PullsPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [pulls, setPulls] = useState<PullRequest[]>([]);
  const [githubPulls, setGithubPulls] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"open" | "closed" | "merged" | "all">("open");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPR, setNewPR] = useState({
    title: "",
    body: "",
    baseBranch: "main",
    headBranch: "",
    isDraft: false,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [branches, setBranches] = useState<string[]>([]);
  const [templates, setTemplates] = useState<PRTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("blank");
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  const loadGithubPulls = useCallback(async () => {
    if (!repo?.mirrorFrom) return;

    const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) return;

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

      const response = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/pulls?state=open&per_page=30`,
        { headers }
      );

      if (response.ok) {
        const data = await response.json();
        const pulls: PullRequest[] = data.map(
          (pr: {
            number: number;
            title: string;
            body: string;
            state: string;
            merged: boolean;
            user: { login: string; avatar_url: string };
            head: { ref: string };
            base: { ref: string };
            draft: boolean;
            created_at: string;
            updated_at: string;
            comments: number;
            commits: number;
            additions: number;
            deletions: number;
          }) => ({
            id: `gh-${pr.number}`,
            number: pr.number,
            title: pr.title,
            body: pr.body || "",
            state: pr.state === "open" ? "open" : pr.merged ? "merged" : "closed",
            repoFullName,
            author: pr.user.login,
            authorAvatar: pr.user.avatar_url,
            baseBranch: pr.base.ref,
            headBranch: pr.head.ref,
            isDraft: pr.draft || false,
            createdAt: new Date(pr.created_at).getTime(),
            updatedAt: new Date(pr.updated_at).getTime(),
            commentsCount: pr.comments,
            commitsCount: pr.commits,
            additions: pr.additions || 0,
            deletions: pr.deletions || 0,
          })
        );
        setGithubPulls(pulls);
      }
    } catch (error) {
      console.error("Failed to load GitHub PRs:", error);
    }
  }, [repo?.mirrorFrom, repoFullName]);

  const loadPulls = useCallback(async () => {
    try {
      const allPulls = await db.getAllByIndex<PullRequest>(
        STORES.PULLS,
        "repoFullName",
        repoFullName
      );
      setPulls(allPulls.sort((a, b) => b.number - a.number));
    } catch (error) {
      console.error("Failed to load pulls:", error);
    }
  }, [repoFullName]);

  const loadBranches = useCallback(async () => {
    try {
      const allBranches = await db.getAllByIndex<{ name: string; repoFullName: string }>(
        STORES.BRANCHES,
        "repoFullName",
        repoFullName
      );
      setBranches(allBranches.map((b) => b.name));
    } catch (error) {
      console.error("Failed to load branches:", error);
    }
  }, [repoFullName]);

  const loadTemplates = useCallback(async () => {
    setIsLoadingTemplates(true);
    const foundTemplates: PRTemplate[] = [];

    const templatePaths = [
      ".github/PULL_REQUEST_TEMPLATE.md",
      ".github/pull_request_template.md",
      ".giteria/PULL_REQUEST_TEMPLATE.md",
      ".giteria/pull_request_template.md",
    ];

    if (repo?.mirrorFrom) {
      const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
      if (githubMatch) {
        const [, mirrorOwner, mirrorRepo] = githubMatch;
        const repoName = mirrorRepo.replace(/\.git$/, "");

        for (const templatePath of templatePaths) {
          try {
            const token = await getGitHubToken();
            const headers: HeadersInit = {
              Accept: "application/vnd.github.v3+json",
            };
            if (token) {
              headers.Authorization = `Bearer ${token}`;
            }

            const response = await fetch(
              `https://api.github.com/repos/${mirrorOwner}/${repoName}/contents/${templatePath}`,
              { headers }
            );

            if (response.ok) {
              const data = await response.json();
              if (data.content) {
                const content = atob(data.content);
                const templateName =
                  templatePath.split("/").pop()?.replace(".md", "") || "template";
                foundTemplates.push({
                  name: templateName,
                  path: templatePath,
                  content,
                });
              }
            }
          } catch (error) {
            console.error(`Failed to load template ${templatePath}:`, error);
          }
        }
      }
    }

    setTemplates(foundTemplates);
    setIsLoadingTemplates(false);
  }, [repo, repoFullName]);

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
    loadPulls();
    loadBranches();
    if (repo?.mirrorFrom) {
      loadGithubPulls();
      loadTemplates();
    }
  }, [repo, repoFullName, loadPulls, loadBranches, loadGithubPulls, loadTemplates]);

  useEffect(() => {
    if (!repo?.mirrorFrom) return;

    const interval = setInterval(
      () => {
        loadGithubPulls();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [repo?.mirrorFrom, loadGithubPulls]);

  async function handleCreatePR() {
    if (!newPR.title.trim() || !newPR.headBranch.trim()) return;

    setIsCreating(true);
    try {
      const maxNumber = pulls.length > 0 ? Math.max(...pulls.map((p) => p.number)) : 0;
      const pr: PullRequest = {
        id: `${repoFullName}-${maxNumber + 1}`,
        number: maxNumber + 1,
        title: newPR.title,
        body: newPR.body,
        state: "open",
        repoFullName,
        author: "currentUser",
        baseBranch: newPR.baseBranch,
        headBranch: newPR.headBranch,
        isDraft: newPR.isDraft,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        commentsCount: 0,
        commitsCount: 0,
        additions: 0,
        deletions: 0,
      };

      await db.add(STORES.PULLS, pr);
      setNewPR({ title: "", body: "", baseBranch: "main", headBranch: "", isDraft: false });
      setIsCreateDialogOpen(false);
      loadPulls();
    } catch (error) {
      console.error("Failed to create PR:", error);
    } finally {
      setIsCreating(false);
    }
  }

  async function togglePRState(pr: PullRequest) {
    const updatedState = pr.state === "open" ? "closed" : "open";
    const updatedPR: PullRequest = { ...pr, state: updatedState, updatedAt: Date.now() };
    await db.put(STORES.PULLS, updatedPR);
    loadPulls();
  }

  const allPulls = [...pulls, ...githubPulls];
  const uniquePulls = allPulls.filter(
    (pr, index, self) => index === self.findIndex((p) => p.id === pr.id)
  );

  const filteredPulls = uniquePulls.filter((pr) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "open" && pr.state === "open") ||
      (filter === "closed" && pr.state === "closed") ||
      (filter === "merged" && pr.state === "merged");
    const matchesSearch =
      !searchQuery ||
      pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openCount = uniquePulls.filter((p) => p.state === "open").length;
  const closedCount = uniquePulls.filter((p) => p.state === "closed").length;
  const mergedCount = uniquePulls.filter((p) => p.state === "merged").length;

  const repoCounts = React.useContext(RepoCountsContext);
  const prevPullsCount = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (prevPullsCount.current !== openCount) {
      prevPullsCount.current = openCount;
      repoCounts.setCounts({ pulls: openCount });
    }
  }, [openCount, repoCounts]);

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
            <h1 className="text-2xl font-semibold">Pull requests</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {openCount} open • {mergedCount} merged • {closedCount} closed
            </p>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              if (open) {
                setNewPR({
                  title: "",
                  body: "",
                  baseBranch: "main",
                  headBranch: "",
                  isDraft: false,
                });
                setSelectedTemplate("blank");
              }
              setIsCreateDialogOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New pull request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-150">
              <DialogHeader>
                <DialogTitle>New pull request</DialogTitle>
                <DialogDescription>Create a new pull request for {repoFullName}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Compare branches</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Select
                        value={newPR.headBranch}
                        onValueChange={(v) => setNewPR({ ...newPR, headBranch: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select head branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                              {branch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="text-muted-foreground">→</span>
                    <div className="flex-1">
                      <Select
                        value={newPR.baseBranch}
                        onValueChange={(v) => setNewPR({ ...newPR, baseBranch: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select base branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                              {branch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Title"
                    value={newPR.title}
                    onChange={(e) => setNewPR({ ...newPR, title: e.target.value })}
                  />
                </div>
                {templates.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Template</label>
                    <Select
                      value={selectedTemplate}
                      onValueChange={(v) => {
                        setSelectedTemplate(v);
                        if (v === "blank") {
                          setNewPR({ ...newPR, body: "" });
                        } else {
                          const template = templates.find((t) => t.path === v);
                          if (template) {
                            setNewPR({ ...newPR, body: template.content });
                          }
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blank">No template (blank)</SelectItem>
                        {templates.map((template) => (
                          <SelectItem key={template.path} value={template.path}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Textarea
                    placeholder="Leave a comment"
                    value={newPR.body}
                    onChange={(e) => setNewPR({ ...newPR, body: e.target.value })}
                    rows={6}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="draft"
                    checked={newPR.isDraft}
                    onChange={(e) => setNewPR({ ...newPR, isDraft: e.target.checked })}
                    className="rounded border-border"
                  />
                  <label htmlFor="draft" className="text-sm text-muted-foreground">
                    Create as draft
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePR}
                  disabled={isCreating || !newPR.title.trim() || !newPR.headBranch.trim()}
                >
                  {isCreating ? "Creating..." : "Create pull request"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-75">
            <Input
              placeholder="Search pull requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="merged">Merged</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredPulls.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <GitPullRequest className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No pull requests found</p>
            <Button variant="link" onClick={() => setIsCreateDialogOpen(true)} className="mt-2">
              Create your first pull request
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredPulls.map((pr) => (
              <PRRow key={pr.id} pr={pr} onToggleState={() => togglePRState(pr)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PRRow({ pr, onToggleState }: { pr: PullRequest; onToggleState: () => void }) {
  return (
    <div className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
      <Button variant="ghost" size="icon-sm" className="mt-0.5" onClick={onToggleState}>
        {pr.state === "open" ? (
          <GitPullRequest className="w-5 h-5 text-green-600" />
        ) : pr.state === "merged" ? (
          <GitMerge className="w-5 h-5 text-purple-600" />
        ) : (
          <GitPullRequest className="w-5 h-5 text-red-600" />
        )}
      </Button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={`/${pr.repoFullName}/pull/${pr.number}`}
            className="font-medium hover:text-blue-600 truncate"
          >
            {pr.title}
          </a>
          {pr.isDraft && (
            <Badge variant="secondary" className="text-xs">
              Draft
            </Badge>
          )}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          #{pr.number} • {pr.headBranch} → {pr.baseBranch}
          {pr.body && ` • ${pr.body.slice(0, 100)}${pr.body.length > 100 ? "..." : ""}`}
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground shrink-0">
        {pr.commitsCount > 0 && (
          <span className="flex items-center gap-1">
            {pr.commitsCount} commit{pr.commitsCount !== 1 ? "s" : ""}
          </span>
        )}
        {pr.additions > 0 && <span className="text-green-600">+{pr.additions}</span>}
        {pr.deletions > 0 && <span className="text-red-600">-{pr.deletions}</span>}
        {pr.commentsCount > 0 && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {pr.commentsCount}
          </span>
        )}
      </div>
    </div>
  );
}
