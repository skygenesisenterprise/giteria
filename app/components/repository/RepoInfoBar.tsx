"use client";

import * as React from "react";
import Link from "next/link";
import { Lock, Globe, Eye, GitFork, Star, Pencil, Pin, Heart, User } from "lucide-react";
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
    <div
      className="border-b border-border bg-background/95 backdrop-blur-sm"
      style={{
        fontFamily:
          '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/${owner}`}
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  {owner}
                </Link>
                <span className="text-muted-foreground">/</span>
                <Link
                  href={`/${owner}/${repo}`}
                  className="text-lg font-semibold text-foreground hover:text-blue-500 hover:underline"
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
            </div>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            <div className="border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground rounded-md"
              >
                <Pencil className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            </div>

            <div className="border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground rounded-md"
              >
                <Pin className="w-4 h-4" />
                <span className="hidden sm:inline">Pin</span>
              </Button>
            </div>

            <div className="border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground rounded-md"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Sponsor</span>
              </Button>
            </div>

            <div className="w-px h-5 bg-border mx-1" />

            <div className="border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-1.5 text-muted-foreground hover:text-foreground rounded-md",
                  isStarred && "text-yellow-500"
                )}
                onClick={handleStar}
              >
                <Star className={cn("w-4 h-4", isStarred && "fill-yellow-500")} />
                <span className="hidden sm:inline">{isStarred ? "Unstar" : "Star"}</span>
                <span className="text-xs">{isStarred ? stars + 1 : stars}</span>
              </Button>
            </div>

            <div className="border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-1.5 text-muted-foreground hover:text-foreground rounded-md",
                  isWatching && "text-blue-500"
                )}
                onClick={handleWatch}
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">{isWatching ? "Unwatch" : "Watch"}</span>
                <span className="text-xs">{isWatching ? watchers + 1 : watchers}</span>
              </Button>
            </div>

            <div className="border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground rounded-md"
                onClick={handleFork}
              >
                <GitFork className="w-4 h-4" />
                <span className="hidden sm:inline">Fork</span>
                <span className="text-xs">{forks}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
