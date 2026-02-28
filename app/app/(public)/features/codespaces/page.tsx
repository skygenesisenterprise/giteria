"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Code2,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Zap,
  Shield,
  Lock,
  Server,
  Clock,
  Layers,
  Activity,
  Users,
  Rocket,
  Cloud,
  Container,
  Play,
  MousePointer,
  Wifi,
  HardDrive,
  Key,
  Eye,
  Settings,
  ChevronRight,
  Globe,
  Briefcase,
  GraduationCap,
  Sparkles,
  Search,
  GitBranch,
} from "lucide-react";

const developFeatures = [
  {
    icon: MousePointer,
    title: "No Local Setup",
    description:
      "Start coding instantly. No need to install tools, configure environments, or worry about system dependencies.",
  },
  {
    icon: Container,
    title: "Pre-configured Environments",
    description:
      "Every codespace comes with ready-to-use development environments. Just click and start coding.",
  },
  {
    icon: Layers,
    title: "Custom Dev Containers",
    description:
      "Define your perfect environment with devcontainer.json. Full control over tools, extensions, and runtime.",
  },
  {
    icon: Play,
    title: "One-Click Launch",
    description:
      "Launch a fully configured development environment from any branch, PR, or issue in seconds.",
  },
  {
    icon: Code2,
    title: "Browser-Based IDE",
    description:
      "Code from anywhere using our web-based editor. VS Code in your browser with full IntelliSense support.",
  },
];

const teamFeatures = [
  {
    icon: Users,
    title: "Shared Environments",
    description:
      'Give your entire team access to the same development environment. No more "works on my machine" issues.',
  },
  {
    icon: Layers,
    title: "Consistent Setups",
    description:
      "Every developer works in identical environments. New team members get productive from day one.",
  },
  {
    icon: Clock,
    title: "Faster Onboarding",
    description:
      "Skip the tedious environment setup. New hires can start contributing code within minutes.",
  },
  {
    icon: Activity,
    title: "Real-Time Collaboration",
    description:
      "Pair program and share codespaces with your team. Collaborate seamlessly, wherever you are.",
  },
];

const performanceItems = [
  {
    icon: Zap,
    title: "Cloud-Powered",
    description:
      "Run your development environment on powerful cloud infrastructure. No more draining your local machine.",
  },
  {
    icon: Clock,
    title: "Fast Boot Times",
    description:
      "Codespaces spin up in seconds, not minutes. Get back to coding quickly with persistent storage.",
  },
  {
    icon: Server,
    title: "Scalable Resources",
    description:
      "Choose from multiple machine sizes. Scale up for intensive tasks, scale down to save costs.",
  },
  {
    icon: HardDrive,
    title: "Persistent Workspaces",
    description:
      "Your files and settings are preserved between sessions. Pick up right where you left off.",
  },
];

const securityItems = [
  {
    icon: Lock,
    title: "Environment Isolation",
    description:
      "Each codespace runs in its own isolated container. Complete separation between projects.",
  },
  {
    icon: Key,
    title: "Permission Controls",
    description:
      "Fine-grained access control at repository and organization level. Control who can launch what.",
  },
  {
    icon: Shield,
    title: "Organization Governance",
    description:
      "Set policies for your entire organization. Enforce security standards and resource limits.",
  },
  {
    icon: Eye,
    title: "Secure Access",
    description:
      "Connect via secure HTTPS. Your credentials never leave your authenticated session.",
  },
];

const useCases = [
  {
    icon: Globe,
    title: "Open Source Contributors",
    description:
      "Contribute to any project without cloning locally. Perfect for first-time contributors and maintainers.",
    benefits: ["Instant setup", "No local tools needed", "Safe sandbox environment"],
  },
  {
    icon: Rocket,
    title: "Startup Teams",
    description:
      "Ship faster with consistent environments across your entire team. Focus on code, not configuration.",
    benefits: ["Quick onboarding", "Consistent tooling", "Reduced friction"],
  },
  {
    icon: Briefcase,
    title: "Remote Developers",
    description:
      "Work from anywhere with a full development environment in your browser. No powerful machine required.",
    benefits: ["Any device", "Cloud-powered", "Always up-to-date"],
  },
  {
    icon: GraduationCap,
    title: "Educational Environments",
    description:
      "Give students a ready-to-use development environment. Eliminate technical barriers to learning.",
    benefits: ["Zero setup", "Standardized classrooms", "Controlled environments"],
  },
];

