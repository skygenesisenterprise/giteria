"use client";

import * as React from "react";
import { use } from "react";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface TreeBlobLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export default function TreeBlobLayout({ children, params }: TreeBlobLayoutProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = React.useState<Repository | null>(null);

  React.useEffect(() => {
    async function fetchRepo() {
      try {
        const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
        setRepo(repository);
      } catch (err) {
        console.error("Failed to fetch repo:", err);
      }
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  return <div data-mirror-from={repo?.mirrorFrom}>{children}</div>;
}
