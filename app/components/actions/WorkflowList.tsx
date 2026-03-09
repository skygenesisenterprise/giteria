"use client";

import * as React from "react";
import { WorkflowCard } from "./WorkflowCard";

interface Workflow {
  id: string;
  name: string;
  description?: string;
  trigger: string;
  status: "active" | "disabled";
  lastRunStatus?: "success" | "failed" | "running";
  lastRunAt?: string;
}

interface WorkflowListProps {
  workflows: Workflow[];
  owner: string;
  repo: string;
}

export function WorkflowList({ workflows, owner, repo }: WorkflowListProps) {
  if (workflows.length === 0) {
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <p>No workflows yet</p>
        <p className="text-sm mt-1">Create your first automation workflow to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} owner={owner} repo={repo} />
      ))}
    </div>
  );
}
