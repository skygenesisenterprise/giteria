"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Folder } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon } from "@/components/ui/file-icon";
import { useFileIcon } from "@/components/repository/use-file-icon";
import { cn } from "@/lib/utils";
import { getGitHubToken } from "@/lib/github-token";

interface TreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url?: string;
}

interface FlattenedTree {
  [key: string]: TreeItem;
}

interface TreeNode {
  name: string;
  path: string;
  type: "blob" | "tree";
  children: TreeNode[];
  depth: number;
}

interface RepositoryTreeExplorerProps {
  owner: string;
  repo: string;
  branch?: string;
  mirrorFrom?: string;
}

export function RepositoryTreeExplorer({
  owner,
  repo,
  branch = "main",
  mirrorFrom,
}: RepositoryTreeExplorerProps) {
  const [tree, setTree] = React.useState<FlattenedTree>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set([""]));
  const pathname = usePathname();
  const { getIcon } = useFileIcon();

  const currentPath = React.useMemo(() => {
    const match = pathname.match(/tree\/blob\/(.*)/);
    if (match && match[1]) {
      return match[1];
    }
    return "";
  }, [pathname]);

  React.useEffect(() => {
    async function fetchTree() {
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

        const response = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/git/trees/${branch}?recursive=1`,
          { headers }
        );

        if (response.ok) {
          const data = await response.json();
          const flatTree: FlattenedTree = {};
          if (data.tree && Array.isArray(data.tree)) {
            data.tree.forEach((item: TreeItem) => {
              flatTree[item.path] = item;
            });
          }
          setTree(flatTree);

          if (currentPath) {
            const parts = currentPath.split("/");
            const newExpanded = new Set<string>([""]);
            for (let i = 1; i < parts.length; i++) {
              newExpanded.add(parts.slice(0, i).join("/"));
            }
            setExpandedFolders(newExpanded);
          }
        }
      } catch (err) {
        console.error("Failed to fetch tree:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTree();
  }, [mirrorFrom, branch, currentPath]);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const treeNodes = React.useMemo((): TreeNode[] => {
    const nodes: TreeNode[] = [];
    const paths = Object.keys(tree).sort();

    paths.forEach((path) => {
      const item = tree[path];
      const parts = path.split("/");
      const name = parts[parts.length - 1];
      const parentPath = parts.slice(0, -1).join("/");

      if (parts.length === 1) {
        nodes.push({
          name,
          path,
          type: item.type,
          children: [],
          depth: 0,
        });
      } else if (expandedFolders.has(parentPath) || parentPath === "") {
        nodes.push({
          name,
          path,
          type: item.type,
          children: [],
          depth: parts.length - 1,
        });
      }
    });

    return nodes;
  }, [tree, expandedFolders]);

  if (isLoading) {
    return (
      <div className="border border-border rounded-lg bg-card p-4">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground" />
        </div>
      </div>
    );
  }

  if (!mirrorFrom || Object.keys(tree).length === 0) {
    return (
      <div className="border border-border rounded-lg bg-card p-4">
        <p className="text-sm text-muted-foreground">No files available</p>
      </div>
    );
  }

  const renderNode = (node: TreeNode): React.ReactNode => {
    const { iconName, color } = getIcon({
      name: node.name,
      path: node.path,
      type: node.type === "tree" ? "folder" : "file",
    });

    const isActive = node.path === currentPath;
    const isExpanded = expandedFolders.has(node.path);

    return (
      <React.Fragment key={node.path}>
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-0.5 text-sm hover:bg-muted/50 cursor-pointer select-none",
            isActive && "bg-muted"
          )}
          style={{ paddingLeft: `${node.depth * 12 + 8}px` }}
          onClick={() => node.type === "tree" && toggleFolder(node.path)}
        >
          {node.type === "tree" ? (
            <ChevronRight
              className={cn(
                "w-3 h-3 text-muted-foreground shrink-0 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          ) : (
            <span className="w-3" />
          )}
          {node.type === "tree" ? (
            <Folder className="w-4 h-4 text-blue-500 shrink-0" />
          ) : (
            <FileIcon iconName={iconName} className={cn("w-4 h-4 shrink-0", color)} />
          )}
          {node.type === "tree" ? (
            <span className="truncate">{node.name}</span>
          ) : (
            <Link
              href={`/${owner}/${repo}/tree/blob/${node.path}`}
              className="truncate hover:text-blue-500 hover:underline"
            >
              {node.name}
            </Link>
          )}
        </div>
        {node.type === "tree" && isExpanded && (
          <div>
            {treeNodes
              .filter((n) => {
                const parent = n.path.split("/").slice(0, -1).join("/");
                return parent === node.path;
              })
              .map(renderNode)}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden h-full flex flex-col">
      <div className="px-3 py-2 border-b border-border shrink-0">
        <h3 className="font-semibold text-sm">Explorer</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="py-1">{treeNodes.map(renderNode)}</div>
      </ScrollArea>
    </div>
  );
}
