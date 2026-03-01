"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Zap,
  CheckCircle2,
  ArrowRight,
  Terminal,
  GitBranch,
  Code2,
  Container,
  FileCode,
  Eye,
  Clock,
  Users,
  Workflow,
  Key,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  EyeOff,
  FileText,
} from "lucide-react";

const challengeItems = [
  {
    icon: Clock,
    title: "Security Added Too Late",
    description:
      "Security is often treated as an afterthought, integrated only before production release. This late integration makes vulnerabilities expensive to fix and increases exposure time.",
  },
  {
    icon: AlertTriangle,
    title: "Vulnerabilities in Production",
    description:
      "Known CVEs in dependencies make it to production due to lack of automated scanning. Teams discover critical vulnerabilities only after deployment.",
  },
  {
    icon: Users,
    title: "Manual Security Reviews",
    description:
      "Time-consuming manual security audits create bottlenecks in the development process. Security teams become a gating factor for every release.",
  },
  {
    icon: Eye,
    title: "Poor Pipeline Visibility",
    description:
      "Lack of security visibility across CI/CD pipelines means threats go undetected. No unified view of security posture across the entire SDLC.",
  },
  {
    icon: FileCode,
    title: "Compliance Complexity",
    description:
      "Meeting regulatory requirements becomes a manual, error-prone process. Audit trails are incomplete and compliance reporting is time-consuming.",
  },
];

const securityFeatures = [
  {
    icon: Workflow,
    title: "Integrated CI/CD Security",
    description:
      "Security checks automatically run at every stage of your pipeline. From commit to deployment, every change is validated.",
    href: "/features/actions",
  },
  {
    icon: Code2,
    title: "Code Scanning & Review",
    description:
      "Static application security testing integrated into every pull request. Detect vulnerabilities before they merge.",
    href: "/features/code-security",
  },
  {
    icon: Key,
    title: "Secret Protection",
    description:
      "Automated secret detection prevents credentials from being committed. Pre-commit hooks and push protection keep keys safe.",
    href: "/features/secret-protection",
  },
  {
    icon: ShieldCheck,
    title: "Automated Security Checks",
    description:
      "Dependency scanning, container analysis, and SAST run automatically. Security validation happens without manual intervention.",
    href: "/features/advanced-security",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description:
      "Fine-grained permissions at organization, team, and repository levels. Define who can access, modify, and deploy code.",
    href: "/features/advanced-security",
  },
  {
    icon: FileText,
    title: "Audit Logs & Traceability",
    description:
      "Complete audit trails for every action. Full visibility into who did what, when, and from where. Compliance-ready logging.",
    href: "/features/advanced-security",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Code Commit",
    description:
      "Developer commits code with pre-commit hooks validating secrets and code quality before push.",
    icon: GitBranch,
  },
  {
    number: "02",
    title: "Automated Security Scan",
    description:
      "CI pipeline runs SAST, dependency scanning, and secret detection automatically on every push.",
    icon: Shield,
  },
  {
    number: "03",
    title: "Secure Code Review",
    description:
      "Security findings are surfaced in pull request comments. Reviewers see security context alongside code changes.",
    icon: FileCheck,
  },
  {
    number: "04",
    title: "Secret Validation",
    description:
      "Credentials and secrets are validated against vault. No sensitive data in logs or environment files.",
    icon: EyeOff,
  },
  {
    number: "05",
    title: "Automated Deployment",
    description:
      "Only code passing all security checks gets deployed. Immutable audit trail confirms compliance.",
    icon: Container,
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Reduced Security Risks",
    description:
      "Catch vulnerabilities early in the development cycle. Shift-left security reduces remediation costs by up to 90%.",
  },
  {
    icon: Zap,
    title: "Faster Secure Releases",
    description:
      "Automated security checks remove manual bottlenecks. Deploy multiple times per day without compromising security.",
  },
  {
    icon: FileCheck,
    title: "Built-in Compliance Support",
    description:
      "Pre-configured compliance reports and audit trails. Meet SOC 2, ISO 27001, and GDPR requirements out of the box.",
  },
  {
    icon: Eye,
    title: "Improved Visibility",
    description:
      "Unified security dashboard across all projects. Know your security posture at a glance, from code to production.",
  },
  {
    icon: Users,
    title: "Developer-Friendly Security",
    description:
      "Security that empowers developers, not hinders them. Integrated tools work seamlessly within existing workflows.",
  },
];

export default function DevSecOpsPage() {
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
                DevSecOps
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Security built into
                <span className="block text-primary">every commit.</span>
                <span className="block text-foreground">Not an afterthought.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Giteria embeds security directly into your CI/CD pipeline. From code commit to
                production deployment, every step is secured, validated, and traceable. Stop
                treating security as a bottleneck — make it your competitive advantage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Secure Your Pipeline
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
                  <span>Shift-Left Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Automated Scanning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Compliance Ready</span>
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
                      Security Scan Results
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Shield className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Security Scan #1284</span>
                    <span className="text-green-500 ml-auto text-xs px-2 py-0.5 bg-green-500/10 rounded">
                      Passed
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">
                        Dependency scan: 1,847 packages checked
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">SAST: 0 vulnerabilities found</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Secret detection: No secrets exposed</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Container scan: Image validated</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-xs">
                      <FileText className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Audit log created</span>
                      <span className="text-muted-foreground/60">•</span>
                      <ShieldCheck className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Ready for deployment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Trusted by security-conscious teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Shield className="w-5 h-5" />
                SOC2 Ready
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Lock className="w-5 h-5" />
                ISO 27001
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <FileText className="w-5 h-5" />
                GDPR Compliant
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Key className="w-5 h-5" />
                Zero Trust
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* The DevSecOps Challenge Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The DevSecOps <span className="text-primary">challenge</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Modern development teams face unprecedented security challenges. Understanding these
              obstacles is the first step toward building secure software.
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

      {/* Security Built Into Every Step Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Security built into <span className="text-primary">every step</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Giteria integrates security throughout the entire development lifecycle. No gaps, no
              blind spots — just comprehensive protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityFeatures.map((feature, index) => (
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

      {/* Secure Development Workflow Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Secure development <span className="text-primary">workflow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A proven path from code commit to secure deployment — automated at every stage, with
              full visibility and traceability.
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
                Security that
                <span className="block text-primary">delivers value</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                DevSecOps isn't just about protection — it's about enabling faster, safer releases.
                See the measurable impact on your development operations.
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
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">DevSecOps Metrics</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Vulnerabilities in Production</span>
                    <span className="text-sm font-medium text-green-500">-92%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-foreground">Security Review Time</span>
                    <span className="text-sm font-medium text-primary">-85%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Mean Time to Detect</span>
                    <span className="text-sm font-medium text-green-500">-78%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm text-foreground">Deployment Frequency</span>
                    <span className="text-sm font-medium text-primary">3x increase</span>
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
            Build securely with Giteria
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Security that scales with your development. From startup to enterprise, Giteria provides
            the foundation for secure, compliant software delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Secure Your Pipeline
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
