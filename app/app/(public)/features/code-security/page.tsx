"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Search,
  Lock,
  Bell,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Eye,
  Code2,
  AlertTriangle,
  RefreshCw,
  Package,
  Key,
  Clock,
  Users,
  Building2,
  Globe,
  Rocket,
  Server,
  FileText,
  Activity,
  Settings,
  ChevronRight,
  Workflow,
  Zap,
  FileCode,
  GitPullRequest,
  ShieldCheck,
  Layers,
} from "lucide-react";

const detectFeatures = [
  {
    icon: Search,
    title: "Static Code Analysis",
    description:
      "Deep scanning that identifies security vulnerabilities, code smells, and quality issues in your source code before they reach production.",
  },
  {
    icon: Package,
    title: "Dependency Scanning",
    description:
      "Automated detection of known vulnerabilities in your dependencies. Stay ahead of CVEs with real-time alerts and comprehensive database coverage.",
  },
  {
    icon: Key,
    title: "Secret Detection",
    description:
      "Prevent sensitive data from being committed. Pre-commit hooks and push protection keep API keys, tokens, and credentials safe.",
  },
  {
    icon: Bell,
    title: "Security Alerts",
    description:
      "Instant notifications when vulnerabilities are discovered. Get ahead of threats before they impact your systems with multi-channel alerts.",
  },
  {
    icon: RefreshCw,
    title: "Automated Remediation",
    description:
      "Receive actionable fix suggestions for vulnerabilities. Auto-generated pull requests help you patch issues quickly.",
  },
];

const workflowItems = [
  {
    icon: GitPullRequest,
    title: "Pull Request Scanning",
    description:
      "Security scans run automatically on every pull request. Vulnerabilities are caught and flagged before merge.",
  },
  {
    icon: FileCode,
    title: "Inline Security Warnings",
    description:
      "See security issues directly in your code editor. Line-by-line annotations highlight vulnerabilities in context.",
  },
  {
    icon: CheckCircle2,
    title: "Required Security Checks",
    description:
      "Configure security checks as required for merge. Block vulnerable code from entering your main branch.",
  },
  {
    icon: Workflow,
    title: "Actions Integration",
    description:
      "Native integration with Giteria Actions. Seamlessly incorporate security into your CI/CD pipelines.",
  },
];

const preventionItems = [
  {
    icon: Clock,
    title: "Continuous Monitoring",
    description:
      "24/7 scanning of your repositories. New vulnerabilities in dependencies are detected the moment they become public.",
  },
  {
    icon: Activity,
    title: "Security Insights",
    description:
      "Gain visibility into your security posture with dashboards and trends. Understand where risks are accumulating.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Prioritization",
    description:
      "Severity-based ranking helps you focus on critical issues first. CVSS scores and contextual data guide remediation.",
  },
  {
    icon: RefreshCw,
    title: "Automated Updates",
    description:
      "Dependency update suggestions keep your codebase current. Pull requests with version bumps ready to merge.",
  },
];

const collaborationItems = [
  {
    icon: Users,
    title: "Role-Based Access",
    description:
      "Fine-grained permissions control who can view, edit, and resolve security issues. Security teams and developers have appropriate access.",
  },
  {
    icon: Shield,
    title: "Protected Branches",
    description:
      "Branch protection rules enforce security standards. Require security checks to pass before any merge.",
  },
  {
    icon: Lock,
    title: "Secure Merge Rules",
    description:
      "Configure merge requirements that align with your security policies. Only clean, reviewed code gets merged.",
  },
  {
    icon: Eye,
    title: "Visibility Controls",
    description:
      "Control who can see sensitive security data. Public repositories show public issues; private repos keep details internal.",
  },
];

