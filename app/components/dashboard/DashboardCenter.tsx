"use client";

import * as React from "react";
import Link from "next/link";
import {
  GitPullRequest,
  AlertCircle,
  AtSign,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "pr" | "ci" | "mention" | "push";
  title: string;
  repo: string;
  time: string;
  status?: "pending" | "success" | "failed" | "review";
  priority?: "high" | "normal" | "low";
}

const copilotSuggestions = [
  {
    id: "1",
    type: "review",
    title: "PR #245 needs review",
    description: "High complexity in auth module",
    action: "Review",
    priority: "high",
  },
  {
    id: "2",
    type: "suggestion",
    title: "Archive old repository",
    description: "giteria/old-experiments inactive for 6 months",
    action: "Archive",
    priority: "low",
  },
];

const assignedPRs: ActivityItem[] = [
  {
    id: "pr1",
    type: "pr",
    title: "feat: Add dark mode support",
    repo: "giteria/frontend",
    time: "2h ago",
    status: "review",
    priority: "high",
  },
  {
    id: "pr2",
    type: "pr",
    title: "fix: Auth token refresh",
    repo: "giteria/api",
    time: "4h ago",
    status: "pending",
    priority: "normal",
  },
];

const ciFailures: ActivityItem[] = [
  {
    id: "ci1",
    type: "ci",
    title: "Build failed: main branch",
    repo: "giteria/frontend",
    time: "30m ago",
    status: "failed",
    priority: "high",
  },
];

const mentions: ActivityItem[] = [
  {
    id: "m1",
    type: "mention",
    title: "David Lee mentioned you in giteria/docs",
    repo: "giteria/docs",
    time: "2h ago",
    priority: "normal",
  },
];

const recentActivity: ActivityItem[] = [
  {
    id: "a1",
    type: "push",
    title: "Sarah Chen pushed 3 commits to feature/auth-flow",
    repo: "giteria/frontend",
    time: "10m ago",
    priority: "low",
  },
  {
    id: "a2",
    type: "push",
    title: "Mike Johnson opened PR add-graphql-subscriptions",
    repo: "giteria/api",
    time: "25m ago",
    priority: "normal",
  },
];

function PriorityBadge({ priority }: { priority?: string }) {
  if (!priority || priority === "low") return null;

  const colors = {
    high: "bg-destructive/10 text-destructive",
    normal: "bg-secondary text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "text-[10px] px-1.5 py-0.5 rounded font-medium",
        colors[priority as keyof typeof colors] || colors.normal
      )}
    >
      {priority === "high" ? "Priority" : priority}
    </span>
  );
}

function StatusIcon({ status }: { status?: string }) {
  switch (status) {
    case "review":
      return <GitPullRequest className="w-4 h-4 text-[#d29922]" />;
    case "success":
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case "failed":
      return <XCircle className="w-4 h-4 text-destructive" />;
    case "pending":
      return <Clock className="w-4 h-4 text-muted-foreground" />;
    default:
      return <Activity className="w-4 h-4 text-muted-foreground" />;
  }
}

function ActivitySection({
  title,
  icon: Icon,
  items,
  iconColor = "text-primary",
}: {
  title: string;
  icon: React.ElementType;
  items: ActivityItem[];
  iconColor?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn("w-4 h-4", iconColor)} />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground">({items.length})</span>
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${item.repo}/pulls`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors group"
          >
            <StatusIcon status={item.status} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground">{item.repo}</p>
            </div>
            <div className="flex items-center gap-2">
              <PriorityBadge priority={item.priority} />
              <span className="text-xs text-muted-foreground">{item.time}</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DashboardCenter() {
  const [copilotExpanded, setCopilotExpanded] = React.useState(true);

  return (
    <main className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Home</h1>
        <p className="text-sm text-muted-foreground mt-1">What needs your attention right now</p>
      </div>

      <section className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-4 border border-primary/20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Giteria Assist</h3>
              <p className="text-xs text-muted-foreground">AI-powered suggestions</p>
            </div>
          </div>
          <button
            onClick={() => setCopilotExpanded(!copilotExpanded)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copilotExpanded ? "Collapse" : "Expand"}
          </button>
        </div>

        {copilotExpanded && (
          <div className="mt-4 space-y-2">
            {copilotSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50"
              >
                <Zap className="w-4 h-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{suggestion.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{suggestion.description}</p>
                </div>
                <button className="text-xs text-primary hover:underline shrink-0">
                  {suggestion.action}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <ActivitySection
          title="Pull Requests"
          icon={GitPullRequest}
          iconColor="text-[#d29922]"
          items={assignedPRs}
        />
        <ActivitySection
          title="CI Failures"
          icon={AlertCircle}
          iconColor="text-destructive"
          items={ciFailures}
        />
        <ActivitySection
          title="Mentions"
          icon={AtSign}
          iconColor="text-[#a371f7]"
          items={mentions}
        />
        <ActivitySection
          title="Recent Activity"
          icon={Activity}
          iconColor="text-muted-foreground"
          items={recentActivity}
        />
      </section>
    </main>
  );
}
