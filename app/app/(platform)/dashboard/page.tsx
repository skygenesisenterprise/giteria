"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const userData = {
  name: "Alex",
  username: "alexdev",
  pendingPRs: 3,
  assignedIssues: 7,
  importantNotifications: 2,
  aiSuggestions: 3,
};

const recentRepositories = [
  {
    name: "giteria/frontend",
    description: "Frontend application built with Next.js",
    language: "TypeScript",
    languageColor: "#3178c6",
    updatedAt: "2 hours ago",
    isPrivate: false,
    stars: 124,
    prsOpen: 5,
    status: "active" as const,
  },
  {
    name: "giteria/api",
    description: "REST API server with GraphQL support",
    language: "TypeScript",
    languageColor: "#3178c6",
    updatedAt: "5 hours ago",
    isPrivate: false,
    stars: 89,
    prsOpen: 2,
    status: "active" as const,
  },
  {
    name: "giteria/docs",
    description: "Documentation website",
    language: "MDX",
    languageColor: "#083fa1",
    updatedAt: "1 day ago",
    isPrivate: false,
    stars: 45,
    prsOpen: 0,
    status: "needs-attention" as const,
  },
  {
    name: "giteria/mobile",
    description: "Mobile application",
    language: "Swift",
    languageColor: "#F05138",
    updatedAt: "3 days ago",
    isPrivate: true,
    stars: 32,
    prsOpen: 1,
    status: "blocked" as const,
  },
];

const yourWorkItems = [
  {
    type: "repository" as const,
    name: "giteria/frontend",
    description: "Frontend application",
    badge: "Main",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    type: "pr" as const,
    name: "feat: Add dark mode support",
    repo: "giteria/frontend",
    status: "review" as const,
    statusLabel: "Needs review",
    statusColor: "text-amber-600 bg-amber-50",
  },
  {
    type: "pr" as const,
    name: "fix: Auth token refresh",
    repo: "giteria/api",
    status: "ready" as const,
    statusLabel: "Ready to merge",
    statusColor: "text-[#58a6ff] bg-green-50",
  },
  {
    type: "issue" as const,
    name: "Memory leak in WebSocket handler",
    repo: "giteria/api",
    priority: "high" as const,
    priorityLabel: "High priority",
    status: "open" as const,
  },
  {
    type: "issue" as const,
    name: "Improve mobile navigation",
    repo: "giteria/mobile",
    priority: "medium" as const,
    priorityLabel: "Medium priority",
    status: "in-progress" as const,
  },
  {
    type: "draft" as const,
    name: "Refactor database layer",
    repo: "giteria/api",
    status: "draft" as const,
  },
];

const activityFeed = [
  {
    id: 1,
    type: "push",
    user: { name: "Sarah Chen", avatar: "SC" },
    repo: "giteria/frontend",
    action: "pushed 3 commits to",
    target: "feature/auth-flow",
    time: "10 minutes ago",
    priority: "normal",
  },
  {
    id: 2,
    type: "pr",
    user: { name: "Mike Johnson", avatar: "MJ" },
    repo: "giteria/api",
    action: "opened a pull request",
    target: "add-graphql-subscriptions",
    time: "25 minutes ago",
    priority: "high",
    aiTag: "Needs your review",
  },
  {
    id: 3,
    type: "issue",
    user: { name: "Emma Wilson", avatar: "EW" },
    repo: "giteria/frontend",
    action: "opened an issue",
    target: "Button component not responsive on mobile",
    time: "1 hour ago",
    priority: "medium",
  },
  {
    id: 4,
    type: "mention",
    user: { name: "David Lee", avatar: "DL" },
    repo: "giteria/docs",
    action: "mentioned you in",
    target: "Update API documentation",
    time: "2 hours ago",
    priority: "normal",
  },
  {
    id: 5,
    type: "pr",
    user: { name: "Anna Brown", avatar: "AB" },
    repo: "giteria/frontend",
    action: "merged pull request",
    target: "fix/typescript-strict-mode",
    time: "3 hours ago",
    priority: "low",
  },
  {
    id: 6,
    type: "release",
    user: { name: "Bot", avatar: "🤖" },
    repo: "giteria/api",
    action: "released version",
    target: "v2.5.0",
    time: "5 hours ago",
    priority: "normal",
  },
  {
    id: 7,
    type: "pr",
    user: { name: "Chris Taylor", avatar: "CT" },
    repo: "giteria/mobile",
    action: "requested review on",
    target: "feat: Push notifications",
    time: "6 hours ago",
    priority: "normal",
  },
];

