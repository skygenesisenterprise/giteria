"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon } from "@/components/ui/file-icon";
import { useFileIcon } from "@/components/repository/use-file-icon";
import { cn } from "@/lib/utils";
import { getGitHubToken } from "@/lib/github-token";

interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  size?: number;
  lastCommit?: {
    sha: string;
    message: string;
    author: string;
    date: string;
  };
}

interface RepositoryTreeExplorerProps {
  owner: string;
  repo: string;
  mirrorFrom?: string;
}

export function RepositoryTreeExplorer({ owner, repo, mirrorFrom }: RepositoryTreeExplorerProps) {
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const pathname = usePathname();
  const { getIcon } = useFileIcon();

  const { branch, currentPath } = React.useMemo(() => {
    const match = pathname.match(/\/tree\/blob\/([^\/]+)\/(.+)/);
    if (match && match[1]) {
      return { branch: match[1], currentPath: match[2] || "" };
    }
    const simpleMatch = pathname.match(/\/tree\/blob\/([^\/]+)\/?$/);
    if (simpleMatch && simpleMatch[1]) {
      return { branch: simpleMatch[1], currentPath: "" };
    }
    const noBranchMatch = pathname.match(/\/tree\/blob\/(.+)/);
    if (noBranchMatch && noBranchMatch[1]) {
      const pathWithoutBranch = noBranchMatch[1];
      return { branch: "main", currentPath: pathWithoutBranch };
    }
    return { branch: "main", currentPath: "" };
  }, [pathname]);

  const directoryPath = React.useMemo(() => {
    if (!currentPath) return "";
    const parts = currentPath.split("/");
    if (parts.length > 1) {
      return parts.slice(0, -1).join("/");
    }
    return "";
  }, [currentPath]);

  React.useEffect(() => {
    async function fetchContents() {
      if (!mirrorFrom) {
        setIsLoading(false);
        return;
      }

      const githubMatch = mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
      if (!githubMatch) {
        setIsLoading(false);
        return;
      }

      const [, mirrorOwner, mirrorRepo] = githubMatch;
      const repoName = mirrorRepo.replace(/\.git$/, "");

      try {
        const token = await getGitHubToken();
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const fetchPath = directoryPath || currentPath;
        const response = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/contents/${fetchPath}`,
          { headers }
        );

        if (response.ok) {
          const data = await response.json();

          if (Array.isArray(data)) {
            const items: FileItem[] = await Promise.all(
              data.map(
                async (item: { name: string; path: string; type: string; size?: number }) => {
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
                }
              )
            );
            setFiles(items);
          } else {
            setFiles([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch contents:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContents();
  }, [mirrorFrom, currentPath, directoryPath]);

  const sortedFiles = React.useMemo(() => {
    const folders = files.filter((f) => f.type === "folder");
    const fileList = files.filter((f) => f.type === "file");

    const sortByDotFirst = (items: FileItem[]) =>
      [...items].sort((a, b) => {
        const aStartsWithDot = a.name.startsWith(".");
        const bStartsWithDot = b.name.startsWith(".");

        if (aStartsWithDot && !bStartsWithDot) return -1;
        if (!aStartsWithDot && bStartsWithDot) return 1;

        return a.name.localeCompare(b.name);
      });

    return [...sortByDotFirst(folders), ...sortByDotFirst(fileList)];
  }, [files]);

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
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground" />
        </div>
      </div>
    );
  }

  if (!mirrorFrom || files.length === 0) {
    return (
      <div className="border border-border rounded-lg overflow-hidden bg-card p-4">
        <p className="text-sm text-muted-foreground">No files available</p>
      </div>
    );
  }

  return (
    <div
      className="border border-border rounded-lg overflow-hidden bg-card"
      style={{
        fontFamily:
          '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <table className="w-full">
        <tbody>
          {sortedFiles.map((file) => {
            const { iconName, color } = getIcon(file);
            return (
              <tr key={file.path} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <FileIcon iconName={iconName} className={cn("w-4 h-4", color)} />
                    <Link
                      href={`/${owner}/${repo}/tree/blob/${branch}/${file.path}`}
                      className="text-sm hover:text-blue-500 hover:underline"
                    >
                      {file.name}
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
