"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GitBranch,
  Code2,
  Layers,
  Rocket,
  Shield,
  Lock,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Heart,
  HandHeart,
  Target,
  Globe,
  Building2,
  TreePine,
  BookOpen,
  MessageSquare,
  Settings,
  Eye,
  Clock,
  Wallet,
  Bell,
  Search,
  FileText,
  Workflow,
  UserPlus,
} from "lucide-react";

const collaborativeTools = [
  {
    icon: GitBranch,
    title: "Shared Repositories",
    description:
      "Centralize all your project files in one secure location. Multiple team members can work together without version conflicts.",
  },
  {
    icon: Code2,
    title: "Pull Requests & Reviews",
    description:
      "Review changes together with inline comments. Ensure quality code through collaborative code reviews.",
  },
  {
    icon: Rocket,
    title: "Actions & Automation",
    description:
      "Automate testing, deployment, and repetitive tasks. Save time and reduce errors with custom workflows.",
  },
  {
    icon: Zap,
    title: "MCP & Models Integration",
    description:
      "Enhance your workflow with AI-powered tools and model integrations designed for nonprofit needs.",
  },
  {
    icon: Shield,
    title: "Security & Secret Protection",
    description:
      "Keep sensitive data safe with built-in secret detection and encryption. Protect your organization and beneficiaries.",
  },
];

const managementFeatures = [
  {
    icon: Layers,
    title: "Issue Tracking",
    description:
      "Organize tasks, track bugs, and manage projects with labels, milestones, and project boards.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Easily manage volunteers and team members with flexible roles and permissions.",
  },
  {
    icon: UserPlus,
    title: "Easy Onboarding",
    description:
      "Get new volunteers up and running quickly with intuitive interfaces and helpful documentation.",
  },
  {
    icon: Workflow,
    title: "Transparent Workflows",
    description: "Clear, visible project progress that keeps everyone aligned and accountable.",
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "Secret Protection",
    description:
      "Prevent sensitive information like passwords and API keys from being exposed in your repositories.",
    stat: "Automated detection",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Control who can view, edit, and manage different parts of your projects with granular permissions.",
    stat: "Fine-grained control",
  },
  {
    icon: Eye,
    title: "Audit Logs",
    description:
      "Track all activities and changes in your organization for transparency and compliance.",
    stat: "Full visibility",
  },
  {
    icon: Wallet,
    title: "Affordable & Flexible Plans",
    description:
      "Plans designed for nonprofit budgets. Get enterprise features without enterprise costs.",
    stat: "Nonprofit pricing",
  },
];

const useCases = [
  {
    icon: Heart,
    title: "Small NGOs",
    description:
      "Coordinate humanitarian projects, track donations, and manage volunteer teams efficiently.",
  },
  {
    icon: Building2,
    title: "ASBL Volunteer Projects",
    description:
      "Manage association activities, coordinate events, and document decision-making processes.",
  },
  {
    icon: Users,
    title: "Community Initiatives",
    description:
      "Bring community members together around shared goals with transparent project management.",
  },
  {
    icon: Globe,
    title: "Open Source Social Projects",
    description:
      "Build technology for social good with collaborative development tools designed for impact.",
  },
];

export default function NonprofitsPage() {
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
                <Heart className="w-4 h-4" />
                For Nonprofits & Associations
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Collaborate on what
                <span className="block text-primary">matters most.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A simple, secure, and collaborative platform designed to help nonprofits and
                associations manage their projects efficiently and focus on their mission.
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
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Demo
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
                  <span>Free for nonprofits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>5 min setup</span>
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
                      giteria — volunteers/coordinator-app
                    </span>
                  </div>
                </div>
                <div className="p-3 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Issue #23</span>
                    <span className="text-primary ml-auto text-xs px-2 py-0.5 bg-primary/10 rounded">
                      Open
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+89</span>
                      <span className="text-destructive">-12</span>
                      <span className="text-foreground">feat: add volunteer scheduling</span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">2 volunteers assigned</span>
                      <span className="text-muted-foreground/60">•</span>
                      <MessageSquare className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">4 comments</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Target className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">help wanted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Trusted by nonprofit organizations worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Heart className="w-5 h-5" />
                Nonprofit Ready
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Shield className="w-5 h-5" />
                Secure & Compliant
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Users className="w-5 h-5" />
                Volunteer Friendly
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Zap className="w-5 h-5" />
                Easy to Use
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Collaborative Tools for Impact */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Collaborative tools for <span className="text-primary">impact</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything your nonprofit team needs to work together effectively, regardless of
              location or technical expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborativeTools.map((tool, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <tool.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{tool.title}</h3>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Management */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Simplified management
                <span className="block text-primary">for every team.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Focus on your mission, not on complicated tools. Giteria makes project management
                accessible for teams with varying technical backgrounds.
              </p>

              <div className="space-y-4">
                {managementFeatures.map((feature, index) => (
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
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Layers className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Project Board</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm text-foreground">To Do</span>
                    </div>
                    <span className="text-sm font-medium text-primary">5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-foreground">In Progress</span>
                    </div>
                    <span className="text-sm font-medium text-blue-500">3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-foreground">Done</span>
                    </div>
                    <span className="text-sm font-medium text-green-500">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secure & Accessible */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Secure & <span className="text-primary">accessible</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Enterprise-grade security without the complexity. Protect your data while keeping
              tools accessible for volunteers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/10 rounded">
                    {feature.stat}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-primary">every mission</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From small community groups to larger associations, Giteria adapts to your
              organization's unique needs.
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
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-muted/30">
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
                  <div className="text-muted-foreground">$ giteria org create</div>
                  <div className="text-primary">Creating nonprofit organization...</div>
                  <div className="text-muted-foreground">
                    <span className="text-green-500">✓</span> Organization created
                    <br />
                    <span className="text-green-500">✓</span> Free plan applied
                    <br />
                    <span className="text-green-500">✓</span> Team invited
                    <br />
                    <span className="text-green-500">✓</span> First project ready
                  </div>
                  <div className="text-primary mt-4">→ Welcome to Giteria, Mission!</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Everything you need.
                <span className="block text-primary">Nothing you don't.</span>
              </h2>

              <p className="text-muted-foreground mb-8">
                Git, issues, projects, and collaboration — all in one fast, unified platform
                designed for nonprofit teams.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Git hosting",
                  "Code review",
                  "Issue tracking",
                  "Project boards",
                  "Team management",
                  "Secure access",
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

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to make an impact?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of nonprofits already using Giteria to collaborate, organize, and focus
            on what matters most — their mission.
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
