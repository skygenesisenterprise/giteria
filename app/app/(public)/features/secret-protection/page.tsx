"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Key,
  Shield,
  Search,
  Lock,
  Bell,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Eye,
  AlertTriangle,
  RefreshCw,
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
  ScanEye,
  Fingerprint,
  EyeOff,
  Ban,
  FileKey,
  BadgeCheck,
  History,
  ClipboardList,
  ShieldAlert,
} from "lucide-react";

const detectFeatures = [
  {
    icon: FileKey,
    title: "API Key Detection",
    description:
      "Automatically identify exposed API keys for AWS, Google Cloud, Azure, Stripe, and 150+ other services. Pattern matching catches keys before they're committed.",
  },
  {
    icon: Fingerprint,
    title: "Token Scanning",
    description:
      "Detect OAuth tokens, access tokens, refresh tokens, and session credentials. Support for JWT, bearer tokens, and custom token formats.",
  },
  {
    icon: Search,
    title: "Credential Pattern Matching",
    description:
      "Advanced regex patterns identify hardcoded passwords, private keys, database connection strings, and other sensitive credentials.",
  },
  {
    icon: Bell,
    title: "Real-time Alerts",
    description:
      "Instant notifications via email, Slack, or webhooks when secrets are detected. Get alerted before sensitive data leaves your codebase.",
  },
  {
    icon: ScanEye,
    title: "Pre-commit Detection",
    description:
      "Block secrets at the source with git hooks that scan before commit. Prevent accidental exposure before it happens.",
  },
];

const workflowItems = [
  {
    icon: GitPullRequest,
    title: "Pull Request Blocking",
    description:
      "Automatically block pull requests that contain secrets. Merge is prevented until the exposed credentials are removed.",
  },
  {
    icon: BadgeCheck,
    title: "Required Security Checks",
    description:
      "Configure secret scanning as a required check for merge. Enforce security policies at the branch protection level.",
  },
  {
    icon: FileCode,
    title: "Inline Warnings",
    description:
      "See secret detections directly in your diff view. Line-by-line annotations highlight exactly where sensitive data was found.",
  },
  {
    icon: RefreshCw,
    title: "Automated Remediation",
    description:
      "Receive actionable guidance on how to remediate exposed secrets. Auto-generated suggestions help developers fix issues quickly.",
  },
];

const monitoringItems = [
  {
    icon: History,
    title: "Repository History Scanning",
    description:
      "Scan entire repository history for previously committed secrets. Discover old exposures that may still pose a risk.",
  },
  {
    icon: Building2,
    title: "Organization-wide Scanning",
    description:
      "Scale secret protection across your entire organization. Centralized visibility into all repositories and potential exposures.",
  },
  {
    icon: Bell,
    title: "Alert Management",
    description:
      "Customizable alert rules and routing. Route notifications to the right teams based on repository, severity, or secret type.",
  },
  {
    icon: Eye,
    title: "Incident Visibility",
    description:
      "Comprehensive dashboards show all detected secrets, their status, and remediation progress. Track incidents from detection to resolution.",
  },
];

const governanceItems = [
  {
    icon: Users,
    title: "Role-Based Access",
    description:
      "Fine-grained permissions control who can view, manage, and remediate secret detections. Keep sensitive findings confidential.",
  },
  {
    icon: Settings,
    title: "Secret Policy Rules",
    description:
      "Define custom rules for what constitutes a secret. Customize patterns, exemptions, and severity levels to match your security policies.",
  },
  {
    icon: ClipboardList,
    title: "Audit Logs",
    description:
      "Complete audit trail of all secret scanning activity. Track who viewed, acknowledged, or remediated detections for compliance.",
  },
  {
    icon: ShieldAlert,
    title: "Organization-level Enforcement",
    description:
      "Enforce secret protection policies across all teams. Ensure consistent security standards regardless of individual repository settings.",
  },
];

