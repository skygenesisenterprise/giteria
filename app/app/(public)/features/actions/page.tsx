"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Zap,
  Shield,
  Lock,
  Server,
  Clock,
  Layers,
  Activity,
  Calendar,
  ChevronRight,
  Workflow,
  Timer,
  Cpu,
  Key,
  Eye,
  Users,
  Hammer,
  Bug,
  Package,
  Cloud,
  Building2,
} from "lucide-react";

const automationFeatures = [
  {
    icon: Rocket,
    title: "CI/CD Pipelines",
    description:
      "Automate builds, tests, and deployments with customizable workflows that match your team's needs.",
  },
  {
    icon: Bug,
    title: "Automated Testing",
    description:
      "Run unit tests, integration tests, and end-to-end tests on every push. Get fast feedback.",
  },
  {
    icon: Cloud,
    title: "Build & Deploy",
    description:
      "Build Docker images, deploy to Kubernetes, or upload to registries — all from your workflow.",
  },
  {
    icon: Calendar,
    title: "Scheduled Jobs",
    description:
      "Run workflows on a schedule. Perfect for nightly builds, cleanup tasks, or recurring reports.",
  },
  {
    icon: GitBranch,
    title: "Event-Based Triggers",
    description: "Trigger workflows on pushes, pull requests, issue events, releases, and more.",
  },
];

const integrationItems = [
  {
    icon: GitBranch,
    title: "Push & Pull Request Triggers",
    description: "Automatically run workflows on every push or when pull requests are opened.",
  },
  {
    icon: Layers,
    title: "Issue Integration",
    description:
      "Link workflow runs to issues, add labels, and close issues when deployments complete.",
  },
  {
    icon: Activity,
    title: "Real-Time Logs",
    description: "Stream logs live as your workflows execute. Debug faster with instant feedback.",
  },
  {
    icon: Clock,
    title: "Execution History",
    description: "Full history of all workflow runs. Track performance and troubleshoot failures.",
  },
];

const performanceItems = [
  {
    icon: Zap,
    title: "Fast Execution",
    description: "Optimized runners deliver quick build times. No waiting in long queues.",
  },
  {
    icon: Cpu,
    title: "Parallel Jobs",
    description:
      "Run multiple jobs simultaneously. Maximize throughput and reduce total build time.",
  },
  {
    icon: Server,
    title: "Reliable Infrastructure",
    description: "Self-hosted runners on your infrastructure. Complete control over resources.",
  },
  {
    icon: Activity,
    title: "Integrated Monitoring",
    description: "Built-in metrics and logs. No external tools needed to track performance.",
  },
];

const securityItems = [
  {
    icon: Lock,
    title: "Isolated Environments",
    description:
      "Each workflow runs in an isolated container. No cross-contamination between runs.",
  },
  {
    icon: Key,
    title: "Secrets Management",
    description: "Store API keys, tokens, and credentials securely. Inject them only when needed.",
  },
  {
    icon: Shield,
    title: "Configurable Permissions",
    description: "Control who can create, modify, and run workflows at repository and org level.",
  },
  {
    icon: Eye,
    title: "Audit Logs",
    description: "Track who ran what, when. Full visibility into all automation activities.",
  },
];

const useCases = [
  {
    icon: Rocket,
    title: "Startup Shipping Fast",
    description:
      "Ship multiple times per day with automated testing and deployment. No manual steps, no errors.",
    benefits: ["CI/CD in minutes", "Automatic testing", "One-click deploys"],
  },
  {
    icon: Users,
    title: "Open Source Maintainer",
    description:
      "Automate contributions checks, run security scans, and publish packages automatically.",
    benefits: ["Automated PR checks", "Vulnerability scanning", "Package publishing"],
  },
  {
    icon: Building2,
    title: "Enterprise Workflow",
    description:
      "Complex workflows with approval gates, multiple environments, and strict security controls.",
    benefits: ["Approval gates", "Multi-environment deploys", "Full audit trail"],
  },
  {
    icon: Hammer,
    title: "Solo Developer",
    description: "Automate the boring stuff. Focus on writing code while Giteria handles the rest.",
    benefits: ["Scheduled backups", "Automated releases", "Issue triage"],
  },
];

