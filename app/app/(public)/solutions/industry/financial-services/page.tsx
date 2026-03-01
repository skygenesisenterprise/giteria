"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Users,
  FileCheck,
  Server,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Eye,
  Clock,
  Database,
  Workflow,
  Scan,
  Key,
  ClipboardList,
  Rocket,
  BarChart3,
  Building2,
  Wallet,
  TrendingUp,
  Fingerprint,
  AlertTriangle,
  FileText,
  RefreshCw,
} from "lucide-react";

const challenges = [
  {
    icon: FileCheck,
    title: "Strict Regulatory Frameworks",
    description:
      "Navigate complex compliance requirements with comprehensive audit trails and detailed documentation capabilities.",
  },
  {
    icon: Fingerprint,
    title: "High Security Requirements",
    description:
      "Protect sensitive financial data and transactions with enterprise-grade security controls and encryption.",
  },
  {
    icon: AlertTriangle,
    title: "Fraud & Vulnerability Risks",
    description:
      "Mitigate security vulnerabilities in financial software and prevent exploits that could compromise customer assets.",
  },
  {
    icon: ClipboardList,
    title: "Audit & Reporting Complexity",
    description:
      "Meet rigorous auditing demands with detailed activity logs, change tracking, and comprehensive reporting.",
  },
  {
    icon: RefreshCw,
    title: "Legacy Infrastructure Modernization",
    description:
      "Transition from outdated systems while maintaining reliability, security, and regulatory compliance.",
  },
];

const securityFeatures = [
  {
    icon: Workflow,
    title: "Integrated DevSecOps Workflows",
    description:
      "Embed security into every stage of your development lifecycle. From code commit to deployment, security is built-in, not bolted on.",
  },
  {
    icon: Key,
    title: "Secret Protection",
    description:
      "Prevent API keys, credentials, and sensitive configuration from being exposed in your repositories with pre-commit hooks and push protection.",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description:
      "Define granular permissions for developers, auditors, and compliance teams. Control who can view, edit, and deploy code.",
  },
  {
    icon: ClipboardList,
    title: "Audit Logs & Traceability",
    description:
      "Maintain comprehensive logs of all actions. Every code change, access event, and deployment is tracked for compliance and investigation.",
  },
  {
    icon: Rocket,
    title: "Automated CI/CD Pipelines",
    description:
      "Streamline deployments with automated pipelines that include security scanning, testing, and compliance validation.",
  },
  {
    icon: Eye,
    title: "Secure Code Review",
    description:
      "Enable thorough peer reviews with inline comments, approval workflows, and security-focused checklists.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Controlled Code Commit",
    description:
      "Developers push code with built-in secret scanning and vulnerability detection. Pre-commit hooks prevent sensitive data from entering the repository.",
  },
  {
    step: "02",
    title: "Automated Compliance Checks",
    description:
      "CI/CD pipelines run comprehensive security scans including dependency vulnerability detection, static analysis, and compliance validation.",
  },
  {
    step: "03",
    title: "Secure Review Process",
    description:
      "Security teams and compliance officers review changes with full audit trails. Approvals are tracked with complete accountability.",
  },
  {
    step: "04",
    title: "Approved Deployment Pipeline",
    description:
      "Deploy to staging and production environments with multi-layer approval workflows. Environment-specific configurations keep production secrets secure.",
  },
  {
    step: "05",
    title: "Continuous Monitoring & Traceability",
    description:
      "Ongoing surveillance detects anomalies, tracks security metrics, and maintains complete traceability for regulatory requirements.",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Reduced Operational Risk",
    description:
      "Minimize exposure to security breaches and compliance violations with built-in security controls and comprehensive audit trails.",
  },
  {
    icon: Lock,
    title: "Stronger Security Posture",
    description:
      "Protect intellectual property, customer data, and financial transactions with enterprise-grade security features.",
  },
  {
    icon: FileText,
    title: "Improved Audit Readiness",
    description:
      "Be prepared for regulatory reviews with detailed logging, documentation, and traceability features built-in.",
  },
  {
    icon: TrendingUp,
    title: "Faster Innovation Cycles",
    description:
      "Accelerate development without compromising security through automated workflows and integrated tooling.",
  },
  {
    icon: Server,
    title: "Scalable Infrastructure",
    description:
      "Grow your development operations from small teams to enterprise scale with consistent security and compliance.",
  },
];