export default function CodespacesPage() {
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
                Cloud Development
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Code from anywhere.
                <span className="block text-primary">No setup required.</span>
                <span className="block text-foreground">Ready in seconds.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A fully integrated cloud development environment, designed to remove friction and
                accelerate collaboration. Spin up pre-configured workspaces in seconds — directly
                from your browser.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Launch a Codespace
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link
                  href="https://docs.giteria.com/codespaces"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                  >
                    <Terminal className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>No setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Browser-based</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Cloud-powered</span>
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
                      codespace — my-org/webapp (main)
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-[#1e1e1e]">
                  <div className="flex gap-3 h-64">
                    <div className="w-8 bg-[#252526] rounded flex flex-col items-center py-2 gap-2">
                      <div className="w-6 h-6 rounded bg-[#3c3c3c] flex items-center justify-center">
                        <Code2 className="w-3 h-3 text-white" />
                      </div>
                      <div className="w-6 h-6 rounded bg-[#3c3c3c] flex items-center justify-center">
                        <Layers className="w-3 h-3 text-white" />
                      </div>
                      <div className="w-6 h-6 rounded bg-[#3c3c3c] flex items-center justify-center">
                        <Search className="w-3 h-3 text-white" />
                      </div>
                      <div className="w-6 h-6 rounded bg-[#3c3c3c] flex items-center justify-center">
                        <GitBranch className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1 bg-[#1e1e1e] border-b border-[#3c3c3c] p-2">
                        <div className="text-xs text-[#858585] mb-2">src/App.tsx</div>
                        <div className="font-mono text-xs text-[#d4d4d4] space-y-1">
                          <div>
                            <span className="text-[#569cd6]">import</span>{" "}
                            <span className="text-[#9cdcfe]">* as React</span>{" "}
                            <span className="text-[#569cd6]">from</span>{" "}
                            <span className="text-[#ce9178]">&quot;react&quot;</span>;
                          </div>
                          <div>
                            <span className="text-[#569cd6]">import</span>{" "}
                            <span className="text-[#9cdcfe]">{"{ Button }"}</span>{" "}
                            <span className="text-[#569cd6]">from</span>{" "}
                            <span className="text-[#ce9178]">
                              &quot;@/components/ui/button&quot;
                            </span>
                            ;
                          </div>
                          <div className="h-2" />
                          <div>
                            <span className="text-[#569cd6]">export default function</span>{" "}
                            <span className="text-[#dcdcaa]">App</span>() {"{"}
                          </div>
                          <div className="pl-4">
                            <span className="text-[#569cd6]">return</span> (
                          </div>
                          <div className="pl-8">
                            <span className="text-[#808080]">&lt;</span>
                            <span className="text-[#4ec9b0]">div</span>
                            <span className="text-[#808080]">&gt;</span>
                          </div>
                          <div className="pl-12">
                            <span className="text-[#808080]">&lt;</span>
                            <span className="text-[#4ec9b0]">Button</span>
                            <span className="text-[#808080]">&gt;</span>Hello World
                            <span className="text-[#808080]">&lt;/</span>
                            <span className="text-[#4ec9b0]">Button</span>
                            <span className="text-[#808080]">&gt;</span>
                          </div>
                          <div className="pl-8">
                            <span className="text-[#808080]">&lt;/</span>
                            <span className="text-[#4ec9b0]">div</span>
                            <span className="text-[#808080]">&gt;</span>
                          </div>
                          <div className="pl-4">);</div>
                          <div>{"}"}</div>
                        </div>
                      </div>
                      <div className="h-32 bg-[#1e1e1e] p-2">
                        <div className="text-xs text-[#858585]">Terminal</div>
                        <div className="font-mono text-xs text-[#d4d4d4] mt-1">
                          <div>
                            <span className="text-[#569cd6]">$</span> npm run dev
                          </div>
                          <div className="text-[#4ec9b0]">▲ VITE v5.0.0 ready in 234ms</div>
                          <div className="text-[#858585]">➜ Local: http://localhost:5173/</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Develop Instantly Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Develop <span className="text-primary">instantly</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Skip the setup headaches. Launch a fully configured development environment in
              seconds, not hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developFeatures.map((feature, index) => (
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

      {/* Built for Teams Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Teams
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built for teams.
                <span className="block text-primary">Engineered for collaboration.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Give your entire team access to identical, pre-configured development environments.
                Eliminate configuration drift and focus on what matters — writing code.
              </p>

              <div className="space-y-4">
                {teamFeatures.map((item, index) => (
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
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Team Activity</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">JD</span>
                      </div>
                      <span className="text-sm text-foreground">john@acme.com</span>
                    </div>
                    <span className="text-xs text-green-500 flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">SA</span>
                      </div>
                      <span className="text-sm text-foreground">sarah@acme.com</span>
                    </div>
                    <span className="text-xs text-green-500 flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">MK</span>
                      </div>
                      <span className="text-sm text-foreground">mike@acme.com</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Last active 2h ago</span>
                  </div>
                  <div className="pt-3 border-t border-border mt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>3 team members in codespaces</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance & Infrastructure Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Zap className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">Resource Usage</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Machine Type</span>
                    <span className="text-sm font-medium text-green-500">4 cores, 8GB RAM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Boot Time</span>
                    <span className="text-sm font-medium text-green-500">8.2 seconds</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Storage</span>
                    <span className="text-sm font-medium text-green-500">32GB persisted</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Uptime</span>
                    <span className="text-sm font-medium text-green-500">4h 32m</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Cloud className="w-4 h-4" />
                Performance
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Cloud-powered
                <span className="block text-primary">development.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Run your development environment on powerful cloud infrastructure. No more waiting
                for local builds or draining your laptop battery.
              </p>

              <div className="space-y-3">
                {performanceItems.map((item, index) => (
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
          </div>
        </div>
      </section>

      {/* Security & Isolation Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Security
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Secure by design.
                <span className="block text-primary">Isolated execution.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Every codespace runs in a secure, isolated container. Your code, your data, your
                control — with enterprise-grade security built in.
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
              <div className="relative bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/80" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    Settings / Codespaces
                  </span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-medium">Organization Policies</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-foreground">Allowed Machine Types</span>
                      <span className="text-muted-foreground">2-core, 4-core</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-foreground">Max Idle Timeout</span>
                      <span className="text-muted-foreground">60 minutes</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-foreground">Retention Period</span>
                      <span className="text-muted-foreground">30 days</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-green-500">
                      <Lock className="w-3 h-3" />
                      <span>Organization-managed</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Shield className="w-3 h-3" />
                      <span>Policy enforced</span>
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
              Built for <span className="text-primary">every workflow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you are an open source contributor, startup team, or enterprise — Giteria
              Codespaces adapts to your needs.
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
            Ready to start coding?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Launch your first codespace in seconds. No setup, no configuration, just code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Launch a Codespace
                <Sparkles className="w-5 h-5 ml-2" />
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

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Seconds to launch</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
