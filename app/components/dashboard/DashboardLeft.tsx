"use client";

import * as React from "react";
import Link from "next/link";
import { FolderGit2, Star, GitPullRequest, Clock, ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const topRepositories = [
  {
    name: "giteria/frontend",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 124,
    prs: 5,
    href: "/giteria/frontend",
  },
  {
    name: "giteria/api",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 89,
    prs: 2,
    href: "/giteria/api",
  },
  {
    name: "giteria/docs",
    language: "MDX",
    languageColor: "#083fa1",
    stars: 45,
    prs: 0,
    href: "/giteria/docs",
  },
  {
    name: "giteria/mobile",
    language: "Swift",
    languageColor: "#F05138",
    stars: 32,
    prs: 1,
    href: "/giteria/mobile",
  },
];

const recentActivity = [
  { name: "giteria/frontend", time: "2h ago", href: "/giteria/frontend" },
  { name: "giteria/api", time: "5h ago", href: "/giteria/api" },
  { name: "giteria/docs", time: "1d ago", href: "/giteria/docs" },
];

export function DashboardLeft() {
  return (
    <aside className="space-y-6">
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Top Repositories
          </h2>
        </div>
        <nav className="space-y-1">
          {topRepositories.map((repo) => (
            <Link
              key={repo.name}
              href={repo.href}
              className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-secondary/50 transition-colors group"
            >
              <FolderGit2 className="w-4 h-4 text-muted-foreground" />
              <span className="flex-1 text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {repo.name.split("/")[1]}
              </span>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: repo.languageColor }}
              />
            </Link>
          ))}
        </nav>
      </section>

      <section>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Recent
        </h2>
        <nav className="space-y-1">
          {recentActivity.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-secondary/50 transition-colors group"
            >
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="flex-1 text-sm text-muted-foreground truncate group-hover:text-foreground transition-colors">
                {item.name.split("/")[1]}
              </span>
              <span className="text-xs text-muted-foreground/60">{item.time}</span>
            </Link>
          ))}
        </nav>
      </section>

      <section>
        <Link
          href="/repositories/new"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-md border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-secondary/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          New repository
        </Link>
      </section>
    </aside>
  );
}