const useCases = [
  {
    icon: Globe,
    title: "Open Source Maintainers",
    description:
      "Protect your community projects from accidental credential leaks. Keep your users safe and maintain trust.",
    benefits: [
      "Pre-commit hook integration",
      "Automated security advisories",
      "Public repo protection",
    ],
  },
  {
    icon: Rocket,
    title: "Startup Teams",
    description:
      "Build security into your foundation from day one. Protect against credential theft before it becomes a problem.",
    benefits: ["Developer-friendly workflow", "Instant setup", "Scalable as you grow"],
  },
  {
    icon: Building2,
    title: "Enterprise Security Teams",
    description:
      "Comprehensive secret protection for large organizations. Centralized policies, audit trails, and organization-wide visibility.",
    benefits: ["Centralized management", "Compliance-ready", "Full audit trail"],
  },
  {
    icon: Terminal,
    title: "DevOps Engineers",
    description:
      "Automate secret protection in your CI/CD pipelines. Integrate security into your deployment workflows without friction.",
    benefits: ["CI/CD integration", "Pipeline blocking", "Infrastructure scanning"],
  },
];

export default function SecretProtectionPage() {
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
                Secret Protection
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Detect secrets.
                <span className="block text-primary">Before they leak.</span>
                <span className="block text-foreground">Protect your code.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A dedicated protection layer designed to detect and prevent exposed secrets before
                they compromise your codebase. Automatic scanning, pre-commit hooks, and pull
                request blocking keep your credentials safe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Enable Secret Protection
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
                  <span>150+ services</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Pre-commit hooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>PR blocking</span>
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
                      Pull Request #142 — my-org/webapp
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                      <AlertTriangle className="w-3 h-3 text-destructive" />
                    </div>
                    <span className="text-foreground font-medium">Secret Detected</span>
                    <span className="ml-auto text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded">
                      Blocked
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-destructive/10 border border-destructive/20">
                      <div className="flex items-center gap-2 text-destructive mb-1">
                        <Key className="w-3 h-3" />
                        <span>AWS Access Key Detected</span>
                      </div>
                      <div className="text-muted-foreground text-xs">
                        src/config.ts:42 — AKIAIOSFODNN7EXAMPLE
                      </div>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Ban className="w-3 h-3 text-destructive" />
                      <span>Merge blocked: secrets must be removed</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <EyeOff className="w-3 h-3 text-primary" />
                      <span>Token: sk_live_51Mz*** hidden</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-green-500 mt-2">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>3 other secrets detected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Detect exposed secrets instantly Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Detect exposed secrets <span className="text-primary">instantly</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive scanning that identifies credentials, keys, and tokens before they
              become a security risk. Detect at every stage of development.
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

      {/* Prevent leaks before merge Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Prevent leaks
                <span className="block text-primary">before merge.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Stop secrets from reaching your main branch. Automatic blocking, inline warnings,
                and required security checks ensure exposed credentials never make it into
                production.
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
                  <span className="text-xs text-muted-foreground font-mono">
                    Pull Request #89 — my-org/api
                  </span>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <ScanEye className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Secret Scanning</span>
                      </div>
                      <span className="text-xs text-destructive flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />2 detected
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-center gap-3">
                        <BadgeCheck className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-foreground">Required Checks</span>
                      </div>
                      <span className="text-xs text-yellow-500 flex items-center gap-1">
                        <Ban className="w-3 h-3" />
                        Failed
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Credential Scan</span>
                      </div>
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Passed
                      </span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3 text-primary" />
                      <span>Security checks completed in 8s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continuous Monitoring Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Continuous <span className="text-primary">monitoring</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Never stop watching. Repository history scanning, organization-wide visibility, and
              comprehensive incident tracking keep your secrets safe around the clock.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {monitoringItems.map((item, index) => (
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

      {/* Governance & Control Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Organization Security</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Secret Scanning</span>
                    <span className="text-sm font-medium text-green-500">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Pre-commit Hooks</span>
                    <span className="text-sm font-medium text-green-500">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">PR Blocking</span>
                    <span className="text-sm font-medium text-green-500">Enforced</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">History Scanning</span>
                    <span className="text-sm font-medium text-green-500">Weekly</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Governance
                <span className="block text-primary">& control.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Enterprise-grade controls for secret protection. Role-based access, custom policies,
                and comprehensive audit logs ensure compliance and security at scale.
              </p>

              <div className="space-y-4">
                {governanceItems.map((item, index) => (
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
              From individual developers to enterprise organizations, Secret Protection adapts to
              your security needs.
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
            Start protecting your secrets today
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Enable Secret Protection and keep your credentials safe. Automatic detection, pre-commit
            hooks, and pull request blocking prevent leaks before they happen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Enable Secret Protection
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
