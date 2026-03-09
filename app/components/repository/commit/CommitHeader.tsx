"use client";

import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CommitAuthor {
  name: string;
  email: string;
  date: string;
}

interface CommitHeaderProps {
  title: string;
  description?: string;
  author: CommitAuthor;
  sha: string;
  parents?: { sha: string }[];
  owner: string;
  repo: string;
}

export function CommitHeader({
  title,
  description,
  author,
  sha,
  parents = [],
  owner,
  repo,
}: CommitHeaderProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(sha);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const shortSha = sha.substring(0, 7);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="p-6 pb-4">
        <h1 className="text-2xl font-semibold leading-tight">{title}</h1>
        {description && (
          <pre className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap font-sans">
            {description}
          </pre>
        )}
      </div>

      <div className="px-6 py-4 bg-muted/20 border-t border-border flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
              {author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{author.name}</div>
            <div className="text-xs text-muted-foreground">committed {timeAgo(author.date)}</div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-background border border-border rounded-md px-3 py-1.5">
            <code className="text-sm font-mono text-muted-foreground">{shortSha}</code>
            <Button variant="ghost" size="icon-sm" onClick={copyToClipboard} className="h-6 w-6">
              {copied ? (
                <svg
                  className="h-3.5 w-3.5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </Button>
          </div>

          {parents.length > 0 && (
            <div className="flex items-center gap-1">
              {parents.map((parent) => (
                <Link
                  key={parent.sha}
                  href={`/${owner}/${repo}/commit/${parent.sha}`}
                  className="text-xs font-mono text-blue-600 hover:underline"
                >
                  {parent.sha.substring(0, 7)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
