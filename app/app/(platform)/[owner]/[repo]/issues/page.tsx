"use client";

import * as React from "react";
import { use, useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { db, STORES } from "@/lib/db";

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

interface IssuePageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function IssuesPage({ params }: IssuePageProps) {
  const resolvedParams = use(params);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"open" | "closed" | "all">("open");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: "",
    body: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  useEffect(() => {
    loadIssues();
  }, [repoFullName]);

  async function loadIssues() {
    setIsLoading(true);
    try {
      const allIssues = await db.getAllByIndex<Issue>(STORES.ISSUES, "repoFullName", repoFullName);
      setIssues(allIssues.sort((a, b) => b.number - a.number));
    } catch (error) {
      console.error("Failed to load issues:", error);
    } finally {
      setIsLoading(false);
    }
  }

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

  const filteredIssues = issues.filter((issue) => {
    const matchesFilter = filter === "all" || issue.state === filter;
    const matchesSearch =
      !searchQuery ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openCount = issues.filter((i) => i.state === "open").length;
  const closedCount = issues.filter((i) => i.state === "closed").length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Issues</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {openCount} open • {closedCount} closed
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>New issue</Button>
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
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeWidth="2" d="M12 8v4M12 16h.01" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
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
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
