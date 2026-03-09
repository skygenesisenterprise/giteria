"use client";

import * as React from "react";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WorkflowSidebar } from "@/components/actions/WorkflowSidebar";
import { ActiveRunsList } from "@/components/actions/ActiveRunsList";
import {
  fetchAndCacheWorkflowFiles,
  fetchAndCacheWorkflowRuns,
  type WorkflowFile,
  type WorkflowRun,
} from "@/lib/actions-data";

interface ActionsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function ActionsPage({ params }: ActionsPageProps) {
  const resolvedParams = use(params);
  const [workflows, setWorkflows] = useState<WorkflowFile[]>([]);
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [workflowsData, runsData] = await Promise.all([
          fetchAndCacheWorkflowFiles(resolvedParams.owner, resolvedParams.repo),
          fetchAndCacheWorkflowRuns(resolvedParams.owner, resolvedParams.repo),
        ]);
        setWorkflows(workflowsData);
        setRuns(runsData);
      } catch (err) {
        console.error("Failed to fetch actions data:", err);
        setError("Failed to load workflows");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [resolvedParams.owner, resolvedParams.repo]);

  const { owner, repo } = resolvedParams;

  const activeRuns = runs.filter((r) => r.status === "running" || r.status === "queued");
  const successRuns = runs.filter((r) => r.status === "success");
  const successRate = runs.length > 0 ? Math.round((successRuns.length / runs.length) * 100) : 0;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Link href={`/${owner}/${repo}`}>
          <Button variant="link" className="mt-4">
            Back to repository
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          <WorkflowSidebar workflows={workflows} owner={owner} repo={repo} />

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold"
                >
                  Actions
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground text-sm mt-1"
                >
                  Automate your workflow from build to deployment
                </motion.p>
              </div>
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New workflow
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-muted/30 rounded-xl p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{workflows.length}</p>
                    <p className="text-xs text-muted-foreground">Workflows</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-500 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{activeRuns.length}</p>
                    <p className="text-xs text-muted-foreground">Running</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{runs.length}</p>
                    <p className="text-xs text-muted-foreground">Total Runs</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{successRate}%</p>
                    <p className="text-xs text-muted-foreground">Success</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <ActiveRunsList runs={activeRuns} owner={owner} repo={repo} />
              </div>

              <div>
                <RecentRunsList
                  runs={runs
                    .filter((r) => r.status !== "running" && r.status !== "queued")
                    .slice(0, 5)}
                  owner={owner}
                  repo={repo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentRunsList({
  runs,
  owner,
  repo,
}: {
  runs: WorkflowRun[];
  owner: string;
  repo: string;
}) {
  if (runs.length === 0) {
    return (
      <div className="bg-muted/30 rounded-xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">No recent runs</p>
      </div>
    );
  }

  const getStatusIcon = (status: WorkflowRun["status"]) => {
    switch (status) {
      case "success":
        return (
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "failed":
        return (
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "cancelled":
        return (
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: WorkflowRun["status"]) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      case "cancelled":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count}${interval.label[0]} ago`;
      }
    }
    return "just now";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Recent Runs</h2>
        <Link href={`/${owner}/${repo}/actions`} className="text-xs text-primary hover:underline">
          View all
        </Link>
      </div>

      <div className="bg-muted/30 rounded-xl divide-y divide-border/50">
        {runs.map((run) => (
          <Link
            key={run.id}
            href={`/${owner}/${repo}/actions/runs/${run.id}`}
            className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="shrink-0">{getStatusIcon(run.status)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">#{run.id}</span>
                <span className={getStatusColor(run.status)}>{run.status}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {run.workflowName} • {run.branch}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-mono">{run.duration}</div>
              <div className="text-xs text-muted-foreground">{timeAgo(run.createdAt)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
