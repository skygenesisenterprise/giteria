"use client";

import * as React from "react";
import Link from "next/link";
import { Star, GitFork, Archive, RefreshCw, Code } from "lucide-react";
import type { RepositoryData } from "./data";
import { Badge } from "@/components/ui/badge";

interface RepositoryCardProps {
  repo: RepositoryData;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
};

function getLanguageColor(language?: string): string {
  if (!language) return "#8b949e";
  return languageColors[language] || "#8b949e";
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
  const languageColor = repo.languageColor || getLanguageColor(repo.language);

  return (
    <div className="p-4 rounded-lg hover:bg-muted/30 transition-colors group border border-transparent">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={repo.url}
              className="text-lg font-semibold text-foreground hover:text-primary hover:underline truncate"
            >
              {repo.name}
            </Link>
            {repo.visibility === "private" && (
              <Badge variant="outline" className="text-xs">
                Private
              </Badge>
            )}
            {repo.isArchived && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <Archive className="w-3 h-3" />
                Archived
              </Badge>
            )}
            {repo.isMirror && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Mirror
              </Badge>
            )}
            {repo.isFork && (
              <Badge variant="secondary" className="text-xs">
                Forked
              </Badge>
            )}
          </div>

          {repo.description && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{repo.description}</p>
          )}

          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: languageColor }} />
                <span>{repo.language}</span>
              </div>
            )}

            <Link
              href={`${repo.url}/stargazers`}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Star className="w-3.5 h-3.5" />
              <span>{repo.stars.toLocaleString()}</span>
            </Link>

            <Link
              href={`${repo.url}/network/members`}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>{repo.forks.toLocaleString()}</span>
            </Link>

            <span className="ml-auto">Updated {formatDate(repo.updatedAt)}</span>
            <Link
              href={repo.url}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-2 py-0.5 rounded-md text-xs font-medium transition-colors"
            >
              <Code className="w-3 h-3" />
              Code
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
