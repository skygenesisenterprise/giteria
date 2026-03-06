"use client";

import * as React from "react";
import { use, useMemo } from "react";
import { usePathname } from "next/navigation";
import { HeaderRepo } from "../../_components/HeaderRepo";

interface RepoLayoutProps {
  children: React.ReactNode;
  params: Promise<{ owner: string; repo: string }>;
}

export default function RepoLayout({ children, params }: RepoLayoutProps) {
  const resolvedParams = use(params);
  const pathname = usePathname();

  const activeTab = useMemo(() => {
    const basePath = `/${resolvedParams.owner}/${resolvedParams.repo}`;
    const currentPath = pathname.slice(basePath.length).split("?")[0];

    if (currentPath === "" || currentPath === "/") return "code";
    if (currentPath.startsWith("/issues")) return "issues";
    if (currentPath.startsWith("/pull")) return "pulls";
    if (currentPath.startsWith("/agents")) return "agents";
    if (currentPath.startsWith("/discussions")) return "discussions";
    if (currentPath.startsWith("/actions")) return "actions";
    if (currentPath.startsWith("/projects")) return "projects";
    if (currentPath.startsWith("/wiki")) return "wiki";
    if (currentPath.startsWith("/security")) return "security";
    if (currentPath.startsWith("/insights")) return "insights";
    if (currentPath.startsWith("/settings")) return "settings";

    return "code";
  }, [pathname, resolvedParams.owner, resolvedParams.repo]);

  return (
    <>
      <HeaderRepo owner={resolvedParams.owner} repo={resolvedParams.repo} activeTab={activeTab} />
      {children}
    </>
  );
}
