"use client";

import * as React from "react";
import Link from "next/link";
import { Star, GitFork, Eye, Lock, Globe } from "lucide-react";

interface OrgRepository {
  id: string;
  name: string;
  slug: string;
  description?: string;
  visibility: "public" | "private";
  language?: string;
  stars: number;
  forks: number;
  updatedAt: Date;
}

interface OrgRepositoriesListProps {
  repositories: OrgRepository[];
  orgSlug: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Markdown: "#083fa1",
  HTML: "#e34c26",
  CSS: "#563d7c",
  HCL: "#5c4ee5",
};

function LanguageBadge({ language }: { language?: string }) {
  if (!language) return null;

  const color = languageColors[language] || "#6e7681";

  return (
    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      {language}
    </span>
  );
}

function VisibilityBadge({ visibility }: { visibility: OrgRepository["visibility"] }) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      {visibility === "private" ? (
        <>
          <Lock className="w-3 h-3" />
          Private
        </>
      ) : (
        <>
          <Globe className="w-3 h-3" />
          Public
        </>
      )}
    </span>
  );
}

export function OrgRepositoriesList({ repositories, orgSlug }: OrgRepositoriesListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredRepos = React.useMemo(() => {
    if (!searchQuery) return repositories;
    const query = searchQuery.toLowerCase();
    return repositories.filter(
      (repo) =>
        repo.name.toLowerCase().includes(query) || repo.description?.toLowerCase().includes(query)
    );
  }, [repositories, searchQuery]);

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No repositories yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Find a repository..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="space-y-3">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className="rounded-md border border-border p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <Link
                  href={`/${orgSlug}/${repo.slug}`}
                  className="text-lg font-semibold text-[#2f81f7] hover:underline"
                >
                  {repo.name}
                </Link>
                {repo.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {repo.description}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <LanguageBadge language={repo.language} />
                  <VisibilityBadge visibility={repo.visibility} />
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  {repo.forks}
                </span>
              </div>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Updated{" "}
              {repo.updatedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
