"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Folder, Grid3X3, Package, Star } from "lucide-react";

interface ProfileTabsProps {
  username: string;
  activeTab?: string;
}

const tabs = [
  { id: "overview", label: "Overview", href: "", icon: BookOpen },
  { id: "repositories", label: "Repositories", href: "?tab=repositories", icon: Folder },
  { id: "projects", label: "Projects", href: "?tab=projects", icon: Grid3X3 },
  { id: "packages", label: "Packages", href: "?tab=packages", icon: Package },
  { id: "stars", label: "Stars", href: "?tab=stars", icon: Star },
];

export function ProfileTabs({ username, activeTab }: ProfileTabsProps) {
  const pathname = usePathname();
  const currentPath = pathname.split("?")[0];

  return (
    <div className="border-b border-border mt-6">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id || (!activeTab && tab.id === "overview");
          const href = `/${username}${tab.href}`;

          return (
            <Link
              key={tab.id}
              href={href}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                whitespace-nowrap
                ${
                  isActive
                    ? "border-b-2 border-[#fd8c73] text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }
              `}
              style={isActive ? { borderColor: "#fd8c73" } : undefined}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
