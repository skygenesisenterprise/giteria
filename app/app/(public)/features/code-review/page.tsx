"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  GitPullRequest,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Zap,
  Shield,
  Bell,
  Users,
  FileCode,
  Layers,
  Code2,
  Eye,
  Clock,
  GitBranch,
  Lock,
  Settings,
  Search,
  Plus,
  Minus,
  MessageCircle,
  ThumbsUp,
  AlertCircle,
  ChevronRight,
  Workflow,
  FileText,
  Link2,
  History,
  Gauge,
  Handshake,
  Globe,
  Building2,
  Rocket,
} from "lucide-react";

const clarityFeatures = [
  {
    icon: MessageSquare,
    title: "Inline Comments",
    description:
      "Comment directly on specific lines of code. Contextual feedback that developers can act on immediately.",
  },
  {
    icon: Plus,
    title: "Suggested Changes",
    description:
      "Propose code changes that authors can apply with one click. Fix issues faster with ready-made solutions.",
  },
  {
    icon: Layers,
    title: "Multi-line Review",
    description:
      "Review entire files or select specific line ranges. Comprehensive feedback across all changes.",
  },
  {
    icon: FileCode,
    title: "File-by-File Diff",
    description:
      "Navigate changes file by file. Clear visualization of what changed, where, and why.",
  },
  {
    icon: Code2,
    title: "Syntax Highlighting",
    description:
      "Beautiful code diffs with language-aware highlighting. Read changes easily across 100+ languages.",
  },
];

const workflowItems = [
  {
    icon: GitPullRequest,
    title: "Native Pull Requests",
    description:
      "Full pull request workflow built into Giteria. Create, review, and merge without leaving the platform.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description:
      "Instant alerts for new comments, mentions, and review requests. Never miss important feedback.",
  },
  {
    icon: Users,
    title: "Required Reviewers",
    description:
      "Configure mandatory reviewers for specific paths or branches. Ensure the right people approve changes.",
  },
  {
    icon: Shield,
    title: "Status Checks",
    description:
      "Integrate with CI/CD pipelines. Block merges until all checks pass. Quality gates enforced automatically.",
  },
  {
    icon: Lock,
    title: "Branch Protection",
    description:
      "Protect branches from direct pushes. Enforce review requirements and maintain code quality.",
  },
];

const approvalItems = [
  {
    icon: MessageCircle,
    title: "Clear Conversation Threads",
    description:
      "Organized discussions tied to specific code sections. Easy to follow, easy to resolve.",
  },
  {
    icon: AlertCircle,
    title: "Change Requests",
    description:
      "Request specific changes before approval. Authors see exactly what needs to be addressed.",
  },
  {
    icon: ThumbsUp,
    title: "Approval States",
    description:
      "Multiple review states: approved, changes requested, pending. Clear signal on review status.",
  },
  {
    icon: Zap,
    title: "Automated Checks",
    description:
      "CI/CD integration runs tests automatically. Get fast feedback before a human even reviews.",
  },
];

const collaborationItems = [
  {
    icon: Users,
    title: "Team Permissions",
    description:
      "Fine-grained access control at organization, team, and repository levels. Right access for everyone.",
  },
  {
    icon: GitBranch,
    title: "Review Assignments",
    description:
      "Auto-assign reviewers based on code ownership, path rules, or round-robin. Fair distribution guaranteed.",
  },
  {
    icon: History,
    title: "Audit Trail",
    description:
      "Complete history of all reviews, comments, and decisions. Full traceability for compliance.",
  },
  {
    icon: Building2,
    title: "Enterprise Governance",
    description:
      "Policies, rules, and enforcement at scale. Large organizations stay in control of their code.",
  },
];

const useCases = [
  {
    icon: Rocket,
    title: "Startup Engineering Teams",
    description:
      "Move fast without breaking things. Lightweight reviews that keep quality high and velocity up.",
    benefits: ["Fast feedback loops", "Flexible approval rules", "Built-in CI integration"],
  },
  {
    icon: Globe,
    title: "Open Source Maintainers",
    description:
      "Manage contributions from community developers. Clear guidelines, consistent reviews, healthy projects.",
    benefits: ["Contributor guidelines", "Automated checks", "License compliance"],
  },
  {
    icon: Building2,
    title: "Enterprise Development",
    description:
      "Strict controls meet developer experience. Compliance requirements met without slowing down teams.",
    benefits: ["Full audit trail", "Role-based access", "Policy enforcement"],
  },
  {
    icon: Users,
    title: "Distributed Teams",
    description:
      "Async reviews that work across time zones. Clear communication without synchronous dependencies.",
    benefits: ["Async by default", "Time-zone friendly", "Clear status tracking"],
  },
];

