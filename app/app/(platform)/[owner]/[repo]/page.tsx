"use client";

import * as React from "react";
import { use, useEffect, useState } from "react";
import { RepositoryCode } from "@/components/repository/RepositoryCode";
import { RepoDocsCode } from "@/components/repository/RepoDocsCode";
import { RepositorySidebar } from "@/components/repository/RepositorySidebar";
import { RepoActionBar } from "@/components/repository/RepoActionBar";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";
import { RepoInfoBar } from "@/components/repository/RepoInfoBar";

interface RepoPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function RepoPage({ params }: RepoPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const { owner, repo: repoName } = resolvedParams;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <RepoInfoBar owner={owner} repo={repoName} visibility={repo?.visibility} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3 space-y-4">
            <RepoActionBar owner={owner} repo={repoName} branch="main" />
            <RepositoryCode owner={owner} repo={repoName} branch="main" />
            <RepoDocsCode owner={owner} repo={repoName} branch="main" />
          </div>
          <div className="lg:col-span-1">
            {repo ? (
              <RepositorySidebar repo={repo} owner={owner} repoName={repoName} />
            ) : (
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
