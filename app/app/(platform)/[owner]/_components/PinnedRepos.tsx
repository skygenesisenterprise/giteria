"use client";

import * as React from "react";
import Link from "next/link";
import { Star, GitFork } from "lucide-react";
import { getLanguageColor } from "./types";

interface PinnedRepo {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}

interface PinnedReposProps {
  username: string;
}

const DEMO_PINNED_REPOS: PinnedRepo[] = [
  {
    id: "1",
    name: "giteria",
    description: "Self-hosted Git platform for enterprise teams with CI/CD, packages, and more",
    language: "TypeScript",
    stars: 1247,
    forks: 234,
    url: "/liamvonastoria/giteria",
  },
  {
    id: "2",
    name: "sky-portal",
    description: "Enterprise portal with advanced security features and RBAC",
    language: "Go",
    stars: 892,
    forks: 156,
    url: "/liamvonastoria/sky-portal",
  },
  {
    id: "3",
    name: "aether-identity",
    description: "Secure identity and authentication microservice",
    language: "Rust",
    stars: 567,
    forks: 89,
    url: "/liamvonastoria/aether-identity",
  },
  {
    id: "4",
    name: "nebula-ui",
    description: "Modern UI component library for enterprise applications",
    language: "Vue",
    stars: 342,
    forks: 67,
    url: "/liamvonastoria/nebula-ui",
  },
];

export function PinnedRepos({ username }: PinnedReposProps) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground mb-3">Pinned</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {DEMO_PINNED_REPOS.map((repo) => {
          const languageColor = getLanguageColor(repo.language);
          return (
            <Link
              key={repo.id}
              href={repo.url}
              className="p-4 rounded-lg hover:bg-muted/20 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground group-hover:text-primary">
                  {repo.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{repo.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  <span>{repo.stars.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  <span>{repo.forks.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
