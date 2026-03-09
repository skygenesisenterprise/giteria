"use client";

import * as React from "react";
import { GitFork, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RepoGitBarProps {
  mirrorFrom?: string;
  className?: string;
}

export function RepoGitBar({ mirrorFrom, className }: RepoGitBarProps) {
  if (!mirrorFrom) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 text-sm text-muted-foreground",
        className
      )}
      style={{
        fontFamily:
          '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <GitFork className="w-4 h-4 text-blue-500" />
      <span>
        Mirror from{" "}
        <a
          href={mirrorFrom}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline inline-flex items-center gap-1"
        >
          {mirrorFrom.replace(/^https?:\/\//, "")}
          <ExternalLink className="w-3 h-3" />
        </a>
      </span>
    </div>
  );
}
