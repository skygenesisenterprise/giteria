"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Layers,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Bug,
  Zap,
  CheckSquare,
  Tag,
  Milestone,
  Users,
  MessageSquare,
  GitBranch,
  Link2,
  Search,
  Filter,
  Shield,
  Lock,
  Settings,
  ChevronRight,
  Eye,
  GitPullRequest,
  Workflow,
  Building2,
  Rocket,
  Hammer,
} from "lucide-react";

const organizeItems = [
  {
    icon: Bug,
    title: "Bug Tracking",
    description:
      "Track and manage bugs with priority levels, assignees, and detailed reproduction steps.",
  },
  {
    icon: Zap,
    title: "Feature Requests",
    description:
      "Collect and prioritize feature requests. Let your community vote and contribute ideas.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description:
      "Create tasks, subtasks, and checklists. Keep your team aligned on what needs to be done.",
  },
  {
    icon: Tag,
    title: "Labels & Milestones",
    description:
      "Organize issues with custom labels and track progress through milestones and releases.",
  },
  {
    icon: Users,
    title: "Assignees",
    description:
      "Assign issues to team members. Clear ownership ensures nothing falls through the cracks.",
  },
];

const collaborationItems = [
  {
    icon: MessageSquare,
    title: "Discussion Threads",
    description:
      "Have detailed conversations directly on issues. Keep context and decisions together.",
  },
  {
    icon: Users,
    title: "Mentions",
    description:
      "Tag team members to get their attention. Link issues to pull requests automatically.",
  },
  {
    icon: Zap,
    title: "Reactions",
    description:
      "Quick feedback with emoji reactions. Agree, celebrate, or show interest without commenting.",
  },
  {
    icon: Link2,
    title: "Cross-References",
    description:
      "Link related issues together. Create a web of context that helps teams understand the big picture.",
  },
  {
    icon: GitPullRequest,
    title: "Linked Pull Requests",
    description: "Automatically link pull requests to issues. Close issues when PRs are merged.",
  },
];

const integrationItems = [
  {
    icon: GitBranch,
    title: "Repository Integration",
    description:
      "Every issue lives in a repository. Full context of code, commits, and branches at your fingertips.",
  },
  {
    icon: GitPullRequest,
    title: "Pull Request Links",
    description: "Reference issues in PR descriptions. Automatically close issues when PRs merge.",
  },
  {
    icon: Workflow,
    title: "Actions Integration",
    description:
      "Trigger CI/CD workflows from issues. Link workflow runs and get automated status updates.",
  },
  {
    icon: Layers,
    title: "Project Boards",
    description:
      "Organize issues on kanban boards. Drag and drop to manage work in progress visually.",
  },
];

const visibilityItems = [
  {
    icon: Filter,
    title: "Advanced Filtering",
    description:
      "Filter by status, assignee, label, milestone, or author. Save filters for quick access.",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "Full-text search across all issues. Find what you need with powerful query syntax.",
  },
  {
    icon: Shield,
    title: "Permissions",
    description: "Fine-grained access control. Control who can view, create, and manage issues.",
  },
  {
    icon: Building2,
    title: "Organization Management",
    description:
      "Manage issues across multiple repositories. Enterprise-ready with team and org policies.",
  },
];

const useCases = [
  {
    icon: Rocket,
    title: "Open Source Maintainers",
    description:
      "Manage community contributions, track bugs reported by users, and prioritize feature requests from your ecosystem.",
    benefits: ["Community issue triage", "Contribution guidelines", "External contributor support"],
  },
  {
    icon: Users,
    title: "Startup Product Teams",
    description:
      "Ship faster with clear roadmaps. Align engineering, design, and product on what matters most.",
    benefits: ["Sprint planning", "Feature tracking", "Stakeholder visibility"],
  },
  {
    icon: Building2,
    title: "Enterprise Planning",
    description:
      "Coordinate across multiple teams and repositories. Maintain visibility and compliance at scale.",
    benefits: ["Org-wide policies", "Audit trails", "Team dashboards"],
  },
  {
    icon: Hammer,
    title: "Solo Developers",
    description:
      "Keep track of what needs to be done. Simple issue tracking that doesn't get in your way.",
    benefits: ["Quick capture", "Personal reminders", "Zero setup"],
  },
];

