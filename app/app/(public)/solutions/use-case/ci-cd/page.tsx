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
  Container,
  Server,
  Workflow,
  Clock,
  Users,
  Eye,
  Settings,
  RefreshCw,
  Gauge,
  Shield,
  Lock,
  GitCommit,
  ShieldCheck,
  Undo2,
  ServerCog,
  FlaskConical,
  WorkflowIcon,
  TrendingUp,
  BarChart3,
  LayersIcon,
} from "lucide-react";

const challengeItems = [
  {
    icon: Settings,
    title: "Manual Builds",
    description:
      "Manual build processes create inconsistencies and slow down development. Teams waste time on repetitive compilation tasks that could be automated.",
  },
  {
    icon: RefreshCw,
    title: "Inconsistent Testing",
    description:
      "Ad-hoc testing approaches lead to bugs reaching production. Without standardized test suites, quality becomes unpredictable across deployments.",
  },
  {
    icon: Eye,
    title: "Deployment Errors",
    description:
      "Manual deployments introduce human error. Configuration drift between environments causes failures that are discovered too late in production.",
  },
  {
    icon: Clock,
    title: "Slow Release Cycles",
    description:
      "Long feedback loops delay bug detection and feature delivery. Manual processes create bottlenecks that prevent rapid iteration.",
  },
  {
    icon: LayersIcon,
    title: "Lack of Visibility",
    description:
      "Limited insight into build status, test results, and deployment progress. Teams struggle to track what's deployed and where issues exist.",
  },
];

const ciFeatures = [
  {
    icon: Rocket,
    title: "Automated Builds",
    description:
      "Every push automatically triggers a build. No more manual compilation. Consistent, reproducible builds every time.",
    href: "/features/actions",
  },
  {
    icon: FlaskConical,
    title: "Automated Testing",
    description:
      "Run unit tests, integration tests, and end-to-end tests automatically. Ensure code quality with every change.",
    href: "/features/actions",
  },
  {
    icon: GitBranch,
    title: "Pull Request Validation",
    description:
      "CI checks run on every PR. Get instant feedback on code quality, test coverage, and security before merging.",
    href: "/features/code-review",
  },
  {
    icon: Zap,
    title: "Instant Feedback Loops",
    description:
      "Developers get immediate feedback on their changes. Fast failure detection means quick fixes and less context switching.",
    href: "/features/actions",
  },
];

const cdFeatures = [
  {
    icon: Workflow,
    title: "Automated Deployment Pipelines",
    description:
      "Define deployment workflows as code. From staging to production, every deployment follows the same proven process.",
    href: "/features/actions",
  },
  {
    icon: ServerCog,
    title: "Environment Configuration",
    description:
      "Manage multiple environments with consistent configuration. Staging, QA, and production all configured automatically.",
    href: "/features/actions",
  },
  {
    icon: Lock,
    title: "Secret Protection",
    description:
      "Sensitive credentials never exposed in logs or configs. Secure secret management integrated into every pipeline.",
    href: "/features/secret-protection",
  },
  {
    icon: Undo2,
    title: "Rollback Mechanisms",
    description:
      "One-click rollbacks when issues arise. Instant reversion to the last known good state minimizes downtime.",
    href: "/features/actions",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Code Push",
    description:
      "Developer pushes code to the repository. Pre-commit hooks validate code quality and run basic checks before acceptance.",
    icon: GitCommit,
  },
  {
    number: "02",
    title: "Build & Test",
    description:
      "CI pipeline triggers automatically. Code compiles, unit tests run, security scans analyze dependencies for vulnerabilities.",
    icon: Container,
  },
  {
    number: "03",
    title: "Security Check",
    description:
      "Automated security scans detect vulnerabilities, secret exposure, and compliance issues before deployment proceeds.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Deploy Pipeline",
    description:
      "Upon merge, deployment workflow executes. Code builds, packages, and deploys to staging and production environments.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Monitor & Iterate",
    description:
      "Deployment health monitored in real-time. Metrics and logs flow back to the team, creating a feedback loop for improvement.",
    icon: Eye,
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Faster Release Cycles",
    description:
      "Automate your entire release process. Deploy multiple times per day with confidence. From commit to production in minutes.",
  },
  {
    icon: Shield,
    title: "Reduced Human Errors",
    description:
      "Eliminate manual steps that cause mistakes. Consistent, automated pipelines ensure deployments are reliable and repeatable.",
  },
  {
    icon: BarChart3,
    title: "Better Visibility",
    description:
      "Real-time insight into every build, test, and deployment. Track progress across all environments from a single dashboard.",
  },
  {
    icon: CheckCircle2,
    title: "Increased Reliability",
    description:
      "Comprehensive testing and automated rollbacks ensure high availability. Deploy with confidence knowing failures are contained.",
  },
  {
    icon: Gauge,
    title: "Scalable Pipelines",
    description:
      "Pipelines that grow with your team. More deployments without proportionally more operational overhead or complexity.",
  },
];

export default function CICDPage() {
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
                CI/CD
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Automate your
                <span className="block text-primary">build, test,</span>
                <span className="block text-foreground">and deploy pipeline.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A modern CI/CD platform designed to automate builds, testing, and deployments in a
                unified development environment. Ship faster with confidence — from code commit to
                production, Giteria handles your entire delivery pipeline.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Automate Your Pipeline
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
                  <span>Automated Builds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Instant Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>One-Click Rollback</span>
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
                      .giteria/workflows/ci-cd.yml
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Rocket className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Build & Deploy Pipeline</span>
                    <span className="text-green-500 ml-auto text-xs px-2 py-0.5 bg-green-500/10 rounded">
                      Passing
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Checkout: Code fetched</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Build: Completed in 1m 42s</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Test: 156 tests passed</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Security: 0 vulnerabilities</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Deploy: Production ready</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-xs">
                      <Zap className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Total time: 3m 18s</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">PR #89 merged</span>
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
                Fast Builds
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
                <WorkflowIcon className="w-5 h-5" />
                Automated
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* The CI/CD Challenge Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The CI/CD <span className="text-primary">challenge</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Modern development teams face increasing pressure to deliver faster while maintaining
              quality. Understanding these challenges is the first step toward efficient CI/CD.
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

      {/* Continuous Integration Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Continuous <span className="text-primary">Integration</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Automatically build and test every change. Catch issues early with comprehensive CI
              pipelines that run on every push and pull request.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ciFeatures.map((feature, index) => (
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

      {/* Continuous Deployment Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Continuous <span className="text-primary">Deployment</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ship to production with confidence. Automated deployment pipelines ensure consistent,
              reliable releases with built-in safety mechanisms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cdFeatures.map((feature, index) => (
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

      {/* Integrated Workflow Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Integrated <span className="text-primary">workflow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From code commit to production deployment — see how Giteria automates your entire
              delivery pipeline with speed, reliability, and built-in security.
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
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                CI/CD that
                <span className="block text-primary">delivers results</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Transform your delivery pipeline. See the measurable impact on release speed, system
                reliability, and team productivity.
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
                  <span className="font-semibold text-foreground">CI/CD Metrics</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Deployment Frequency</span>
                    <span className="text-sm font-medium text-green-500">10x increase</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-foreground">Build Time</span>
                    <span className="text-sm font-medium text-primary">-60%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Deployment Errors</span>
                    <span className="text-sm font-medium text-green-500">-85%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-foreground">Mean Time to Recovery</span>
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
            Build, Test, and Deploy with Confidence
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Automate your entire CI/CD pipeline with a unified platform. Ship faster, deploy with
            confidence, and maintain full control over your delivery process.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Automate Your Pipeline
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
