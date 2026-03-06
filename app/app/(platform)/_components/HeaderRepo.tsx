"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Code,
  CircleDot,
  GitPullRequest,
  Bot,
  MessageSquare,
  CirclePlay,
  FolderKanban,
  BookOpen,
  Shield,
  BarChart3,
  Settings,
  Boxes,
} from "lucide-react";

interface HeaderRepoProps {
  owner: string;
  repo: string;
  activeTab?: string;
  className?: string;
}

const tabs = [
  { id: "code", label: "Code", href: "", icon: Code },
  { id: "issues", label: "Issues", href: "/issues", icon: CircleDot },
  { id: "pulls", label: "Pulls Requests", href: "/pull", icon: GitPullRequest },
  { id: "discussions", label: "Discussions", href: "/discussions", icon: MessageSquare },
  { id: "actions", label: "Actions", href: "/actions", icon: CirclePlay },
  { id: "agents", label: "Agents", href: "/agents", icon: Bot },
  { id: "projects", label: "Projects", href: "/projects", icon: FolderKanban },
  { id: "models", label: "Models", href: "/models", icon: Boxes },
  { id: "wiki", label: "Wiki", href: "/wiki", icon: BookOpen },
  { id: "security", label: "Security", href: "/security", icon: Shield },
  { id: "insights", label: "Insights", href: "/insights", icon: BarChart3 },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
];

export function HeaderRepo({ owner, repo, activeTab, className }: HeaderRepoProps) {
  const pathname = usePathname();

  const basePath = `/${owner}/${repo}`;
  const currentPath = pathname.slice(basePath.length).split("?")[0];

  const activeTabId = React.useMemo(() => {
    if (activeTab) return activeTab;

    const matchedTab = tabs.find((tab) => {
      if (tab.id === "code") return currentPath === "" || currentPath === "/";
      return currentPath === tab.href || currentPath.startsWith(tab.href + "/");
    });

    return matchedTab?.id || "code";
  }, [currentPath, activeTab]);

  return (
    <div
      className={cn("-mt-2.5 bg-background/95 backdrop-blur-sm border-b border-border", className)}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-450 mx-auto gap-6">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            const href = `${basePath}${tab.href}`;

            return (
              <Link
                key={tab.id}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                  isActive
                    ? "border-[#fd8c73] text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
                style={isActive ? { borderColor: "#fd8c73" } : undefined}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HeaderRepo;