const useCases = [
  {
    icon: Globe,
    title: "Open Source Maintainers",
    description:
      "Protect your community projects from vulnerabilities. Keep users safe with automated scanning and security advisories.",
    benefits: [
      "Automated vulnerability alerts",
      "Dependency update automation",
      "Security advisories for users",
    ],
  },
  {
    icon: Rocket,
    title: "Startup Engineering Teams",
    description:
      "Build security into your foundation from day one. Developer-friendly tools that don't slow down your workflow.",
    benefits: ["Security without friction", "Instant setup", "Scalable as you grow"],
  },
  {
    icon: Building2,
    title: "Enterprise Development Teams",
    description:
      "Comprehensive security for large teams. Protect thousands of repositories with consistent, automated scanning.",
    benefits: ["Centralized security dashboard", "Team-wide visibility", "Policy enforcement"],
  },
  {
    icon: Terminal,
    title: "Security-Conscious Developers",
    description:
      "Take control of your code security. Proactive protection that integrates naturally into your daily workflow.",
    benefits: ["Developer-first experience", "IDE integrations", "Real-time feedback"],
  },
];

export default function CodeSecurityPage() {
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
                Code Security
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Protect your code.
                <span className="block text-primary">Before it ships.</span>
                <span className="block text-foreground">Built into your workflow.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A proactive security layer built directly into your development workflow to detect
                and prevent vulnerabilities before they reach production. Security that works as
                hard as you do.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Secure your code
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
                    Learn how it works
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Static analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Dependency scanning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Secret detection</span>
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
                      Security Scan — my-org/webapp
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Vulnerability Scan</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-green-500/10 border border-green-500/20">
                      <span className="text-foreground">Dependencies scanned</span>
                      <span className="text-green-500 font-medium">1,247 checked</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                      <span className="text-foreground">Vulnerabilities</span>
                      <span className="text-yellow-500 font-medium">3 found</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-xs">
                      <AlertTriangle className="w-3 h-3 text-yellow-500" />
                      <span className="text-foreground">CVE-2024-1234: lodash &lt; 4.17.21</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertTriangle className="w-3 h-3 text-yellow-500" />
                      <span className="text-foreground">CVE-2024-5678: express &lt; 4.18.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertTriangle className="w-3 h-3 text-yellow-500" />
                      <span className="text-foreground">Hardcoded API key detected</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-green-500 mt-2">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Fix suggestions available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Detect Vulnerabilities Early Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Detect vulnerabilities <span className="text-primary">before they find you</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive scanning that catches security issues at every stage of development.
              From your first line of code to production.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {detectFeatures.map((feature, index) => (
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

      {/* Built into your workflow Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built into
                <span className="block text-primary">your workflow.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Security that works where you work. No additional tools, no friction. Just secure
                code, automatically.
              </p>

              <div className="space-y-3">
                {workflowItems.map((item, index) => (
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
                  <span className="text-xs text-muted-foreground font-mono">Pull Request #89</span>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <Search className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Static Analysis</span>
                      </div>
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Passed
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-center gap-3">
                        <Package className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-foreground">Dependency Scan</span>
                      </div>
                      <span className="text-xs text-yellow-500 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />2 warnings
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <Key className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Secret Detection</span>
                      </div>
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Passed
                      </span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3 text-primary" />
                      <span>Security checks completed in 12s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevent before you deploy Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Prevent <span className="text-primary">before you deploy</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Continuous security that never sleeps. Monitor, prioritize, and remediate
              vulnerabilities before they reach production.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {preventionItems.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secure collaboration Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Security Settings</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Branch Protection</span>
                    <span className="text-sm font-medium text-green-500">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Required Security Checks</span>
                    <span className="text-sm font-medium text-green-500">3 enabled</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Secret Scanning</span>
                    <span className="text-sm font-medium text-green-500">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Vulnerability Alerts</span>
                    <span className="text-sm font-medium text-green-500">Enabled</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Secure
                <span className="block text-primary">collaboration.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Security that scales with your team. Role-based access controls, protected branches,
                and visibility settings keep everyone on the same page.
              </p>

              <div className="space-y-4">
                {collaborationItems.map((item, index) => (
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
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-primary">every team</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From individual developers to enterprise teams, Code Security adapts to your needs.
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
            Start protecting your code today
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Enable Code Security and get proactive protection for your codebase. Detect
            vulnerabilities early, prevent issues from reaching production, and ship with
            confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Enable Code Security
                <ShieldCheck className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <FileText className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Free for open source</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Self-hosted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No credit card</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
