"use client";

import * as React from "react";
import { use, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, HelpCircle, Megaphone, Heart, Lightbulb } from "lucide-react";
import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface DiscussionsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface Discussion {
  id: number;
  number: number;
  title: string;
  body: string;
  bodyHTML: string;
  answer: { id: number } | null;
  category: {
    id: number;
    name: string;
    emoji: string;
    description: string;
  };
  author: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  comments: number;
  upvotes: number;
  state: "open" | "closed";
  repoFullName?: string;
}

interface DiscussionCategory {
  id: number;
  name: string;
  emoji: string;
  description: string;
  is_answerable: boolean;
}

export default function DiscussionsPage({ params }: DiscussionsPageProps) {
  const resolvedParams = use(params);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [localDiscussions, setLocalDiscussions] = useState<Discussion[]>([]);
  const [githubDiscussions, setGithubDiscussions] = useState<Discussion[]>([]);
  const [categories, setCategories] = useState<DiscussionCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"open" | "closed" | "all">("open");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  const loadLocalDiscussions = useCallback(async () => {
    try {
      const local = await db.getAllByIndex<Discussion>(
        STORES.DISCUSSIONS,
        "repoFullName",
        repoFullName
      );
      setLocalDiscussions(local.map((d) => ({ ...d, repoFullName })));
    } catch (error) {
      console.error("Failed to load local discussions:", error);
    }
  }, [repoFullName]);

  const loadGithubDiscussions = useCallback(async () => {
    if (!repo?.mirrorFrom) return;

    const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) return;

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

      const [discussionsResponse, categoriesResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}/discussions?per_page=30`, {
          headers,
        }),
        fetch(`https://api.github.com/repos/${mirrorOwner}/${repoName}/discussions/categories`, {
          headers,
        }),
      ]);

      if (discussionsResponse.ok) {
        const data = await discussionsResponse.json();
        const mappedDiscussions: Discussion[] = data.map(
          (discussion: {
            id: number;
            number: number;
            title: string;
            body: string;
            body_html: string;
            answer: { id: number } | null;
            category: { id: number; name: string; emoji: string; description: string };
            user: { login: string; avatar_url: string };
            created_at: string;
            updated_at: string;
            comments: number;
            upvote_count: number;
            state: string;
          }) => ({
            id: discussion.id,
            number: discussion.number,
            title: discussion.title,
            body: discussion.body || "",
            bodyHTML: discussion.body_html || "",
            answer: discussion.answer,
            category: discussion.category,
            author: discussion.user,
            created_at: discussion.created_at,
            updated_at: discussion.updated_at,
            comments: discussion.comments,
            upvotes: discussion.upvote_count,
            state: discussion.state === "open" ? "open" : "closed",
          })
        );
        setGithubDiscussions(mappedDiscussions);
      }

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error("Failed to load GitHub discussions:", error);
    }
  }, [repo?.mirrorFrom]);

  useEffect(() => {
    async function fetchRepo() {
      try {
        const repository = await getRepository(resolvedParams.owner, resolvedParams.repo);
        setRepo(repository);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRepo();
  }, [resolvedParams.owner, resolvedParams.repo]);

  useEffect(() => {
    if (repo?.mirrorFrom) {
      loadGithubDiscussions();
    }
    loadLocalDiscussions();
  }, [repo, repoFullName, loadGithubDiscussions, loadLocalDiscussions]);

  useEffect(() => {
    if (!repo?.mirrorFrom) return;

    const interval = setInterval(
      () => {
        loadGithubDiscussions();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [repo?.mirrorFrom, loadGithubDiscussions]);

  const allDiscussions = [...localDiscussions, ...githubDiscussions];
  const uniqueDiscussions = allDiscussions.filter(
    (discussion, index, self) => index === self.findIndex((d) => d.id === discussion.id)
  );

  const filteredDiscussions = uniqueDiscussions.filter((discussion) => {
    const matchesFilter = filter === "all" || discussion.state === filter;
    const matchesCategory =
      categoryFilter === "all" || discussion.category.id.toString() === categoryFilter;
    const matchesSearch =
      !searchQuery ||
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const openCount = uniqueDiscussions.filter((d) => d.state === "open").length;
  const closedCount = uniqueDiscussions.filter((d) => d.state === "closed").length;

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes("help") || name.includes("question"))
      return <HelpCircle className="w-4 h-4" />;
    if (name.includes("announce") || name.includes("news"))
      return <Megaphone className="w-4 h-4" />;
    if (name.includes("idea")) return <Lightbulb className="w-4 h-4" />;
    if (name.includes("kudos") || name.includes("love")) return <Heart className="w-4 h-4" />;
    return <MessageSquare className="w-4 h-4" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Discussions</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {openCount} open • {closedCount} closed
            </p>
          </div>
          <Button asChild>
            <Link href={`/${repoFullName}/discussions/new`}>
              <Plus className="w-4 h-4 mr-2" />
              New discussion
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-75">
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.emoji} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredDiscussions.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No discussions found</p>
            <Button variant="link" asChild className="mt-2">
              <Link href={`/${repoFullName}/discussions/new`}>Start a new discussion</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="mt-1 text-lg">{discussion.category.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`/${repoFullName}/discussions/${discussion.number}`}
                      className="font-medium hover:text-blue-600 truncate"
                    >
                      {discussion.title}
                    </a>
                    {discussion.answer && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Answered
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    #{discussion.number} • {discussion.author.login} •{" "}
                    {formatDate(discussion.created_at)}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {discussion.comments}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    {discussion.upvotes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
