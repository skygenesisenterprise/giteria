"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, FolderGit2, Grid3X3, Package, Star } from "lucide-react";

interface HeaderUserProps {
  username: string;
  repoCount?: number;
  starCount?: number;
}

const tabs = [
  { id: "overview", label: "Overview", href: "", icon: BookOpen },
  { id: "repositories", label: "Repositories", href: "?tab=repositories", icon: FolderGit2 },
  { id: "projects", label: "Projects", href: "?tab=projects", icon: Grid3X3 },
  { id: "packages", label: "Packages", href: "?tab=packages", icon: Package },
  { id: "stars", label: "Stars", href: "?tab=stars", icon: Star },
];

export function HeaderUser({ username, repoCount = 0, starCount = 0 }: HeaderUserProps) {
  const pathname = usePathname();
  const searchParams =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const activeTab = searchParams?.get("tab") || "overview";

  return (
    <div className="sticky top-[64px] z-40 border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="flex gap-1 overflow-x-auto px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const href = `/${username}${tab.href}`;

          let count = null;
          if (tab.id === "repositories") count = repoCount;
          if (tab.id === "stars") count = starCount;

          return (
            <Link
              key={tab.id}
              href={href}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${
                  isActive
                    ? "border-[#fd8c73] text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }
              `}
              style={isActive ? { borderColor: "#fd8c73" } : undefined}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {count !== null && (
                <span
                  className={`text-xs ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