export default function FinancialServicesPage() {
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
                Financial Services Solutions
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Secure development
                <span className="block text-primary">for financial services</span>
                <span className="block text-foreground">and fintech organizations.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Build, deploy, and manage financial applications with confidence. Giteria provides
                the security, traceability, and compliance features that highly regulated
                environments demand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Secure Your Financial Development
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
                  <span>Self-Hosted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Audit Trails</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Access Control</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg rounded-xl overflow-hidden-card border border-border shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/80" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-3 h-3 rounded-full bg-primary/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-muted-foreground font-mono">
                      Financial Platform - Secure Branch
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Wallet className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Pull Request #247</span>
                    <span className="text-primary ml-auto text-xs px-2 py-0.5 bg-primary/10 rounded">
                      Security Review
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+156</span>
                      <span className="text-destructive">-12</span>
                      <span className="text-foreground">
                        feat: add transaction encryption module
                      </span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">3 approvals</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Scan className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Security scan passed</span>
                      <span className="text-muted-foreground/60">•</span>
                      <ClipboardList className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Audit logged</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Trusted by financial technology teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Wallet className="w-5 h-5" />
                Banking
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <TrendingUp className="w-5 h-5" />
                Fintech
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Building2 className="w-5 h-5" />
                Insurance
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Shield className="w-5 h-5" />
                Data Security
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Industry Challenges Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Financial services development <span className="text-primary">challenges</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Building software for financial services requires navigating unique challenges that
              span security, compliance, and operational requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <challenge.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{challenge.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secure & Controlled Development Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Security First
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Secure & controlled
                <span className="block text-primary">development platform.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Giteria provides the foundation for building secure financial applications. Every
                feature is designed to protect sensitive data while enabling developer productivity.
              </p>

              <div className="space-y-4">
                {securityFeatures.slice(0, 3).map((item, index) => (
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

            <div className="space-y-4">
              {securityFeatures.slice(3, 6).map((item, index) => (
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
      </section>

      {/* Example Workflow Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Example workflow for <span className="text-primary">financial teams</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how Giteria enables secure development workflows from code commit to deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className="relative p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
            <div className="relative bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/80" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  .giteria/workflows/financial-secure.yml
                </span>
              </div>
              <div className="p-4 font-mono text-xs md:text-sm">
                <div>
                  <span className="text-primary">name</span>: Financial Secure Pipeline
                </div>
                <div>
                  <span className="text-primary">on</span>: [push, pull_request]
                </div>
                <div className="pt-2">
                  <span className="text-primary">jobs</span>:
                </div>
                <div className="pl-3">
                  <span className="text-primary">security-scan</span>:
                </div>
                <div className="pl-5">
                  <span className="text-primary">runs-on</span>: self-hosted
                </div>
                <div className="pl-5">
                  <span className="text-primary">steps</span>:
                </div>
                <div className="pl-7">- uses: actions/checkout@v4</div>
                <div className="pl-7">- name: Secret Scan</div>
                <div className="pl-9 text-muted-foreground">run: giteria secrets scan</div>
                <div className="pl-7">- name: Dependency Audit</div>
                <div className="pl-9 text-muted-foreground">run: giteria audit --compliance</div>
                <div className="pl-7">- name: Compliance Check</div>
                <div className="pl-9 text-muted-foreground">run: giteria compliance validate</div>
                <div className="pt-2 text-green-500">✓ All security checks passed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Benefits for <span className="text-primary">financial organizations</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Transform your development process with a platform designed for the unique demands of
              financial services software.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Giteria for Financial Services */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Giteria for
                <span className="block text-primary">financial services?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Giteria is a secure, scalable, and audit-ready development platform designed for
                financial institutions and fintech organizations.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Data Sovereignty</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep all code and data on your infrastructure. Complete control over where
                      sensitive financial data resides.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Compliance Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Features designed to support compliance requirements including audit logging,
                      access controls, and documentation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Long-Term Stability</h3>
                    <p className="text-sm text-muted-foreground">
                      Predictable releases and backward compatibility. Your development workflows
                      remain stable for years.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Self-Hosted</div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">0</div>
                <div className="text-sm text-muted-foreground">Cloud Dependencies</div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">Full</div>
                <div className="text-sm text-muted-foreground">Audit Trail</div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">Granular</div>
                <div className="text-sm text-muted-foreground">Access Control</div>
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
            Build Secure Financial Solutions with Giteria
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Empower your development teams with a platform that prioritizes security, compliance,
            and reliability. Start building with confidence today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <Shield className="w-5 h-5 mr-2" />
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
