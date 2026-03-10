"use client";

import * as React from "react";
import { use, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ArrowLeft, Heart, HelpCircle, Megaphone, Lightbulb } from "lucide-react";
import { getGitHubToken } from "@/lib/github-token";
import { getRepository, type Repository } from "@/lib/repo/RepositoryData";

interface DiscussionPageProps {
  params: Promise<{ owner: string; repo: string; id: string }>;
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
}

interface DiscussionComment {
  id: number;
  body: string;
  bodyHTML: string;
  author: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  reactions: {
    total_count: number;
  };
}

export default function DiscussionPage({ params }: DiscussionPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [repo, setRepo] = useState<Repository | null>(null);
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [comments, setComments] = useState<DiscussionComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;
  const discussionNumber = parseInt(resolvedParams.id, 10);

  const loadGithubDiscussion = useCallback(async () => {
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

      const [discussionResponse, commentsResponse] = await Promise.all([
        fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/discussions/${discussionNumber}`,
          { headers }
        ),
        fetch(
          `https://api.github.com/repos/${mirrorOwner}/${repoName}/discussions/${discussionNumber}/comments?per_page=50`,
          { headers }
        ),
      ]);

      if (discussionResponse.ok) {
        const data = await discussionResponse.json();
        const mappedDiscussion: Discussion = {
          id: data.id,
          number: data.number,
          title: data.title,
          body: data.body || "",
          bodyHTML: data.body_html || "",
          answer: data.answer,
          category: data.category,
          author: data.user,
          created_at: data.created_at,
          updated_at: data.updated_at,
          comments: data.comments,
          upvotes: data.upvote_count,
          state: data.state === "open" ? "open" : "closed",
        };
        setDiscussion(mappedDiscussion);
      }

      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        const mappedComments: DiscussionComment[] = commentsData.map(
          (comment: {
            id: number;
            body: string;
            body_html: string;
            user: { login: string; avatar_url: string };
            created_at: string;
            reactions: { total_count: number };
          }) => ({
            id: comment.id,
            body: comment.body || "",
            bodyHTML: comment.body_html || "",
            author: comment.user,
            created_at: comment.created_at,
            reactions: comment.reactions,
          })
        );
        setComments(mappedComments);
      }
    } catch (error) {
      console.error("Failed to load GitHub discussion:", error);
    }
  }, [repo?.mirrorFrom, discussionNumber]);

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
      loadGithubDiscussion();
    }
  }, [repo, repoFullName, loadGithubDiscussion]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !repo?.mirrorFrom) return;

    const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) return;

    const [, mirrorOwner, mirrorRepo] = githubMatch;
    const repoName = mirrorRepo.replace(/\.git$/, "");

    setIsSubmitting(true);
    try {
      const token = await getGitHubToken();
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${mirrorOwner}/${repoName}/discussions/${discussionNumber}/comments`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ body: newComment }),
        }
      );

      if (response.ok) {
        setNewComment("");
        loadGithubDiscussion();
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">Discussion not found</p>
          <Button asChild>
            <Link href={`/${repoFullName}/discussions`}>Back to discussions</Link>
          </Button>
        </div>
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

        <div className="border border-border rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-2xl">{discussion.category.emoji}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-2">{discussion.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>#{discussion.number}</span>
                <span>•</span>
                <span>Opened on {formatDate(discussion.created_at)}</span>
                <span>•</span>
                <span>by</span>
                <a href={`/${discussion.author.login}`} className="hover:text-blue-600">
                  {discussion.author.login}
                </a>
              </div>
            </div>
          </div>

          {discussion.answer && (
            <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
              ✓ Answered
            </Badge>
          )}

          <div
            className="prose prose-sm max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: discussion.bodyHTML }}
          />

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart className="w-4 h-4" />
              {discussion.upvotes}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              {discussion.comments} comments
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>

          {comments.length === 0 ? (
            <div className="text-center py-8 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No comments yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={comment.author.avatar_url}
                      alt={comment.author.login}
                      className="w-6 h-6 rounded-full"
                    />
                    <a
                      href={`/${comment.author.login}`}
                      className="font-medium text-sm hover:text-blue-600"
                    >
                      {comment.author.login}
                    </a>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: comment.bodyHTML }}
                  />
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      {comment.reactions.total_count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Add a comment</h3>
          <Textarea
            placeholder="Leave a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="mb-2"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitComment} disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? "Posting..." : "Comment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
