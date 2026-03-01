"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Users,
  Server,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Clock,
  Database,
  Workflow,
  Scan,
  Key,
  ClipboardList,
  Rocket,
  BarChart3,
  Building2,
  Globe,
  FileSearch,
  Handshake,
  Scale,
} from "lucide-react";

const challenges = [
  {
    icon: Shield,
    title: "High Security and Compliance Demands",
    description:
      "Meet stringent government security standards with comprehensive access controls, encryption, and compliance documentation.",
  },
  {
    icon: Lock,
    title: "Sensitive Data Management",
    description:
      "Protect classified and sensitive citizen data with robust security controls and strict data handling policies.",
  },
  {
    icon: Server,
    title: "Legacy System Modernization",
    description:
      "Transition from outdated infrastructure while maintaining reliability, security, and operational continuity.",
  },
  {
    icon: ClipboardList,
    title: "Strict Audit Requirements",
    description:
      "Meet rigorous auditing requirements with detailed activity logs, change tracking, and comprehensive documentation.",
  },
  {
    icon: Users,
    title: "Inter-Department Collaboration",
    description:
      "Enable secure collaboration across multiple agencies while maintaining strict access boundaries and governance.",
  },
];

const securityFeatures = [
  {
    icon: Users,
    title: "Role-Based Access Control",
    description:
      "Define granular permissions for developers, auditors, and compliance officers. Control who can view, edit, and deploy code at every level.",
  },
  {
    icon: ClipboardList,
    title: "Audit Logs & Full Traceability",
    description:
      "Maintain comprehensive logs of all actions. Every code change, access event, and deployment is tracked with full accountability.",
  },
  {
    icon: Workflow,
    title: "Integrated DevSecOps Workflows",
    description:
      "Embed security into every stage of your development lifecycle. From code commit to deployment, security is built-in, not bolted on.",
  },
  {
    icon: Rocket,
    title: "Secure CI/CD Pipelines",
    description:
      "Automate deployments with pipelines that include security scanning, compliance validation, and approval workflows.",
  },
  {
    icon: Key,
    title: "Secret Protection",
    description:
      "Prevent API keys, credentials, and sensitive configuration from being exposed with pre-commit hooks and push protection.",
  },
  {
    icon: Building2,
    title: "Controlled Collaboration",
    description:
      "Enable secure inter-agency collaboration while maintaining strict boundaries and governance over sensitive projects.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Controlled Code Contribution",
    description:
      "Developers push code with built-in security scanning. Pre-commit hooks enforce coding standards and prevent sensitive data from entering the repository.",
  },
  {
    step: "02",
    title: "Automated Validation & Security",
    description:
      "CI/CD pipelines run comprehensive security scans including dependency vulnerability detection, static analysis, and compliance validation.",
  },
  {
    step: "03",
    title: "Multi-Level Review Process",
    description:
      "Security teams and compliance officers review changes with complete audit trails. Approvals are tracked with full accountability and governance.",
  },
  {
    step: "04",
    title: "Approved Deployment",
    description:
      "Deploy to staging and production environments with multi-level approval workflows. Environment-specific configurations keep production secure.",
  },
  {
    step: "05",
    title: "Continuous Monitoring",
    description:
      "Ongoing surveillance detects anomalies, tracks security metrics, and generates compliance reports for auditors in real-time.",
  },
];

const benefits = [
  {
    icon: Scale,
    title: "Reduced Operational Risk",
    description:
      "Minimize exposure with built-in security controls, comprehensive audit trails, and governance-focused development workflows.",
  },
  {
    icon: FileSearch,
    title: "Improved Audit Readiness",
    description:
      "Be always ready for audits with complete activity logs, change documentation, and compliance reporting built-in.",
  },
  {
    icon: BarChart3,
    title: "Centralized Visibility",
    description:
      "Gain complete visibility into all development activities across departments with centralized reporting and monitoring.",
  },
  {
    icon: Handshake,
    title: "Secure Inter-Agency Collaboration",
    description:
      "Enable controlled collaboration between agencies with strict access controls and comprehensive governance.",
  },
  {
    icon: Server,
    title: "Scalable Infrastructure",
    description:
      "Grow your development operations from small teams to enterprise scale with consistent security and governance.",
  },
];

export default function GovernmentPage() {
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
                Government Solutions
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Secure development
                <span className="block text-primary">for government</span>
                <span className="block text-foreground">and public sector.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Build, deploy, and manage government applications with confidence. Giteria provides
                the security, sovereignty, traceability, and governance features that public sector
                institutions demand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Secure Public Sector Development
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
                    Contact Sales
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
                  <span>Data Sovereignty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Audit Ready</span>
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
                      Government Application - Secure Branch
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Building2 className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Pull Request #156</span>
                    <span className="text-primary ml-auto text-xs px-2 py-0.5 bg-primary/10 rounded">
                      Security Review
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+428</span>
                      <span className="text-destructive">-35</span>
                      <span className="text-foreground">
                        feat: add citizen data protection module
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
              Trusted by government technology teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Building2 className="w-5 h-5" />
                Federal Agencies
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Globe className="w-5 h-5" />
                Public Sector
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Shield className="w-5 h-5" />
                Defense & Security
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Lock className="w-5 h-5" />
                Data Sovereignty
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Public Sector Challenges Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Public sector <span className="text-primary">challenges</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Building software for government requires navigating unique challenges that span
              security, compliance, sovereignty, and operational requirements.
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
                <span className="block text-primary">development environment.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Giteria provides the foundation for building secure government applications. Every
                feature is designed to protect sensitive data while enabling developer productivity
                with complete governance.
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

      {/* Example Government Workflow Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Example <span className="text-primary">government workflow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how Giteria enables secure development workflows with complete governance from
              code commit to deployment.
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
                  .giteria/workflows/government-secure.yml
                </span>
              </div>
              <div className="p-4 font-mono text-xs md:text-sm">
                <div>
                  <span className="text-primary">name</span>: Government Secure Pipeline
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
                <div className="pl-7">- name: Compliance Audit</div>
                <div className="pl-9 text-muted-foreground">run: giteria audit --government</div>
                <div className="pl-7">- name: Security Check</div>
                <div className="pl-9 text-muted-foreground">run: giteria security validate</div>
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
              Benefits for <span className="text-primary">government institutions</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Transform your development process with a platform designed for the unique demands of
              public sector software.
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

      {/* Why Giteria for Government */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Giteria for
                <span className="block text-primary">government?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Giteria is a secure and governance-ready development platform designed for public
                sector institutions and government organizations.
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
                      sensitive government data resides.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Audit Readiness</h3>
                    <p className="text-sm text-muted-foreground">
                      Features designed to support audit requirements including comprehensive
                      logging, access controls, and documentation.
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
            Build Secure Public Infrastructure with Giteria
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Empower your development teams with a platform that prioritizes security, sovereignty,
            and governance. Start building with confidence today.
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
