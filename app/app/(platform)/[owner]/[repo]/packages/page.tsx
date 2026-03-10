"use client";

import * as React from "react";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { Package, Box, Search, ShieldCheck, ExternalLink, Sparkles, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";
import { getGitHubToken } from "@/lib/github-token";

interface RepoPackagesPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface GitHubPackage {
  id?: number;
  name?: string;
  package_type?: string;
  visibility?: "public" | "private" | "internal";
  updated_at?: string;
  html_url?: string;
  repository?: {
    name?: string;
    full_name?: string;
  };
  version_count?: number;
  package_version?: {
    name?: string;
    version?: string;
  };
}

interface PackageCardData {
  id: string;
  name: string;
  type: string;
  visibility: "public" | "private" | "internal";
  updatedAt?: string;
  url?: string;
  version?: string;
  versionCount?: number;
}

function formatUpdatedAt(updatedAt?: string) {
  if (!updatedAt) return "Updated recently";
  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) return "Updated recently";
  return `Updated ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

function parseMirrorRepo(mirrorFrom?: string) {
  if (!mirrorFrom) return null;
  const match = mirrorFrom.match(/github\.com[/:]([^/]+)\/([^/]+)/i);
  if (!match) return null;
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, ""),
  };
}

export default function RepoPackagesPage({ params }: RepoPackagesPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [packages, setPackages] = useState<PackageCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    async function fetchRepo() {
      const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
      setRepo(repository);
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  useEffect(() => {
    let isMounted = true;

    async function fetchPackages() {
      setIsLoading(true);
      if (typeof window === "undefined" || !navigator.onLine) {
        if (isMounted) {
          setPackages([]);
          setIsLoading(false);
        }
        return;
      }

      const mirror = parseMirrorRepo(repo?.mirrorFrom);
      const owner = mirror?.owner || resolvedParams.owner;
      const repoName = mirror?.repo || resolvedParams.repo;

      try {
        const token = await getGitHubToken();
        const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const endpoints = [
          `https://api.github.com/repos/${owner}/${repoName}/packages?per_page=20`,
          `https://api.github.com/users/${owner}/packages?per_page=30`,
          `https://api.github.com/orgs/${owner}/packages?per_page=30`,
        ];

        let data: GitHubPackage[] = [];
        for (const endpoint of endpoints) {
          const response = await fetch(endpoint, { headers }).catch(() => null);
          if (!response || !response.ok) continue;
          const responseData = await response.json();
          if (Array.isArray(responseData) && responseData.length > 0) {
            data = responseData as GitHubPackage[];
            break;
          }
        }

        const normalized = data.map((pkg, index) => {
          const visibility = pkg.visibility ?? "private";
          return {
            id: `${pkg.id ?? index}`,
            name: pkg.name ?? "untitled-package",
            type: pkg.package_type ?? "package",
            visibility,
            updatedAt: pkg.updated_at,
            url: pkg.html_url,
            version: pkg.package_version?.version ?? pkg.package_version?.name,
            versionCount: pkg.version_count,
            repository: pkg.repository?.full_name ?? pkg.repository?.name,
          };
        });

        const repoKey = `${owner}/${repoName}`.toLowerCase();
        const filtered = normalized.filter((pkg) => {
          const repoField = pkg.repository?.toLowerCase();
          return repoField === repoKey || repoField === repoName.toLowerCase();
        });

        if (isMounted) {
          setPackages(
            (filtered.length > 0 ? filtered : normalized).map((pkg) => ({
              id: pkg.id,
              name: pkg.name,
              type: pkg.type,
              visibility: pkg.visibility,
              updatedAt: pkg.updatedAt,
              url: pkg.url,
              version: pkg.version,
              versionCount: pkg.versionCount,
            }))
          );
        }
      } catch {
        if (isMounted) setPackages([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPackages();

    return () => {
      isMounted = false;
    };
  }, [repo?.mirrorFrom, resolvedParams.owner, resolvedParams.repo]);

  const availableTypes = useMemo(() => {
    const types = new Set(packages.map((pkg) => pkg.type).filter(Boolean));
    return ["all", ...Array.from(types)];
  }, [packages]);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesType = typeFilter === "all" || pkg.type === typeFilter;
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [packages, searchTerm, typeFilter]);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Packages</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Packages published by {resolvedParams.owner}/{resolvedParams.repo}
            </p>
          </div>
          <Button variant="outline" size="sm" disabled>
            New package
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Find a package..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger size="sm" className="min-w-40">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                {availableTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "All types" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1">
              <ShieldCheck className="h-4 w-4" />
              Security
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredPackages.length} packages</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                Sort: Updated
              </Badge>
              <Badge variant="outline" className="capitalize">
                View: List
              </Badge>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
            </div>
          ) : filteredPackages.length > 0 ? (
            <div className="mt-4 space-y-3">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="border border-border rounded-lg bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={
                            pkg.url || `/${resolvedParams.owner}/${resolvedParams.repo}/packages`
                          }
                          className="text-base font-semibold hover:underline"
                        >
                          {pkg.name}
                        </Link>
                        <Badge variant="outline" className="capitalize">
                          {pkg.type}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {pkg.visibility}
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {pkg.version ? `Latest: ${pkg.version}` : "Latest version"}
                        {pkg.versionCount ? ` · ${pkg.versionCount} versions` : null}
                        <span className="mx-2">·</span>
                        {formatUpdatedAt(pkg.updatedAt)}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="self-start sm:self-auto" asChild>
                    <Link
                      href={pkg.url || `/${resolvedParams.owner}/${resolvedParams.repo}/packages`}
                      className="flex items-center gap-1"
                    >
                      View package
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 border border-dashed border-border rounded-lg bg-card/30 p-8">
              <div className="flex flex-col items-center text-center max-w-lg mx-auto gap-4">
                <div className="h-14 w-14 rounded-full bg-muted/40 flex items-center justify-center">
                  <Boxes className="h-7 w-7 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Get started with Giteria Packages</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Publish, install, and manage packages alongside your code. Use your existing
                    workflows with npm, Docker, Maven, or NuGet.
                  </p>
                </div>
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Box className="h-4 w-4" />
                    Configure your package manager and authenticate with Giteria.
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Publish your first package and share it with your team.
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button size="sm" asChild>
                    <Link
                      href={`/${resolvedParams.owner}/${resolvedParams.repo}/packages/new`}
                      className="flex items-center gap-1"
                    >
                      Publish your first package
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href="/docs"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1"
                    >
                      Learn more
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
