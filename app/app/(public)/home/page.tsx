"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Code2,
  GitBranch,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Terminal,
  Users,
  Package,
  Lock,
  Server,
  Globe,
  Database,
  Rocket,
  Container,
  BookOpen,
  Layers,
  CreditCard,
  MessageSquare,
  Settings,
  ChevronRight,
} from "lucide-react";

const benefits = [
  {
    icon: Server,
    title: "Self-Hosted",
    description:
      "Run Giteria on your own infrastructure. Full control over your data and compliance requirements.",
  },
  {
    icon: Lock,
    title: "Data Sovereignty",
    description:
      "Keep your code and intellectual property on your servers. No third-party dependencies.",
  },
  {
    icon: Zap,
    title: "All-in-One Platform",
    description:
      "Git hosting, code review, issues, CI/CD, packages, and more. Everything you need in one place.",
  },
  {
    icon: Globe,
    title: "Open Source",
    description: "Free to use and modify. Benefit from community contributions and transparency.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Built-in security features including dependency scanning, secret detection, and access controls.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Code review, discussions, and project management tools that keep your team aligned.",
  },
];

const features = [
  {
    icon: GitBranch,
    title: "Git Hosting",
    description:
      "Full-featured Git server with SSH/HTTPS support, branch protection, and fine-grained access control.",
    href: "/features/repository",
  },
  {
    icon: Code2,
    title: "Code Review",
    description: "Powerful pull request reviews with inline comments, approvals, and merge checks.",
    href: "/features/pull-requests",
  },
  {
    icon: Layers,
    title: "Issue Tracking",
    description:
      "Organize tasks, track bugs, and manage projects with labels, milestones, and projects.",
    href: "/features/issues",
  },
  {
    icon: Rocket,
    title: "CI/CD Pipelines",
    description:
      "Automate your build, test, and deployment workflows with powerful pipeline configurations.",
    href: "/features/actions",
  },
  {
    icon: Package,
    title: "Package Registry",
    description: "Host and manage packages in multiple formats: npm, Go, Maven, Docker, and more.",
    href: "/features/packages",
  },
  {
    icon: MessageSquare,
    title: "Discussions",
    description: "Create space for Q&A, announcements, and community building alongside your code.",
    href: "/features/discussions",
  },
];

const automationItems = [
  {
    icon: Rocket,
    title: "CI/CD Pipelines",
    description: "Automate builds, tests, and deployments with customizable workflows.",
    href: "/features/actions",
  },
  {
    icon: Terminal,
    title: "Git Hooks",
    description: "Extend functionality with custom scripts that run on repository events.",
    href: "/features/hooks",
  },
  {
    icon: Container,
    title: "Container Registry",
    description: "Build, store, and manage Docker images securely within your infrastructure.",
    href: "/features/containers",
  },
  {
    icon: BookOpen,
    title: "Wiki & Docs",
    description: "Document your projects with built-in wiki and README support.",
    href: "/features/wiki",
  },
];

const securityItems = [
  {
    icon: Shield,
    title: "Dependency Scanning",
    description: "Automatically detect vulnerabilities in your dependencies.",
    stat: "Automated alerts & remediation",
  },
  {
    icon: Lock,
    title: "Secret Detection",
    description: "Prevent sensitive data from being committed to your repositories.",
    stat: "Pre-commit & push protection",
  },
  {
    icon: Database,
    title: "Access Control",
    description: "Fine-grained permissions at organization, team, and repository levels.",
    stat: "Role-based security",
  },
];

const collaborationItems = [
  {
    icon: Layers,
    title: "Project Management",
    description: "Organize tasks with boards, lists, and roadmaps that adapt to your workflow.",
    href: "/features/projects",
  },
  {
    icon: MessageSquare,
    title: "Discussions",
    description: "Foster community with Q&A, announcements, and open conversations.",
    href: "/features/discussions",
  },
  {
    icon: Users,
    title: "Teams & Organizations",
    description: "Manage permissions and collaboration across multiple repositories.",
    href: "/features/organizations",
  },
  {
    icon: Settings,
    title: "Code Review",
    description: "Review changes with inline comments, suggest modifications, and approve merges.",
    href: "/features/code-review",
  },
];

const deploymentOptions = [
  {
    title: "Single Server",
    description: "Perfect for small teams getting started",
    icon: Server,
  },
  {
    title: "Kubernetes",
    description: "Scale with container orchestration",
    icon: Container,
  },
  {
    title: "Docker",
    description: "Quick deployment with containers",
    icon: Package,
  },
];

