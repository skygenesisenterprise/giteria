"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Copy, Check, Folder } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

interface FileViewerProps {
  owner: string;
  repo: string;
  branch?: string;
  mirrorFrom?: string;
}

export function FileViewer({ owner, repo, branch = "main", mirrorFrom }: FileViewerProps) {
  const pathname = usePathname();
  const [fileContent, setFileContent] = React.useState<string>("");
  const [folderContents, setFolderContents] = React.useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [isFile, setIsFile] = React.useState(false);
  const { getIcon } = useFileIcon();

  const currentPath = React.useMemo(() => {
    const match = pathname.match(/tree\/blob\/(.*)/);
    if (match && match[1]) {
      return match[1];
    }
    return "";
  }, [pathname]);

  const isRoot = currentPath === "";

  React.useEffect(() => {
    async function fetchContent() {
      console.log("FileViewer: mirrorFrom =", mirrorFrom, "currentPath =", currentPath);

      if (!mirrorFrom) {
        setFolderContents([]);
        setError("No mirror URL configured");
        return;
      }

      const githubMatch = mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
      if (!githubMatch) {
        setError("Invalid mirror URL");
        return;
      }

      const [, mirrorOwner, mirrorRepo] = githubMatch;
      const repoName = mirrorRepo.replace(/\.git$/, "");

      setIsLoading(true);
      setError(null);

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

        if (response.ok) {
          const data = await response.json();

          if (Array.isArray(data)) {
            setIsFile(false);
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
            setFolderContents(items);
          } else {
            setIsFile(true);
            const contentResponse = await fetch(
              `https://api.github.com/repos/${mirrorOwner}/${repoName}/contents/${currentPath}`,
              { headers: { ...headers, Accept: "application/vnd.github.v3.raw" } }
            );
            if (contentResponse.ok) {
              const content = await contentResponse.text();
              setFileContent(content);
            } else {
              console.error("Failed to fetch raw content:", contentResponse.status);
              setError("Failed to load file content");
            }
          }
        } else if (response.status === 404) {
          setError("File or folder not found");
        } else {
          setError("Failed to load content");
        }
      } catch (err) {
        console.error("Failed to fetch content:", err);
        setError("Failed to load content");
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [mirrorFrom, currentPath]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sortedFiles = React.useMemo(() => {
    const folders = folderContents.filter((f) => f.type === "folder");
    const files = folderContents.filter((f) => f.type === "file");

    const sortByDotFirst = (items: FileItem[]) =>
      [...items].sort((a, b) => {
        const aStartsWithDot = a.name.startsWith(".");
        const bStartsWithDot = b.name.startsWith(".");

        if (aStartsWithDot && !bStartsWithDot) return -1;
        if (!aStartsWithDot && bStartsWithDot) return 1;

        return a.name.localeCompare(b.name);
      });

    return [...sortByDotFirst(folders), ...sortByDotFirst(files)];
  }, [folderContents]);

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

  const breadcrumbs = React.useMemo(() => {
    const parts = currentPath ? currentPath.split("/") : [];
    return [
      { name: repo, href: `/${owner}/${repo}` },
      { name: "tree", href: null },
      { name: "blob", href: `/${owner}/${repo}/tree/blob` },
      ...parts.map((part, index) => ({
        name: part,
        href:
          index === parts.length - 1
            ? null
            : `/${owner}/${repo}/tree/blob/${parts.slice(0, index + 1).join("/")}`,
      })),
    ];
  }, [owner, repo, currentPath]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (!mirrorFrom) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p>Select a file to view</p>
          <p className="text-xs mt-2">No mirror URL configured for this repository</p>
        </div>
      </div>
    );
  }

  if (!isFile && folderContents.length === 0 && !error) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p>Select a file to view</p>
          <p className="text-xs mt-2">path: {currentPath || "(root)"}</p>
        </div>
      </div>
    );
  }

  if (isFile) {
    const lines = fileContent.split("\n");
    return (
      <div className="flex-1 flex flex-col min-w-0">
        <div className="border-b border-border px-4 py-2">
          <div className="flex items-center gap-1 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-blue-500 hover:underline text-muted-foreground"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex-1 flex min-h-0">
          <ScrollArea className="flex-1">
            <div className="flex">
              <div className="select-none text-right pr-4 pl-2 py-2 text-sm text-muted-foreground bg-muted/20 border-r border-border font-mono text-xs">
                {lines.map((_, index) => (
                  <div key={index} className="leading-6">
                    {index + 1}
                  </div>
                ))}
              </div>
              <pre className="flex-1 p-2 text-sm font-mono overflow-x-auto">
                <code>{fileContent}</code>
              </pre>
            </div>
          </ScrollArea>
          <div className="border-l border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-full min-h-[200px]"
              title="Copy file content"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="border-b border-border px-4 py-2">
        <div className="flex items-center gap-1 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-blue-500 hover:underline text-muted-foreground"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-foreground">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <tbody>
            {sortedFiles.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-muted-foreground">
                  This folder is empty.
                </td>
              </tr>
            ) : (
              sortedFiles.map((file) => {
                const { iconName, color } = getIcon(file);
                return (
                  <tr key={file.path} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        {file.type === "folder" ? (
                          <Folder className="w-4 h-4 text-blue-500" />
                        ) : (
                          <FileIcon iconName={iconName} className={cn("w-4 h-4", color)} />
                        )}
                        <Link
                          href={`/${owner}/${repo}/tree/blob/${file.path}`}
                          className="text-sm hover:text-blue-500 hover:underline"
                        >
                          {file.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      {file.lastCommit && (
                        <Link
                          href={`/${owner}/${repo}/commit/${file.lastCommit.sha}`}
                          className="flex items-center gap-1 text-xs text-muted-foreground max-w-xs hover:text-blue-500 hover:underline"
                        >
                          <span className="truncate">{file.lastCommit.message}</span>
                        </Link>
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
      </div>
    </div>
  );
}
