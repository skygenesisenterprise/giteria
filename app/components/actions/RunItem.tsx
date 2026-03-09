"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Run {
  id: string;
  workflowName: string;
  commit: string;
  branch: string;
  status: "success" | "failed" | "running";
  duration: string;
  createdAt: string;
}

interface RunItemProps {
  run: Run;
  owner: string;
  repo: string;
}

export function RunItem({ run, owner, repo }: RunItemProps) {
  const getStatusBadge = (status: Run["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "failed":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "running":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: Run["status"]) => {
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
      case "running":
        return (
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
        );
      default:
        return null;
    }
  };

  const timeAgo = (dateString: string) => {
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

  return (
    <Link
      href={`/${owner}/${repo}/actions/runs/${run.id}`}
      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
    >
      <div className="shrink-0">{getStatusIcon(run.status)}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium">Run #{run.id}</span>
          <Badge className={cn("text-xs", getStatusBadge(run.status))}>
            {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          <span className="font-medium">{run.workflowName}</span>
          <span className="mx-2">•</span>
          <span className="font-mono text-xs">{run.commit.substring(0, 7)}</span>
          <span className="mx-2">•</span>
          <span>{run.branch}</span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="text-sm font-medium">{run.duration}</div>
        <div className="text-xs text-muted-foreground">{timeAgo(run.createdAt)}</div>
      </div>
    </Link>
  );
}
