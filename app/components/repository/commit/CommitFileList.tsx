"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CommitDiffView } from "./CommitDiffView";

interface FileChange {
  filename: string;
  status: "added" | "removed" | "modified" | "renamed" | "copied";
  additions: number;
  deletions: number;
  patch?: string;
  previous_filename?: string;
}

interface CommitFileListProps {
  files: FileChange[];
}

export function CommitFileList({ files }: CommitFileListProps) {
  const [expandedFiles, setExpandedFiles] = React.useState<Set<string>>(
    new Set(files.map((f) => f.filename))
  );
  const [allExpanded, setAllExpanded] = React.useState(true);

  const toggleFile = (filename: string) => {
    setExpandedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(filename)) {
        next.delete(filename);
      } else {
        next.add(filename);
      }
      return next;
    });
    setAllExpanded(false);
  };

  const expandAll = () => {
    setExpandedFiles(new Set(files.map((f) => f.filename)));
    setAllExpanded(true);
  };

  const collapseAll = () => {
    setExpandedFiles(new Set());
    setAllExpanded(false);
  };

  if (files.length === 0) {
    return (
      <div className="border border-border rounded-lg p-8 text-center text-muted-foreground">
        No files changed in this commit
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Changed Files
          <span className="ml-2 text-sm font-normal text-muted-foreground">({files.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={expandAll}
            disabled={allExpanded}
            className="text-xs"
          >
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            Expand all
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={collapseAll}
            disabled={!allExpanded && expandedFiles.size === 0}
            className="text-xs"
          >
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h4m12 0h-4M4 16h4m12 0h-4"
              />
            </svg>
            Collapse all
          </Button>
        </div>
      </div>

      {files.map((file) => (
        <CommitDiffView
          key={file.filename}
          filename={
            file.previous_filename ? `${file.previous_filename} → ${file.filename}` : file.filename
          }
          patch={file.patch || ""}
          isExpanded={expandedFiles.has(file.filename)}
          onToggle={() => toggleFile(file.filename)}
          additions={file.additions}
          deletions={file.deletions}
        />
      ))}
    </div>
  );
}
