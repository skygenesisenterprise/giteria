"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookMarked, Eye, ChevronDown, Pin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authEngine } from "@/lib/auth/IndexedDBAuthEngine";
import { getOrganizationBySlug } from "@/lib/organizations/LocalOrgEngine";
import {
  RepositorySearch,
  RepositoryFilters,
  RepositorySort,
  RepositoryList,
  RepositoryEmptyState,
  getRepositoriesByOwner,
  type RepositoryType,
  type RepositoryLanguage,
  type RepositorySortOption,
  type RepositoryData,
} from "../_components/repositories";

interface ReposPageProps {
  params: Promise<{ owner: string }>;
}

export default function ReposPage({ params }: ReposPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ owner: string } | null>(null);
  const [owner, setOwner] = React.useState<string>("");
  const [ownerType, setOwnerType] = React.useState<"user" | "organization">("user");
  const [currentUser, setCurrentUser] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<RepositoryType>("all");
  const [languageFilter, setLanguageFilter] = React.useState<RepositoryLanguage>("all");
  const [sortBy, setSortBy] = React.useState<RepositorySortOption>("updated");
  const [repositories, setRepositories] = React.useState<RepositoryData[]>([]);
  const [viewMode, setViewMode] = React.useState<"public" | "owner">("owner");
  const [showViewDropdown, setShowViewDropdown] = React.useState(false);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  React.useEffect(() => {
    async function loadUser() {
      try {
        const user = await authEngine.getCurrentUser();
        setCurrentUser(user?.username || null);
      } catch {
        setCurrentUser(null);
      }
    }
    loadUser();
  }, []);

  React.useEffect(() => {
    async function loadOwnerData() {
      if (!resolvedParams) return;

      const ownerSlug = resolvedParams.owner;
      setOwner(ownerSlug);

      const org = await getOrganizationBySlug(ownerSlug);
      setOwnerType(org ? "organization" : "user");

      const repos = await getRepositoriesByOwner(ownerSlug);
      setRepositories(repos);
    }
    loadOwnerData();
  }, [resolvedParams]);

  const isOwner = currentUser?.toLowerCase() === owner.toLowerCase();
  const canViewPrivate = isOwner;

  const pinnedRepositories = React.useMemo(() => {
    return repositories.slice(0, 4);
  }, [repositories]);

  const displayedRepositories = React.useMemo(() => {
    let result = [...repositories];

    if (!canViewPrivate || viewMode === "public") {
      result = result.filter((repo) => repo.visibility === "public");
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((repo) => repo.name.toLowerCase().includes(query));
    }

    if (typeFilter !== "all") {
      result = result.filter((repo) => repo.visibility === typeFilter);
    }

    if (languageFilter !== "all") {
      result = result.filter((repo) => repo.language === languageFilter);
    }

    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "stars":
        result.sort((a, b) => b.stars - a.stars);
        break;
      case "updated":
      default:
        result.sort((a, b) => b.updatedAt - a.updatedAt);
        break;
    }

    return result;
  }, [repositories, searchQuery, typeFilter, languageFilter, sortBy, viewMode, canViewPrivate]);

  const nonPinnedRepositories = displayedRepositories.filter(
    (repo) => !pinnedRepositories.find((p) => p.id === repo.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <BookMarked className="w-6 h-6" />
            Repositories
          </h1>
          {isOwner && (
            <Link href={`/new?owner=${owner}`}>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Repository
              </Button>
            </Link>
          )}
        </div>

        {canViewPrivate && (
          <div className="rounded-md border border-border p-2 flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground px-2">
              <Eye className="w-4 h-4" />
              <span>View as:</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowViewDropdown(!showViewDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border bg-background hover:bg-muted transition-colors"
              >
                {viewMode === "owner" ? "Owner" : "Public"}
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {showViewDropdown && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-10"
                      onClick={() => setShowViewDropdown(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-1 w-32 rounded-md border border-border bg-popover shadow-lg z-20"
                    >
                      <button
                        onClick={() => {
                          setViewMode("owner");
                          setShowViewDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm rounded-t-md transition-colors ${
                          viewMode === "owner"
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        Owner
                      </button>
                      <button
                        onClick={() => {
                          setViewMode("public");
                          setShowViewDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm rounded-b-md transition-colors ${
                          viewMode === "public"
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        Public
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
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

        {pinnedRepositories.length > 0 &&
          !searchQuery &&
          typeFilter === "all" &&
          languageFilter === "all" && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Pin className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Pinned</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pinnedRepositories.map((repo) => (
                  <div
                    key={repo.id}
                    className="rounded-md border border-border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Link
                        href={repo.url}
                        className="font-semibold text-[#2f81f7] hover:underline"
                      >
                        {repo.name}
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
                    {repo.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {repo.description}
                      </p>
                    )}
                    {repo.language && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: repo.languageColor || "#6e7681" }}
                        />
                        {repo.language}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {displayedRepositories.length > 0 ? (
          <RepositoryList
            repositories={
              nonPinnedRepositories.length > 0 ? nonPinnedRepositories : displayedRepositories
            }
          />
        ) : (
          <RepositoryEmptyState owner={owner} canCreate={isOwner} />
        )}
      </div>
    </div>
  );
}
