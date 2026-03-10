"use client";

import * as React from "react";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GitPullRequest,
  GitMerge,
  MessageSquare,
  GitBranch,
  GitCommit,
  FileText,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Circle,
  Loader2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "@/lib/github-token";
import { WorkflowRun } from "@/lib/actions-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion, AnimatePresence } from "framer-motion";

interface PullRequest {
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

interface PullRequestDetailProps {
  params: Promise<{ owner: string; repo: string; id: string }>;
}

interface RepoData {
  mirrorFrom?: string;
}

interface PRFile {
  filename: string;
  status: "added" | "removed" | "modified" | "renamed";
  additions: number;
  deletions: number;
  patch?: string;
}

interface PRCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
}

interface PRComment {
  id: number;
  body: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
}

export default function PullRequestDetailPage({ params }: PullRequestDetailProps) {
  const resolvedParams = use(params);
  const [pr, setPR] = useState<PullRequest | null>(null);
  const [githubPR, setGithubPR] = useState<PullRequest | null>(null);
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [files, setFiles] = useState<PRFile[]>([]);
  const [commits, setCommits] = useState<PRCommit[]>([]);
  const [comments, setComments] = useState<PRComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [prBranch, setPrBranch] = useState<string>("");

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;
  const prNumber = parseInt(resolvedParams.id, 10);

  useEffect(() => {
    loadPR();
    loadRepoData();
  }, [repoFullName, prNumber]);

  useEffect(() => {
    if (repoData?.mirrorFrom && prBranch) {
      loadWorkflowRunsForPR();
    }
  }, [repoData?.mirrorFrom, prBranch]);

  async function loadWorkflowRunsForPR() {
    if (!repoData?.mirrorFrom || !prBranch) return;

    const githubMatch = repoData.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
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
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/actions/runs?branch=${prBranch}&per_page=10`,
        { headers }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.workflow_runs) {
          const runs: WorkflowRun[] = data.workflow_runs.map(
            (run: {
              id: number;
              name: string;
              workflow_id: number;
              head_sha: string;
              head_branch: string;
              status: string;
              conclusion: string | null;
              created_at: string;
              updated_at: string;
              run_started_at: string;
              html_url: string;
            }) => ({
              id: String(run.id),
              workflowId: String(run.workflow_id),
              workflowName: run.name || "Unknown",
              repoFullName,
              commit: run.head_sha,
              branch: run.head_branch,
              status: mapStatus(run.status, run.conclusion),
              conclusion: run.conclusion,
              duration: calculateDuration(run.run_started_at, run.updated_at),
              createdAt: run.created_at,
              updatedAt: run.updated_at,
              url: run.html_url,
            })
          );
          setWorkflowRuns(runs);
        }
      }
    } catch (error) {
      console.error("Failed to load workflow runs for PR:", error);
    }
  }

  function mapStatus(status: string, conclusion: string | null): WorkflowRun["status"] {
    if (status === "queued" || status === "pending") return "queued";
    if (status === "in_progress") return "running";
    if (status === "completed") {
      if (conclusion === "success") return "success";
      if (conclusion === "failure") return "failed";
      if (conclusion === "cancelled") return "cancelled";
    }
    if (status === "cancelled") return "cancelled";
    return "pending";
  }

  function calculateDuration(startedAt: string, updatedAt: string): string {
    if (!startedAt || !updatedAt) return "-";
    const start = new Date(startedAt);
    const end = new Date(updatedAt);
    const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  useEffect(() => {
    if (repoData?.mirrorFrom) {
      loadGithubPR();
    } else if (repoData) {
      loadLocalComments();
    }
  }, [repoData?.mirrorFrom]);

  async function loadLocalComments() {
    try {
      const allComments = await db.getAllByIndex<
        PRComment & { prId: string; repoFullName: string }
      >(STORES.PR_COMMENTS, "repoFullName", repoFullName);
      const prComments = allComments
        .filter((c) => c.prId === prNumber.toString())
        .map((c) => ({
          id: c.id,
          body: c.body,
          author: c.author,
          authorAvatar: c.authorAvatar,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        }));
      setComments(prComments);
    } catch (error) {
      console.error("Failed to load local comments:", error);
    }
  }

  async function loadRepoData() {
    try {
      const repos = await db.getAll<{ name: string; mirrorFrom?: string }>(STORES.REPOSITORIES);
      const repo = repos.find((r) => r.name === resolvedParams.repo);
      if (repo) {
        setRepoData(repo);
      }
    } catch (error) {
      console.error("Failed to load repo data:", error);
    }
  }

  async function loadGithubPR() {
    if (!repoData?.mirrorFrom) return;

    const githubMatch = repoData.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
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

      const [prResponse, filesResponse, commitsResponse, commentsResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}/pulls/${prNumber}`, {
          headers,
        }),
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}/pulls/${prNumber}/files`, {
          headers,
        }),
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}/pulls/${prNumber}/commits`, {
          headers,
        }),
        fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/issues/${prNumber}/comments`,
          {
            headers,
          }
        ),
      ]);

      if (prResponse.ok) {
        const prData = await prResponse.json();
        setGithubPR({
          id: `gh-${prData.number}`,
          number: prData.number,
          title: prData.title,
          body: prData.body || "",
          state: prData.merged ? "merged" : prData.state === "open" ? "open" : "closed",
          repoFullName,
          author: prData.user.login,
          authorAvatar: prData.user.avatar_url,
          baseBranch: prData.base.ref,
          headBranch: prData.head.ref,
          isDraft: prData.draft || false,
          createdAt: new Date(prData.created_at).getTime(),
          updatedAt: new Date(prData.updated_at).getTime(),
          commentsCount: prData.comments,
          commitsCount: prData.commits,
          additions: prData.additions || 0,
          deletions: prData.deletions || 0,
        });
        setPrBranch(prData.head.ref);
      }

      if (filesResponse.ok) {
        const filesData = await filesResponse.json();
        const prFiles: PRFile[] = filesData.map(
          (f: {
            filename: string;
            status: string;
            additions: number;
            deletions: number;
            patch?: string;
          }) => ({
            filename: f.filename,
            status: f.status as PRFile["status"],
            additions: f.additions,
            deletions: f.deletions,
            patch: f.patch,
          })
        );
        setFiles(prFiles);
      }

      if (commitsResponse.ok) {
        const commitsData = await commitsResponse.json();
        const prCommits: PRCommit[] = commitsData.map(
          (c: {
            sha: string;
            commit: { message: string; author: { date: string } };
            author: { login: string } | null;
          }) => ({
            sha: c.sha,
            message: c.commit.message,
            author: c.author?.login || "unknown",
            date: c.commit.author.date,
          })
        );
        setCommits(prCommits);
      }

      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        const prComments: PRComment[] = commentsData.map(
          (c: {
            id: number;
            body: string;
            user: { login: string; avatar_url: string };
            created_at: string;
            updated_at: string;
          }) => ({
            id: c.id,
            body: c.body,
            author: c.user.login,
            authorAvatar: c.user.avatar_url,
            createdAt: c.created_at,
            updatedAt: c.updated_at,
          })
        );
        setComments(prComments);
      }
    } catch (error) {
      console.error("Failed to load GitHub PR:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadPR() {
    setIsLoading(true);
    try {
      const allPulls = await db.getAllByIndex<PullRequest>(
        STORES.PULLS,
        "repoFullName",
        repoFullName
      );
      const foundPR = allPulls.find((p) => p.number === prNumber);
      if (foundPR) {
        setPR(foundPR);
      }
    } catch (error) {
      console.error("Failed to load PR:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitComment() {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      if (repoData?.mirrorFrom) {
        const githubMatch = repoData.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
        if (!githubMatch) return;

        const [, mirrorOwner, mirrorRepo] = githubMatch;
        const repoName = mirrorRepo.replace(/\.git$/, "");

        const token = await getGitHubToken();
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/issues/${prNumber}/comments`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ body: newComment }),
          }
        );

        if (response.ok) {
          const commentData = await response.json();
          setComments([
            ...comments,
            {
              id: commentData.id,
              body: commentData.body,
              author: commentData.user.login,
              authorAvatar: commentData.user.avatar_url,
              createdAt: commentData.created_at,
              updatedAt: commentData.updated_at,
            },
          ]);
          setNewComment("");
        }
      } else {
        const newCommentObj: PRComment = {
          id: Date.now(),
          body: newComment,
          author: "You",
          authorAvatar: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await db.add(STORES.PR_COMMENTS, {
          ...newCommentObj,
          prId: prNumber.toString(),
          repoFullName,
        });

        setComments([...comments, newCommentObj]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function mergePullRequest() {
    if (!repoData?.mirrorFrom || !currentPR || currentPR.state !== "open" || currentPR.isDraft) {
      return;
    }

    const githubMatch = repoData.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) return;

    const [, mirrorOwner, mirrorRepo] = githubMatch;
    const repoName = mirrorRepo.replace(/\.git$/, "");

    setIsMerging(true);
    try {
      const token = await getGitHubToken();
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/pulls/${prNumber}/merge`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            merge_method: "merge",
          }),
        }
      );

      if (response.ok) {
        setPR({ ...currentPR, state: "merged" });
      } else {
        const errorData = await response.json();
        console.error("Failed to merge PR:", errorData);
        alert(`Failed to merge: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to merge PR:", error);
    } finally {
      setIsMerging(false);
    }
  }

  const currentPR = pr || githubPR;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (!currentPR) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <GitPullRequest className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-xl font-semibold mb-2">Pull request not found</h1>
        <p className="text-muted-foreground mb-4">
          The pull request #{prNumber} could not be found.
        </p>
        <Link href={`/${repoFullName}/pulls`}>
          <Button variant="outline">Back to pull requests</Button>
        </Link>
      </div>
    );
  }

  const timeAgo = (dateString: number) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  const totalAdditions = files.reduce((sum, f) => sum + f.additions, 0);
  const totalDeletions = files.reduce((sum, f) => sum + f.deletions, 0);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={`/${repoFullName}/pulls`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to pull requests
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="border border-border rounded-lg bg-card overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {currentPR.state === "open" ? (
                  <GitPullRequest className="w-5 h-5 text-green-600" />
                ) : currentPR.state === "merged" ? (
                  <GitMerge className="w-5 h-5 text-purple-600" />
                ) : (
                  <GitPullRequest className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="text-xl font-semibold">{currentPR.title}</h1>
                  {currentPR.isDraft && <Badge variant="secondary">Draft</Badge>}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                  <span>
                    {currentPR.state === "open"
                      ? "Open"
                      : currentPR.state === "merged"
                        ? "Merged"
                        : "Closed"}
                  </span>
                  <span>•</span>
                  <span>#{currentPR.number}</span>
                  <span>•</span>
                  <span>{timeAgo(currentPR.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm bg-muted/50 rounded-md p-2">
              <GitBranch className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono text-blue-600">{currentPR.headBranch}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-mono text-blue-600">{currentPR.baseBranch}</span>
            </div>

            {currentPR.authorAvatar && (
              <div className="mt-4 flex items-center gap-2">
                <img
                  src={currentPR.authorAvatar}
                  alt={currentPR.author}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{currentPR.author}</span> wants to
                  merge <span className="font-mono text-blue-600">{currentPR.headBranch}</span> into{" "}
                  <span className="font-mono text-blue-600">{currentPR.baseBranch}</span>
                </span>
              </div>
            )}

            {currentPR.body && (
              <div className="mt-4 border border-border rounded-lg p-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {currentPR.body}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center gap-4">
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                {currentPR.commentsCount} comment{currentPR.commentsCount !== 1 ? "s" : ""}
              </Button>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <GitCommit className="w-4 h-4" />
                <span>
                  {commits.length || currentPR.commitsCount} commit
                  {(commits.length || currentPR.commitsCount) !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-green-600">+{totalAdditions || currentPR.additions}</span>
                <span className="text-red-600">-{totalDeletions || currentPR.deletions}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs defaultValue="conversation" className="w-full">
            <TabsList>
              <TabsTrigger value="conversation">Conversation</TabsTrigger>
              <TabsTrigger value="commits">
                Commits ({commits.length || currentPR.commitsCount})
              </TabsTrigger>
              <TabsTrigger value="checks">Checks ({workflowRuns.length})</TabsTrigger>
              <TabsTrigger value="files">Files changed ({files.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="conversation" className="mt-4">
              <div className="border border-border rounded-lg">
                {currentPR.state === "open" && !currentPR.isDraft && repoData?.mirrorFrom && (
                  <div className="p-4 border-b border-border bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <GitMerge className="w-4 h-4 text-green-600" />
                        <span className="text-muted-foreground">
                          This branch is up to date with{" "}
                          <span className="font-mono text-blue-600">{currentPR.baseBranch}</span>
                        </span>
                      </div>
                      <Button
                        onClick={mergePullRequest}
                        disabled={isMerging}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isMerging ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Merging...
                          </>
                        ) : (
                          <>
                            <GitMerge className="w-4 h-4 mr-2" />
                            Merge pull request
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {repoData?.mirrorFrom && (
                  <div className="p-4 border-b border-border">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      className="mb-2"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={submitComment}
                        disabled={!newComment.trim() || isSubmitting}
                        size="sm"
                      >
                        {isSubmitting ? "Posting..." : "Comment"}
                      </Button>
                    </div>
                  </div>
                )}

                {comments.length === 0 && !repoData?.mirrorFrom ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No comments yet.</p>
                    <p className="text-sm">Start a conversation about this pull request.</p>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No comments yet.</p>
                    <p className="text-sm">Be the first to comment!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    <AnimatePresence>
                      {comments.map((comment, index) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4"
                        >
                          <div className="flex items-start gap-3">
                            {comment.authorAvatar ? (
                              <img
                                src={comment.authorAvatar}
                                alt={comment.author}
                                className="w-8 h-8 rounded-full shrink-0"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-sm text-muted-foreground">
                                  commented {timeAgo(new Date(comment.createdAt).getTime())}
                                </span>
                              </div>
                              <div className="mt-2 text-sm whitespace-pre-wrap">{comment.body}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="commits" className="mt-4">
              <div className="border border-border rounded-lg">
                {commits.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <GitCommit className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No commits yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    <AnimatePresence>
                      {commits.map((commit, index) => (
                        <motion.div
                          key={commit.sha}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="p-4 flex items-start gap-3"
                        >
                          <GitCommit className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-mono text-sm text-blue-600">
                                {commit.sha.slice(0, 7)}
                              </span>
                              <span className="text-sm text-muted-foreground">{commit.author}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">
                                {timeAgo(new Date(commit.date).getTime())}
                              </span>
                            </div>
                            <p className="text-sm truncate">{commit.message.split("\n")[0]}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="checks" className="mt-4">
              <div className="border border-border rounded-lg">
                {!repoData?.mirrorFrom ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No checks available.</p>
                    <p className="text-sm">Checks are only available for mirrored repositories.</p>
                  </div>
                ) : workflowRuns.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No checks running on this branch.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    <AnimatePresence>
                      {workflowRuns.map((run, index) => (
                        <motion.div
                          key={run.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="p-4 flex items-start gap-3"
                        >
                          {run.status === "success" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                          ) : run.status === "failed" ? (
                            <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                          ) : run.status === "running" ? (
                            <Loader2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0 animate-spin" />
                          ) : (
                            <Circle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-medium text-sm">{run.workflowName}</span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  run.status === "success" && "text-green-600 border-green-600",
                                  run.status === "failed" && "text-red-600 border-red-600",
                                  run.status === "running" && "text-blue-600 border-blue-600",
                                  (run.status === "queued" || run.status === "pending") &&
                                    "text-yellow-600 border-yellow-600",
                                  run.status === "cancelled" && "text-gray-600 border-gray-600"
                                )}
                              >
                                {run.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                              <span className="font-mono text-xs">{run.commit.slice(0, 7)}</span>
                              <span>•</span>
                              <span>{run.branch}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {run.duration}
                              </span>
                              <span>•</span>
                              <span>{timeAgo(new Date(run.createdAt).getTime())}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="files" className="mt-4">
              <div className="border border-border rounded-lg">
                {files.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No files changed.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    <AnimatePresence>
                      {files.map((file, index) => (
                        <motion.div
                          key={file.filename}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className="p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                              <span className="font-mono text-sm truncate">{file.filename}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm shrink-0">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  file.status === "added" && "text-green-600 border-green-600",
                                  file.status === "removed" && "text-red-600 border-red-600",
                                  file.status === "modified" && "text-yellow-600 border-yellow-600",
                                  file.status === "renamed" && "text-blue-600 border-blue-600"
                                )}
                              >
                                {file.status}
                              </Badge>
                              <span className="text-green-600">+{file.additions}</span>
                              <span className="text-red-600">-{file.deletions}</span>
                            </div>
                          </div>
                          {file.patch && (
                            <pre className="bg-muted/50 rounded p-2 text-xs font-mono overflow-x-auto">
                              {file.patch.split("\n").map((line, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "whitespace-pre-wrap",
                                    line.startsWith("+") && "text-green-600 bg-green-600/10",
                                    line.startsWith("-") && "text-red-600 bg-red-600/10"
                                  )}
                                >
                                  {line}
                                </div>
                              ))}
                            </pre>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
