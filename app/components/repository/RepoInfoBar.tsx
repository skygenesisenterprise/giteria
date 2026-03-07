"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bookmark,
  Lock,
  Globe,
  Heart,
  Pin,
  Eye,
  GitFork,
  Star,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RepoInfoBarProps {
  owner: string;
  repo: string;
  visibility?: "public" | "private";
}

export function RepoInfoBar({ owner, repo, visibility = "public" }: RepoInfoBarProps) {
  const [isStarred, setIsStarred] = React.useState(false);
  const [isWatching, setIsWatching] = React.useState(false);
  const [stars, setStars] = React.useState(0);
  const [forks, setForks] = React.useState(0);
  const [watchers, setWatchers] = React.useState(0);
  const [isCopied, setIsCopied] = React.useState(false);

  const cloneUrl = `giteria.com/${owner}/${repo}.git`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`git clone ${cloneUrl}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleStar = () => {
    setIsStarred(!isStarred);
    setStars(isStarred ? stars - 1 : stars + 1);
  };

  const handleWatch = () => {
    setIsWatching(!isWatching);
    setWatchers(isWatching ? watchers - 1 : watchers + 1);
  };

  const handleFork = () => {
    setForks(forks + 1);
  };

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground hover:text-foreground px-2"
            >
              <Bookmark className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </Button>

            <Link
              href={`/${owner}`}
              className="text-sm text-muted-foreground hover:text-foreground hover:underline truncate"
            >
              {owner}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={`/${owner}/${repo}`}
              className="text-lg font-semibold text-foreground hover:text-blue-500 hover:underline truncate"
            >
              {repo}
            </Link>

            <Badge variant="outline" className="font-normal gap-1 shrink-0">
              {visibility === "private" ? (
                <>
                  <Lock className="w-3 h-3" />
                  Private
                </>
              ) : (
                <>
                  <Globe className="w-3 h-3" />
                  Public
                </>
              )}
            </Badge>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Sponsor</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Pin className="w-4 h-4" />
              <span className="hidden sm:inline">Pin</span>
            </Button>

            <div className="w-px h-5 bg-border mx-1" />

            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 rounded-r-none border-r border-border hover:bg-muted"
                onClick={handleWatch}
              >
                <Eye className={cn("w-4 h-4", isWatching && "text-blue-500")} />
                <span className="hidden sm:inline">{isWatching ? "Unwatch" : "Watch"}</span>
                <span className="text-xs text-muted-foreground">
                  {isWatching ? watchers + 1 : watchers}
                </span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={handleFork}
            >
              <GitFork className="w-4 h-4" />
              <span className="hidden sm:inline">Fork</span>
              <span className="text-xs text-muted-foreground">{forks}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={handleStar}
            >
              <Star className={cn("w-4 h-4", isStarred && "text-yellow-500 fill-yellow-500")} />
              <span className="hidden sm:inline">{isStarred ? "Unstar" : "Star"}</span>
              <span className="text-xs text-muted-foreground">{isStarred ? stars + 1 : stars}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
