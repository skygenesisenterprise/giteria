"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  ShieldCheck,
  Lock,
  Search,
  Bell,
  AlertTriangle,
  Eye,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  Terminal,
  FileCode,
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
  BarChart3,
  Settings,
  ChevronRight,
  Database,
  Workflow,
  Handshake,
} from "lucide-react";

const vulnerabilityFeatures = [
  {
    icon: Search,
    title: "Static Analysis",
    description:
      "Deep code scanning that identifies security vulnerabilities, code smells, and quality issues before they reach production.",
  },
  {
    icon: Package,
    title: "Dependency Scanning",
    description:
      "Automated detection of known vulnerabilities in your dependencies. Stay ahead of CVEs with real-time alerts.",
  },
  {
    icon: Key,
    title: "Secret Detection",
    description:
      "Prevent sensitive data from being committed. Pre-commit hooks and push protection keep keys and tokens safe.",
  },
  {
    icon: Bell,
    title: "Automated Alerts",
    description:
      "Instant notifications when vulnerabilities are discovered. Get ahead of threats before they impact your systems.",
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    description:
      "Continuous security monitoring across all repositories. Complete visibility into your security posture.",
  },
];

const workflowItems = [
  {
    icon: GitBranch,
    title: "Pull Request Security Checks",
    description:
      "Security scans run automatically on every pull request. Vulnerabilities are caught before merge.",
  },
  {
    icon: CheckCircle2,
    title: "Required Status Validations",
    description:
      "Configure security checks as required for merge. Block vulnerable code from entering your main branch.",
  },
  {
    icon: Workflow,
    title: "Secure CI Integrations",
    description:
      "Native CI/CD security gates. Integrate security into your existing pipelines without disruption.",
  },
  {
    icon: Lock,
    title: "Merge Protections",
    description:
      "Branch protection rules that enforce security standards. Only clean, safe code gets merged.",
  },
];

const governanceItems = [
  {
    icon: Settings,
    title: "Organization-Level Policies",
    description:
      "Define security policies once, apply everywhere. Consistent enforcement across all repositories.",
  },
  {
    icon: FileText,
    title: "Audit Logs",
    description:
      "Complete history of all security events, changes, and actions. Full traceability for compliance.",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description:
      "Fine-grained permissions for security roles. Control who can view, edit, and resolve vulnerabilities.",
  },
  {
    icon: BarChart3,
    title: "Compliance Reporting",
    description:
      "Generate reports for SOC2, ISO 27001, GDPR, and more. Demonstrate security posture to auditors.",
  },
  {
    icon: Activity,
    title: "Risk Visibility Dashboard",
    description:
      "Centralized view of organizational risk. Prioritize remediation based on severity and impact.",
  },
];

const enterpriseItems = [
  {
    icon: Server,
    title: "Centralized Management",
    description:
      "Manage security across thousands of repositories from a single console. Scale without complexity.",
  },
  {
    icon: BarChart3,
    title: "Scalable Monitoring",
    description:
      "Security that grows with you. Monitor unlimited repositories with consistent performance.",
  },
  {
    icon: Eye,
    title: "Security Insights",
    description:
      "AI-powered analysis that identifies patterns and predicts potential threats before they materialize.",
  },
  {
    icon: ShieldCheck,
    title: "Threat Mitigation",
    description:
      "Automated remediation suggestions and patch management. Fix vulnerabilities faster.",
  },
];

const useCases = [
  {
    icon: Building2,
    title: "Enterprise Security Teams",
    description:
      "Comprehensive security suite for large organizations. Full visibility, governance, and compliance.",
    benefits: ["Centralized policy management", "SOC2 & ISO 27001 compliance", "Dedicated support"],
  },
  {
    icon: Globe,
    title: "Regulated Industries",
    description:
      "Meet strict security requirements in finance, healthcare, and government. Full audit trails.",
    benefits: ["Complete audit logs", "Data residency controls", "Compliance reporting"],
  },
  {
    icon: Users,
    title: "Open Source Maintainers",
    description:
      "Protect your community projects from vulnerabilities. Keep users safe with automated scanning.",
    benefits: ["Automated vulnerability alerts", "Dependency updates", "Security advisories"],
  },
  {
    icon: Rocket,
    title: "Startup Scaling Securely",
    description: "Build security into your foundation from day one. Scale without technical debt.",
    benefits: ["Security from the start", "Automated compliance", "Developer-friendly tools"],
  },
];

export default function AdvancedSecurityPage() {
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
                Enterprise Security
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Protect your code.
                <span className="block text-primary">Secure your future.</span>
                <span className="block text-foreground">Enterprise-grade.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A comprehensive security layer designed to protect your code, your teams, and your
                organization at scale. From vulnerability detection to compliance reporting,
                everything you need to build securely.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Enable Advanced Security
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link
                  href="https://docs.giteria.com/security"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                  >
                    <Terminal className="w-5 h-5 mr-2" />
                    Explore Security Features
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Dependency scanning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Secret detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Compliance reports</span>
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
                      Security Dashboard — my-org
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Security Overview</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-green-500/10 border border-green-500/20">
                      <span className="text-foreground">Repositories scanned</span>
                      <span className="text-green-500 font-medium">247</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-green-500/10 border border-green-500/20">
                      <span className="text-foreground">Dependencies analyzed</span>
                      <span className="text-green-500 font-medium">12,847</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-green-500/10 border border-green-500/20">
                      <span className="text-foreground">Vulnerabilities</span>
                      <span className="text-green-500 font-medium">0 Critical</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Secret scanning: Active</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Compliance: SOC2 Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Code Vulnerability Detection Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find vulnerabilities <span className="text-primary">before they find you</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive scanning that catches security issues at every stage of development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vulnerabilityFeatures.map((feature, index) => (
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

      {/* Secure Development Workflow Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Security built into
                <span className="block text-primary">every workflow.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                From code to merge, security checks happen automatically. No additional steps
                required. Just secure code.
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
                  <span className="text-xs text-muted-foreground font-mono">Pull Request #156</span>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <Search className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Dependency Scan</span>
                      </div>
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Passed
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
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <FileCode className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Static Analysis</span>
                      </div>
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Passed
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-foreground font-medium">
                          All checks passed
                        </span>
                      </div>
                      <span className="text-xs text-green-500">Ready to merge</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Compliance Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Compliance Report</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">SOC2 Type II</span>
                    <span className="text-sm font-medium text-green-500">Compliant</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">ISO 27001</span>
                    <span className="text-sm font-medium text-green-500">Compliant</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">GDPR</span>
                    <span className="text-sm font-medium text-green-500">Compliant</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Audit Log Retention</span>
                    <span className="text-sm font-medium text-green-500">2 Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Handshake className="w-4 h-4" />
                Governance & Compliance
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Security that satisfies
                <span className="block text-primary">every auditor.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Enterprise-grade governance and compliance tools built-in. Generate reports, track
                changes, and demonstrate security posture with confidence.
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

      {/* Enterprise-Grade Protection Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Enterprise-grade <span className="text-primary">protection</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Security designed for large-scale organizations. Manage thousands of repositories
              without breaking a sweat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {enterpriseItems.map((item, index) => (
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

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-primary">every security need</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From startups to global enterprises, Advanced Security adapts to your requirements.
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
            Secure your code today
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Enable Advanced Security and gain peace of mind knowing your code, dependencies, and
            organization are protected. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Enable Advanced Security
                <ShieldCheck className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-foreground hover:bg-secondary font-semibold rounded-md"
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
              <span>Enterprise support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
