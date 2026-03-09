"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { WorkflowRun } from "@/lib/actions-data";

interface ActiveRunsListProps {
  runs: WorkflowRun[];
  owner: string;
  repo: string;
}

export function ActiveRunsList({ runs, owner, repo }: ActiveRunsListProps) {
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">No workflows running</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Running</h2>
        <span className="text-xs text-muted-foreground">{runs.length} active</span>
      </div>

      {runs.map((run, index) => (
        <motion.div
          key={run.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link
            href={`/${owner}/${repo}/actions/runs/${run.id}`}
            className="block bg-muted/30 hover:bg-muted/50 rounded-xl p-4 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
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
                  <p className="font-medium text-sm">{run.workflowName}</p>
                  <p className="text-xs text-muted-foreground">
                    #{run.id} • {run.branch}
                  </p>
                </div>
              </div>
              <span className="text-xs text-blue-500 font-medium capitalize">{run.status}</span>
            </div>

            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="font-mono">{run.commit.substring(0, 7)}</span>
              <span>{timeAgo(run.createdAt)}</span>
              <span>•</span>
              <span>{run.duration}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function timeAgo(dateString: string) {
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
}
