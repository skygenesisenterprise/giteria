"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Commit {
  sha: string;
  message: string;
  author: {
    name: string;
    avatarUrl?: string;
    username?: string;
  };
  date: string;
}

interface RecentCommitsProps {
  owner: string;
  repo: string;
  branch?: string;
}

const mockCommits: Commit[] = [
  {
    sha: "a1b2c3d",
    message: "feat: add new authentication flow",
    author: { name: "John Doe", username: "johndoe" },
    date: "2 hours ago",
  },
  {
    sha: "e4f5g6h",
    message: "fix: resolve memory leak in cache",
    author: { name: "Jane Smith", username: "janesmith" },
    date: "5 hours ago",
  },
  {
    sha: "i7j8k9l",
    message: "chore: update dependencies",
    author: { name: "Bob Wilson", username: "bobwilson" },
    date: "Yesterday",
  },
  {
    sha: "m0n1o2p",
    message: "docs: improve API documentation",
    author: { name: "Alice Brown", username: "alicebrown" },
    date: "2 days ago",
  },
  {
    sha: "q3r4s5t",
    message: "refactor: simplify error handling",
    author: { name: "Charlie Davis", username: "charliedavis" },
    date: "3 days ago",
  },
];

export function RecentCommits({ owner, repo, branch = "main" }: RecentCommitsProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="px-3 py-2 border-b border-border bg-muted/30">
        <h3 className="text-sm font-semibold">Recent Commits</h3>
      </div>
      <div className="divide-y divide-border/50">
        {mockCommits.map((commit) => (
          <div key={commit.sha} className="p-3 hover:bg-muted/20 transition-colors">
            <div className="flex items-start gap-3">
              <Avatar className="w-6 h-6 mt-0.5">
                <AvatarFallback className="text-xs">
                  {commit.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/${owner}/${repo}/commit/${commit.sha}`}
                    className="text-sm font-medium hover:text-blue-500 hover:underline truncate"
                  >
                    {commit.message}
                  </Link>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Link
                    href={`/${owner}/${repo}/commit/${commit.sha}`}
                    className="font-mono hover:text-blue-500"
                  >
                    {commit.sha}
                  </Link>
                  <span>•</span>
                  <span>{commit.author.name}</span>
                  <span>•</span>
                  <span>{commit.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-border bg-muted/20">
        <Link
          href={`/${owner}/${repo}/commits/${branch}`}
          className="block text-center text-sm text-muted-foreground hover:text-foreground py-1"
        >
          View all commits
        </Link>
      </div>
    </div>
  );
}
