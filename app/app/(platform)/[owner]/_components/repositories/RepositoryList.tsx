"use client";

import * as React from "react";
import { RepositoryCard } from "./RepositoryCard";
import type { RepositoryData } from "./data";

interface RepositoryListProps {
  repositories: RepositoryData[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  if (repositories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
