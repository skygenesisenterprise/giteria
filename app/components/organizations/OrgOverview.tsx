"use client";

import * as React from "react";
import Link from "next/link";
import {
  Code2,
  Tag,
  Plus,
  Lock,
  Eye,
  ChevronDown,
  BookMarked,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchOrganizationReadme, type ReadmeFile } from "@/lib/organizations/readme";
import type { OrganizationProfile } from "./OrganizationDescription";
import { getGitHubToken } from "@/lib/github-token";
import {
  RepositorySearch,
  RepositoryFilters,
  RepositorySort,
  RepositoryList,
  RepositoryEmptyState,
  getAllRepositories,
  type RepositoryType,
  type RepositoryLanguage,
  type RepositorySortOption,
  type RepositoryData,
} from "@/app/(platform)/[owner]/_components/repositories";

interface OrgOverviewProps {
  organization: OrganizationProfile;
  members: Array<{
    id: string;
    username: string;
    avatarUrl: string;
  }>;
  repositories: Array<{
    id: string;
    name: string;
    description?: string;
    language?: string;
    visibility: "public" | "private" | "internal";
    isTemplate?: boolean;
    stars?: number;
    forks?: number;
    license?: string;
    updatedAt?: string;
  }>;
  orgSlug: string;
  isMember?: boolean;
  isAdmin?: boolean;
  canViewPrivate?: boolean;
}

function transformToRepositoryData(
  repos: OrgOverviewProps["repositories"],
  ownerSlug: string
): RepositoryData[] {
  return repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    fullName: `${ownerSlug}/${repo.name}`,
    description: repo.description,
    visibility: repo.visibility === "internal" ? "private" : repo.visibility,
    language: repo.language,
    languageColor: undefined,
    stars: repo.stars ?? 0,
    forks: repo.forks ?? 0,
    updatedAt: repo.updatedAt ? new Date(repo.updatedAt).getTime() : Date.now(),
    url: `/${ownerSlug}/${repo.name}`,
    isArchived: false,
    isMirror: false,
    isFork: false,
    owner: ownerSlug,
  }));
}

interface OrgOverviewProps {
  organization: OrganizationProfile;
  members: Array<{
    id: string;
    username: string;
    avatarUrl: string;
  }>;
  repositories: Array<{
    id: string;
    name: string;
    description?: string;
    language?: string;
    visibility: "public" | "private" | "internal";
    isTemplate?: boolean;
    stars?: number;
    forks?: number;
    license?: string;
    updatedAt?: string;
  }>;
  orgSlug: string;
  isMember?: boolean;
  isAdmin?: boolean;
  canViewPrivate?: boolean;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
};

function generateCommitHeatmap() {
  const weeks: number[][] = [];
  for (let w = 0; w < 20; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(Math.random() > 0.6 ? Math.floor(Math.random() * 5) : 0);
    }
    weeks.push(week);
  }
  return weeks;
}

const heatmapColors = [
  "bg-muted/30",
  "bg-[#9be9a8]",
  "bg-[#40c463]",
  "bg-[#30a14e]",
  "bg-[#216e39]",
];

