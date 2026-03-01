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
  Rocket,
  BarChart3,
  Factory,
  Gauge,
  Settings,
  Cpu,
  Wrench,
  Package,
  AlertTriangle,
  FileText,
  GitBranch,
  ClipboardList,
} from "lucide-react";

const challenges = [
  {
    icon: Clock,
    title: "Legacy Systems & Infrastructure",
    description:
      "Modernize outdated systems while maintaining operational continuity. Transition to modern development workflows without disrupting production environments.",
  },
  {
    icon: Settings,
    title: "Complex Software Integrations",
    description:
      "Coordinate software development across multiple industrial systems, PLCs, and embedded devices with diverse integration requirements.",
  },
  {
    icon: AlertTriangle,
    title: "Operational Downtime Risks",
    description:
      "Minimize system failures and production interruptions through rigorous testing, validation, and controlled deployment processes.",
  },
  {
    icon: Users,
    title: "Distributed Engineering Teams",
    description:
      "Enable collaboration across geographically dispersed teams working on industrial automation, control systems, and equipment software.",
  },
  {
    icon: ClipboardList,
    title: "Need for Traceability & Reliability",
    description:
      "Maintain complete audit trails for regulatory compliance, safety requirements, and quality assurance in manufacturing software.",
  },
];

const platformFeatures = [
  {
    icon: Rocket,
    title: "Automated CI/CD Pipelines",
    description:
      "Streamline builds, tests, and deployments with customizable workflows tailored for industrial software development cycles.",
  },
  {
    icon: Lock,
    title: "Secure Code Management",
    description:
      "Protect intellectual property and sensitive industrial configurations with enterprise-grade security and encryption.",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description:
      "Define granular permissions for engineers, operators, and auditors. Control who can view, edit, and deploy critical systems.",
  },
  {
    icon: Workflow,
    title: "Integrated DevOps Workflows",
    description:
      "Unify development, testing, and operations teams with integrated tooling that bridges IT and OT requirements.",
  },
  {
    icon: FileText,
    title: "Audit Logs & Traceability",
    description:
      "Maintain comprehensive logs of all changes, access events, and deployments. Complete traceability for compliance and investigation.",
  },
  {
    icon: GitBranch,
    title: "Collaboration Across Distributed Teams",
    description:
      "Enable seamless collaboration between plant engineers, corporate IT, and external partners working on industrial systems.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Code Development for Industrial Systems",
    description:
      "Engineers develop control software, automation scripts, and SCADA applications with integrated security scanning and code quality checks.",
  },
  {
    step: "02",
    title: "Automated Testing & Validation",
    description:
      "CI/CD pipelines run comprehensive tests including unit tests, integration tests, and safety validation for industrial control systems.",
  },
  {
    step: "03",
    title: "Secure Review Process",
    description:
      "Expert reviewers and safety officers examine changes with full audit trails. Approvals ensure compliance with industry standards.",
  },
  {
    step: "04",
    title: "Controlled Deployment",
    description:
      "Deploy to staging and production with multi-layer approval workflows. Environment-specific configurations protect production systems.",
  },
  {
    step: "05",
    title: "Continuous Improvement Cycle",
    description:
      "Ongoing monitoring tracks system performance, security metrics, and deployment success. Feedback loops drive continuous improvement.",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Reduced Operational Risk",
    description:
      "Minimize production disruptions with rigorous testing, validation workflows, and controlled deployment processes.",
  },
  {
    icon: Rocket,
    title: "Improved Deployment Reliability",
    description:
      "Achieve consistent, predictable deployments with automated pipelines and comprehensive rollback capabilities.",
  },
  {
    icon: BarChart3,
    title: "Faster Modernization Cycles",
    description:
      "Accelerate legacy modernization with streamlined development workflows and integrated tooling.",
  },
  {
    icon: Users,
    title: "Better Cross-Team Collaboration",
    description:
      "Bridge the gap between IT and operations with unified platforms that support both teams effectively.",
  },
  {
    icon: Server,
    title: "Scalable & Centralized Infrastructure",
    description:
      "Grow from single-plant deployments to enterprise-wide implementations with consistent security and management.",
  },
];

