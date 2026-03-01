"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Zap,
  Users,
  Code2,
  GitBranch,
  Layers,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Container,
  BarChart3,
  Shield,
  Lock,
  Globe,
  Building2,
  HeartHandshake,
  CreditCard,
  Cloud,
  BookOpen,
} from "lucide-react";

const developmentFeatures = [
  {
    icon: Rocket,
    title: "Rapid Project Setup",
    description:
      "Initialize repositories in seconds. Pre-configured templates for common project types help you start coding immediately.",
  },
  {
    icon: Sparkles,
    title: "Integrated Copilot",
    description:
      "AI-powered code suggestions that accelerate development. Context-aware assistance throughout your workflow.",
  },
  {
    icon: Terminal,
    title: "Codespaces",
    description:
      "Instant development environments in the cloud. Code from any device without local setup overhead.",
  },
  {
    icon: GitBranch,
    title: "Integrated Workflow",
    description:
      "Seamless GitHub Actions integration. Build, test, and deploy with powerful CI/CD pipelines.",
  },
  {
    icon: Lock,
    title: "Security & Secret Protection",
    description:
      "Automated secret detection prevents credentials from being committed. Pre-commit hooks keep your code safe.",
  },
];

const productivityFeatures = [
  {
    icon: Layers,
    title: "Issue Tracking",
    description:
      "Organize tasks, track bugs, and manage projects with labels, milestones, and projects.",
  },
  {
    icon: Code2,
    title: "Pull Requests & Reviews",
    description:
      "Streamlined code review with inline comments, suggestions, and approval workflows.",
  },
  {
    icon: Container,
    title: "Automated Workflows",
    description: "Automate builds, tests, and deployments with customizable CI/CD pipelines.",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Simple team creation and permission management. Get your startup team up and running in minutes.",
  },
  {
    icon: BarChart3,
    title: "Insights & Metrics",
    description: "Track team velocity, code quality, and project progress with built-in analytics.",
  },
];

const scalabilityFeatures = [
  {
    icon: Users,
    title: "Flexible Team Size",
    description: "Supports teams from solo founders to growing squads. Add members as you scale.",
  },
  {
    icon: Cloud,
    title: "Cloud-Backed Infrastructure",
    description:
      "Reliable cloud hosting with automatic backups. Focus on building, not infrastructure.",
  },
  {
    icon: CreditCard,
    title: "Flexible Plans & Pricing",
    description:
      "Start free, scale as you grow. Transparent pricing that fits early-stage budgets.",
  },
  {
    icon: Building2,
    title: "Enterprise-Ready",
    description: "Built to grow with you. Advanced security and compliance available when needed.",
  },
];

const useCases = [
  {
    icon: Rocket,
    title: "Seed-Stage Startups",
    description:
      "Move fast from idea to MVP with rapid setup, free private repos, and integrated CI/CD.",
  },
  {
    icon: Globe,
    title: "Remote Teams",
    description:
      "Collaborate seamlessly across time zones with integrated tools and async code review.",
  },
  {
    icon: Code2,
    title: "Small Product Teams",
    description:
      "Build products faster with streamlined workflows, issue tracking, and team insights.",
  },
  {
    icon: HeartHandshake,
    title: "Open Source Projects",
    description:
      "Launch open source with confidence. Built-in discussions, wiki, and community tools.",
  },
];

const startupStats = [
  { value: "Free", label: "To get started" },
  { value: "5 min", label: "Setup time" },
  { value: "∞", label: "Private repos" },
  { value: "100%", label: "Open source" },
];

export default function StartupsPage() {
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
                For Startups
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Build faster.
                <span className="block text-primary">Ship sooner.</span>
                <span className="block text-foreground">Scale together.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A fast, flexible, and collaborative platform designed to help startups build, scale,
                and grow efficiently. From MVP to Series A — all in one place.
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
                <Link href="https://docs.giteria.com/getting-started/demo" target="_blank" rel="noopener noreferrer">
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
                  <span>Free to start</span>
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
                      giteria — my-startup/app
                    </span>
                  </div>
                </div>
                <div className="p-3 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Rocket className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Release v1.0.0</span>
                    <span className="text-green-500 ml-auto text-xs px-2 py-0.5 bg-green-500/10 rounded">
                      Deployed
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+2,847</span>
                      <span className="text-destructive">-142</span>
                      <span className="text-foreground">feat: launch MVP</span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">12 approvals</span>
                      <span className="text-muted-foreground/60">•</span>
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">CI passing</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Zap className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Deployed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Trusted by startups around the world
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Rocket className="w-5 h-5" />
                Fast Setup
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Zap className="w-5 h-5" />
                AI Powered
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

      {/* Accelerate Your Development Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Accelerate your <span className="text-primary">development</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get from idea to production faster with integrated tools designed for speed and
              efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developmentFeatures.map((feature, index) => (
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

      {/* Productivity & Growth Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Productivity
                <span className="block text-primary">& growth tools.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Everything you need to build efficiently and scale your team. No piecing together
                multiple tools — everything is integrated.
              </p>

              <div className="space-y-4">
                {productivityFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
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
                  <div className="text-muted-foreground">$ giteria init startup-app</div>
                  <div className="text-primary">Initializing new startup project...</div>
                  <div className="text-muted-foreground">
                    <span className="text-green-500">✓</span> Repository created
                    <br />
                    <span className="text-green-500">✓</span> CI/CD configured
                    <br />
                    <span className="text-green-500">✓</span> Copilot enabled
                    <br />
                    <span className="text-green-500">✓</span> Issues & projects setup
                  </div>
                  <div className="text-primary mt-4">→ Ready to ship in 5 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scalable for the Future Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Scalable for <span className="text-primary">the future</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start small and scale seamlessly. Giteria grows with your startup from seed to Series
              A and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scalabilityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
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
              Perfect for <span className="text-primary">startups</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how startups use Giteria to move fast and build amazing products.
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
            {startupStats.map((stat, index) => (
              <div
                key={index}
                className="p-4 md:p-6 rounded-xl bg-card border border-border text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to launch?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Start building today. Get your startup up and running in minutes. No credit card
            required.
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
