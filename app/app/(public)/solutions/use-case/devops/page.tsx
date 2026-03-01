"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Zap,
  CheckCircle2,
  ArrowRight,
  Terminal,
  GitBranch,
  Code2,
  Container,
  Server,
  Workflow,
  Clock,
  Users,
  Layers,
  MessageSquare,
  Eye,
  Settings,
  RefreshCw,
  Gauge,
  Handshake,
  Shield,
} from "lucide-react";

const challengeItems = [
  {
    icon: Clock,
    title: "Slow Release Cycles",
    description:
      "Manual deployment processes create bottlenecks that delay releases. Teams spend more time on repetitive tasks than on writing code.",
  },
  {
    icon: Settings,
    title: "Manual Deployments",
    description:
      "Error-prone manual steps lead to inconsistent deployments. Rollbacks are slow and risky, increasing downtime when issues occur.",
  },
  {
    icon: Users,
    title: "Siloed Teams",
    description:
      "Development, operations, and security teams work in isolation. Lack of collaboration creates gaps in knowledge and process.",
  },
  {
    icon: Eye,
    title: "Poor Workflow Visibility",
    description:
      "Limited insight into pipeline status and deployment health. Teams struggle to track progress and identify bottlenecks.",
  },
  {
    icon: RefreshCw,
    title: "Operational Bottlenecks",
    description:
      "Infra teams become gatekeepers for every change. Scaling operations requires more people rather than better processes.",
  },
];

const devopsFeatures = [
  {
    icon: Rocket,
    title: "Integrated CI/CD",
    description:
      "Giteria Actions provides powerful continuous integration and deployment. Build, test, and deploy from your repository with full control.",
    href: "/features/actions",
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description:
      "Define workflows as code. Automate builds, tests, security scans, and deployments triggered by events you choose.",
    href: "/features/actions",
  },
  {
    icon: GitBranch,
    title: "Pull Requests & Code Reviews",
    description:
      "Powerful code review tools with inline comments, approvals, and merge checks. Ensure quality before every deployment.",
    href: "/features/code-review",
  },
  {
    icon: Layers,
    title: "Issue Tracking",
    description:
      "Organize tasks, track bugs, and plan releases. Link issues to commits and PRs for complete traceability.",
    href: "/features/issues",
  },
  {
    icon: MessageSquare,
    title: "Team Collaboration",
    description:
      "Discussions, comments, and notifications keep everyone aligned. From code review to deployment alerts.",
    href: "/features/discussions",
  },
  {
    icon: Container,
    title: "Cloud-Ready Infrastructure",
    description:
      "Deploy to any cloud provider. Container registry, Kubernetes integration, and flexible deployment options.",
    href: "/features/actions",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Code Commit",
    description:
      "Developer pushes code to the repository. Pre-commit hooks validate code quality and run basic checks.",
    icon: GitBranch,
  },
  {
    number: "02",
    title: "Automated Build & Tests",
    description:
      "CI pipeline triggers automatically. Builds run, unit and integration tests execute, security scans analyze code.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Code Review",
    description:
      "Pull request created. Team reviews changes, leaves comments, and approves. CI status checks must pass.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Deployment Pipeline",
    description:
      "Upon merge, deployment workflow triggers. Code builds, packages, and deploys to staging or production environments.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Monitoring & Iteration",
    description:
      "Deployment health monitored. Metrics flow back to team. New issues create feedback loop for next iteration.",
    icon: Eye,
  },
];

const benefits = [
  {
    icon: Rocket,
    title: "Faster Deployments",
    description:
      "Automate your entire release process. Deploy multiple times per day with confidence. From commit to production in minutes.",
  },
  {
    icon: Gauge,
    title: "Reduced Operational Friction",
    description:
      "Eliminate manual steps and configuration drift. Self-service infrastructure lets developers ship faster without waiting.",
  },
  {
    icon: Handshake,
    title: "Better Team Collaboration",
    description:
      "Break down silos between dev and ops. Shared visibility, unified workflows, and integrated tools keep teams aligned.",
  },
  {
    icon: Shield,
    title: "Improved Reliability",
    description:
      "Consistent, repeatable deployments with built-in safety. Rollbacks are one click away. Comprehensive audit trails.",
  },
  {
    icon: Zap,
    title: "Scalable Processes",
    description:
      "Processes that scale with your team. More deployments without proportionally more operational overhead.",
  },
];

export default function DevOpsPage() {
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
                DevOps
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Accelerate your
                <span className="block text-primary">development pipeline.</span>
                <span className="block text-foreground">Ship faster.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A unified DevOps platform designed to accelerate development, automate workflows,
                and improve deployment reliability. From code commit to production, Giteria powers
                your entire delivery pipeline.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Accelerate Your Pipeline
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
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Automated CI/CD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Self-Hosted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Full Control</span>
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
                      Deployment Pipeline #247
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Rocket className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Production Deploy</span>
                    <span className="text-green-500 ml-auto text-xs px-2 py-0.5 bg-green-500/10 rounded">
                      Success
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Build: Completed in 2m 34s</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Tests: 247 passed</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Security: No vulnerabilities</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Deploy: Production ready</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-xs">
                      <Zap className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Total time: 4m 12s</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">Deployed by @john</span>
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
                <Rocket className="w-5 h-5" />
                Fast Deploys
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Shield className="w-5 h-5" />
                Secure Pipeline
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Server className="w-5 h-5" />
                Self-Hosted
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Workflow className="w-5 h-5" />
                Automated
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* The DevOps Challenge Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The DevOps <span className="text-primary">challenge</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Modern teams face increasing pressure to deliver faster while maintaining quality.
              Understanding these challenges is the first step toward DevOps excellence.
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

      {/* How Giteria Powers DevOps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Giteria <span className="text-primary">powers DevOps</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every tool you need to build, test, and deploy at scale. Integrated into a single
              platform running on your infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devopsFeatures.map((feature, index) => (
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

      {/* Example DevOps Workflow Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Example DevOps <span className="text-primary">workflow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From code commit to production deployment — see how Giteria automates your entire
              delivery pipeline with speed and reliability.
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
                DevOps that
                <span className="block text-primary">delivers results</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Transform your development operations. See the measurable impact on delivery speed,
                team efficiency, and system reliability.
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
                  <Rocket className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">DevOps Metrics</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Deployment Frequency</span>
                    <span className="text-sm font-medium text-green-500">10x increase</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-foreground">Lead Time to Deploy</span>
                    <span className="text-sm font-medium text-primary">-85%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Change Failure Rate</span>
                    <span className="text-sm font-medium text-green-500">-70%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-foreground">MTTR (Mean Time to Recover)</span>
                    <span className="text-sm font-medium text-primary">-90%</span>
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
            Streamline Your DevOps with Giteria
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Automate your entire delivery pipeline with a unified platform. Ship faster, deploy with
            confidence, and maintain full control over your infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Accelerate Your Pipeline
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
