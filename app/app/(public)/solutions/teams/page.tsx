"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Users,
  GitBranch,
  Code2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Layers,
  Zap,
  Shield,
  Lock,
  Container,
  Sparkles,
  Globe,
  BookOpen,
  Settings,
  MessageSquare,
} from "lucide-react";

const collaborationFeatures = [
  {
    icon: GitBranch,
    title: "Shared Repositories",
    description:
      "Collaborate on code with your team. Branch protection and merge checks ensure code quality.",
  },
  {
    icon: Code2,
    title: "Pull Requests & Reviews",
    description:
      "Review changes together with inline comments, suggestions, and approval workflows.",
  },
  {
    icon: Rocket,
    title: "Actions & Automation",
    description: "Automate builds, tests, and deployments with powerful CI/CD pipelines.",
  },
  {
    icon: MessageSquare,
    title: "Integrated Discussions",
    description:
      "Keep conversations close to the code. Q&A, announcements, and team sync in one place.",
  },
  {
    icon: Settings,
    title: "Easy Team Management",
    description:
      "Simple team creation and permission management. Get your team up and running in minutes.",
  },
];

const productivityTools = [
  {
    icon: Layers,
    title: "Issue Tracking",
    description:
      "Organize tasks, track bugs, and manage projects with labels, milestones, and projects.",
  },
  {
    icon: Container,
    title: "Codespaces",
    description: "Instant development environments in the cloud. Start coding from any device.",
  },
  {
    icon: Sparkles,
    title: "Copilot AI Assistance",
    description: "AI-powered code suggestions to speed up development and reduce errors.",
  },
  {
    icon: Zap,
    title: "Streamlined Workflows",
    description:
      "From code to production, every tool your team needs is integrated and ready to use.",
  },
];

const securityFeatures = [
  {
    icon: Shield,
    title: "Basic Security",
    description: "Built-in security features including dependency scanning and secret detection.",
  },
  {
    icon: Lock,
    title: "Role-Based Access",
    description: "Simple permission controls at repository and team levels.",
  },
  {
    icon: BookOpen,
    title: "Audit Logs",
    description: "Track changes and maintain visibility over your project's activity.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Startup Teams",
    description:
      "Move fast with a platform that scales with your team. From MVP to product launch.",
  },
  {
    icon: Globe,
    title: "Remote Small Teams",
    description: "Collaborate seamlessly across time zones with integrated tools and workflows.",
  },
  {
    icon: Code2,
    title: "Side Projects",
    description: "Turn ideas into reality with free private repositories and powerful tools.",
  },
  {
    icon: BookOpen,
    title: "Open Source Groups",
    description: "Build community around your project with discussions, issues, and code review.",
  },
];

export default function TeamPage() {
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
                For Small Teams
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Small Teams,
                <span className="block text-primary">big impact.</span>
                <span className="block text-foreground">Build together.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A simple, efficient, and collaborative platform designed to help small teams work
                together seamlessly. From idea to production — all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Get Started for Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                  >
                    <Terminal className="w-5 h-5 mr-2" />
                    Try Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Free for small teams</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>5 min setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>No credit card</span>
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
                      giteria — my-team/project
                    </span>
                  </div>
                </div>
                <div className="p-3 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Pull Request #23</span>
                    <span className="text-primary ml-auto text-xs px-2 py-0.5 bg-primary/10 rounded">
                      Open
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+89</span>
                      <span className="text-destructive">-12</span>
                      <span className="text-foreground">feat: add user dashboard</span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">2 approvals</span>
                      <span className="text-muted-foreground/60">•</span>
                      <MessageSquare className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">3 comments</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Zap className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">CI passing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Trusted by small teams around the world
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Users className="w-5 h-5" />
                Small Teams
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Zap className="w-5 h-5" />
                Fast Setup
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Shield className="w-5 h-5" />
                Secure
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Globe className="w-5 h-5" />
                Open Source
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Simplified Collaboration Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simplified <span className="text-primary">collaboration</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything your team needs to work together effectively. No complexity, just
              productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborationFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productivity Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Productivity tools
                <span className="block text-primary">that just work.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Powerful tools integrated into one seamless platform. No need to piece together
                multiple services.
              </p>

              <div className="space-y-4">
                {productivityTools.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <tool.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6 font-mono text-sm">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
                  <div className="w-3 h-3 rounded-full bg-primary/80" />
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground">$ giteria init my-team</div>
                  <div className="text-primary">Initializing new project...</div>
                  <div className="text-muted-foreground">
                    <span className="text-green-500">✓</span> Repository created
                    <br />
                    <span className="text-green-500">✓</span> Team invited
                    <br />
                    <span className="text-green-500">✓</span> CI/CD configured
                    <br />
                    <span className="text-green-500">✓</span> Issues enabled
                  </div>
                  <div className="text-primary mt-4">→ Ready to code in 5 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Control Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Security & <span className="text-primary">control</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Essential security features that keep your code safe without the enterprise
              complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perfect for <span className="text-primary">small teams</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how small teams use Giteria to build amazing things together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <useCase.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="p-4 md:p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">Free</div>
              <div className="text-xs md:text-sm text-muted-foreground">For small teams</div>
            </div>
            <div className="p-4 md:p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">5 min</div>
              <div className="text-xs md:text-sm text-muted-foreground">Setup time</div>
            </div>
            <div className="p-4 md:p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">∞</div>
              <div className="text-xs md:text-sm text-muted-foreground">Private repos</div>
            </div>
            <div className="p-4 md:p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Open source</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to start building?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Get your team started in minutes. No credit card required, no enterprise paperwork —
            just code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
