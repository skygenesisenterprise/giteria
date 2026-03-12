"use client";

import * as React from "react";
import { use, useMemo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HeaderRepo } from "../../_components/HeaderRepo";
import { RepoFeaturesProvider } from "@/components/repository/RepoFeaturesContext";
import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface RepoLayoutProps {
  children: React.ReactNode;
  params: Promise<{ owner: string; repo: string }>;
}

interface RepoCountsContextType {
  setCounts: (counts: { issues?: number; pulls?: number; discussions?: number }) => void;
}

const RepoCountsContext = React.createContext<RepoCountsContextType>({
  setCounts: () => {},
});

export { RepoCountsContext };

export default function RepoLayout({ children, params }: RepoLayoutProps) {
  const resolvedParams = use(params);
  const pathname = usePathname();
  const [repo, setRepo] = useState<Repository | null>(null);
  const [counts, setCounts] = useState({ issues: 0, pulls: 0, discussions: 0 });
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  useEffect(() => {
    async function fetchRepo() {
      const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
      setRepo(repository);
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  useEffect(() => {
    async function fetchLocalCounts() {
      try {
        const issues = await db.getAllByIndex<{ state: string }>(
          STORES.ISSUES,
          "repoFullName",
          repoFullName
        );
        const pulls = await db.getAllByIndex<{ state: string }>(
          STORES.PULLS,
          "repoFullName",
          repoFullName
        );
        const openIssues = issues.filter((i) => i.state === "open").length;
        const openPulls = pulls.filter((p) => p.state === "open").length;
        setCounts((prev) => ({ ...prev, issues: openIssues, pulls: openPulls }));
      } catch (error) {
        console.error("Failed to fetch local counts:", error);
      }
    }
    fetchLocalCounts();
  }, [repoFullName]);

  useEffect(() => {
    async function fetchGithubCounts() {
      if (!repo?.mirrorFrom) {
        setIsLoadingCounts(false);
        return;
      }

      const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
      if (!githubMatch) {
        setIsLoadingCounts(false);
        return;
      }

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

        const [issuesRes, pullsRes] = await Promise.all([
          fetch(
            `https://api.github.com/repos/${mirrorOwner}/${repoName}/issues?state=open&per_page=1`,
            { headers }
          ),
          fetch(
            `https://api.github.com/repos/${mirrorOwner}/${repoName}/pulls?state=open&per_page=1`,
            { headers }
          ),
        ]);

        if (issuesRes.ok) {
          const link = issuesRes.headers.get("Link");
          let count = 0;
          if (link) {
            const match = link.match(/page=(\d+)>; rel="last"/);
            if (match) count = parseInt(match[1], 10);
          } else {
            const data = await issuesRes.json();
            count = data.filter((issue: { pull_request?: unknown }) => !issue.pull_request).length;
          }
          setCounts((prev) => ({ ...prev, issues: prev.issues + count }));
        }

        if (pullsRes.ok) {
          const link = pullsRes.headers.get("Link");
          let count = 0;
          if (link) {
            const match = link.match(/page=(\d+)>; rel="last"/);
            if (match) count = parseInt(match[1], 10);
          } else {
            const data = await pullsRes.json();
            count = data.length;
          }
          setCounts((prev) => ({ ...prev, pulls: prev.pulls + count }));
        }
      } catch (error) {
        console.error("Failed to fetch GitHub counts:", error);
      } finally {
        setIsLoadingCounts(false);
      }
    }

    fetchGithubCounts();
  }, [repo]);

  const activeTab = useMemo(() => {
    const basePath = `/${resolvedParams.owner}/${resolvedParams.repo}`;
    const currentPath = pathname.slice(basePath.length).split("?")[0];

    if (currentPath === "" || currentPath === "/") return "code";
    if (currentPath.startsWith("/issues")) return "issues";
    if (currentPath.startsWith("/pulls")) return "pulls";
    if (currentPath.startsWith("/agents")) return "agents";
    if (currentPath.startsWith("/discussions")) return "discussions";
    if (currentPath.startsWith("/actions")) return "actions";
    if (currentPath.startsWith("/projects")) return "projects";
    if (currentPath.startsWith("/wiki")) return "wiki";
    if (currentPath.startsWith("/security")) return "security";
    if (currentPath.startsWith("/insights")) return "insights";
    if (currentPath.startsWith("/settings")) return "settings";
    if (currentPath.startsWith("/packages")) return "packages";
    if (currentPath.startsWith("/settings")) return "settings";
    if (currentPath.startsWith("/models")) return "models";

    return "code";
  }, [pathname, resolvedParams.owner, resolvedParams.repo]);

  const handleSetCounts = React.useCallback(
    (newCounts: { issues?: number; pulls?: number; discussions?: number }) => {
      setCounts((prev) => ({
        issues: newCounts.issues ?? prev.issues,
        pulls: newCounts.pulls ?? prev.pulls,
        discussions: newCounts.discussions ?? prev.discussions,
      }));
    },
    []
  );

  return (
    <RepoFeaturesProvider owner={resolvedParams.owner} repo={resolvedParams.repo}>
      <RepoCountsContext.Provider value={{ setCounts: handleSetCounts }}>
        <HeaderRepo
          owner={resolvedParams.owner}
          repo={resolvedParams.repo}
          activeTab={activeTab}
          issuesCount={counts.issues}
          pullsCount={counts.pulls}
          discussionsCount={counts.discussions}
        />
        {children}
      </RepoCountsContext.Provider>
    </RepoFeaturesProvider>
  );
}
