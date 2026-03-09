"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Workflow {
  id: string;
  name: string;
  description?: string;
  trigger: string;
  status: "active" | "disabled";
  lastRunStatus?: "success" | "failed" | "running";
  lastRunAt?: string;
}

interface WorkflowCardProps {
  workflow: Workflow;
  owner: string;
  repo: string;
}

export function WorkflowCard({ workflow, owner, repo }: WorkflowCardProps) {
  const getStatusBadge = (status: Workflow["lastRunStatus"]) => {
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

  const getStatusText = (status: Workflow["lastRunStatus"]) => {
    switch (status) {
      case "success":
        return "Success";
      case "failed":
        return "Failed";
      case "running":
        return "Running";
      default:
        return "No runs";
    }
  };

  const timeAgo = (dateString?: string) => {
    if (!dateString) return "Never";
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
    <Link href={`/${owner}/${repo}/actions/workflows/${workflow.id}`}>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
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
              <CardTitle className="text-base">{workflow.name}</CardTitle>
            </div>
            {workflow.status === "active" ? (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              >
                Active
              </Badge>
            ) : (
              <Badge variant="secondary">Disabled</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            Trigger: <span className="font-mono text-xs">{workflow.trigger}</span>
          </p>
          {workflow.lastRunStatus && (
            <div className="flex items-center gap-3 text-sm">
              <span className={cn("font-medium", getStatusBadge(workflow.lastRunStatus))}>
                {getStatusText(workflow.lastRunStatus)}
              </span>
              <span className="text-muted-foreground">• {timeAgo(workflow.lastRunAt)}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
