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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchRepo() {
      try {
        const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
        setRepo(repository);
      } catch (err) {
        console.error("Failed to fetch repo:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="w-64 shrink-0">
            <RepositoryTreeExplorer
              owner={resolvedParams.owner}
              repo={resolvedParams.repo}
              mirrorFrom={repo?.mirrorFrom}
            />
          </div>
          <div className="flex-1 min-w-0">
            <FileViewer
              owner={resolvedParams.owner}
              repo={resolvedParams.repo}
              mirrorFrom={repo?.mirrorFrom}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
