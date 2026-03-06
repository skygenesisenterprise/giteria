"use client";

import * as React from "react";

interface DashboardPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{
    owner: string;
    repo: string;
  } | null>(null);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return null;
  }

  const { owner, repo } = resolvedParams;

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold mb-4">{repo}</h1>
      <p className="text-lg text-muted-foreground">
        Welcome to the {owner}/{repo} repository!
      </p>
    </div>
  );
}
