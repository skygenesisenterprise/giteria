"use client";

import * as React from "react";
import { RunItem } from "./RunItem";

interface Run {
  id: string;
  workflowName: string;
  commit: string;
  branch: string;
  status: "success" | "failed" | "running";
  duration: string;
  createdAt: string;
}

interface RunsListProps {
  runs: Run[];
  owner: string;
  repo: string;
}

export function RunsList({ runs, owner, repo }: RunsListProps) {
  if (runs.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <svg
          className="w-12 h-12 mx-auto mb-4 opacity-50"
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
        <p>No recent runs</p>
        <p className="text-sm mt-1">Workflow runs will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {runs.map((run) => (
        <RunItem key={run.id} run={run} owner={owner} repo={repo} />
      ))}
    </div>
  );
}
