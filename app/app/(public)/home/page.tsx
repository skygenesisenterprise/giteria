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
  Smartphone,
  Store,
  Box,
  Bug,
  FileKey,
  MessageSquare,
  LayoutGrid,
  Heart,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Code",
    description:
      "Write, test, and fix code quickly with GitHub Copilot, from simple boilerplate to complex features.",
  },
  {
    icon: LayoutGrid,
    title: "Plan",
    description:
      "Organize everything from high-level roadmaps to everyday tasks with powerful project management.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description:
      "Keep your team's conversation and context next to your code with issues and discussions.",
  },
  {
    icon: Zap,
    title: "Automate",
    description:
      "Ship faster with secure, reliable CI/CD pipelines that automate your path to production.",
  },
  {
    icon: Shield,
    title: "Secure",
    description:
      "Use AI to find and fix vulnerabilities so your team can ship more secure software faster.",
  },
];

const stats = [
  { value: "100M+", label: "Developers" },
  { value: "420M+", label: "Repositories" },
  { value: "99.9%", label: "Uptime" },
  { value: "Billion+", label: "AI requests/day" },
];

const automationItems = [
  {
    icon: Zap,
    title: "Automate your path to production",
    description: "Ship faster with secure, reliable CI/CD.",
    href: "/features/actions",
  },
  {
    icon: Terminal,
    title: "Code instantly from anywhere",
    description: "Launch a full, cloud-based development environment in seconds.",
    href: "/features/codespaces",
  },
  {
    icon: Smartphone,
    title: "Keep momentum on the go",
    description: "Manage projects and assign tasks from your mobile device.",
    href: "/mobile",
  },
  {
    icon: Store,
    title: "Shape your toolchain",
    description: "Extend your stack with apps, actions, and AI models.",
    href: "/marketplace",
  },
];

const securityItems = [
  {
    icon: Bug,
    title: "Copilot Autofix",
    description: "Apply fixes in seconds. Spend less time debugging and more time building.",
    stat: "70% MTTR reduction",
  },
  {
    icon: Box,
    title: "Dependency Updates",
    description: "Update vulnerable dependencies with supported fixes for breaking changes.",
    stat: "8.3M+ secret leaks stopped",
  },
  {
    icon: FileKey,
    title: "Secret Protection",
    description: "Detect, prevent, and remediate leaked secrets across your organization.",
    stat: "in the past 12 months",
  },
];

const collaborationItems = [
  {
    icon: LayoutGrid,
    title: "Plan with clarity",
    description: "Organize everything from high-level roadmaps to everyday tasks.",
    href: "/features/issues",
  },
  {
    icon: CheckCircle2,
    title: "Keep track of your tasks",
    description: "Create issues and manage projects with tools that adapt to your code.",
    href: "/features/issues",
  },
  {
    icon: MessageSquare,
    title: "Share ideas and ask questions",
    description: "Create space for open-ended conversations alongside your project.",
    href: "/features/discussions",
  },
  {
    icon: GitBranch,
    title: "Review code changes together",
    description: "Assign initial reviews to Copilot for greater speed and quality.",
    href: "/features/code-review",
  },
  {
    icon: Heart,
    title: "Fund open source projects",
    description: "Become an open source partner and support the tools that power your work.",
    href: "/sponsors",
  },
];

const customerLogos = [
  "American Airlines",
  "Duolingo",
  "Ernst & Young",
  "Ford",
  "InfoSys",
  "Mercado Libre",
  "Mercedes-Benz",
  "Shopify",
  "Philips",
  "Société Générale",
  "Spotify",
  "Vodafone",
];

const testimonials = [
  {
    quote:
      "It helps us onboard new software engineers and get them productive right away. We have all our source code, issues, and pull requests in one place... GitHub is a complete platform that frees us from menial tasks and enables us to do our best work.",
    author: "Fabian Faulhaber",
    role: "Application manager at Mercedes-Benz",
  },
];

const industries = [
  {
    name: "Technology",
    description: "Figma streamlines development and strengthens security",
    logo: "Figma",
  },
  {
    name: "Automotive",
    description: "Mercedes-Benz standardizes source code and automates onboarding",
    logo: "Mercedes-Benz",
  },
  {
    name: "Financial services",
    description: "Mercado Libre cuts coding time by 50%",
    logo: "Mercado Libre",
  },
];

