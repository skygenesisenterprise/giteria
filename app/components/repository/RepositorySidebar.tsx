"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, GitFork, Star, Eye, CircleDot, GitPullRequest, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Repository } from "@/lib/repo/RepositoryData";

interface RepositorySidebarProps {
  repo: Repository;
}

export function RepositorySidebar({ repo }: RepositorySidebarProps) {
  const [isStarred, setIsStarred] = React.useState(false);
  const [stars, setStars] = React.useState(repo.stars);
  const [forks, setForks] = React.useState(repo.forks);
  const [watchers, setWatchers] = React.useState(repo.watchers);

  const languages = [
    { name: "Go", color: "#00ADD8", percentage: 85 },
    { name: "TypeScript", color: "#3178c6", percentage: 12 },
    { name: "Shell", color: "#89e051", percentage: 2 },
    { name: "Other", color: "#ededed", percentage: 1 },
  ];

  const handleStar = () => {
    setIsStarred(!isStarred);
    setStars(isStarred ? stars - 1 : stars + 1);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="font-semibold text-sm mb-3">About</h3>
        {repo.description ? (
          <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
        ) : (
          <p className="text-sm text-muted-italic mb-3">
            No description, website, or topics provided.
          </p>
        )}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ExternalLink className="w-4 h-4" />
            <a href="#" className="hover:text-foreground hover:underline">
              docs.giteria.io
            </a>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>{watchers} watchers</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GitFork className="w-4 h-4" />
            <span>{forks} forks</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <Badge variant="outline" className="gap-1">
            <GitFork className="w-3 h-3" />
            MIT License
          </Badge>
        </div>
      </div>

      <div className="border-b border-border pb-4">
        <h3 className="font-semibold text-sm mb-3">Releases</h3>
        <div className="flex items-center gap-2 text-sm">
          <Tags className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">No releases published</span>
        </div>
        <Button variant="ghost" size="sm" className="mt-2 px-0">
          Create a new release
        </Button>
      </div>

      <div className="border-b border-border pb-4">
        <h3 className="font-semibold text-sm mb-3">Packages</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">No packages published</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Languages</h3>
        <div className="space-y-2">
          {languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-sm flex-1">{lang.name}</span>
              <span className="text-sm text-muted-foreground">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
