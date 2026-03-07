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
}

export function RepositoryCode({ owner, repo, branch = "main" }: RepositoryCodeProps) {
  const [currentPath] = React.useState("");
  const [files] = React.useState<FileItem[]>([
    { name: ".github", path: ".github", type: "folder" },
    { name: "assets", path: "assets", type: "folder" },
    { name: "cmd", path: "cmd", type: "folder" },
    { name: "contrib", path: "contrib", type: "folder" },
    { name: "docs", path: "docs", type: "folder" },
    { name: "infrastructure", path: "infrastructure", type: "folder" },
    { name: "modules", path: "modules", type: "folder" },
    { name: "options", path: "options", type: "folder" },
    { name: "routers", path: "routers", type: "folder" },
    { name: "services", path: "services", type: "folder" },
    { name: "tests", path: "tests", type: "folder" },
    { name: "tools", path: "tools", type: "folder" },
    { name: ".gitignore", path: ".gitignore", type: "file", size: 595 },
    { name: "Dockerfile", path: "Dockerfile", type: "file", size: 1633 },
    { name: "go.mod", path: "go.mod", type: "file", size: 14506 },
    { name: "go.sum", path: "go.sum", type: "file", size: 103701 },
    { name: "LICENSE", path: "LICENSE", type: "file", size: 1079 },
    { name: "main.go", path: "main.go", type: "file", size: 1079 },
    { name: "README.md", path: "README.md", type: "file", size: 21699 },
  ]);
  const { getIcon } = useFileIcon();

  const pathParts = currentPath.split("/").filter(Boolean);

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

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
        <Button variant="ghost" size="sm" className="gap-1" disabled={pathParts.length === 0}>
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
          {pathParts.length > 0 && (
            <>
              <Link
                href={`/${owner}/${repo}/tree/${branch}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {repo}
              </Link>
              {pathParts.map((part, index) => {
                const path = pathParts.slice(0, index + 1).join("/");
                return (
                  <React.Fragment key={path}>
                    <span className="text-muted-foreground">/</span>
                    <Link
                      href={`/${owner}/${repo}/tree/${branch}/${path}`}
                      className={cn(
                        "hover:text-foreground",
                        index === pathParts.length - 1
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {part}
                    </Link>
                  </React.Fragment>
                );
              })}
            </>
          )}
          {pathParts.length === 0 && (
            <Link href={`/${owner}/${repo}/tree/${branch}`} className="text-foreground font-medium">
              {repo}
            </Link>
          )}
        </div>
      </div>

      <table className="w-full">
        <tbody>
          {files.map((file) => {
            const { iconName, color } = getIcon(file);
            return (
              <tr key={file.path} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <FileIcon iconName={iconName} className={cn("w-4 h-4", color)} />
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
          })}
        </tbody>
      </table>
    </div>
  );
}