export default function HomePage() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
                Open Source & Self-Hosted
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Your development platform.
                <span className="block text-primary">Your infrastructure.</span>
                <span className="block text-foreground">Full control.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Git hosting, code review, CI/CD, packages, and more — running entirely on your
                servers. No cloud dependencies, no vendor lock-in, complete data sovereignty.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Start Free Trial
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
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>5 min setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Free for teams</span>
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
                      giteria — my-org/webapp
                    </span>
                  </div>
                </div>
                <div className="p-3 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Pull Request #142</span>
                    <span className="text-primary ml-auto text-xs px-2 py-0.5 bg-primary/10 rounded">
                      Open
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+187</span>
                      <span className="text-destructive">-42</span>
                      <span className="text-foreground">feat: add user authentication flow</span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">3 approvals</span>
                      <span className="text-muted-foreground/60">•</span>
                      <MessageSquare className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">5 comments</span>
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
              Trusted by development teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Server className="w-5 h-5" />
                Self-Hosted
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Shield className="w-5 h-5" />
                Enterprise Ready
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Lock className="w-5 h-5" />
                SOC2 Compliant
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

      {/* Why Giteria Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why teams switch to <span className="text-primary">Giteria</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop sacrificing control for convenience. Get all the features of enterprise DevOps
                platforms — without the cloud dependencies.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Complete Data Sovereignty
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your code never leaves your infrastructure. Meet compliance requirements
                      without compromises.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">All-in-One Platform</h3>
                    <p className="text-sm text-muted-foreground">
                      Git, CI/CD, packages, issues, wiki — unified in a single, fast interface.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Enterprise Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Dependency scanning, secret detection, SSO, and fine-grained access controls
                      built-in.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Open Source</div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">0€</div>
                <div className="text-sm text-muted-foreground">Cloud fees</div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">∞</div>
                <div className="text-sm text-muted-foreground">Private repos</div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">5min</div>
                <div className="text-sm text-muted-foreground">Setup time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6 font-mono text-sm">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
                  <div className="w-3 h-3 rounded-full bg-primary/80" />
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground">$ giteria run</div>
                  <div className="text-primary">Starting Giteria instance...</div>
                  <div className="text-muted-foreground">
                    <span className="text-green-500">✓</span> Database connected
                    <br />
                    <span className="text-green-500">✓</span> Git daemon running
                    <br />
                    <span className="text-green-500">✓</span> Web interface ready
                    <br />
                    <span className="text-green-500">✓</span> CI/CD workers online
                  </div>
                  <div className="text-primary mt-4">
                    → Giteria running at http://localhost:3000
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Everything you need.
                <span className="block text-primary">Nothing you don't.</span>
              </h2>

              <p className="text-muted-foreground mb-8">
                Git, code review, CI/CD, packages, issues, wiki — all in one fast, unified platform
                running on your own servers.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Git hosting",
                  "Code review",
                  "CI/CD pipelines",
                  "Package registry",
                  "Issue tracking",
                  "Wiki & docs",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/features"
                className="inline-flex items-center gap-2 mt-8 text-primary hover:underline font-medium"
              >
                Explore all features <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Sections */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Build, test, deploy — <span className="text-primary">all in one</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From code to production, every tool your team needs is integrated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Security First
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your code deserves
                <span className="block text-primary">enterprise protection.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Built-in security features that keep your codebase safe — without external
                dependencies or cloud services.
              </p>

              <div className="space-y-4">
                {securityItems.map((item, index) => (
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

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">Security Scan Complete</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Dependencies scanned</span>
                    <span className="text-sm font-medium text-green-500">1,247 checked</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Vulnerabilities</span>
                    <span className="text-sm font-medium text-green-500">0 found</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Secrets detected</span>
                    <span className="text-sm font-medium text-green-500">0 exposed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Automate everything.
                <span className="block text-primary">Ship faster.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Powerful CI/CD pipelines that run on your infrastructure. No external services, no
                limits.
              </p>

              <div className="space-y-3">
                {automationItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </Link>
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
                    .giteria/workflows/build.yml
                  </span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div>
                    <span className="text-primary">name</span>: Build &amp; Test
                  </div>
                  <div>
                    <span className="text-primary">on</span>: [push, pull_request]
                  </div>
                  <div className="pt-2">
                    <span className="text-primary">jobs</span>:
                  </div>
                  <div className="pl-3">
                    <span className="text-primary">build</span>:
                  </div>
                  <div className="pl-5">
                    <span className="text-primary">runs-on</span>: ubuntu-latest
                  </div>
                  <div className="pl-5">
                    <span className="text-primary">steps</span>:
                  </div>
                  <div className="pl-7">- uses: actions/checkout@v4</div>
                  <div className="pl-7">- name: Build</div>
                  <div className="pl-9 text-muted-foreground">run: make build</div>
                  <div className="pl-7">- name: Test</div>
                  <div className="pl-9 text-muted-foreground">run: make test</div>
                  <div className="pt-2 text-green-500">✓ Build passed in 2m 34s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-primary">teams</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every feature designed to keep your team aligned and moving forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {collaborationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Deploy your way</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Giteria fits into your infrastructure. Single server, Kubernetes, or Docker.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {deploymentOptions.map((option, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <option.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{option.title}</h3>
                <p className="text-muted-foreground text-sm">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Open source. <span className="text-primary">Community driven.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Open Source</div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-1">Free</div>
              <div className="text-sm text-muted-foreground">Forever</div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-1">You</div>
              <div className="text-sm text-muted-foreground">In control</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="https://github.com/skygenesisenterprise/giteria"
              target="_blank"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Join our community <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to take control?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Start your self-hosted DevOps journey in minutes. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Start Free Trial
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
