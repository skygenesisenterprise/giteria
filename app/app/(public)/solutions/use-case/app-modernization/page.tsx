"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Shield,
  GitBranch,
  Zap,
  Lock,
  Container,
  Server,
  Cloud,
  ArrowRight,
  Terminal,
  CheckCircle2,
  RefreshCw,
  Clock,
  Users,
  FileCode,
  Workflow,
  Key,
  Bot,
} from "lucide-react";

const challengeItems = [
  {
    icon: Server,
    title: "Legacy Monoliths",
    description:
      "Monolithic applications that are difficult to update, scale, and maintain. Tightly coupled components slow down development.",
  },
  {
    icon: Clock,
    title: "Manual Deployments",
    description:
      "Time-consuming manual release processes prone to human error. Long deployment windows limit your ability to iterate quickly.",
  },
  {
    icon: Shield,
    title: "Security Vulnerabilities",
    description:
      "Outdated dependencies and lack of automated security scanning expose your applications to known CVEs and exploits.",
  },
  {
    icon: RefreshCw,
    title: "Lack of CI/CD",
    description:
      "No automated testing or continuous integration. Code changes sit in staging for days or weeks before release.",
  },
  {
    icon: Users,
    title: "Slow Release Cycles",
    description:
      "Months between major releases. Business requirements and bug fixes take too long to reach production.",
  },
];

const giteriaFeatures = [
  {
    icon: Workflow,
    title: "Integrated CI/CD",
    description:
      "Powerful pipeline automation that builds, tests, and deploys your applications. From commit to production in minutes.",
    href: "/features/actions",
  },
  {
    icon: Shield,
    title: "Secure Code Review",
    description:
      "Comprehensive code review workflows with inline comments, approvals, and merge checks. Every change vetted by your team.",
    href: "/features/code-review",
  },
  {
    icon: Key,
    title: "Secret Protection",
    description:
      "Automated secret detection prevents credentials from being committed. Encryption at rest and in transit.",
    href: "/features/secret-protection",
  },
  {
    icon: RefreshCw,
    title: "Automated Workflows",
    description:
      "Define custom workflows that automate repetitive tasks. From dependency updates to deployment orchestration.",
    href: "/features/actions",
  },
  {
    icon: Bot,
    title: "MCP & Model Integration",
    description:
      "AI-powered assistance throughout your development workflow. Code generation, refactoring, and documentation.",
    href: "/features/mcp",
  },
  {
    icon: Cloud,
    title: "Cloud-Ready Development",
    description:
      "Container-native workflows with integrated registry. Deploy to any cloud platform with automated scaling.",
    href: "/features/codespaces",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Import Legacy Repo",
    description:
      "Bring your existing codebase into Giteria. Preserve full git history and migrate in minutes.",
    icon: GitBranch,
  },
  {
    number: "02",
    title: "Refactor with AI Assistance",
    description:
      "Use AI-powered tools to identify modernization opportunities and assist with refactoring.",
    icon: FileCode,
  },
  {
    number: "03",
    title: "Automate Tests & Deployments",
    description:
      "Set up CI/CD pipelines that run comprehensive tests on every change automatically.",
    icon: Container,
  },
  {
    number: "04",
    title: "Secure Code & Secrets",
    description:
      "Enable dependency scanning, secret detection, and code security analysis automatically.",
    icon: Lock,
  },
  {
    number: "05",
    title: "Deploy to Cloud",
    description:
      "Push your modernized application to any cloud platform with built-in container registry.",
    icon: Cloud,
  },
];

const benefits = [
  {
    icon: Rocket,
    title: "Faster Release Cycles",
    description:
      "Reduce time-to-market from months to days. Automated CI/CD enables multiple deployments per day.",
  },
  {
    icon: Shield,
    title: "Reduced Operational Risk",
    description:
      "Comprehensive testing and security scanning catch issues before they reach production.",
  },
  {
    icon: Users,
    title: "Improved Collaboration",
    description:
      "Unified workflows bring development, security, and operations teams together on one platform.",
  },
  {
    icon: Lock,
    title: "Stronger Security Posture",
    description:
      "Automated vulnerability scanning, secret detection, and compliance reporting built-in.",
  },
  {
    icon: Cloud,
    title: "Scalable Infrastructure",
    description:
      "Container-native architecture scales with your needs. From startup to enterprise workloads.",
  },
];

export default function AppModernizationPage() {
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
                App Modernization
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Transform your legacy
                <span className="block text-primary">applications</span>
                <span className="block text-foreground">with confidence.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Accelerate application modernization with integrated CI/CD, security, and AI-powered
                development tools. Migrate from legacy monoliths to cloud-native architectures —
                faster and safer.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Start Modernizing Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                  >
                    <Terminal className="w-5 h-5 mr-2" />
                    Talk to Sales
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>CI/CD Built-in</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Security First</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>AI-Powered</span>
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
                      Legacy Migration Pipeline
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Rocket className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Migration Pipeline #42</span>
                    <span className="text-green-500 ml-auto text-xs px-2 py-0.5 bg-green-500/10 rounded">
                      Running
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-foreground">Importing legacy repository...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-foreground">Analyzing codebase structure</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-foreground">Running security scan</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-foreground">Building container image</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">5/6 steps complete</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Zap className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">~2 min remaining</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Trusted by teams modernizing applications worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Container className="w-5 h-5" />
                Container Native
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Cloud className="w-5 h-5" />
                Cloud Ready
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Shield className="w-5 h-5" />
                Secure by Default
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Zap className="w-5 h-5" />
                Automated
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* The Challenge Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The <span className="text-primary">challenge</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Legacy applications pose significant challenges for modern development teams.
              Understanding these obstacles is the first step toward transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challengeItems.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Giteria Helps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How <span className="text-primary">Giteria</span> helps
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A modern, secure, and scalable development platform built to accelerate application
              modernization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {giteriaFeatures.map((feature, index) => (
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

      {/* Modernization Workflow Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Modernization <span className="text-primary">workflow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A proven path from legacy codebase to modern, cloud-native application — powered by
              Giteria.
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-5 gap-4">
              {workflowSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all h-full">
                    <div className="text-4xl font-bold text-primary mb-3">{step.number}</div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Measurable
                <span className="block text-primary">benefits</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Transform your development operations with quantifiable improvements across speed,
                security, and scalability.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Zap className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">Modernization Metrics</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-foreground">Deployment Frequency</span>
                    <span className="text-sm font-medium text-primary">Daily → Hourly</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-foreground">Lead Time</span>
                    <span className="text-sm font-medium text-primary">Weeks → Hours</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Security Issues</span>
                    <span className="text-sm font-medium text-green-500">-85%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-foreground">Infrastructure Cost</span>
                    <span className="text-sm font-medium text-primary">-40%</span>
                  </div>
                </div>
              </div>
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
            Modernize your applications with Giteria
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join teams that have transformed their legacy applications into modern, secure, and
            scalable cloud-native solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Start Modernizing Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <Terminal className="w-5 h-5 mr-2" />
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
