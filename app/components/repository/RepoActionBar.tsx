"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GitBranch, Tags, ChevronDown, Search, Plus, FileCode, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface RepoActionBarProps {
  owner: string;
  repo: string;
  branch?: string;
  currentPath?: string;
  mirrorFrom?: string;
}

interface Branch {
  id: string;
  name: string;
  repoFullName: string;
  isDefault: boolean;
}

interface Tag {
  id: string;
  name: string;
  repoFullName: string;
}

export function RepoActionBar({
  owner,
  repo,
  branch = "main",
  currentPath = "",
  mirrorFrom,
}: RepoActionBarProps) {
  const [currentBranch, setCurrentBranch] = useState(branch);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const repoFullName = `${owner}/${repo}`;
  const cloneUrlHttps = `giteria.com/${owner}/${repo}.git`;
  const cloneUrlSsh = `git@giteria.com:${owner}/${repo}.git`;

  useEffect(() => {
    async function loadBranchesAndTags() {
      try {
        const allBranches = await db.getAllByIndex<Branch>(
          STORES.BRANCHES,
          "repoFullName",
          repoFullName
        );
        setBranches(
          allBranches.sort((a, b) => {
            if (a.isDefault) return -1;
            if (b.isDefault) return 1;
            return a.name.localeCompare(b.name);
          })
        );

        if (mirrorFrom) {
          const githubMatch = mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
          if (githubMatch) {
            const [, mirrorOwner, mirrorRepo] = githubMatch;
            const repoName = mirrorRepo.replace(/\.git$/, "");

            const token = await getGitHubToken();
            const headers: HeadersInit = {
              Accept: "application/vnd.github.v3+json",
            };
            if (token) {
              headers.Authorization = `Bearer ${token}`;
            }

            try {
              const [branchesRes, tagsRes] = await Promise.all([
                fetch(
                  `https://api.github.com/repos/${mirrorOwner}/${repoName}/branches?per_page=100`,
                  { headers }
                ),
                fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}/tags?per_page=100`, {
                  headers,
                }),
              ]);

              if (branchesRes.ok) {
                const branchData = await branchesRes.json();
                const githubBranches: Branch[] = branchData.map(
                  (b: { name: string; protected: boolean }) => ({
                    id: `gh-${b.name}`,
                    name: b.name,
                    repoFullName,
                    isDefault: false,
                  })
                );
                setBranches((prev) => {
                  const existingNames = new Set(prev.map((p) => p.name));
                  const newBranches = githubBranches.filter((b) => !existingNames.has(b.name));
                  return [...prev, ...newBranches].sort((a, b) => {
                    if (a.isDefault) return -1;
                    if (b.isDefault) return 1;
                    return a.name.localeCompare(b.name);
                  });
                });
              }

              if (tagsRes.ok) {
                const tagData = await tagsRes.json();
                const githubTags: Tag[] = tagData.map((t: { name: string }) => ({
                  id: `gh-${t.name}`,
                  name: t.name,
                  repoFullName,
                }));
                setTags(githubTags);
              }
            } catch (error) {
              console.error("Failed to fetch GitHub branches/tags:", error);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load branches:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadBranchesAndTags();
  }, [repoFullName, mirrorFrom]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const pathParts = currentPath.split("/").filter(Boolean);

  return (
    <div
      className="flex items-center justify-between gap-2"
      style={{
        fontFamily:
          '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div className="flex items-center gap-1.5 min-w-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 h-8">
              <GitBranch className="w-4 h-4" />
              <span className="hidden sm:inline max-w-24 truncate">{currentBranch}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 p-0">
            <div className="p-2 border-b border-border">
              <Input
                placeholder="Find or create a branch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9"
              />
            </div>

            <div className="py-1 max-h-80 overflow-y-auto">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                Switch branches/tags
              </div>

              <div className="max-h-48 overflow-y-auto">
                {branches
                  .filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((b) => (
                    <DropdownMenuItem
                      key={b.id}
                      onClick={() => setCurrentBranch(b.name)}
                      className={`flex items-center gap-2 ${b.name === currentBranch ? "bg-accent font-medium" : ""}`}
                    >
                      <GitBranch className="w-4 h-4" />
                      <span className="flex-1">{b.name}</span>
                      {b.name === currentBranch && <Check className="w-4 h-4" />}
                      {b.isDefault && !b.name.startsWith(currentBranch) && (
                        <span className="text-xs text-muted-foreground">default</span>
                      )}
                    </DropdownMenuItem>
                  ))}
              </div>

              {tags.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase())).length >
                0 && (
                <>
                  <div className="border-t border-border my-1" />
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Tags</div>
                  <div className="max-h-32 overflow-y-auto">
                    {tags
                      .filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((tag) => (
                        <DropdownMenuItem key={tag.id} className="flex items-center gap-2">
                          <Tags className="w-4 h-4" />
                          <span className="flex-1">{tag.name}</span>
                        </DropdownMenuItem>
                      ))}
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-border p-2 flex gap-2">
              <Link
                href={`/${owner}/${repo}/branches`}
                className="flex-1 text-center text-xs text-muted-foreground hover:text-foreground py-1"
              >
                View all branches
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="text-xs text-muted-foreground hidden md:inline">
          <Link
            href={`/${owner}/${repo}/branches`}
            className="hover:text-foreground inline-flex items-center"
          >
            <GitBranch className="w-3 h-3 inline mx-0.5" />
            {branches.length} Branches
          </Link>
          {" / "}
          <Link
            href={`/${owner}/${repo}/tags`}
            className="hover:text-foreground inline-flex items-center"
          >
            <Tags className="w-3 h-3 inline mx-0.5" />
            {tags.length} Tags
          </Link>
        </span>

        {currentPath && (
          <div className="flex items-center gap-0.5 text-sm text-muted-foreground min-w-0">
            <span className="mx-1">/</span>
            {pathParts.map((part, index) => (
              <React.Fragment key={index}>
                <Link
                  href={`/${owner}/${repo}/blob/${currentBranch}/${pathParts.slice(0, index + 1).join("/")}`}
                  className="hover:text-foreground hover:underline truncate max-w-32"
                >
                  {part}
                </Link>
                {index < pathParts.length - 1 && <span className="mx-0.5">/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5"></div>

      <div className="flex items-center gap-1.5">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Go to file" className="pl-9 w-48 h-8" />
        </div>

        <Button variant="ghost" size="sm" className="gap-1 h-8">
          <Plus className="w-4 h-4" />
          <span className="hidden lg:inline">Add file</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 h-8">
              <FileCode className="w-4 h-4" />
              <span className="hidden sm:inline">Code</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2">
              <p className="text-sm font-medium mb-2">Clone</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">HTTPS</p>
                  <div className="flex items-center gap-1">
                    <code className="flex-1 bg-muted px-2 py-1.5 rounded text-xs font-mono truncate">
                      {cloneUrlHttps}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 h-8 w-8 p-0"
                      onClick={() => handleCopy(cloneUrlHttps)}
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">SSH</p>
                  <div className="flex items-center gap-1">
                    <code className="flex-1 bg-muted px-2 py-1.5 rounded text-xs font-mono truncate">
                      {cloneUrlSsh}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 h-8 w-8 p-0"
                      onClick={() => handleCopy(cloneUrlSsh)}
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/${owner}/${repo}/settings`} className="cursor-pointer">
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