export default function ActionsPage() {
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
                Native Automation
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Automate your workflow.
                <span className="block text-primary">Ship faster.</span>
                <span className="block text-foreground">Built-in.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A powerful, native automation engine built directly into your development workflow.
                CI/CD, automated testing, scheduled jobs, and event-based triggers — all in one
                platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Start Automating
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="https://docs.giteria.com/actions" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                  >
                    <Terminal className="w-5 h-5 mr-2" />
                    View Documentation
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Self-hosted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>No limits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Free forever</span>
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
                      giteria — .giteria/workflows/deploy.yml
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div>
                    <span className="text-primary">name</span>: Deploy to Production
                  </div>
                  <div>
                    <span className="text-primary">on</span>:
                  </div>
                  <div className="pl-3 text-muted-foreground">push:</div>
                  <div className="pl-6 text-muted-foreground">branches: [main]</div>
                  <div className="pt-2">
                    <span className="text-primary">jobs</span>:
                  </div>
                  <div className="pl-3">
                    <span className="text-primary">deploy</span>:
                  </div>
                  <div className="pl-5">
                    <span className="text-primary">runs-on</span>: ubuntu-latest
                  </div>
                  <div className="pl-5">
                    <span className="text-primary">steps</span>:
                  </div>
                  <div className="pl-7">- uses: actions/checkout@v4</div>
                  <div className="pl-7">- name: Run tests</div>
                  <div className="pl-9 text-muted-foreground">run: npm test</div>
                  <div className="pl-7">- name: Build</div>
                  <div className="pl-9 text-muted-foreground">run: npm run build</div>
                  <div className="pl-7">- name: Deploy</div>
                  <div className="pl-9 text-muted-foreground">run: ./deploy.sh production</div>
                  <div className="pt-2 text-green-500">✓ Deploy completed in 2m 14s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Automate Your Workflow Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Automate <span className="text-primary">everything</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From continuous integration to scheduled tasks, Giteria Actions handles your
              automation needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {automationFeatures.map((feature, index) => (
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

      {/* Native Integration Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Native integration.
                <span className="block text-primary">Deeply connected.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Giteria Actions is built into your workflow. No external services, no complex
                configuration. Everything works together seamlessly.
              </p>

              <div className="space-y-3">
                {integrationItems.map((item, index) => (
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
                    Giteria — Actions / workflow-runs
                  </span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-foreground font-medium">Build & Test</span>
                    <span className="ml-auto text-xs px-2 py-0.5 bg-green-500/10 text-green-500 rounded">
                      Passed
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="text-green-500">#2847</span>
                      <span className="text-foreground">fix: update user authentication</span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex items-center gap-2 text-xs">
                      <Timer className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">3m 24s</span>
                      <span className="text-muted-foreground/60">•</span>
                      <GitBranch className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">main</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">johndoe</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-2">
                      <Activity className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">All checks passed</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Package className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">4 artifacts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance & Scalability Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">Performance Metrics</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Avg. Build Time</span>
                    <span className="text-sm font-medium text-green-500">2m 34s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Success Rate</span>
                    <span className="text-sm font-medium text-green-500">99.8%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Jobs Run Today</span>
                    <span className="text-sm font-medium text-green-500">1,247</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Active Runners</span>
                    <span className="text-sm font-medium text-green-500">8</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Performance
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built for speed.
                <span className="block text-primary">Scale without limits.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Giteria Actions runs on your infrastructure, giving you complete control over
                performance. No queue waiting, no rate limits, no surprises.
              </p>

              <div className="space-y-4">
                {performanceItems.map((item, index) => (
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

      {/* Security & Isolation Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Security
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Secure by design.
                <span className="block text-primary">Isolated execution.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Every workflow runs in a secure, isolated environment. Your secrets stay safe, your
                data stays private, your compliance requirements are met.
              </p>

              <div className="space-y-3">
                {securityItems.map((item, index) => (
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
                    Secrets Management
                  </span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-medium">Repository Secrets</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-foreground">NPM_TOKEN</span>
                      <span className="text-muted-foreground">••••••••••••</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-foreground">DEPLOY_KEY</span>
                      <span className="text-muted-foreground">••••••••••••</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-foreground">AWS_SECRET</span>
                      <span className="text-muted-foreground">••••••••••••</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-foreground">DATABASE_URL</span>
                      <span className="text-muted-foreground">••••••••••••</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-green-500">
                      <Lock className="w-3 h-3" />
                      <span>Encrypted at rest</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Shield className="w-3 h-3" />
                      <span>Access controlled</span>
                    </div>
                  </div>
                </div>
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
              Built for <span className="text-primary">every workflow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From startups to enterprises, Giteria Actions adapts to your needs. Automate what
              matters, when it matters.
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
            Ready to automate?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Start building powerful workflows in minutes. No setup required, no limits, no
            surprises.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Start Automating
                <Workflow className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <Rocket className="w-5 h-5 mr-2" />
                View Examples
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No limits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Self-hosted</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