export default function ManufacturingPage() {
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
                Manufacturing Solutions
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Modern industrial
                <span className="block text-primary">software development</span>
                <span className="block text-foreground">for the manufacturing sector.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Build, deploy, and manage industrial control systems with confidence. Giteria
                provides the reliability, traceability, and security features that manufacturing
                environments demand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Modernize Your Industrial Development
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
              <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/80" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-3 h-3 rounded-full bg-primary/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-muted-foreground font-mono">
                      Industrial Control System - Main Branch
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Factory className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Pull Request #89</span>
                    <span className="text-primary ml-auto text-xs px-2 py-0.5 bg-primary/10 rounded">
                      Ready for Review
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">+234</span>
                      <span className="text-destructive">-18</span>
                      <span className="text-foreground">
                        feat: update PLC communication protocol
                      </span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">2 approvals</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Gauge className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Tests passed</span>
                      <span className="text-muted-foreground/60">•</span>
                      <ClipboardList className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Safety review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Trusted by manufacturing technology teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Factory className="w-5 h-5" />
                Industrial
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Cpu className="w-5 h-5" />
                Automation
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Gauge className="w-5 h-5" />
                Controls
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Wrench className="w-5 h-5" />
                Equipment
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
              Manufacturing software <span className="text-primary">challenges</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Building software for industrial environments requires addressing unique challenges
              that span reliability, safety, and operational requirements.
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

      {/* How Giteria Supports Manufacturing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Factory className="w-4 h-4" />
                Manufacturing Platform
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built for industrial
                <span className="block text-primary">software development.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Giteria provides the foundation for building reliable manufacturing software. Every
                feature is designed to ensure operational reliability while enabling developer
                productivity.
              </p>

              <div className="space-y-4">
                {platformFeatures.slice(0, 3).map((item, index) => (
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
              {platformFeatures.slice(3, 6).map((item, index) => (
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
              Example workflow for <span className="text-primary">manufacturing teams</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how Giteria enables reliable development workflows from code commit to deployment
              in industrial environments.
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
                  .giteria/workflows/industrial-pipeline.yml
                </span>
              </div>
              <div className="p-4 font-mono text-xs md:text-sm">
                <div>
                  <span className="text-primary">name</span>: Industrial Control Pipeline
                </div>
                <div>
                  <span className="text-primary">on</span>: [push, pull_request]
                </div>
                <div className="pt-2">
                  <span className="text-primary">jobs</span>:
                </div>
                <div className="pl-3">
                  <span className="text-primary">validate</span>:
                </div>
                <div className="pl-5">
                  <span className="text-primary">runs-on</span>: self-hosted
                </div>
                <div className="pl-5">
                  <span className="text-primary">steps</span>:
                </div>
                <div className="pl-7">- uses: actions/checkout@v4</div>
                <div className="pl-7">- name: Unit Tests</div>
                <div className="pl-9 text-muted-foreground">run: make test</div>
                <div className="pl-7">- name: Safety Validation</div>
                <div className="pl-9 text-muted-foreground">run: giteria safety-check</div>
                <div className="pl-7">- name: Integration Tests</div>
                <div className="pl-9 text-muted-foreground">run: make integration-test</div>
                <div className="pt-2 text-green-500">✓ All validations passed</div>
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
              Benefits for <span className="text-primary">manufacturing organizations</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Transform your development process with a platform designed for the unique demands of
              industrial software development.
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

      {/* Why Giteria for Manufacturing */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Giteria for
                <span className="block text-primary">manufacturing?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Giteria is a secure and scalable development platform designed to modernize and
                streamline software development in industrial environments.
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
                      sensitive industrial configurations reside.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Reliability First</h3>
                    <p className="text-sm text-muted-foreground">
                      Features designed to ensure operational reliability including comprehensive
                      testing, validation, and controlled deployment processes.
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
            Build Reliable Industrial Software with Giteria
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Empower your development teams with a platform that prioritizes reliability, safety, and
            performance. Start building with confidence today.
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
                <Factory className="w-5 h-5 mr-2" />
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
