"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import {
  Code2,
  Tag,
  Plus,
  ExternalLink,
  FileText,
  Lock,
  Eye,
  ChevronDown,
  Pin,
  BookMarked,
  GripVertical,
  Pencil,
  Search,
  ArrowUpDown,
  Filter,
  Star,
  GitFork,
  CircleDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchOrganizationReadme, type ReadmeFile } from "@/lib/organizations/readme";
import type { OrganizationProfile } from "./OrganizationDescription";

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
  const [isCustomizing, setIsCustomizing] = React.useState(false);
  const [pinnedRepos, setPinnedRepos] = React.useState(repositories.slice(0, 4));
  const [repoSearch, setRepoSearch] = React.useState("");
  const [repoType, setRepoType] = React.useState<
    "all" | "public" | "private" | "internal" | "template"
  >("all");
  const [repoLanguage, setRepoLanguage] = React.useState<string>("");
  const [repoSort, setRepoSort] = React.useState<"updated" | "name" | "stars">("updated");
  const [showTypeDropdown, setShowTypeDropdown] = React.useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);
  const [showSortDropdown, setShowSortDropdown] = React.useState(false);

  React.useEffect(() => {
    setPinnedRepos(repositories.slice(0, 4));
  }, [repositories]);

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

  const allLanguages = ["TypeScript", "JavaScript", "Python", "Go", "Rust", "Java", "C++", "C"];

  const filteredRepos = repositories
    .filter((repo) => repo.name.toLowerCase().includes(repoSearch.toLowerCase()))
    .filter((repo) => !repoLanguage || repo.language === repoLanguage)
    .filter((repo) => {
      if (repoType === "all") return true;
      if (repoType === "template") return repo.isTemplate;
      if (repoType === "internal") return repo.visibility === "internal";
      return repo.visibility === repoType;
    })
    .sort((a, b) => {
      if (repoSort === "name") return a.name.localeCompare(b.name);
      if (repoSort === "stars") return (b.stars || 0) - (a.stars || 0);
      return 0;
    });

  const displayRepos = filteredRepos.slice(0, 10);
  const hasMoreRepos = filteredRepos.length > 10;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Pin className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Pinned</h2>
            </div>
            {isAdmin && (
              <button
                onClick={() => setIsCustomizing(!isCustomizing)}
                className="text-sm text-[#2f81f7] hover:underline"
              >
                {isCustomizing ? "Done" : "Customize your pins"}
              </button>
            )}
          </div>
          {isCustomizing && isAdmin ? (
            <Reorder.Group
              axis="y"
              values={pinnedRepos}
              onReorder={setPinnedRepos}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {pinnedRepos.map((repo) => (
                <Reorder.Item
                  key={repo.id}
                  value={repo}
                  className="rounded-md border border-border p-4 hover:bg-muted/50 transition-colors cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${orgSlug}/${repo.name}`}
                      className="flex items-center gap-2 font-semibold hover:underline"
                    >
                      <BookMarked className="w-4 h-4 text-muted-foreground" />
                      <span className="text-[#2f81f7]">{repo.name}</span>
                    </Link>
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {repo.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  {repo.language && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: languageColors[repo.language] || "#6e7681",
                        }}
                      />
                      {repo.language}
                    </div>
                  )}
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pinnedRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="rounded-md border border-border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${orgSlug}/${repo.name}`}
                      className="flex items-center gap-2 font-semibold hover:underline"
                    >
                      <BookMarked className="w-4 h-4 text-muted-foreground" />
                      <span className="text-[#2f81f7]">{repo.name}</span>
                    </Link>
                  </div>
                  {repo.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  {repo.language && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: languageColors[repo.language] || "#6e7681",
                        }}
                      />
                      {repo.language}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookMarked className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Repositories</h2>
          </div>

          <div className="rounded-md border border-border p-3 mb-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 border rounded-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Find a repository..."
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-md bg-background focus:outline-none"
                />
              </div>

              <div className="relative border rounded-md">
                <button
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-background hover:bg-muted transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  {repoType === "all" ? "Type" : repoType}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showTypeDropdown && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10"
                        onClick={() => setShowTypeDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-1 w-32 rounded-md border border-border bg-popover shadow-lg z-20"
                      >
                        {(["all", "public", "private", "internal", "template"] as const).map(
                          (type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setRepoType(type);
                                setShowTypeDropdown(false);
                              }}
                              className={`w-full px-3 py-2 text-left text-sm first:rounded-t-md last:rounded-b-md transition-colors ${
                                repoType === type
                                  ? "bg-muted text-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                          )
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative border rounded-md">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-background hover:bg-muted transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  {repoLanguage || "Language"}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showLanguageDropdown && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10"
                        onClick={() => setShowLanguageDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-1 w-40 rounded-md border border-border bg-popover shadow-lg z-20 max-h-64 overflow-y-auto"
                      >
                        <button
                          onClick={() => {
                            setRepoLanguage("");
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm first:rounded-t-md transition-colors ${
                            !repoLanguage
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          All languages
                        </button>
                        {allLanguages.map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setRepoLanguage(lang);
                              setShowLanguageDropdown(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                              repoLanguage === lang
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative border rounded-md">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-background hover:bg-muted transition-colors"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {repoSort === "updated"
                    ? "Recently updated"
                    : repoSort === "name"
                      ? "Name"
                      : "Stars"}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showSortDropdown && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10"
                        onClick={() => setShowSortDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-1 w-44 rounded-md border border-border bg-popover shadow-lg z-20"
                      >
                        {(
                          [
                            { value: "updated", label: "Recently updated" },
                            { value: "name", label: "Name" },
                            { value: "stars", label: "Stars" },
                          ] as const
                        ).map((sort) => (
                          <button
                            key={sort.value}
                            onClick={() => {
                              setRepoSort(sort.value);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm first:rounded-t-md last:rounded-b-md transition-colors ${
                              repoSort === sort.value
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            {sort.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <div className="border rounded-md">
                <Link href="/new/repo">
                  <Button className="bg-[#0969da] text-white hover:bg-[#0860ca]">
                    <BookMarked className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {displayRepos.length > 0 ? (
              displayRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="rounded-md border border-border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${orgSlug}/${repo.name}`}
                        className="flex items-center gap-2 font-semibold hover:underline"
                      >
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-[#2f81f7]">{repo.name}</span>
                      </Link>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          repo.visibility === "private"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {repo.visibility === "private" ? <Lock className="w-3 h-3 mr-1" /> : null}
                        {repo.visibility === "public" ? "Public" : "Private"}
                      </span>
                    </div>
                  </div>
                  {repo.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: languageColors[repo.language] || "#6e7681",
                            }}
                          />
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        <span>{repo.stars ?? 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{repo.forks ?? 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CircleDot className="w-3.5 h-3.5" />
                        <span>{repo.license || "MIT"}</span>
                      </div>
                      <span>Updated {repo.updatedAt || "recently"}</span>
                    </div>
                    <CommitGraph />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">No repositories found</div>
            )}
          </div>

          {hasMoreRepos && (
            <Link
              href={`/${orgSlug}?tab=repositories`}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-[#2f81f7] hover:underline"
            >
              View all repositories
              <ExternalLink className="w-4 h-4" />
            </Link>
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
