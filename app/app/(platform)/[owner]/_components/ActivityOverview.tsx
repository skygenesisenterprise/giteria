"use client";

import * as React from "react";
import Link from "next/link";
import { GitPullRequest, CircleDot, GitCommit, MessageSquare } from "lucide-react";

interface ActivityOverviewProps {
  username: string;
}

const DEMO_ACTIVITY = {
  totalContributions: 846,
  repos: [
    "skygenesisenterprise/aether-identity",
    "skygenesisenterprise/giteria",
    "skygenesisenterprise/aether-vault",
    "skygenesisenterprise/aether-shield",
  ],
  extraRepos: 40,
  breakdown: {
    commits: 98,
    prs: 1,
    issues: 1,
    reviews: 0,
  },
};

export function ActivityOverview({ username }: ActivityOverviewProps) {
  const activity = DEMO_ACTIVITY;
  const total =
    activity.breakdown.commits +
    activity.breakdown.prs +
    activity.breakdown.issues +
    activity.breakdown.reviews;

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-base font-semibold text-foreground mb-3">Activity overview</h2>

      <p className="text-sm text-muted-foreground mb-4">
        Contributed to{" "}
        {activity.repos.slice(0, 3).map((repo, index) => (
          <React.Fragment key={repo}>
            <Link href={`/${repo}`} className="text-[#2f81f7] hover:underline">
              {repo}
            </Link>
            {index < 2 && ", "}
          </React.Fragment>
        ))}
        {activity.extraRepos > 0 && <span> and {activity.extraRepos} other repositories</span>}
      </p>

      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
          <GitCommit className="w-5 h-5 text-primary mb-1" />
          <span className="text-lg font-semibold text-foreground">
            {activity.breakdown.commits}%
          </span>
          <span className="text-xs text-muted-foreground">Commits</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
          <GitPullRequest className="w-5 h-5 text-[#a371f7] mb-1" />
          <span className="text-lg font-semibold text-foreground">{activity.breakdown.prs}%</span>
          <span className="text-xs text-muted-foreground">Pull requests</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
          <CircleDot className="w-5 h-5 text-[#f0883e] mb-1" />
          <span className="text-lg font-semibold text-foreground">
            {activity.breakdown.issues}%
          </span>
          <span className="text-xs text-muted-foreground">Issues</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
          <MessageSquare className="w-5 h-5 text-[#1f6feb] mb-1" />
          <span className="text-lg font-semibold text-foreground">
            {activity.breakdown.reviews}%
          </span>
          <span className="text-xs text-muted-foreground">Reviews</span>
        </div>
      </div>
    </div>
  );
}
