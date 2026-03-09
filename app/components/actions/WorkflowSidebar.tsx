"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WorkflowFile {
  id: string;
  name: string;
  path: string;
  description?: string;
}

interface WorkflowSidebarProps {
  workflows: WorkflowFile[];
  selectedWorkflow?: string;
  owner: string;
  repo: string;
}

export function WorkflowSidebar({
  workflows,
  selectedWorkflow,
  owner,
  repo,
}: WorkflowSidebarProps) {
  return (
    <div className="w-64 shrink-0">
      <div className="sticky top-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-sm">Workflows</h2>
          <Link
            href={`/${owner}/${repo}/actions/new`}
            className="text-xs text-primary hover:underline"
          >
            New
          </Link>
        </div>

        <nav className="space-y-1">
          <Link
            href={`/${owner}/${repo}/actions`}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
              !selectedWorkflow ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            All Workflows
          </Link>

          <div className="pt-2">
            <p className="px-3 text-xs text-muted-foreground mb-2">Workflow Files</p>
            {workflows.map((workflow) => (
              <Link
                key={workflow.id}
                href={`/${owner}/${repo}/actions/${workflow.id}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                  selectedWorkflow === workflow.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted"
                )}
              >
                <svg
                  className="w-4 h-4 shrink-0"
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
                <span className="truncate">{workflow.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-6 pt-4 border-t">
          <h3 className="font-semibold text-sm mb-3">Quick Links</h3>
          <nav className="space-y-1">
            <Link
              href={`/${owner}/${repo}/actions/runners`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
              Runners
            </Link>
            <Link
              href={`/${owner}/${repo}/actions/secrets`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              Secrets
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