const aiSuggestions = [
  {
    id: 1,
    type: "review",
    title: "Review suggested for PR #245",
    description: "High complexity changes detected in auth module",
    action: "Review code",
    icon: "🔍",
    priority: "high",
  },
  {
    id: 2,
    type: "archive",
    title: "Repository to archive",
    description: "giteria/old-experiments has no activity for 6 months",
    action: "Archive repo",
    icon: "📦",
    priority: "low",
  },
  {
    id: 3,
    type: "collaborator",
    title: "Suggested collaborator",
    description: "@sarahchen would be a great fit for giteria/api",
    action: "Invite",
    icon: "👤",
    priority: "medium",
  },
];

const trendingRepos = [
  { name: "vercel/next.js", stars: "+1.2k", trend: "up" },
  { name: "facebook/react", stars: "+890", trend: "up" },
  { name: "tailwindlabs/tailwindcss", stars: "+654", trend: "up" },
  { name: "giteria/giteria", stars: "+234", trend: "up" },
];

const weeklyActivity = [65, 78, 45, 89, 72, 95, 58];

const createOptions = [
  {
    title: "New Repository",
    description: "Start a new project",
    href: "/repositories/new",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    title: "New Organization",
    description: "Create a team space",
    href: "/organizations/new",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "New Project",
    description: "Organize your work",
    href: "/projects/new",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    title: "Import Repository",
    description: "From GitHub, GitLab...",
    href: "/import",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
    ),
  },
];

