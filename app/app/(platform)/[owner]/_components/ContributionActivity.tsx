"use client";

import * as React from "react";
import Link from "next/link";
import { GitCommit, GitPullRequest, CircleDot } from "lucide-react";

interface Activity {
  repo: string;
  commits: number;
  additions?: number;
  deletions?: number;
}

interface ContributionActivityProps {
  username: string;
  month?: string;
}

const DEMO_ACTIVITY: Activity[] = [
  { repo: "skygenesisenterprise/aether-identity", commits: 6, additions: 234, deletions: 12 },
  { repo: "skygenesisenterprise/giteria", commits: 4, additions: 156, deletions: 8 },
  { repo: "skygenesisenterprise/aether-vault", commits: 2, additions: 89, deletions: 3 },
  { repo: "skygenesisenterprise/aether-shield", commits: 1, additions: 45, deletions: 2 },
  { repo: "skygenesisenterprise/nebula-ui", commits: 1, additions: 23, deletions: 1 },
];

export function ContributionActivity({
  username,
  month = "March 2026",
}: ContributionActivityProps) {
  const activities = DEMO_ACTIVITY;

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-base font-semibold text-foreground mb-4">Contribution activity</h2>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="mt-1">
              <GitCommit className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/${activity.repo}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {activity.repo}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {activity.commits} commit{activity.commits > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span className="text-green-500">+{activity.additions}</span>
                <span className="text-destructive">-{activity.deletions}</span>
                <span>·</span>
                <span>{month}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <Link
            href={`/${username}?tab=activity`}
            className="text-sm text-[#2f81f7] hover:underline"
          >
            View more activity
          </Link>
        </div>
      </div>
    </div>
  );
}
