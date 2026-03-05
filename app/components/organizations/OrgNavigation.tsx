"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, FolderGit2, Grid3X3, Package, Users, Settings } from "lucide-react";

interface NavTab {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const navTabs: NavTab[] = [
  { id: "overview", label: "Overview", href: "", icon: Home },
  { id: "repositories", label: "Repositories", href: "/repos", icon: FolderGit2 },
  { id: "projects", label: "Projects", href: "/projects", icon: Grid3X3 },
  { id: "packages", label: "Packages", href: "/package", icon: Package },
  { id: "members", label: "Members", href: "/people", icon: Users },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
];

interface OrgNavigationProps {
  slug: string;
}

export function OrgNavigation({ slug }: OrgNavigationProps) {
  const pathname = usePathname();

  const activeTabId = React.useMemo(() => {
    const basePath = `/${slug}`;
    const currentPath = pathname.slice(basePath.length).split("?")[0];

    if (currentPath === "" || currentPath === "/") {
      return "overview";
    }

    const matchedTab = navTabs.find((tab) => {
      if (tab.id === "overview") return false;
      return currentPath === tab.href || currentPath.startsWith(tab.href + "/");
    });

    return matchedTab?.id || "overview";
  }, [pathname, slug]);

  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {navTabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        const href = `/${slug}${tab.href}`;

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
  );
}
