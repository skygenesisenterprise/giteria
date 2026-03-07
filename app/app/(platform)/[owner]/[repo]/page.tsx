"use client";

import * as React from "react";
import { use, useEffect, useState } from "react";
import { RepositoryCode } from "@/components/repository/RepositoryCode";
import { RepoDocsCode } from "@/components/repository/RepoDocsCode";
import { RepositorySidebar } from "@/components/repository/RepositorySidebar";
import { RepoActionBar } from "@/components/repository/RepoActionBar";
import { RepoGitBar } from "@/components/repository/RepoGitBar";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";
import { RepoInfoBar } from "@/components/repository/RepoInfoBar";

interface RepoPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  size?: number;
  modifiedAt?: number;
}

export default function RepoPage({ params }: RepoPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  useEffect(() => {
    async function fetchRepo() {
      try {
        const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
        setRepo(repository);

        if (repository?.mirrorFrom) {
          setIsLoadingFiles(true);
          try {
            const mirrorUrl = repository.mirrorFrom;
            let apiUrl = "";

            const githubMatch = mirrorUrl.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
            if (githubMatch) {
              const [, owner, repoName] = githubMatch;
              apiUrl = `https://api.github.com/repos/${owner}/${repoName.replace(/\.git$/, "")}/contents`;
            }

            if (apiUrl) {
              const response = await fetch(apiUrl, {
                headers: {
                  Accept: "application/vnd.github.v3+json",
                },
              });

              if (response.ok) {
                const data = await response.json();
                const fileList: FileItem[] = Array.isArray(data)
                  ? data.map(
                      (item: { name: string; path: string; type: string; size?: number }) => ({
                        name: item.name,
                        path: item.path,
                        type: item.type as "file" | "folder",
                        size: item.size,
                      })
                    )
                  : [];
                setFiles(fileList);
              }
            }
          } catch (err) {
            console.error("Failed to fetch mirror content:", err);
          } finally {
            setIsLoadingFiles(false);
          }
        }
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

  const displayFiles = repo?.mirrorFrom ? (files.length > 0 ? files : undefined) : undefined;

  return (
    <div className="bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <RepoInfoBar owner={owner} repo={repoName} visibility={repo?.visibility} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3 space-y-4">
            <RepoGitBar mirrorFrom={repo?.mirrorFrom} />
            <RepoActionBar owner={owner} repo={repoName} branch="main" />
            <RepositoryCode
              owner={owner}
              repo={repoName}
              branch="main"
              files={displayFiles}
              isLoading={isLoadingFiles}
              mirrorFrom={repo?.mirrorFrom}
            />
            <RepoDocsCode
              owner={owner}
              repo={repoName}
              branch="main"
              mirrorFrom={repo?.mirrorFrom}
            />
          </div>
          <div className="lg:col-span-1">
            {repo ? (
              <RepositorySidebar
                repo={repo}
                owner={owner}
                repoName={repoName}
                files={displayFiles}
              />
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