type FilterType = "all" | "push" | "pr" | "issue" | "mention" | "release";

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = React.useState<FilterType>("all");
  const [repoFilter, setRepoFilter] = React.useState<string>("all");

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "push", label: "Pushes" },
    { value: "pr", label: "Pull Requests" },
    { value: "issue", label: "Issues" },
    { value: "mention", label: "Mentions" },
    { value: "release", label: "Releases" },
  ];

  const filteredActivity = activityFeed.filter((item) => {
    if (activeFilter !== "all" && item.type !== activeFilter) return false;
    if (repoFilter !== "all" && item.repo !== repoFilter) return false;
    return true;
  });

  const maxActivity = Math.max(...weeklyActivity);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl">
              <h3 className="font-semibold text-[#c9d1d9] mb-4 text-sm uppercase tracking-wide">
                Your Work
              </h3>
              <nav className="space-y-1">
                <Link
                  href="/repositories"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[#8b949e] hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    Repositories
                  </span>
                  <span className="text-xs bg-gray-100 group-hover:bg-green-100 text-[#8b949e] group-hover:text-green-700 px-2 py-0.5 rounded-full">
                    12
                  </span>
                </Link>
                <Link
                  href="/pulls"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[#8b949e] hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    Pull Requests
                  </span>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    3
                  </span>
                </Link>
                <Link
                  href="/issues"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[#8b949e] hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Issues
                  </span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    7
                  </span>
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[#8b949e] hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Projects
                  </span>
                  <span className="text-xs bg-gray-100 group-hover:bg-green-100 text-[#8b949e] group-hover:text-green-700 px-2 py-0.5 rounded-full">
                    4
                  </span>
                </Link>
              </nav>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-xl">
              <h3 className="font-semibold text-[#c9d1d9] mb-4 text-sm uppercase tracking-wide">
                Recent
              </h3>
              <div className="space-y-2">
                {recentRepositories.slice(0, 4).map((repo) => (
                  <Link
                    key={repo.name}
                    href={`/${repo.name}`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#21262d] transition-colors group"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span className="text-sm text-[#c9d1d9] truncate group-hover:text-[#58a6ff]">
                      {repo.name.split("/")[1]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
              <h3 className="font-semibold mb-3">Quick Create</h3>
              <div className="space-y-2">
                {createOptions.map((option) => (
                  <Link
                    key={option.title}
                    href={option.href}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
                  >
                    <span className="w-6 h-6 flex items-center justify-center">{option.icon}</span>
                    {option.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <section className="bg-[#161b22] border border-[#30363d]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#c9d1d9]">Bonjour {userData.name} 👋</h1>
                  <p className="text-[#8b949e] mt-1">Voici un aperçu de votre activité</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] text-[#238636] rounded-full text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="font-medium">Giteria Assist</span>
                  <span className="text-[#58a6ff]">{userData.aiSuggestions} suggestions</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-[#c9d1d9]">{userData.pendingPRs}</p>
                  <p className="text-sm text-[#8b949e]">PRs en attente</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-[#c9d1d9]">{userData.assignedIssues}</p>
                  <p className="text-sm text-[#8b949e]">Issues assignées</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-[#c9d1d9]">
                    {userData.importantNotifications}
                  </p>
                  <p className="text-sm text-[#8b949e]">Notifications importantes</p>
                </div>
                <div className="p-4 bg-[#21262d] rounded-xl">
                  <p className="text-2xl font-bold text-[#238636]">{userData.aiSuggestions}</p>
                  <p className="text-sm text-[#58a6ff]">Suggestions IA</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#0d1117] border-b border-[#30363d]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-[#c9d1d9]">
                    Fil d&apos;activité intelligent
                  </h2>
                  <div className="flex items-center gap-3">
                    <select
                      value={repoFilter}
                      onChange={(e) => setRepoFilter(e.target.value)}
                      className="text-sm border border-[#30363d] rounded-lg px-3 py-1.5 bg-[#21262d] text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#238636]"
                    >
                      <option value="all">Tous les repos</option>
                      {recentRepositories.map((repo) => (
                        <option key={repo.name} value={repo.name}>
                          {repo.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                        activeFilter === filter.value
                          ? "bg-[#238636] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredActivity.length === 0 ? (
                  <div className="p-8 text-center text-[#8b949e]">
                    Aucune activité correspondante
                  </div>
                ) : (
                  filteredActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className={cn(
                        "p-4 hover:bg-[#161b22] transition-colors",
                        activity.priority === "high" && "bg-red-50/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                          {activity.user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-[#c9d1d9]">{activity.user.name}</span>
                            <span className="text-[#8b949e]">{activity.action}</span>
                            <Link
                              href={`/${activity.repo}`}
                              className="text-[#58a6ff] hover:underline font-medium"
                            >
                              {activity.repo}
                            </Link>
                            {activity.aiTag && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                                {activity.aiTag}
                              </span>
                            )}
                            {activity.priority === "high" && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                                Prioritaire
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/${activity.repo}/pulls`}
                            className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors block mt-0.5 truncate"
                          >
                            {activity.target}
                          </Link>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {activity.type === "push" && (
                            <span className="p-1.5 bg-gray-100 rounded-md" title="Push">
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                                />
                              </svg>
                            </span>
                          )}
                          {activity.type === "pr" && (
                            <span className="p-1.5 bg-green-100 rounded-md" title="Pull Request">
                              <svg
                                className="w-4 h-4 text-[#58a6ff]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                />
                              </svg>
                            </span>
                          )}
                          {activity.type === "issue" && (
                            <span className="p-1.5 bg-red-100 rounded-md" title="Issue">
                              <svg
                                className="w-4 h-4 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                          )}
                          {activity.type === "mention" && (
                            <span className="p-1.5 bg-blue-100 rounded-md" title="Mention">
                              <svg
                                className="w-4 h-4 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                              </svg>
                            </span>
                          )}
                          {activity.type === "release" && (
                            <span className="p-1.5 bg-purple-100 rounded-md" title="Release">
                              <svg
                                className="w-4 h-4 text-purple-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </main>

          <aside className="lg:col-span-3 space-y-6 order-3">
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl">
              <h3 className="font-semibold text-[#c9d1d9] mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Activité de la semaine
              </h3>
              <div className="flex items-end justify-between h-24 gap-1">
                {weeklyActivity.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-green-500 rounded-t-md transition-all duration-500 hover:bg-green-600"
                      style={{ height: `${(value / maxActivity) * 100}%` }}
                    />
                    <span className="text-[10px] text-gray-400">
                      {["L", "M", "M", "J", "V", "S", "D"][index]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-[#8b949e]">Total</span>
                <span className="font-semibold text-[#c9d1d9]">502 activités</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">🤖</span>
                Suggestions IA
              </h3>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-3 bg-white/10 rounded-xl hover:bg-white/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{suggestion.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{suggestion.title}</p>
                        <p className="text-xs text-gray-300 mt-0.5 line-clamp-2">
                          {suggestion.description}
                        </p>
                        <button className="mt-2 text-xs text-green-400 hover:text-green-300 font-medium">
                          {suggestion.action} →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-xl">
              <h3 className="font-semibold text-[#c9d1d9] mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                </svg>
                Trending
              </h3>
              <div className="space-y-3">
                {trendingRepos.map((repo, index) => (
                  <Link
                    key={repo.name}
                    href={`/${repo.name}`}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 w-4">{index + 1}</span>
                      <span className="text-sm font-medium text-[#c9d1d9] group-hover:text-[#58a6ff] transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#58a6ff] font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {repo.stars}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
