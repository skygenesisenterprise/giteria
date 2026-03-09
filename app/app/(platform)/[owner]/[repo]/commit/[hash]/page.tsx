"use client";

import * as React from "react";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";
import { Button } from "@/components/ui/button";
import { CommitHeader, CommitStats, CommitFileList } from "@/components/repository/commit";

interface CommitPageProps {
  params: Promise<{ owner: string; repo: string; hash: string }>;
}

interface CommitDetail {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  committer?: {
    name: string;
    email: string;
    date: string;
  };
  html_url?: string;
  parents: { sha: string; html_url: string }[];
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
}

interface FileChange {
  sha: string;
  filename: string;
  status: "added" | "removed" | "modified" | "renamed" | "copied";
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  raw_url?: string;
  contents_url?: string;
  previous_filename?: string;
}

export default function CommitPage({ params }: CommitPageProps) {
  const resolvedParams = use(params);
  const [commit, setCommit] = useState<CommitDetail | null>(null);
  const [files, setFiles] = useState<FileChange[]>([]);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
        setRepo(repository);

        if (!repository?.mirrorFrom) {
          setError("This feature is only available for mirrored repositories");
          setIsLoading(false);
          return;
        }

        const githubMatch = repository.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
        if (!githubMatch) {
          setError("Invalid mirror URL");
          setIsLoading(false);
          return;
        }

        const [, mirrorOwner, mirrorRepo] = githubMatch;
        const repoName = mirrorRepo.replace(/\.git$/, "");

        const token = await getGitHubToken();
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const commitResponse = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits/${resolvedParams.hash}`,
          { headers }
        );

        if (!commitResponse.ok) {
          setError("Commit not found");
          setIsLoading(false);
          return;
        }

        const commitData = await commitResponse.json();

        const parents =
          commitData.parents?.map((p: { sha: string; html_url: string }) => ({
            sha: p.sha,
            html_url: p.html_url,
          })) || [];

        setCommit({
          sha: commitData.sha,
          message: commitData.commit.message,
          author: {
            name: commitData.commit.author.name,
            email: commitData.commit.author.email,
            date: commitData.commit.author.date,
          },
          committer: commitData.committer
            ? {
                name: commitData.committer.name,
                email: commitData.committer.email,
                date: commitData.committer.date,
              }
            : undefined,
          html_url: commitData.html_url,
          parents,
          stats: commitData.stats,
        });

        const filesResponse = await fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/commits/${resolvedParams.hash}`,
          { headers }
        );

        if (filesResponse.ok) {
          const filesData = await filesResponse.json();
          setFiles(filesData.files || []);
        }
      } catch (err) {
        console.error("Failed to fetch commit:", err);
        setError("Failed to load commit");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [resolvedParams.owner, resolvedParams.repo, resolvedParams.hash]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Link href={`/${resolvedParams.owner}/${resolvedParams.repo}`}>
          <Button variant="link" className="mt-4">
            Back to repository
          </Button>
        </Link>
      </div>
    );
  }

  if (!commit) {
    return null;
  }

  const commitTitle = commit.message.split("\n")[0];
  const commitDescription = commit.message.split("\n").slice(1).join("\n").trim();
  const totalAdditions = files.reduce((sum, f) => sum + f.additions, 0);
  const totalDeletions = files.reduce((sum, f) => sum + f.deletions, 0);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div>
          <Link
            href={`/${resolvedParams.owner}/${resolvedParams.repo}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to repository
          </Link>
        </div>

        <CommitHeader
          title={commitTitle}
          description={commitDescription}
          author={commit.author}
          sha={commit.sha}
          parents={commit.parents}
          owner={resolvedParams.owner}
          repo={resolvedParams.repo}
        />

        <CommitStats
          filesChanged={files.length}
          additions={totalAdditions}
          deletions={totalDeletions}
        />

        <CommitFileList files={files} />
      </div>
    </div>
  );
}
