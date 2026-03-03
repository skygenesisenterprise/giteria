"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Bell, Server, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChangelogItem {
  id: string;
  version: string;
  title: string;
  date: string;
  type: "feature" | "fix" | "update";
}

const changelogItems: ChangelogItem[] = [
  {
    id: "1",
    version: "v2.5.0",
    title: "New dashboard redesign",
    date: "2 days ago",
    type: "feature",
  },
  {
    id: "2",
    version: "v2.4.2",
    title: "Security patches applied",
    date: "1 week ago",
    type: "fix",
  },
  {
    id: "3",
    version: "v2.4.1",
    title: "Performance improvements",
    date: "2 weeks ago",
    type: "update",
  },
];

const systemStatus = [
  { label: "API", status: "operational", color: "bg-green-500" },
  { label: "Git Daemon", status: "operational", color: "bg-green-500" },
  { label: "Database", status: "operational", color: "bg-green-500" },
  { label: "CI Workers", status: "degraded", color: "bg-yellow-500" },
];

const productUpdates = [
  {
    id: "1",
    title: "Try the new AI code review",
    description: "Get automated suggestions for your PRs",
    href: "/features/copilot",
  },
  {
    id: "2",
    title: "Self-hosted pricing updated",
    description: "New plans for larger teams",
    href: "/pricing",
  },
];

function TypeBadge({ type }: { type: ChangelogItem["type"] }) {
  const styles = {
    feature: "bg-primary/10 text-primary",
    fix: "bg-green-500/10 text-green-500",
    update: "bg-muted text-muted-foreground",
  };

  const labels = {
    feature: "New",
    fix: "Fix",
    update: "Update",
  };

  return (
    <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", styles[type])}>
      {labels[type]}
    </span>
  );
}

export function DashboardRight() {
  return (
    <aside className="space-y-6">
      <section>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Latest from Changelog
          </h2>
        </div>
        <div className="space-y-2">
          {changelogItems.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-primary">{item.version}</span>
                <TypeBadge type={item.type} />
              </div>
              <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
            </div>
          ))}
        </div>
        <Link
          href="/changelog"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors"
        >
          View all changelog
          <ChevronRight className="w-3 h-3" />
        </Link>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Product Updates
          </h2>
        </div>
        <div className="space-y-2">
          {productUpdates.map((update) => (
            <Link
              key={update.id}
              href={update.href}
              className="block p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
            >
              <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                {update.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{update.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Server className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            System Status
          </h2>
        </div>
        <div className="space-y-2">
          {systemStatus.map((item) => (
            <div key={item.label} className="flex items-center justify-between py-1.5">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", item.color)} />
                <span className="text-xs text-muted-foreground capitalize">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