function CommitGraph() {
  const [heatmap] = React.useState(() => generateCommitHeatmap());

  return (
    <div className="flex gap-0.5">
      {heatmap.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-0.5">
          {week.map((count, di) => (
            <div
              key={di}
              className={`w-2 h-2 rounded-sm ${heatmapColors[Math.min(count, 4)]}`}
              title={`${count} commits`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const mockDiscussions = [
  {
    id: "1",
    title: "Announcing our new roadmap for 2026",
    author: "liamvnastoria",
    replies: 12,
    category: "Announcements",
  },
  {
    id: "2",
    title: "How to contribute to our open source projects",
    author: "alexdev",
    replies: 8,
    category: "Questions",
  },
  {
    id: "3",
    title: "Community spotlight: Best projects this month",
    author: "johndoe",
    replies: 5,
    category: "Community",
  },
];

const mockTopics = [
  "javascript",
  "typescript",
  "docker",
  "rust",
  "nextjs",
  "react",
  "nodejs",
  "python",
];

export function OrgOverview({
  organization,
  members,
  repositories,
  orgSlug,
  isMember = true,
  isAdmin = false,
  canViewPrivate = true,
}: OrgOverviewProps) {
  const [readme, setReadme] = React.useState<ReadmeFile | null>(null);
  const [readmeLoading, setReadmeLoading] = React.useState(true);
  const [viewMode, setViewMode] = React.useState<"public" | "member">(() =>
    isAdmin ? "member" : "public"
  );
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<RepositoryType>("all");
  const [languageFilter, setLanguageFilter] = React.useState<RepositoryLanguage>("all");
  const [sortBy, setSortBy] = React.useState<RepositorySortOption>("updated");
  const [allRepos, setAllRepos] = React.useState<RepositoryData[]>([]);
  const [githubToken, setGithubToken] = React.useState<string>("");

  React.useEffect(() => {
    async function loadRepos() {
      const repos = await getAllRepositories();
      setAllRepos(repos);
    }
    loadRepos();
  }, []);

  React.useEffect(() => {
    async function loadToken() {
      const token = await getGitHubToken();
      if (token) {
        setGithubToken(token);
      }
    }
    loadToken();
  }, []);

  const fetchLatestCommitDate = async (repoName: string): Promise<number> => {
    const repo = allRepos.find((r) => r.name === repoName && r.isMirror && r.mirrorFrom);
    if (!repo || !repo.mirrorFrom) return 0;

    const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) return 0;

    const [, owner, name] = githubMatch;
    const repoNameClean = name.replace(/\.git$/, "");

    try {
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };
      if (githubToken) {
        headers.Authorization = `Bearer ${githubToken}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repoNameClean}/commits?per_page=1`,
        { headers }
      );

      if (!response.ok) return 0;

      const data = await response.json();
      if (data.length > 0 && data[0].commit?.author?.date) {
        return new Date(data[0].commit.author.date).getTime();
      }
    } catch (error) {
      console.error("Failed to fetch latest commit:", error);
    }
    return 0;
  };

  const [repoDates, setRepoDates] = React.useState<Record<string, number>>({});
  const [datesLoading, setDatesLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadRepoDates() {
      setDatesLoading(true);
      const dates: Record<string, number> = {};

      for (const repo of repositories) {
        const repoData = allRepos.find((r) => r.name === repo.name && r.isMirror && r.mirrorFrom);
        if (repoData?.isMirror && repoData?.mirrorFrom) {
          const date = await fetchLatestCommitDate(repo.name);
          dates[repo.name] = date;
        }
      }

      setRepoDates(dates);
      setDatesLoading(false);
    }

    if (allRepos.length > 0) {
      loadRepoDates();
    }
  }, [allRepos, repositories]);

  const getUpdatedAt = (repo: OrgOverviewProps["repositories"][0]): number => {
    if (repoDates[repo.name]) {
      return repoDates[repo.name];
    }
    return repo.updatedAt ? new Date(repo.updatedAt).getTime() : 0;
  };

  const defaultReadme = `# Welcome to ${organization.name}

${organization.description || "Building amazing things together."}

## Our Mission

We are a community of developers building the future of software development.

## Get Involved

- Check out our repositories
- Join our discussions
- Contribute to our projects

## Contact

${organization.website ? `- [Website](${organization.website})` : ""}
${organization.twitter ? `- [Twitter](https://twitter.com/${organization.twitter.replace("@", "")})` : ""}
${organization.email ? `- [Email](mailto:${organization.email})` : ""}
`;

  const topLanguages = [
    { name: "TypeScript", percentage: 45 },
    { name: "Rust", percentage: 25 },
    { name: "Go", percentage: 15 },
    { name: "JavaScript", percentage: 10 },
    { name: "C", percentage: 5 },
  ];

  React.useEffect(() => {
    async function loadReadme() {
      setReadmeLoading(true);
      try {
        const readmeData = await fetchOrganizationReadme(orgSlug, viewMode === "member");
        setReadme(readmeData);
      } catch (error) {
        console.error("Failed to load README:", error);
      } finally {
        setReadmeLoading(false);
      }
    }

    loadReadme();
  }, [orgSlug, viewMode]);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      style={{
        fontFamily:
          '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div className="lg:col-span-3 space-y-6">
        <div className="rounded-md border border-border bg-card">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              {readmeLoading ? (
                <span className="text-sm text-muted-foreground">Loading...</span>
              ) : readme ? (
                <Link
                  href={`/${orgSlug}/${readme.repoName}/tree/main/README.md`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#2f81f7] transition-colors"
                >
                  <span>{readme.repoName}/README.md</span>
                  {readme.isPrivate && <Lock className="w-3 h-3" />}
                </Link>
              ) : null}
            </div>
            {isAdmin && (
              <button className="p-1 hover:bg-muted rounded transition-colors">
                <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <div className="p-4 prose prose-sm dark:prose-invert max-w-none">
            {readmeLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap font-mono text-sm">
                {readme?.content || defaultReadme}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookMarked className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Repositories</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <RepositorySearch value={searchQuery} onChange={setSearchQuery} />
            <div className="flex items-center gap-2 flex-wrap">
              <RepositoryFilters
                type={typeFilter}
                language={languageFilter}
                onTypeChange={setTypeFilter}
                onLanguageChange={setLanguageFilter}
              />
              <RepositorySort value={sortBy} onChange={setSortBy} />
              <Link href="/new/repo">
                <Button size="sm" className="border">
                  <Plus className="w-4 h-4 mr-1" />
                  New
                </Button>
              </Link>
            </div>
          </div>

          {repositories.length > 0 ? (
            <>
              <RepositoryList
                repositories={transformToRepositoryData(
                  [...repositories]
                    .sort((a, b) => {
                      const dateA = getUpdatedAt(a);
                      const dateB = getUpdatedAt(b);
                      return dateB - dateA;
                    })
                    .slice(0, 6),
                  orgSlug
                )}
              />
              {repositories.length > 6 && (
                <div className="mt-4 flex justify-center">
                  <Link href={`/${orgSlug}/repos`}>
                    <Button variant="outline">
                      {datesLoading ? "Loading..." : `View all ${repositories.length} repositories`}
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <RepositoryEmptyState owner={orgSlug} canCreate={isAdmin} />
          )}
        </div>
      </div>

      <div className="space-y-6">
        {canViewPrivate && isMember && (
          <div className="rounded-md border border-border p-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground px-2">
              <Eye className="w-4 h-4" />
              <span>View as:</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border bg-background hover:bg-muted transition-colors"
              >
                {viewMode === "member" ? "Member" : "Public"}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                  <div className="absolute right-0 mt-1 w-32 rounded-md border border-border bg-popover shadow-lg z-20">
                    <button
                      onClick={() => {
                        setViewMode("public");
                        setShowDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm rounded-t-md transition-colors ${
                        viewMode === "public"
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      Public
                    </button>
                    <button
                      onClick={() => {
                        setViewMode("member");
                        setShowDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm rounded-b-md transition-colors ${
                        viewMode === "member"
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      Member
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="rounded-md border border-border p-4">
          <p className="text-sm text-muted-foreground">
            {viewMode === "member" ? (
              <>
                You are viewing the README and pinned repositories as a member of the{" "}
                <span className="font-semibold text-foreground">{organization.name}</span>{" "}
                organization.
              </>
            ) : (
              <>You are viewing the public README and pinned repositories.</>
            )}
          </p>
        </div>

        <div className="rounded-md border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Top discussions this past month</h3>
          </div>
          <div className="space-y-3">
            {mockDiscussions.map((discussion) => (
              <div key={discussion.id} className="space-y-1">
                <Link
                  href="#"
                  className="text-sm font-medium text-[#2f81f7] hover:underline line-clamp-2"
                >
                  {discussion.title}
                </Link>
                <div className="text-xs text-muted-foreground">
                  <span>{discussion.author}</span>
                  <span className="mx-1">·</span>
                  <span>{discussion.replies} replies</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Start a new discussion
          </Button>
        </div>

        <div className="rounded-md border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">People</h3>
          </div>
          <div className="space-y-2">
            {members.slice(0, 4).map((member) => (
              <Link
                key={member.id}
                href={`/${member.username}`}
                className="flex items-center gap-2 hover:text-[#2f81f7]"
              >
                <img
                  src={member.avatarUrl}
                  alt={member.username}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm">{member.username}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Top languages</h3>
          </div>
          <div className="space-y-2">
            {topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: languageColors[lang.name] || "#6e7681" }}
                />
                <span className="text-sm flex-1">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Most used topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockTopics.slice(0, 8).map((topic) => (
              <Link
                key={topic}
                href={`/search?q=${topic}`}
                className="inline-flex items-center px-2 py-1 rounded-md bg-[#0969da]/10 text-[#0969da] text-xs hover:bg-[#0969da]/20 transition-colors"
              >
                <Tag className="w-3 h-3 mr-1" />
                {topic}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border p-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#1f6feb]" />
            <span className="text-sm font-semibold">Developer Program Member</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This organization is a member of the Giteria Developer Program.
          </p>
        </div>
      </div>
    </div>
  );
}