export default function CodeReviewPage() {
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
                Code Quality First
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Code review that
                <span className="block text-primary">works for you.</span>
                <span className="block text-foreground">Built-in.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A structured review system designed to improve code quality without slowing down
                development. Inline comments, suggested changes, and seamless integration with your
                workflow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Start a Review
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link
                  href="https://docs.giteria.com/code-review"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                  >
                    <Terminal className="w-5 h-5 mr-2" />
                    Learn How It Works
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Inline comments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Suggested changes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>CI integration</span>
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
                      giteria — my-org/webapp / PR #142
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">
                      feat: add user authentication
                    </span>
                    <span className="ml-auto text-xs px-2 py-0.5 bg-green-500/10 text-green-500 rounded">
                      Approved
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+187</span>
                      <span className="text-destructive">-42</span>
                      <span className="text-foreground">lines changed</span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3 h-3 text-primary" />
                        <span className="text-foreground text-xs">src/auth/login.tsx</span>
                        <span className="text-primary text-xs ml-auto">Line 24</span>
                      </div>
                      <div className="ml-4 p-2 rounded bg-muted/30 text-xs text-muted-foreground">
                        Consider adding error handling for invalid credentials.
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">2 approvals</span>
                      <span className="text-muted-foreground/60">•</span>
                      <ThumbsUp className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">LGTM</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Zap className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">CI passing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Review with Clarity Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Review with <span className="text-primary">clarity</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every tool you need to provide clear, actionable feedback. Make reviews faster and
              more effective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clarityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built into your workflow Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built into your
                <span className="block text-primary">workflow.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Code review that feels like a natural part of development, not an afterthought.
                Everything works together seamlessly.
              </p>

              <div className="space-y-3">
                {workflowItems.map((item, index) => (
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
                    Pull Request Settings
                  </span>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Required Reviewers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                          A
                        </div>
                        <div className="w-6 h-6 rounded-full bg-[#a371f7]/20 flex items-center justify-center text-xs text-[#a371f7]">
                          B
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">2 required</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Status Checks</span>
                      </div>
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Required
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Branch Protection</span>
                      </div>
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Enabled
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Notifications</span>
                      </div>
                      <span className="text-xs text-muted-foreground">All updates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faster Approvals Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/80" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    Review Conversation
                  </span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Users className="w-3 h-3 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-foreground font-medium">sarah</span>
                          <span className="text-xs text-muted-foreground">commented 2h ago</span>
                        </div>
                        <div className="p-2 rounded bg-muted/30 text-muted-foreground text-xs">
                          The error handling here looks good. Should we also log the error details
                          for debugging?
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <ThumbsUp className="w-3 h-3 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-foreground font-medium">john</span>
                          <span className="text-xs text-muted-foreground">approved 1h ago</span>
                        </div>
                        <div className="p-2 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-xs">
                          LGTM! Nice work on this one.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span>2 approvals</span>
                      <span className="text-muted-foreground/60">•</span>
                      <MessageSquare className="w-3 h-3" />
                      <span>3 comments</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Zap className="w-3 h-3 text-green-500" />
                      <span>CI passing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Gauge className="w-4 h-4" />
                Faster Approvals
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Keep reviews
                <span className="block text-primary">moving forward.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Clear feedback loops and automated checks help teams review faster. No more waiting
                around for status updates.
              </p>

              <div className="space-y-4">
                {approvalItems.map((item, index) => (
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

      {/* Collaboration at Scale Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Handshake className="w-4 h-4" />
                Enterprise Ready
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Collaboration
                <span className="block text-primary">at scale.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether you have 5 developers or 5,000, Giteria Code Review scales with your
                organization. Full control, complete visibility.
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
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <History className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Review Audit Trail</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                        JD
                      </div>
                      <span className="text-sm text-foreground">johndoe requested review</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#a371f7]/20 flex items-center justify-center text-xs text-[#a371f7]">
                        SM
                      </div>
                      <span className="text-sm text-foreground">sarah approved (LGTM)</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1h ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-foreground">All checks passed</span>
                    </div>
                    <span className="text-xs text-muted-foreground">30m ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <GitPullRequest className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-foreground font-medium">Merged</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Now</span>
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
              From startups to enterprises, Giteria Code Review adapts to your workflow and scales
              with your needs.
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
            Ready to improve your code quality?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Create a pull request and experience a review process that keeps your team moving
            forward. No friction, just clear feedback.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Start a Review
                <GitPullRequest className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <FileText className="w-5 h-5 mr-2" />
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
              <span>Self-hosted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No limits</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
