"use client";

import * as React from "react";
import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface NewDiscussionPageProps {
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
  repoFullName: string;
}

interface DiscussionCategory {
  id: number;
  name: string;
  emoji: string;
  description: string;
  is_answerable: boolean;
}

const defaultCategories: DiscussionCategory[] = [
  {
    id: 1,
    name: "General",
    emoji: "?",
    description: "General conversation and updates.",
    is_answerable: false,
  },
  {
    id: 2,
    name: "Ideas",
    emoji: "*",
    description: "Brainstorm new ideas and enhancements.",
    is_answerable: false,
  },
  {
    id: 3,
    name: "Q&A",
    emoji: "!",
    description: "Ask questions and get answers.",
    is_answerable: true,
  },
  {
    id: 4,
    name: "Announcements",
    emoji: "!",
    description: "News and announcements.",
    is_answerable: false,
  },
];

export default function NewDiscussionPage({ params }: NewDiscussionPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [repo, setRepo] = useState<Repository | null>(null);
  const [categories, setCategories] = useState<DiscussionCategory[]>(defaultCategories);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    defaultCategories[0].id.toString()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  const loadGithubCategories = useCallback(async () => {
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

      const response = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/discussions/categories`,
        { headers }
      );

      if (response.ok) {
        const categoriesData: DiscussionCategory[] = await response.json();
        if (categoriesData.length > 0) {
          setCategories(categoriesData);
          setSelectedCategoryId(categoriesData[0].id.toString());
        }
      }
    } catch (error) {
      console.error("Failed to load GitHub discussion categories:", error);
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
      loadGithubCategories();
    }
  }, [repo, loadGithubCategories]);

  const handleCreateDiscussion = async () => {
    if (!title.trim() || !body.trim()) return;

    const selectedCategory = categories.find(
      (category) => category.id.toString() === selectedCategoryId
    );
    if (!selectedCategory) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (repo?.mirrorFrom) {
        const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
        if (githubMatch) {
          const [, mirrorOwner, mirrorRepo] = githubMatch;
          const repoName = mirrorRepo.replace(/\.git$/, "");
          const token = await getGitHubToken();

          if (token) {
            const response = await fetch(
              `https://api.github.com/repos/${mirrorOwner}/${repoName}/discussions`,
              {
                method: "POST",
                headers: {
                  Accept: "application/vnd.github.v3+json",
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: title.trim(),
                  body: body.trim(),
                  category_id: selectedCategory.id,
                }),
              }
            );

            if (response.ok) {
              const createdDiscussion = await response.json();
              router.push(`/${repoFullName}/discussions/${createdDiscussion.number}`);
              return;
            }
          }
        }
      }

      const existingDiscussions = await db.getAllByIndex<Discussion>(
        STORES.DISCUSSIONS,
        "repoFullName",
        repoFullName
      );
      const maxNumber =
        existingDiscussions.length > 0
          ? Math.max(...existingDiscussions.map((discussion) => discussion.number))
          : 0;
      const now = new Date().toISOString();
      const discussion: Discussion = {
        id: Date.now(),
        number: maxNumber + 1,
        title: title.trim(),
        body: body.trim(),
        bodyHTML: body.trim(),
        answer: null,
        category: {
          id: selectedCategory.id,
          name: selectedCategory.name,
          emoji: selectedCategory.emoji,
          description: selectedCategory.description,
        },
        author: {
          login: "currentUser",
          avatar_url: "",
        },
        created_at: now,
        updated_at: now,
        comments: 0,
        upvotes: 0,
        state: "open",
        repoFullName,
      };

      await db.add(STORES.DISCUSSIONS, discussion);
      router.push(`/${repoFullName}/discussions`);
    } catch (error) {
      setErrorMessage("Unable to create the discussion. Please try again.");
      console.error("Failed to create discussion:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find(
    (category) => category.id.toString() === selectedCategoryId
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-4 -ml-2">
          <Link href={`/${repoFullName}/discussions`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to discussions
          </Link>
        </Button>

        <div className="border border-border rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-1">New discussion</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Start a new conversation in {repoFullName}.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Discussion title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.emoji} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCategory && (
                <p className="text-xs text-muted-foreground">{selectedCategory.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Body</label>
              <Textarea
                placeholder="Share details, context, and what you are looking for."
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={8}
              />
            </div>

            {errorMessage && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href={`/${repoFullName}/discussions`}>Cancel</Link>
              </Button>
              <Button
                onClick={handleCreateDiscussion}
                disabled={isSubmitting || !title.trim() || !body.trim()}
              >
                {isSubmitting ? "Creating..." : "Create discussion"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