export default function IssuesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Issue Tracking
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Track bugs.
                <span className="block text-primary">Manage tasks.</span>
                <span className="block text-foreground">Ship faster.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A streamlined issue tracking system designed to centralize collaboration and
                accelerate development. From bug reports to feature requests, keep your team aligned
                and moving forward.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Create an Issue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link
                  href="https://docs.giteria.com/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                  >
                    <Terminal className="w-5 h-5 mr-2" />
                    View Documentation
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Unlimited issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Self-hosted</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/80" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-3 h-3 rounded-full bg-primary/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-muted-foreground font-mono">
                      giteria — my-org/webapp / Issues
                    </span>
                  </div>
                </div>
                <div className="p-3 font-mono text-xs md:text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-2 rounded hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground font-medium truncate">
                            Fix login redirect loop
                          </span>
                          <span className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-500 rounded">
                            Open
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>#284</span>
                          <span className="text-muted-foreground/60">•</span>
                          <Bug className="w-3 h-3" />
                          <span>bug</span>
                          <span className="text-muted-foreground/60">•</span>
                          <Users className="w-3 h-3" />
                          <span>johndoe</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground font-medium truncate">
                            Add dark mode toggle
                          </span>
                          <span className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-500 rounded">
                            Open
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>#283</span>
                          <span className="text-muted-foreground/60">•</span>
                          <Zap className="w-3 h-3" />
                          <span>enhancement</span>
                          <span className="text-muted-foreground/60">•</span>
                          <Users className="w-3 h-3" />
                          <span>jane</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground font-medium truncate">
                            Update API documentation
                          </span>
                          <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                            In Progress
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>#282</span>
                          <span className="text-muted-foreground/60">•</span>
                          <Tag className="w-3 h-3" />
                          <span>documentation</span>
                          <span className="text-muted-foreground/60">•</span>
                          <Users className="w-3 h-3" />
                          <span>alex</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground px-2">
                      <CheckSquare className="w-3 h-3" />
                      <span>3 open</span>
                      <span className="text-muted-foreground/60">•</span>
                      <GitPullRequest className="w-3 h-3" />
                      <span>2 linked PRs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Organize Your Work Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Organize your <span className="text-primary">work</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to track bugs, manage tasks, and prioritize work. Flexible enough
              for any workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizeItems.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Collaboration Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built for
                <span className="block text-primary">collaboration.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Issues are where conversations happen. Keep discussions focused, contextual, and
                actionable with powerful collaboration features.
              </p>

              <div className="space-y-3">
                {collaborationItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/80" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    Issue #284 — Fix login redirect loop
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">johndoe</span>
                        <span className="text-xs text-muted-foreground">commented 2h ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        I think this might be related to the session token refresh. Let me check the
                        auth middleware.
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                          <MessageSquare className="w-3 h-3" />
                          <span>Reply</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                          <Zap className="w-3 h-3" />
                          <span>React</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>3 mentions</span>
                      <span className="text-muted-foreground/60">•</span>
                      <GitPullRequest className="w-3 h-3" />
                      <span>1 linked PR</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Link2 className="w-3 h-3" />
                      <span>2 references</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Workflow Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Layers className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Project Board</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="text-xs font-medium text-foreground mb-2">To Do</div>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-card border border-border text-xs text-foreground">
                        Add dark mode toggle
                      </div>
                      <div className="p-2 rounded bg-card border border-border text-xs text-foreground">
                        Update API docs
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="text-xs font-medium text-foreground mb-2">In Progress</div>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-card border border-border text-xs text-foreground">
                        Fix login redirect
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="text-xs font-medium text-foreground mb-2">Done</div>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-card border border-border text-xs text-foreground">
                        Setup CI/CD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Workflow className="w-4 h-4" />
                Integrated Workflow
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Connected to
                <span className="block text-primary">your ecosystem.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Issues don't exist in isolation. They're deeply integrated with repositories, pull
                requests, and CI/CD — creating a seamless development workflow.
              </p>

              <div className="space-y-4">
                {integrationItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visibility & Control Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Eye className="w-4 h-4" />
                Visibility & Control
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Find what you need.
                <span className="block text-primary">Control who sees it.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Powerful filtering and search help you find issues quickly. Fine-grained permissions
                ensure the right people have the right access.
              </p>

              <div className="space-y-3">
                {visibilityItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/80" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">Search Issues</span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-primary">is:issue</span>
                    <span className="text-muted-foreground">assignee:@me</span>
                    <span className="text-muted-foreground">label:bug</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-muted/30 border border-border text-foreground">
                      Fix login redirect loop #284
                    </div>
                    <div className="p-2 rounded bg-muted/30 border border-border text-foreground">
                      Payment API timeout #279
                    </div>
                    <div className="p-2 rounded bg-muted/30 border border-border text-foreground">
                      Memory leak in worker #275
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-green-500">
                      <Filter className="w-3 h-3" />
                      <span>3 issues found</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Settings className="w-3 h-3" />
                      <span>Saved filter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-primary">every team</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you're an open source maintainer or part of a large enterprise, Giteria Issues
              scales to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <useCase.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to organize your work?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Start tracking issues in minutes. Simple, powerful, and completely self-hosted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Create an Issue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <Layers className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Unlimited</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Self-hosted</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
