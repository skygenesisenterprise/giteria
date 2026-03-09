"use client";

import * as React from "react";
import { use } from "react";
import { RepositoryTreeExplorer } from "@/components/repository/RepositoryTreeExplorer";
import { FileViewer } from "@/components/repository/FileViewer";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface TreeBlobPageProps {
  params: Promise<{
    owner: string;
    repo: string;
    path?: string[];
  }>;
}

export default function TreeBlobPage({ params }: TreeBlobPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = React.useState<Repository | null>(null);
  const [isLoadingRepo, setIsLoadingRepo] = React.useState(true);

  React.useEffect(() => {
    async function fetchRepo() {
      try {
        const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
        setRepo(repository);
      } catch (err) {
        console.error("Failed to fetch repo:", err);
      } finally {
        setIsLoadingRepo(false);
      }
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  if (isLoadingRepo) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-120px)]">
      <div className="w-64 shrink-0 border-r border-border pr-2">
        <RepositoryTreeExplorer
          owner={resolvedParams.owner}
          repo={resolvedParams.repo}
          branch="main"
          mirrorFrom={repo?.mirrorFrom}
        />
      </div>
      <FileViewer
        owner={resolvedParams.owner}
        repo={resolvedParams.repo}
        branch="main"
        mirrorFrom={repo?.mirrorFrom}
      />
    </div>
  );
}
