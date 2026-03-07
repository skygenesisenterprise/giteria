"use client";

import * as React from "react";
import { GitBranch, Tags, ChevronDown, Search, Plus, FileCode, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RepoActionBarProps {
  owner: string;
  repo: string;
  branch?: string;
}

export function RepoActionBar({ owner, repo, branch = "main" }: RepoActionBarProps) {
  const [currentBranch, setCurrentBranch] = React.useState(branch);
  const [isCopied, setIsCopied] = React.useState(false);

  const cloneUrl = `giteria.com/${owner}/${repo}.git`;

  const branches = ["main", "develop", "feature-branch", "fix-branch"];
  const tags = ["v1.0.0", "v1.1.0", "v2.0.0"];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`git clone ${cloneUrl}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <GitBranch className="w-4 h-4" />
              <span className="hidden sm:inline">Branches</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem className="font-semibold">Switch branches/tags</DropdownMenuItem>
            <div className="border-t border-border my-1" />
            {branches.map((b) => (
              <DropdownMenuItem
                key={b}
                onClick={() => setCurrentBranch(b)}
                className={b === currentBranch ? "bg-accent" : ""}
              >
                <GitBranch className="w-4 h-4 mr-2" />
                {b}
              </DropdownMenuItem>
            ))}
            <div className="border-t border-border my-1" />
            <DropdownMenuItem className="font-semibold text-xs text-muted-foreground">
              Tags
            </DropdownMenuItem>
            {tags.map((tag) => (
              <DropdownMenuItem key={tag}>
                <Tags className="w-4 h-4 mr-2" />
                {tag}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" className="gap-1">
          <GitBranch className="w-4 h-4" />
          <span className="hidden sm:inline">{currentBranch}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <Tags className="w-4 h-4" />
              <span className="hidden sm:inline">Tags</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {tags.map((tag) => (
              <DropdownMenuItem key={tag}>
                <Tags className="w-4 h-4 mr-2" />
                {tag}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Go to file" className="pl-9 w-40 sm:w-64" />
        </div>

        <Button variant="ghost" size="sm" className="gap-1">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add file</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <FileCode className="w-4 h-4" />
              <span className="hidden sm:inline">Code</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium mb-2">Clone</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted px-2 py-1.5 rounded text-xs font-mono truncate">
                  {cloneUrl}
                </code>
                <Button variant="ghost" size="sm" className="shrink-0" onClick={handleCopy}>
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="border-t border-border" />
            <div className="p-2">
              <p className="text-xs text-muted-foreground mb-2">You can clone with HTTPS or SSH.</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
