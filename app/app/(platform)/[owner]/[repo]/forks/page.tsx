"use client";

import * as React from "react";
import { use, useEffect, useState, useCallback } from "react";
import { GitFork } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface ForksPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface Fork {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export default function ForksPage({ params }: ForksPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [forks, setForks] = useState<Fork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  const loadGithubForks = useCallback(async () => {
    if (!repo?.mirrorFrom) return;

    const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) return;

    const [, mirrorOwner, mirrorRepo] = githubMatch;
    const repoName = mirrorRepo.replace(/\.git$/, "");

    try {
      const token = await getGitHubToken();
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const [forksRes, repoRes] = await Promise.all([
        fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/forks?per_page=30&sort=newest`,
          {
            headers,
          }
        ),
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}`, { headers }),
      ]);

      if (repoRes.ok) {
        const repoData = await repoRes.json();
        setTotalCount(repoData.forks_count || 0);
      }

      if (!forksRes.ok) return;

      const forksData = await forksRes.json();
      const forkList: Fork[] = forksData.map(
        (fork: {
          id: number;
          name: string;
          full_name: string;
          owner: { login: string; avatar_url: string };
          html_url: string;
          description: string | null;
          stargazers_count: number;
          forks_count: number;
          updated_at: string;
        }) => ({
          id: fork.id,
          name: fork.name,
          full_name: fork.full_name,
          owner: fork.owner,
          html_url: fork.html_url,
          description: fork.description || "",
          stargazers_count: fork.stargazers_count,
          forks_count: fork.forks_count,
          updated_at: fork.updated_at,
        })
      );
      setForks(forkList);
    } catch (error) {
      console.error("Failed to load GitHub forks:", error);
    }
  }, [repo?.mirrorFrom]);

  useEffect(() => {
    async function fetchRepo() {
      try {
        const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
        setRepo(repository);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  useEffect(() => {
    if (repo?.mirrorFrom) {
      loadGithubForks();
    }
  }, [repo, loadGithubForks]);

  useEffect(() => {
    if (!repo?.mirrorFrom) return;

    const interval = setInterval(
      () => {
        loadGithubForks();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [repo?.mirrorFrom, loadGithubForks]);

  const filteredForks = forks.filter(
    (fork) =>
      fork.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (fork.description && fork.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Forks</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {totalCount} fork{totalCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-75">
            <Input
              placeholder="Filter forks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredForks.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <GitFork className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No forks found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredForks.map((fork) => (
              <a
                key={fork.id}
                href={fork.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <img
                  src={fork.owner.avatar_url}
                  alt={fork.owner.login}
                  className="w-10 h-10 rounded-full shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{fork.owner.login}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="font-medium">{fork.name}</span>
                  </div>
                  {fork.description && (
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {fork.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span>★</span>
                      {fork.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {fork.forks_count}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
