"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Code2,
  FileText,
  Lightbulb,
  Search,
  GitPullRequest,
  MessageSquare,
  Shield,
  Lock,
  Server,
  Eye,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Zap,
  User,
  Rocket,
  Building2,
  Globe,
  ChevronRight,
  Settings,
  Brain,
  Wand2,
} from "lucide-react";

const copilotFeatures = [
  {
    icon: Sparkles,
    title: "Real-time Assistance",
    description:
      "Get intelligent suggestions directly in your editor as you code, without context switching.",
  },
  {
    icon: Wand2,
    title: "Smart Suggestions",
    description:
      "Copilot anticipates your intentions and provides relevant code based on your project context.",
  },
  {
    icon: FileText,
    title: "Documentation Help",
    description: "Automatically generate docstrings, comments, and documentation for your code.",
  },
  {
    icon: Search,
    title: "Code Analysis",
    description:
      "Identify potential bugs, vulnerabilities, and performance issues before they become problems.",
  },
  {
    icon: Code2,
    title: "Code Explanation",
    description: "Quickly understand complex codebases with clear and concise explanations.",
  },
];

const integrationItems = [
  {
    icon: Code2,
    title: "Built into Repos",
    description:
      "Copilot analyzes your codebase and provides contextual suggestions tailored to your project.",
  },
  {
    icon: GitPullRequest,
    title: "Pull Requests",
    description: "Get refactoring and optimization suggestions directly in your PRs.",
  },
  {
    icon: MessageSquare,
    title: "Issues",
    description: "Help drafting issues with intelligently pre-filled templates.",
  },
  {
    icon: Terminal,
    title: "Smart CLI",
    description: "Contextual Git commands and suggestions for your command-line workflows.",
  },
];

const securityItems = [
  {
    icon: Lock,
    title: "Code Not Used for Training",
    description: "Your code is never used to train models without your explicit consent.",
    highlight: true,
  },
  {
    icon: Server,
    title: "Data Isolation",
    description: "All analysis is performed on your infrastructure. No data leaves your servers.",
    highlight: true,
  },
  {
    icon: Settings,
    title: "User Control",
    description:
      "Configure exactly what Copilot can analyze and suggest. You maintain full control.",
    highlight: true,
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Every suggestion is explained. You see exactly what Copilot proposes and why.",
    highlight: false,
  },
];

const useCases = [
  {
    icon: User,
    title: "Junior Developer",
    description:
      "Accelerate your learning with suggestions that help you understand patterns and best practices.",
    benefits: ["Real-time code explanations", "Correction suggestions", "Learn by example"],
  },
  {
    icon: Rocket,
    title: "Maintainer",
    description:
      "Manage your projects more efficiently with tools that speed up reviews and maintenance.",
    benefits: ["Automatic PR analysis", "Refactoring suggestions", "Duplicate code detection"],
  },
  {
    icon: Building2,
    title: "Startup Team",
    description: "Boost your team's productivity with an assistant that adapts to your tech stack.",
    benefits: ["Code consistency across team", "Faster onboarding", "Automatic documentation"],
  },
  {
    icon: Globe,
    title: "Open Source Contributor",
    description:
      "Contribute more easily to external projects with quick understanding of existing code.",
    benefits: ["Fast analysis of unknown code", "Style-respecting suggestions", "Help with PRs"],
  },
];

export default function CopilotPage() {
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
                AI-Powered Development
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Your intelligent coding
                <span className="block text-primary">assistant.</span>
                <span className="block text-foreground">Built-in.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Giteria Copilot is an intelligent assistant built directly into your platform. It
                helps you write code faster, understand complex codebases, and maintain quality
                standards — all without compromising security.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Try Copilot
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
                    View Documentation
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Self-hosted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Privacy first</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Opt-in</span>
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
                      giteria — src/utils/helper.ts
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Copilot Suggestion</span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+12</span>
                      <span className="text-green-500">-0</span>
                      <span className="text-foreground">export function parseJsonSafely...</span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                      <div className="text-primary mb-1">// Accepted suggestion</div>
                      <div className="text-foreground">
                        {`export function parseJsonSafely<T>(str: string): T | null {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Suggestion accepted</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Zap className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Time saved: ~2min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Why Giteria Copilot Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why <span className="text-primary">Giteria Copilot</span> ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              An intelligent assistant designed for teams who value productivity and privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {copilotFeatures.map((feature, index) => (
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

      {/* Native Integration Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Natively integrated.
                <span className="block text-primary">Everywhere you code.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Giteria Copilot integrates perfectly into your ecosystem. No additional plugins, no
                complex configuration.
              </p>

              <div className="space-y-3">
                {integrationItems.map((item, index) => (
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
                    Giteria — Pull Request #89
                  </span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Copilot Review</span>
                    <span className="ml-auto text-xs px-2 py-0.5 bg-green-500/10 text-green-500 rounded">
                      Suggestion
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+45</span>
                      <span className="text-destructive">-12</span>
                      <span className="text-foreground">refactor: optimize database queries</span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="bg-green-500/5 rounded-lg p-3 border border-green-500/20">
                      <div className="flex items-center gap-2 text-green-500 mb-2">
                        <Lightbulb className="w-3 h-3" />
                        <span className="text-xs font-medium">Copilot Suggestion</span>
                      </div>
                      <div className="text-foreground text-xs">
                        {`// This function could use an index.
// + Index usage: ~3x faster`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Automatic analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">Privacy Settings</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Code Analysis</span>
                    <div className="w-10 h-5 bg-primary rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Training Contribution</span>
                    <div className="w-10 h-5 bg-muted rounded-full relative">
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-muted-foreground rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Third-party Suggestions</span>
                    <div className="w-10 h-5 bg-muted rounded-full relative">
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-muted-foreground rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <Lock className="w-3 h-3 inline mr-1" />
                    Settings stored on your instance
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Security & Privacy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your code.
                <span className="block text-primary">Your rules.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                We believe AI should not compromise security. Giteria Copilot is designed with
                privacy at the forefront.
              </p>

              <div className="space-y-4">
                {securityItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-lg bg-card border ${
                      item.highlight ? "border-primary/30" : "border-border"
                    }`}
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

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-primary">every role</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Giteria Copilot adapts to your role and supports you with features tailored to your
              needs.
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
            Ready to accelerate your development?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Enable Giteria Copilot with one click. No complex setup, no commitment. Try it and see
            the difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Enable Copilot
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <Brain className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Free during beta</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Disable anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
