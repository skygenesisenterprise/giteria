"use client";

import * as React from "react";
import { use, useEffect, useState, useCallback } from "react";
import { Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface StarsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface Stargazer {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export default function StarsPage({ params }: StarsPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [stargazers, setStargazers] = useState<Stargazer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  const loadGithubStargazers = useCallback(async () => {
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

      const [stargazersRes, repoRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}/stargazers?per_page=30`, {
          headers,
        }),
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}`, { headers }),
      ]);

      if (repoRes.ok) {
        const repoData = await repoRes.json();
        setTotalCount(repoData.stargazers_count || 0);
      }

      if (!stargazersRes.ok) return;

      const stargazersData = await stargazersRes.json();
      const stargazerList: Stargazer[] = stargazersData.map(
        (user: { id: number; login: string; avatar_url: string; html_url: string }) => ({
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
        })
      );
      setStargazers(stargazerList);
    } catch (error) {
      console.error("Failed to load GitHub stargazers:", error);
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
      loadGithubStargazers();
    }
  }, [repo, loadGithubStargazers]);

  useEffect(() => {
    if (!repo?.mirrorFrom) return;

    const interval = setInterval(
      () => {
        loadGithubStargazers();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [repo?.mirrorFrom, loadGithubStargazers]);

  const filteredStargazers = stargazers.filter((user) =>
    user.login.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl font-semibold">Stars</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {totalCount} star{totalCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-75">
            <Input
              placeholder="Filter stargazers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredStargazers.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <Star className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No stargazers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredStargazers.map((user) => (
              <a
                key={user.id}
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <span className="text-sm font-medium truncate w-full text-center">
                  {user.login}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
