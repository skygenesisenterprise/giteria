"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@/components/ui/file-icon";
import { useFileIcon } from "@/components/repository/use-file-icon";
import { cn } from "@/lib/utils";

interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  size?: number;
  modifiedAt?: number;
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
  const { getIcon } = useFileIcon();

  const pathParts = currentPath.split("/").filter(Boolean);

  React.useEffect(() => {
    async function fetchSubContents() {
      if (!mirrorFrom || !currentPath) {
        setSubFiles([]);
        return;
      }

      const githubMatch = mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
      if (!githubMatch) return;

      const [, mirrorOwner, mirrorRepo] = githubMatch;
      const repoName = mirrorRepo.replace(/\.git$/, "");

      setIsLoadingSub(true);
      try {
        const response = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/contents/${currentPath}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const items: FileItem[] = data.map(
              (item: { name: string; path: string; type: string; size?: number }) => ({
                name: item.name,
                path: item.path,
                type: item.type as "file" | "folder",
                size: item.size,
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
    }

    fetchSubContents();
  }, [mirrorFrom, currentPath]);

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

  const displayFiles = currentPath && mirrorFrom ? subFiles : files || [];

  const sortedFiles = React.useMemo(() => {
    return [...displayFiles].sort((a, b) => {
      if (a.type === "folder" && b.type !== "folder") return -1;
      if (a.type !== "folder" && b.type === "folder") return 1;

      const aStartsWithDot = a.name.startsWith(".");
      const bStartsWithDot = b.name.startsWith(".");

      if (aStartsWithDot && !bStartsWithDot) return -1;
      if (!aStartsWithDot && bStartsWithDot) return 1;

      return a.name.localeCompare(b.name);
    });
  }, [displayFiles]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          disabled={pathParts.length === 0}
          onClick={() => handleBreadcrumbClick(pathParts.length - 2)}
        >
          <ChevronLeft className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="font-mono text-sm">
          {branch}
        </Button>
        <div className="flex-1" />
        <Link
          href={`/${owner}/${repo}/commits/${branch}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <ChevronRight className="w-4 h-4 -ml-3 mr-1" />
            Commits
          </Button>
        </Link>
      </div>

      <div className="p-3 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => handleBreadcrumbClick(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            {repo}
          </button>
          {pathParts.map((part, index) => {
            const path = pathParts.slice(0, index + 1).join("/");
            const isLast = index === pathParts.length - 1;
            return (
              <React.Fragment key={path}>
                <span className="text-muted-foreground">/</span>
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className={cn(
                    "hover:text-foreground",
                    isLast ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {part}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

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
                  <td className="py-2.5 px-3 text-right text-sm text-muted-foreground">
                    {file.type === "file" && file.modifiedAt && formatDate(file.modifiedAt)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-sm text-muted-foreground">
                    {file.type === "file" && file.size && formatSize(file.size)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
