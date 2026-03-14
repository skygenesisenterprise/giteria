"use client";

import * as React from "react";
import Link from "next/link";
import { use, useEffect, useMemo, useState, useCallback } from "react";
import { Calendar, Download, ExternalLink, Rocket, Tag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface ReleasesPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface ReleaseAsset {
  id: number;
  name: string;
  size: number;
  downloadCount: number;
  url: string;
}

interface ReleaseAuthor {
  login: string;
  avatarUrl?: string;
}

interface ReleaseItem {
  id: string;
  name: string;
  tagName: string;
  body: string;
  isDraft: boolean;
  isPrerelease: boolean;
  publishedAt?: string;
  createdAt?: string;
  htmlUrl?: string;
  author?: ReleaseAuthor;
  assets: ReleaseAsset[];
}

function formatDate(dateString?: string) {
  if (!dateString) return "Date unknown";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Date unknown";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatBytes(bytes?: number) {
  if (!bytes || Number.isNaN(bytes)) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
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

export default function ReleasesPage({ params }: ReleasesPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [releases, setReleases] = useState<ReleaseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadGithubReleases = useCallback(async (owner: string, repoName: string) => {
    try {
      const token = await getGitHubToken();
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/releases?per_page=30`,
        { headers }
      );

      if (!response.ok) return [];
      const data = await response.json();
      if (!Array.isArray(data)) return [];

      const normalized: ReleaseItem[] = data.map(
        (
          release: {
            id: number;
            name: string | null;
            tag_name: string;
            body: string | null;
            draft: boolean;
            prerelease: boolean;
            published_at: string | null;
            created_at: string | null;
            html_url: string | null;
            author?: { login: string; avatar_url?: string };
            assets?: {
              id: number;
              name: string;
              size: number;
              download_count: number;
              browser_download_url: string;
            }[];
          },
          index: number
        ) => ({
          id: `${release.id ?? index}`,
          name: release.name || release.tag_name || "Untitled release",
          tagName: release.tag_name,
          body: release.body || "",
          isDraft: release.draft,
          isPrerelease: release.prerelease,
          publishedAt: release.published_at || undefined,
          createdAt: release.created_at || undefined,
          htmlUrl: release.html_url || undefined,
          author: release.author
            ? { login: release.author.login, avatarUrl: release.author.avatar_url }
            : undefined,
          assets: (release.assets || []).map((asset) => ({
            id: asset.id,
            name: asset.name,
            size: asset.size,
            downloadCount: asset.download_count,
            url: asset.browser_download_url,
          })),
        })
      );

      return normalized.sort((a, b) => {
        const aDate = new Date(a.publishedAt || a.createdAt || 0).getTime();
        const bDate = new Date(b.publishedAt || b.createdAt || 0).getTime();
        return bDate - aDate;
      });
    } catch (error) {
      console.error("Failed to load GitHub releases:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    async function fetchRepo() {
      const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
      setRepo(repository);
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  useEffect(() => {
    let isMounted = true;

    async function fetchReleases() {
      setIsLoading(true);
      const mirror = parseMirrorRepo(repo?.mirrorFrom);
      const owner = mirror?.owner || resolvedParams.owner;
      const repoName = mirror?.repo || resolvedParams.repo;
      const releasesData = await loadGithubReleases(owner, repoName);
      if (isMounted) {
        setReleases(releasesData);
        setIsLoading(false);
      }
    }

    fetchReleases();

    return () => {
      isMounted = false;
    };
  }, [repo?.mirrorFrom, resolvedParams.owner, resolvedParams.repo, loadGithubReleases]);

  const filteredReleases = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return releases.filter(
      (release) =>
        release.name.toLowerCase().includes(query) ||
        release.tagName.toLowerCase().includes(query) ||
        release.body.toLowerCase().includes(query)
    );
  }, [releases, searchQuery]);

  const latestReleaseId = useMemo(() => {
    const latest = releases.find((release) => !release.isDraft);
    return latest?.id;
  }, [releases]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Releases</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {releases.length} release{releases.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button asChild>
            <Link href={`/${resolvedParams.owner}/${resolvedParams.repo}/releases/new`}>
              <Rocket className="w-4 h-4" />
              New release
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-75">
            <Input
              placeholder="Filter releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredReleases.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <Rocket className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {repo?.mirrorFrom
                ? "No releases found"
                : "No releases found. Connect a GitHub mirror to show published releases."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReleases.map((release) => (
              <ReleaseCard
                key={release.id}
                release={release}
                isLatest={release.id === latestReleaseId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ReleaseCardProps {
  release: ReleaseItem;
  isLatest: boolean;
}

function ReleaseCard({ release, isLatest }: ReleaseCardProps) {
  const summary = release.body.split("\n").filter(Boolean)[0] || "No release notes provided.";

  return (
    <div className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Tag className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {release.htmlUrl ? (
              <a
                href={release.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-blue-600 truncate"
              >
                {release.name}
              </a>
            ) : (
              <span className="font-semibold truncate">{release.name}</span>
            )}
            <span className="text-xs font-mono text-muted-foreground border border-border px-2 py-0.5 rounded">
              {release.tagName}
            </span>
            {isLatest && <Badge variant="secondary">Latest</Badge>}
            {release.isDraft && <Badge variant="outline">Draft</Badge>}
            {!release.isDraft && release.isPrerelease && <Badge variant="outline">Pre-release</Badge>}
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{summary}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(release.publishedAt || release.createdAt)}
            </span>
            {release.author?.login && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {release.author.login}
              </span>
            )}
          </div>

          {release.assets.length > 0 && (
            <div className="mt-3 border-t border-border/60 pt-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">Assets</p>
              <div className="mt-2 grid gap-2">
                {release.assets.map((asset) => (
                  <a
                    key={asset.id}
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-md border border-border/60 px-3 py-2 text-sm hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Download className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{asset.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatBytes(asset.size)} • {asset.downloadCount} download
                      {asset.downloadCount !== 1 ? "s" : ""}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        {release.htmlUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={release.htmlUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
