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
import { CircleDot, CheckCircle, Plus } from "lucide-react";
import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";
import { RepoCountsContext } from "../layout";

interface IssuesPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  body: string;
  state: "open" | "closed";
  repoFullName: string;
  author: string;
  authorAvatar?: string;
  labels: IssueLabel[];
  assignees: string[];
  milestone?: string;
  createdAt: number;
  updatedAt: number;
  commentsCount: number;
}

export interface IssueLabel {
  id: string;
  name: string;
  color: string;
}

interface IssueTemplate {
  name: string;
  path: string;
  content: string;
}

export default function IssuesPage({ params }: IssuesPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [githubIssues, setGithubIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"open" | "closed" | "all">("open");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: "",
    body: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [templates, setTemplates] = useState<IssueTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("blank");

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  const loadGithubIssues = useCallback(
    async (state: "open" | "closed" | "all" = "open") => {
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

        const stateParam = state === "all" ? "open" : state;
        const response = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/issues?state=${stateParam}&per_page=30`,
          { headers }
        );

        if (response.ok) {
          const data = await response.json();
          const issues: Issue[] = data
            .filter((issue: { pull_request?: unknown }) => !issue.pull_request)
            .map(
              (issue: {
                number: number;
                title: string;
                body: string;
                state: string;
                user: { login: string; avatar_url: string };
                labels: { id: number; name: string; color: string }[];
                created_at: string;
                updated_at: string;
                comments: number;
              }) => ({
                id: `gh-${issue.number}`,
                number: issue.number,
                title: issue.title,
                body: issue.body || "",
                state: issue.state === "open" ? "open" : "closed",
                repoFullName,
                author: issue.user.login,
                authorAvatar: issue.user.avatar_url,
                labels: issue.labels.map((l) => ({
                  id: String(l.id),
                  name: l.name,
                  color: l.color,
                })),
                assignees: [],
                createdAt: new Date(issue.created_at).getTime(),
                updatedAt: new Date(issue.updated_at).getTime(),
                commentsCount: issue.comments,
              })
            );

          if (state === "all") {
            setGithubIssues(issues);
          } else {
            setGithubIssues((prev) => {
              const existingIds = new Set(prev.map((i) => i.id));
              const newIssues = issues.filter((i) => !existingIds.has(i.id));
              return [...prev, ...newIssues];
            });
          }
        }
      } catch (error) {
        console.error("Failed to load GitHub issues:", error);
      }
    },
    [repo?.mirrorFrom, repoFullName]
  );

  const loadIssues = useCallback(async () => {
    try {
      const allIssues = await db.getAllByIndex<Issue>(STORES.ISSUES, "repoFullName", repoFullName);
      setIssues(allIssues.sort((a, b) => b.number - a.number));
    } catch (error) {
      console.error("Failed to load issues:", error);
    }
  }, [repoFullName]);

  const loadTemplates = useCallback(async () => {
    const foundTemplates: IssueTemplate[] = [];

    const templatePaths = [
      ".github/ISSUE_TEMPLATE.md",
      ".github/issue_template.md",
      ".giteria/ISSUE_TEMPLATE.md",
      ".giteria/issue_template.md",
    ];

    const issueTemplateDirs = [".github/ISSUE_TEMPLATE", ".giteria/ISSUE_TEMPLATE"];

    if (repo?.mirrorFrom) {
      const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
      if (githubMatch) {
        const [, mirrorOwner, mirrorRepo] = githubMatch;
        const repoName = mirrorRepo.replace(/\.git$/, "");

        const token = await getGitHubToken();
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        for (const templatePath of templatePaths) {
          try {
            const response = await fetch(
              `https://api.github.com/repos/${mirrorOwner}/${repoName}/contents/${templatePath}`,
              { headers }
            );

            if (response.ok) {
              const data = await response.json();
              if (data.content) {
                const content = atob(data.content);
                const templateName =
                  templatePath.split("/").pop()?.replace(".md", "").replace("_", " ") || "template";
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

        for (const templateDir of issueTemplateDirs) {
          try {
            const dirResponse = await fetch(
              `https://api.github.com/repos/${mirrorOwner}/${repoName}/contents/${templateDir}`,
              { headers }
            );

            if (dirResponse.ok) {
              const dirData = await dirResponse.json();
              if (Array.isArray(dirData)) {
                for (const file of dirData) {
                  if (
                    file.name &&
                    (file.name.endsWith(".md") ||
                      file.name.endsWith(".yml") ||
                      file.name.endsWith(".yaml"))
                  ) {
                    try {
                      const fileResponse = await fetch(file.download_url);
                      if (fileResponse.ok) {
                        const fileContent = await fileResponse.text();
                        const templateName = file.name
                          .replace(/\.(md|yml|yaml)$/, "")
                          .replace(/[-_]/g, " ");
                        foundTemplates.push({
                          name: templateName,
                          path: file.path,
                          content: fileContent,
                        });
                      }
                    } catch {
                      // Skip this file
                    }
                  }
                }
              }
            }
          } catch {
            // Directory doesn't exist, skip
          }
        }
      }
    }

    setTemplates(foundTemplates);
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
    loadIssues();
    if (repo?.mirrorFrom) {
      loadGithubIssues();
      loadTemplates();
    }
  }, [repo, repoFullName, loadIssues, loadGithubIssues, loadTemplates]);

  useEffect(() => {
    if (!repo?.mirrorFrom) return;

    const interval = setInterval(
      () => {
        loadGithubIssues();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [repo?.mirrorFrom, loadGithubIssues]);

  async function handleCreateIssue() {
    if (!newIssue.title.trim()) return;

    setIsCreating(true);
    try {
      const maxNumber = issues.length > 0 ? Math.max(...issues.map((i) => i.number)) : 0;
      const issue: Issue = {
        id: `${repoFullName}-${maxNumber + 1}`,
        number: maxNumber + 1,
        title: newIssue.title,
        body: newIssue.body,
        state: "open",
        repoFullName,
        author: "currentUser",
        labels: [],
        assignees: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        commentsCount: 0,
      };

      await db.add(STORES.ISSUES, issue);
      setNewIssue({ title: "", body: "" });
      setIsCreateDialogOpen(false);
      loadIssues();
    } catch (error) {
      console.error("Failed to create issue:", error);
    } finally {
      setIsCreating(false);
    }
  }

  async function toggleIssueState(issue: Issue) {
    const updatedState = issue.state === "open" ? "closed" : "open";
    const updatedIssue: Issue = { ...issue, state: updatedState, updatedAt: Date.now() };
    await db.put(STORES.ISSUES, updatedIssue);
    loadIssues();
  }

  const allIssues = [...issues, ...githubIssues];
  const uniqueIssues = allIssues.filter(
    (issue, index, self) => index === self.findIndex((i) => i.id === issue.id)
  );

  const filteredIssues = uniqueIssues.filter((issue) => {
    const matchesFilter = filter === "all" || issue.state === filter;
    const matchesSearch =
      !searchQuery ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openCount = uniqueIssues.filter((i) => i.state === "open").length;
  const closedCount = uniqueIssues.filter((i) => i.state === "closed").length;

  const repoCounts = React.useContext(RepoCountsContext);
  const prevIssuesCount = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (prevIssuesCount.current !== openCount) {
      prevIssuesCount.current = openCount;
      repoCounts.setCounts({ issues: openCount });
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
            <h1 className="text-2xl font-semibold">Issues</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {openCount} open • {closedCount} closed
            </p>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              if (open) {
                setNewIssue({ title: "", body: "" });
                setSelectedTemplate("blank");
              }
              setIsCreateDialogOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New issue
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-150">
              <DialogHeader>
                <DialogTitle>New issue</DialogTitle>
                <DialogDescription>Create a new issue for {repoFullName}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Title"
                    value={newIssue.title}
                    onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
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
                          setNewIssue({ ...newIssue, body: "" });
                        } else {
                          const template = templates.find((t) => t.path === v);
                          if (template) {
                            setNewIssue({ ...newIssue, body: template.content });
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
                    value={newIssue.body}
                    onChange={(e) => setNewIssue({ ...newIssue, body: e.target.value })}
                    rows={6}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateIssue} disabled={isCreating || !newIssue.title.trim()}>
                  {isCreating ? "Creating..." : "Create issue"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-75">
            <Input
              placeholder="Search issues..."
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
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredIssues.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No issues found</p>
            <Button variant="link" onClick={() => setIsCreateDialogOpen(true)} className="mt-2">
              Create your first issue
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredIssues.map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                onToggleState={() => toggleIssueState(issue)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function IssueRow({ issue, onToggleState }: { issue: Issue; onToggleState: () => void }) {
  return (
    <div className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
      <Button variant="ghost" size="icon-sm" className="mt-0.5" onClick={onToggleState}>
        {issue.state === "open" ? (
          <CircleDot className="w-5 h-5 text-green-600" />
        ) : (
          <CheckCircle className="w-5 h-5 text-purple-600" />
        )}
      </Button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={`/${issue.repoFullName}/issues/${issue.number}`}
            className="font-medium hover:text-blue-600 truncate"
          >
            {issue.title}
          </a>
          {issue.labels.map((label) => (
            <Badge
              key={label.id}
              variant="secondary"
              style={{ backgroundColor: label.color + "20", color: label.color }}
              className="text-xs"
            >
              {label.name}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          #{issue.number}{" "}
          {issue.body && `• ${issue.body.slice(0, 100)}${issue.body.length > 100 ? "..." : ""}`}
        </div>
      </div>
      {issue.commentsCount > 0 && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {issue.commentsCount}
        </div>
      )}
    </div>
  );
}
