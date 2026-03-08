"use client";

import * as React from "react";
import Link from "next/link";
import { GitCommit, Ellipsis } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@/components/ui/file-icon";
import { useFileIcon } from "@/components/repository/use-file-icon";
import { cn } from "@/lib/utils";
import { getGitHubToken } from "@/lib/github-token";

interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  size?: number;
  modifiedAt?: number;
  lastCommit?: {
    sha: string;
    message: string;
    author: string;
    date: string;
  };
}

interface CommitItem {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  html_url?: string;
}

interface RepositoryCodeProps {
  owner: string;
  repo: string;
  branch?: string;
  files?: FileItem[];
  isLoading?: boolean;
  mirrorFrom?: string;
}

export function RepositoryCode({
  owner,
  repo,
  branch = "main",
  files,
  isLoading,
  mirrorFrom,
}: RepositoryCodeProps) {
  const [currentPath, setCurrentPath] = React.useState("");
  const [subFiles, setSubFiles] = React.useState<FileItem[]>([]);
  const [isLoadingSub, setIsLoadingSub] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"code" | "commits">("code");
  const [commits, setCommits] = React.useState<CommitItem[]>([]);
  const [isLoadingCommits, setIsLoadingCommits] = React.useState(false);
  const [latestCommit, setLatestCommit] = React.useState<CommitItem | null>(null);
  const [showCommitDetails, setShowCommitDetails] = React.useState(false);
  const [commitCount, setCommitCount] = React.useState(0);
  const { getIcon } = useFileIcon();

  const commitMessage = latestCommit?.commit.message || "";
  const commitTitle = commitMessage.split("\n")[0];
  const commitDescription = commitMessage.split("\n").slice(1).join("\n").trim();
  const hasCommitDescription = commitDescription.length > 0;

  const pathParts = currentPath.split("/").filter(Boolean);

  const fetchContents = React.useCallback(async () => {
    if (!mirrorFrom) {
      setSubFiles([]);
      return;
    }

    const githubMatch = mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) return;

    const [, mirrorOwner, mirrorRepo] = githubMatch;
    const repoName = mirrorRepo.replace(/\.git$/, "");

    setIsLoadingSub(true);
    try {
      const token = await getGitHubToken();
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/contents/${currentPath}`,
        { headers }
      );

      const commitResponse = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits?per_page=1`,
        { headers }
      );

      const countResponse = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits?per_page=1&sha=${branch}`,
        { headers }
      );
      if (countResponse.ok) {
        const linkHeader = countResponse.headers.get("link");
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) {
            setCommitCount(parseInt(match[1], 10));
          }
        } else {
          const data = await countResponse.json();
          if (data && data.length > 0) {
            setCommitCount(1);
          }
        }
      }

      if (commitResponse.ok) {
        const commitData = await commitResponse.json();
        if (commitData && commitData.length > 0) {
          setLatestCommit(commitData[0]);
        }
      }

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const items: FileItem[] = await Promise.all(
            data.map(async (item: { name: string; path: string; type: string; size?: number }) => {
              const fileItem: FileItem = {
                name: item.name,
                path: item.path,
                type: item.type === "dir" ? "folder" : "file",
                size: item.size,
              };

              if (token) {
                try {
                  const commitResponse = await fetch(
                    `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits?path=${item.path}&per_page=1`,
                    { headers }
                  );
                  if (commitResponse.ok) {
                    const commitData = await commitResponse.json();
                    if (commitData && commitData.length > 0) {
                      fileItem.lastCommit = {
                        sha: commitData[0].sha,
                        message: commitData[0].commit.message.split("\n")[0],
                        author: commitData[0].author?.login || commitData[0].commit.author.name,
                        date: commitData[0].commit.author.date,
                      };
                    }
                  }
                } catch {
                  // Ignore commit fetch errors
                }
              }

              return fileItem;
            })
          );
          setSubFiles(items);
        }
      }
    } catch (err) {
      console.error("Failed to fetch subdirectory:", err);
    } finally {
      setIsLoadingSub(false);
    }
  }, [mirrorFrom, currentPath]);

  React.useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const fetchCommits = React.useCallback(async () => {
    if (!mirrorFrom) {
      setCommits([]);
      return;
    }

    const githubMatch = mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) return;

    const [, mirrorOwner, mirrorRepo] = githubMatch;
    const repoName = mirrorRepo.replace(/\.git$/, "");

    setIsLoadingCommits(true);
    try {
      const token = await getGitHubToken();
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits?per_page=10`,
        { headers }
      );

      const countResponse = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits?per_page=1&sha=${branch}`,
        { headers }
      );
      if (countResponse.ok) {
        const linkHeader = countResponse.headers.get("link");
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) {
            setCommitCount(parseInt(match[1], 10));
          }
        } else {
          const data = await countResponse.json();
          if (data && data.length > 0) {
            setCommitCount(1);
          }
        }
      }

      if (response.ok) {
        const data = await response.json();
        setCommits(data);
        if (data && data.length > 0) {
          setLatestCommit(data[0]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch commits:", err);
    } finally {
      setIsLoadingCommits(false);
    }
  }, [mirrorFrom, viewMode]);

  React.useEffect(() => {
    if (viewMode === "commits" && mirrorFrom) {
      fetchCommits();
    }
  }, [viewMode, mirrorFrom, fetchCommits]);

  React.useEffect(() => {
    if (!mirrorFrom) return;

    const interval = setInterval(
      () => {
        if (viewMode === "code") {
          fetchContents();
        } else {
          fetchCommits();
        }
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [mirrorFrom, viewMode, fetchContents, fetchCommits]);

  const handleFolderClick = (path: string) => {
    setCurrentPath(path);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setCurrentPath("");
    } else {
      setCurrentPath(pathParts.slice(0, index + 1).join("/"));
    }
  };

  const displayFiles = mirrorFrom ? (subFiles.length > 0 ? subFiles : files || []) : files || [];

  const sortedFiles = React.useMemo(() => {
    const folders = displayFiles.filter((f) => f.type === "folder");
    const files = displayFiles.filter((f) => f.type === "file");

    const sortByDotFirst = (items: FileItem[]) =>
      [...items].sort((a, b) => {
        const aStartsWithDot = a.name.startsWith(".");
        const bStartsWithDot = b.name.startsWith(".");

        if (aStartsWithDot && !bStartsWithDot) return -1;
        if (!aStartsWithDot && bStartsWithDot) return 1;

        return a.name.localeCompare(b.name);
      });

    return [...sortByDotFirst(folders), ...sortByDotFirst(files)];
  }, [displayFiles]);

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

  if (isLoading) {
    return (
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
          <span className="ml-3 text-muted-foreground">Loading repository contents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {latestCommit && (
        <div className="border-b border-border bg-muted/30">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-1 min-w-0">
              {latestCommit.author && (
                <>
                  <img
                    src={latestCommit.author.avatar_url}
                    alt={latestCommit.author.login}
                    className="w-5 h-5 rounded-full shrink-0"
                  />
                  <span className="text-foreground font-medium shrink-0">
                    {latestCommit.author.login}
                  </span>
                  <span className="shrink-0">/</span>
                </>
              )}
              <span className="truncate">{commitTitle}</span>
              {hasCommitDescription && (
                <button
                  onClick={() => setShowCommitDetails(!showCommitDetails)}
                  className="hover:text-foreground cursor-pointer"
                >
                  <Ellipsis className="w-4 h-4 shrink-0" />
                </button>
              )}
            </div>
            <code className="text-xs text-muted-foreground font-mono shrink-0">
              {latestCommit.sha.substring(0, 7)}
            </code>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 shrink-0"
              onClick={() => setViewMode(viewMode === "commits" ? "code" : "commits")}
            >
              <GitCommit className="w-4 h-4 mr-1.5" />
              {commitCount.toLocaleString()} commits
            </Button>
          </div>
          <AnimatePresence>
            {showCommitDetails && hasCommitDescription && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-3 pb-2 text-xs text-muted-foreground whitespace-pre-wrap">
                  {commitDescription}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {viewMode === "commits" ? (
        <div className="p-2">
          {isLoadingCommits ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground" />
            </div>
          ) : commits.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">No commits available.</div>
          ) : (
            <div className="space-y-1">
              {commits.map((commit) => {
                const authorName = commit.author?.login || commit.commit.author.name;
                const message = commit.commit.message.split("\n")[0];
                const shortSha = commit.sha.substring(0, 7);
                const time = timeAgo(commit.commit.author.date);

                return (
                  <div
                    key={commit.sha}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50"
                  >
                    {commit.author ? (
                      <img
                        src={commit.author.avatar_url}
                        alt={authorName}
                        className="w-5 h-5 rounded-full shrink-0"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted shrink-0" />
                    )}
                    <span className="font-medium text-foreground text-sm shrink-0">
                      {authorName}
                    </span>
                    <span className="text-muted-foreground">/</span>
                    <span className="flex-1 truncate text-foreground text-sm">{message}</span>
                    <code className="text-muted-foreground font-mono text-xs shrink-0">
                      {shortSha}
                    </code>
                    <span className="text-muted-foreground text-xs shrink-0">{time}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <>
          <table className="w-full">
            <tbody>
              {displayFiles.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-muted-foreground">
                    {mirrorFrom
                      ? "This repository is empty or could not be loaded."
                      : "No files available."}
                  </td>
                </tr>
              ) : (
                sortedFiles.map((file) => {
                  const { iconName, color } = getIcon(file);
                  return (
                    <tr key={file.path} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <FileIcon iconName={iconName} className={cn("w-4 h-4", color)} />
                          {file.type === "folder" && mirrorFrom ? (
                            <button
                              onClick={() => handleFolderClick(file.path)}
                              className="text-sm hover:text-blue-500 hover:underline"
                            >
                              {file.name}
                            </button>
                          ) : (
                            <Link
                              href={
                                file.type === "folder"
                                  ? `/${owner}/${repo}/tree/${branch}/${file.path}`
                                  : `/${owner}/${repo}/blob/${branch}/${file.path}`
                              }
                              className="text-sm hover:text-blue-500 hover:underline"
                            >
                              {file.name}
                            </Link>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        {file.lastCommit && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-xs">
                            <span className="truncate">{file.lastCommit.message}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right text-xs text-muted-foreground whitespace-nowrap">
                        {file.lastCommit && <span>{timeAgo(file.lastCommit.date)}</span>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
