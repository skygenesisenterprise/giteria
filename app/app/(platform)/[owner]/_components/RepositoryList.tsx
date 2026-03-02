"use client";

import * as React from "react";
import { SlidersHorizontal, LayoutGrid, List, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RepositoryCard } from "./RepositoryCard";
import type { Repository } from "./types";

interface RepositoryListProps {
  username: string;
}

type RepoFilter = "all" | "sources" | "forks" | "archived" | "mirrors";
type SortOption = "updated" | "name" | "stars";

const DEMO_REPOS: Repository[] = [
  {
    id: "1",
    name: "giteria",
    fullName: "liamvonastoria/giteria",
    description: "Self-hosted Git platform for enterprise teams",
    language: "TypeScript",
    stars: 1247,
    forks: 234,
    isPrivate: false,
    isFork: false,
    isArchived: false,
    isMirror: false,
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
    url: "/liamvonastoria/giteria",
  },
  {
    id: "2",
    name: "sky-portal",
    fullName: "liamvonastoria/sky-portal",
    description: "Enterprise portal with advanced security features",
    language: "Go",
    stars: 892,
    forks: 156,
    isPrivate: false,
    isFork: false,
    isArchived: false,
    isMirror: false,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24,
    url: "/liamvonastoria/sky-portal",
  },
  {
    id: "3",
    name: "astoria-cli",
    fullName: "liamvonastoria/astoria-cli",
    description: "Command line interface for Astoria services",
    language: "Rust",
    stars: 567,
    forks: 89,
    isPrivate: false,
    isFork: false,
    isArchived: false,
    isMirror: false,
    updatedAt: Date.now() - 1000 * 60 * 60 * 48,
    url: "/liamvonastoria/astoria-cli",
  },
  {
    id: "4",
    name: "nebula-ui",
    fullName: "liamvonastoria/nebula-ui",
    description: "Modern UI component library",
    language: "Vue",
    stars: 342,
    forks: 67,
    isPrivate: false,
    isFork: true,
    isArchived: false,
    isMirror: false,
    updatedAt: Date.now() - 1000 * 60 * 60 * 72,
    url: "/liamvonastoria/nebula-ui",
  },
  {
    id: "5",
    name: "chronos",
    fullName: "liamvonastoria/chronos",
    description: "Distributed timing service for microservices",
    language: "Go",
    stars: 234,
    forks: 45,
    isPrivate: false,
    isFork: false,
    isArchived: true,
    isMirror: false,
    updatedAt: Date.now() - 1000 * 60 * 60 * 168,
    url: "/liamvonastoria/chronos",
  },
  {
    id: "6",
    name: "quantum-db",
    fullName: "liamvonastoria/quantum-db",
    description: "High-performance database abstraction layer",
    language: "Java",
    stars: 189,
    forks: 34,
    isPrivate: true,
    isFork: false,
    isArchived: false,
    isMirror: false,
    updatedAt: Date.now() - 1000 * 60 * 60 * 240,
    url: "/liamvonastoria/quantum-db",
  },
];

export function RepositoryList({ username }: RepositoryListProps) {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<RepoFilter>("all");
  const [sort, setSort] = React.useState<SortOption>("updated");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");

  const filters: { id: RepoFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "sources", label: "Sources" },
    { id: "forks", label: "Forks" },
    { id: "archived", label: "Archived" },
    { id: "mirrors", label: "Mirrors" },
  ];

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: "updated", label: "Last updated" },
    { id: "name", label: "Name" },
    { id: "stars", label: "Stars" },
  ];

  const filteredRepos = React.useMemo(() => {
    let repos = [...DEMO_REPOS];

    if (search) {
      const searchLower = search.toLowerCase();
      repos = repos.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchLower) ||
          repo.description.toLowerCase().includes(searchLower)
      );
    }

    switch (filter) {
      case "sources":
        repos = repos.filter((repo) => !repo.isFork && !repo.isMirror);
        break;
      case "forks":
        repos = repos.filter((repo) => repo.isFork);
        break;
      case "archived":
        repos = repos.filter((repo) => repo.isArchived);
        break;
      case "mirrors":
        repos = repos.filter((repo) => repo.isMirror);
        break;
    }

    switch (sort) {
      case "name":
        repos.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "stars":
        repos.sort((a, b) => b.stars - a.stars);
        break;
      case "updated":
      default:
        repos.sort((a, b) => b.updatedAt - a.updatedAt);
        break;
    }

    return repos;
  }, [search, filter, sort]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 flex-1">
          <div className="flex rounded-md overflow-hidden">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-transparent bg-muted/30 text-foreground hover:bg-muted/50 rounded-md"
          >
            <SlidersHorizontal className="w-4 h-4 mr-1" />
            Filters
          </Button>

          <div className="flex rounded-md overflow-hidden ml-auto">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${
                viewMode === "list"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${
                viewMode === "grid"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredRepos.length} repository{filteredRepos.length !== 1 ? "s" : ""}
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="px-3 py-1.5 text-sm rounded-md bg-muted/30 border-transparent text-foreground focus:bg-muted/50"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No repositories found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2" : "space-y-3"}>
          {filteredRepos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} showOwner />
          ))}
        </div>
      )}
    </div>
  );
}
