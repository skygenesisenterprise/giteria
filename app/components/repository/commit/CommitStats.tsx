"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CommitStatsProps {
  filesChanged: number;
  additions: number;
  deletions: number;
}

export function CommitStats({ filesChanged, additions, deletions }: CommitStatsProps) {
  return (
    <div className="flex items-center gap-6 p-4 bg-muted/10 rounded-lg border border-border">
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filesChanged}</span> file
          {filesChanged !== 1 ? "s" : ""} changed
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className={cn("text-sm font-medium", "text-green-600 dark:text-green-400")}>
          +{additions}
        </span>
        <span className="text-xs text-muted-foreground">additions</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className={cn("text-sm font-medium", "text-red-600 dark:text-red-400")}>
          -{deletions}
        </span>
        <span className="text-xs text-muted-foreground">deletions</span>
      </div>
    </div>
  );
}
