"use client";

import * as React from "react";
import { use, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface CommitsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  authorAvatar?: string;
  date: number;
  additions?: number;
  deletions?: number;
}

export default function CommitsPage({ params }: CommitsPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [branch, setBranch] = useState<string>("");
  const [branches, setBranches] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  const loadBranches = useCallback(async () => {
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

      const response = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/branches`,
        { headers }
      );

      if (response.ok) {
        const data = await response.json();
        const branchNames = data.map((b: { name: string }) => b.name);
        setBranches(branchNames);
        if (branchNames.length > 0 && !branch) {
          setBranch(branchNames[0]);
        }
      }
    } catch (error) {
      console.error("Failed to load branches:", error);
    }
  }, [repo?.mirrorFrom, branch]);

  const loadCommits = useCallback(
    async (pageNum: number = 1, append: boolean = false) => {
      if (!repo?.mirrorFrom) return;

      const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
      if (!githubMatch) return;

      const [, mirrorOwner, mirrorRepo] = githubMatch;
      const repoName = mirrorRepo.replace(/\.git$/, "");

      if (pageNum === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const token = await getGitHubToken();
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const branchParam = branch || undefined;
        const response = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits?per_page=100&page=${pageNum}${branchParam ? `&sha=${branchParam}` : ""}`,
          { headers }
        );

        if (response.ok) {
          const data = await response.json();
          const linkHeader = response.headers.get("Link");
          const hasNextPage = linkHeader?.includes('rel="next"');

          const commitData: Commit[] = data.map(
            (item: {
              sha: string;
              commit: {
                message: string;
                author: { date: string; name: string };
              };
              author: { login: string; avatar_url: string } | null;
            }) => ({
              sha: item.sha,
              message: item.commit.message.split("\n")[0],
              author: item.commit.author.name,
              authorAvatar: item.author?.avatar_url,
              date: new Date(item.commit.author.date).getTime(),
            })
          );

          if (append) {
            setCommits((prev) => [...prev, ...commitData]);
          } else {
            setCommits(commitData);
          }

          setHasMore(hasNextPage ?? false);
          setPage(pageNum);
        }
      } catch (error) {
        console.error("Failed to load commits:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [repo?.mirrorFrom, branch]
  );

  useEffect(() => {
    async function fetchRepo() {
      let repository: Repository | null = null;
      try {
        repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
        setRepo(repository);
      } finally {
        if (!repository?.mirrorFrom) {
          setIsLoading(false);
        }
      }
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  useEffect(() => {
    if (repo?.mirrorFrom) {
      loadBranches();
    }
  }, [repo, repoFullName, loadBranches]);

  useEffect(() => {
    if (repo?.mirrorFrom) {
      setCommits([]);
      setPage(1);
      setHasMore(true);
      loadCommits(1, false);
    }
  }, [repo, repoFullName, branch, loadCommits]);

  useEffect(() => {
    if (!repo?.mirrorFrom) return;

    const interval = setInterval(
      () => {
        loadCommits(1, false);
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [repo?.mirrorFrom, loadCommits]);

  const filteredCommits = commits.filter(
    (commit) =>
      !searchQuery ||
      commit.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      commit.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      commit.sha.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl font-semibold">Commits</h1>
            <p className="text-muted-foreground text-sm mt-1">{commits.length} commits</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-75">
            <Input
              placeholder="Search commits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {branches.length > 0 && (
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
        </div>

        {filteredCommits.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No commits found</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {filteredCommits.map((commit) => (
                <CommitRow key={commit.sha} commit={commit} repoFullName={repoFullName} />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => loadCommits(page + 1, true)}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CommitRow({ commit, repoFullName }: { commit: Commit; repoFullName: string }) {
  const shortSha = commit.sha.slice(0, 7);
  const date = new Date(commit.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="mt-1">
        <svg
          className="w-5 h-5 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={`/${repoFullName}/commit/${commit.sha}`}
            className="font-medium hover:text-blue-600 truncate font-mono text-sm"
          >
            {commit.message}
          </a>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          <span className="font-mono text-xs">{shortSha}</span>
          <span className="mx-2">•</span>
          <span>{commit.author}</span>
          <span className="mx-2">•</span>
          <span>committed on {formattedDate}</span>
        </div>
      </div>
      {commit.authorAvatar && (
        <img
          src={commit.authorAvatar}
          alt={commit.author}
          className="w-8 h-8 rounded-full shrink-0"
        />
      )}
    </div>
  );
}