export default function HomePage() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-card via-background to-background opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm text-muted-foreground mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>AI-powered developer platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              The future of building
              <span className="block text-primary">happens together</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Tools and trends evolve, but collaboration endures. With Giteria, developers, agents,
              and code come together on one platform.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-8"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring"
              />
              <Button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Sign up for Giteria
              </Button>
            </form>

            <p className="text-sm text-muted-foreground">
              <Link href="/copilot" className="text-primary hover:underline">
                Try Giteria Copilot free
              </Link>{" "}
              · No credit card required
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Accelerate your entire workflow
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From your first line of code to final deployment, Giteria provides AI and automation
              tools to help you build and ship better software faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your AI partner everywhere. Copilot is ready to work with you at each step of the
                software development lifecycle.
              </h2>

              <div className="space-y-4">
                {[
                  "Intelligent code completion",
                  "Natural language explanations",
                  "Automated code reviews",
                  "Bug detection and fixes",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/copilot"
                className="inline-flex items-center gap-2 mt-8 text-primary hover:underline"
              >
                Explore Giteria Copilot <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#a371f7] opacity-20 blur-3xl" />
              <div className="relative bg-background border border-border rounded-lg p-6 font-mono text-sm">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground">// AI suggests a function</div>
                  <div>
                    <span className="text-destructive">function</span>{" "}
                    <span className="text-primary">calculateMetrics</span>(data) {"{"}
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    // Returns optimized calculations
                  </div>
                  <div className="pl-4 text-[#d2a8ff]">
                    return data.reduce((acc, item) ={">"} {"{"}
                  </div>
                  <div className="pl-8 text-primary">...acc,</div>
                  <div className="pl-8 text-foreground">[item.name]: item.value</div>
                  <div className="pl-4">
                    {"}"}, {});
                  </div>
                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            {customerLogos.map((logo, index) => (
              <div key={index} className="text-lg font-semibold text-muted-foreground">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Automate your path to production
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ship faster with secure, reliable CI/CD and development tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built-in application security where found means fixed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use AI to find and fix vulnerabilities so your team can ship more secure software
              faster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {securityItems.map((item, index) => (
              <div key={index} className="p-6 rounded-lg bg-background border border-border">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                <div className="text-primary font-semibold text-sm">{item.stat}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Explore Giteria Advanced Security <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Work together, achieve more
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                From planning and discussion to code review, Giteria keeps your team&apos;s
                conversation and context next to your code.
              </p>

              <div className="space-y-4">
                {collaborationItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                  >
                    <item.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#a371f7] opacity-20 blur-3xl" />
              <div className="relative bg-card border border-border rounded-lg p-6">
                <div className="mb-6">
                  <div className="h-4 w-32 bg-secondary rounded mb-2" />
                  <div className="h-8 w-64 bg-foreground/10 rounded" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-primary/20" />
                    <div className="h-4 flex-1 bg-secondary rounded" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-primary/20" />
                    <div className="h-4 flex-1 bg-secondary rounded" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    <div className="h-4 w-48 bg-secondary rounded" />
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <blockquote className="text-sm text-muted-foreground italic">
                    &quot;Giteria is a complete platform that frees us from menial tasks and enables
                    us to do our best work.&quot;
                  </blockquote>
                  <div className="mt-4 text-sm">
                    <strong className="text-foreground">Fabian Faulhaber</strong>
                    <span className="text-muted-foreground">
                      {" "}
                      - Application manager at Mercedes-Benz
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              From startups to enterprises, Giteria scales with teams of any size
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-background border border-border hover:border-primary transition-colors"
              >
                <div className="text-2xl font-bold text-foreground mb-4">{industry.logo}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{industry.name}</h3>
                <p className="text-muted-foreground text-sm">{industry.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/enterprise"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Explore all solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Millions of developers and businesses call Giteria home
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Whether you&apos;re scaling your development process or just learning how to code,
            Giteria is where you belong. Join the world&apos;s most widely adopted developer
            platform to build the technologies that shape what&apos;s next.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-8"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring"
            />
            <Button
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
            >
              Sign up for Giteria
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            <Link href="/copilot" className="text-primary hover:underline">
              Try Giteria Copilot free
            </Link>{" "}
            · No credit card required
          </p>
        </div>
      </section>
    </div>
  );
}
