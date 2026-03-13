"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Plus,
  Search,
  FileText,
  GitPullRequest,
  Clock,
  User,
  Edit,
  Trash2,
  ChevronRight,
  Home,
  Menu,
} from "lucide-react";

interface WikiPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  authorAvatar?: string;
  createdAt: number;
  updatedAt: number;
  commentsCount: number;
}

interface WikiPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function WikiPage({ params }: WikiPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;
  const repoFullName = `${owner}/${repo}`;

  const [pages, setPages] = React.useState<WikiPage[]>([
    {
      id: "1",
      title: "Home",
      slug: "home",
      content: `# Welcome to the Wiki\n\nThis is the main page of your repository wiki. Use the sidebar to navigate to other pages or create new ones.\n\n## Getting Started\n\n- Click the "New page" button to create a new wiki page\n- Use Markdown to format your content\n- Link to other wiki pages using [[Page Name]] syntax\n\n## Features\n\n- **Markdown support** - Write your documentation in Markdown\n- **Version history** - Track changes over time\n- **Collaboration** - Work together with your team\n- **Search** - Find any page quickly`,
      author: "currentUser",
      createdAt: Date.now() - 86400000 * 7,
      updatedAt: Date.now() - 86400000 * 2,
      commentsCount: 3,
    },
    {
      id: "2",
      title: "Installation",
      slug: "installation",
      content: `# Installation Guide\n\nFollow these steps to install and set up the project.\n\n## Prerequisites\n\n- Node.js 18+\n- npm or yarn\n- Git\n\n## Steps\n\n1. Clone the repository\n2. Install dependencies\n3. Configure environment\n4. Run the development server`,
      author: "currentUser",
      createdAt: Date.now() - 86400000 * 5,
      updatedAt: Date.now() - 86400000,
      commentsCount: 1,
    },
    {
      id: "3",
      title: "API Reference",
      slug: "api-reference",
      content: `# API Reference\n\n## Authentication\n\nAll API requests require authentication...\n\n## Endpoints\n\n### GET /api/users\n\nReturns a list of users.\n\n### POST /api/users\n\nCreates a new user.`,
      author: "currentUser",
      createdAt: Date.now() - 86400000 * 3,
      updatedAt: Date.now(),
      commentsCount: 0,
    },
    {
      id: "4",
      title: "Contributing",
      slug: "contributing",
      content: `# Contributing Guidelines\n\nThank you for your interest in contributing!\n\n## Code of Conduct\n\nPlease be respectful and professional.\n\n## How to Contribute\n\n1. Fork the repository\n2. Create a feature branch\n3. Make your changes\n4. Submit a pull request`,
      author: "currentUser",
      createdAt: Date.now() - 86400000 * 10,
      updatedAt: Date.now() - 86400000 * 4,
      commentsCount: 2,
    },
  ]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedPage, setSelectedPage] = React.useState<WikiPage | null>(pages[0]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [newPageTitle, setNewPageTitle] = React.useState("");
  const [newPageContent, setNewPageContent] = React.useState("");

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePage = () => {
    if (!newPageTitle.trim()) return;

    const slug = newPageTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newPage: WikiPage = {
      id: String(Date.now()),
      title: newPageTitle,
      slug,
      content: newPageContent,
      author: "currentUser",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      commentsCount: 0,
    };

    setPages([...pages, newPage]);
    setSelectedPage(newPage);
    setNewPageTitle("");
    setNewPageContent("");
    setIsCreateDialogOpen(false);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const renderMarkdown = (content: string) => {
    return content
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-semibold mt-6 mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>')
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/^(.+)$/gm, (match) => {
        if (match.startsWith("<") || match === "") return match;
        return `<p class="mb-3">${match}</p>`;
      });
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="w-64 shrink-0">
            <div className="sticky top-0 space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Wiki
                  </h2>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>New page</DialogTitle>
                        <DialogDescription>Create a new wiki page</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Input
                            placeholder="Page title"
                            value={newPageTitle}
                            onChange={(e) => setNewPageTitle(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Page content (Markdown supported)"
                            value={newPageContent}
                            onChange={(e) => setNewPageContent(e.target.value)}
                            rows={10}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreatePage} disabled={!newPageTitle.trim()}>
                          Create page
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search wiki..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <nav className="space-y-1">
                  {filteredPages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => setSelectedPage(page)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-left transition-colors ${
                        selectedPage?.id === page.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="truncate">{page.title}</span>
                    </button>
                  ))}
                </nav>

                {filteredPages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No pages found</p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">Wiki settings</h3>
                <div className="space-y-2">
                  <Link
                    href={`/${owner}/${repo}/settings`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <GitPullRequest className="w-4 h-4" />
                    Wiki settings
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {selectedPage ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href={`/${owner}/${repo}/wiki`} className="hover:text-foreground">
                      Wiki
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span>{selectedPage.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b">
                    <h1 className="text-2xl font-semibold">{selectedPage.title}</h1>
                  </div>
                  <div
                    className="prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedPage.content) }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedPage.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Updated {formatDate(selectedPage.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{selectedPage.commentsCount} comments</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border rounded-lg">
                <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Welcome to the Wiki</h2>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  The wiki is a space for documentation that you can maintain for your repository.
                  Create your first page to get started.
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New page
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
