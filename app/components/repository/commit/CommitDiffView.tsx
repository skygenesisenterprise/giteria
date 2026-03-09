"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DiffLine {
  type: "added" | "removed" | "context" | "hunk";
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

interface CommitDiffViewProps {
  filename: string;
  patch: string;
  oldVersion?: string;
  newVersion?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
  additions?: number;
  deletions?: number;
}

export function CommitDiffView({
  filename,
  patch,
  isExpanded = true,
  onToggle,
  additions = 0,
  deletions = 0,
}: CommitDiffViewProps) {
  const parseDiff = (patch: string): DiffLine[] => {
    const lines = patch.split("\n");
    const result: DiffLine[] = [];
    let oldLine = 0;
    let newLine = 0;

    for (const line of lines) {
      if (line.startsWith("@@")) {
        const match = line.match(/@@ -(\d+),?\d* \+(\d+),?\d* @@/);
        if (match) {
          oldLine = parseInt(match[1], 10);
          newLine = parseInt(match[2], 10);
        }
        result.push({
          type: "hunk",
          content: line,
          oldLineNumber: oldLine,
          newLineNumber: newLine,
        });
      } else if (line.startsWith("+") && !line.startsWith("+++")) {
        result.push({
          type: "added",
          newLineNumber: newLine++,
          content: line.substring(1),
        });
      } else if (line.startsWith("-") && !line.startsWith("---")) {
        result.push({
          type: "removed",
          oldLineNumber: oldLine++,
          content: line.substring(1),
        });
      } else if (
        !line.startsWith("diff") &&
        !line.startsWith("index") &&
        !line.startsWith("---") &&
        !line.startsWith("+++")
      ) {
        result.push({
          type: "context",
          oldLineNumber: oldLine++,
          newLineNumber: newLine++,
          content: line.startsWith(" ") || line === "" ? line.substring(1) : line,
        });
      }
    }

    return result;
  };

  const diffLines = parseDiff(patch);

  const getLineClass = (type: DiffLine["type"]) => {
    switch (type) {
      case "added":
        return "bg-green-500/10 hover:bg-green-500/15";
      case "removed":
        return "bg-red-500/10 hover:bg-red-500/15";
      case "hunk":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      default:
        return "";
    }
  };

  const getPrefixClass = (type: DiffLine["type"]) => {
    switch (type) {
      case "added":
        return "text-green-500";
      case "removed":
        return "text-red-500";
      case "hunk":
        return "text-blue-500";
      default:
        return "text-muted-foreground/50";
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
      >
        <motion.svg
          className="w-4 h-4 shrink-0 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>

        <span className="font-mono text-sm flex-1 truncate">{filename}</span>

        <div className="flex items-center gap-2 text-xs shrink-0">
          {additions > 0 && (
            <span className="text-green-600 dark:text-green-400 font-medium">+{additions}</span>
          )}
          {deletions > 0 && (
            <span className="text-red-600 dark:text-red-400 font-medium">-{deletions}</span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <tbody>
                  {diffLines.map((line, idx) => (
                    <tr
                      key={idx}
                      className={cn("hover:bg-muted/30 transition-colors", getLineClass(line.type))}
                    >
                      <td className="w-12 px-2 py-0.5 text-right text-muted-foreground/50 select-none border-r border-border/50">
                        {line.oldLineNumber ?? ""}
                      </td>
                      <td className="w-12 px-2 py-0.5 text-right text-muted-foreground/50 select-none border-r border-border/50">
                        {line.newLineNumber ?? ""}
                      </td>
                      <td className="w-6 px-2 py-0.5 text-center select-none">
                        <span className={getPrefixClass(line.type)}>
                          {line.type === "added"
                            ? "+"
                            : line.type === "removed"
                              ? "-"
                              : line.type === "hunk"
                                ? "@"
                                : " "}
                        </span>
                      </td>
                      <td className="px-2 py-0.5 whitespace-pre-wrap break-all">
                        <span
                          className={cn(
                            line.type === "added" && "text-green-600 dark:text-green-400",
                            line.type === "removed" && "text-red-600 dark:text-red-400",
                            line.type === "hunk" && "text-blue-600 dark:text-blue-400 font-medium"
                          )}
                        >
                          {line.content}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
