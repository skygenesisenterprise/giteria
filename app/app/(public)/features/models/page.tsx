"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Cpu,
  Gauge,
  Zap,
  Shield,
  Lock,
  Eye,
  Key,
  Settings,
  Layers,
  GitBranch,
  Rocket,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Terminal,
  BookOpen,
  ChevronRight,
  Activity,
  Server,
  Globe,
  Workflow,
  Database,
  Clock,
  User,
  Building2,
  FileText,
  Bug,
} from "lucide-react";

const nativeIntegrationFeatures = [
  {
    icon: Brain,
    title: "Model Selection",
    description:
      "Choose from a curated list of AI models. Select the best model for your specific use case and performance requirements.",
  },
  {
    icon: Layers,
    title: "Version Control",
    description:
      "Track model versions and configurations. Rollback to previous versions when needed with full history support.",
  },
  {
    icon: Key,
    title: "API Access",
    description:
      "Programmatic access to models via REST API. Integrate AI capabilities into your own applications and workflows.",
  },
  {
    icon: Settings,
    title: "Fine-Tuning",
    description:
      "Fine-tune models on your own data for specialized tasks. Keep your training data private and secure.",
  },
  {
    icon: Workflow,
    title: "Workflow Integration",
    description:
      "Use models directly in Actions workflows. Build intelligent automation pipelines with AI-powered steps.",
  },
];

const ecosystemItems = [
  {
    icon: Sparkles,
    title: "Copilot",
    description:
      "Models power intelligent code suggestions and real-time assistance in your editor.",
  },
  {
    icon: Rocket,
    title: "MCP Registry",
    description: "Models available as modular components for building AI-powered workflows.",
  },
  {
    icon: Workflow,
    title: "Actions",
    description: "Integrate AI inference into your CI/CD pipelines for automated decision-making.",
  },
  {
    icon: GitBranch,
    title: "Repositories",
    description:
      "Use models directly in your codebase with native integration and context awareness.",
  },
];

const governanceItems = [
  {
    icon: Shield,
    title: "Access Control",
    description: "Fine-grained permissions at organization, team, and repository levels.",
  },
  {
    icon: Lock,
    title: "Organization Permissions",
    description:
      "Centralized policy management. Control who can use which models across your organization.",
  },
  {
    icon: Eye,
    title: "Usage Monitoring",
    description: "Track model usage in real-time. See who's using what, when, and how much.",
  },
  {
    icon: DollarSign,
    title: "Cost Visibility",
    description:
      "Understand and optimize your AI spend. Set budgets and alerts at organization level.",
  },
  {
    icon: Clock,
    title: "Rate Limits",
    description:
      "Configure rate limits per user, team, or organization. Prevent abuse and manage costs.",
  },
];

const performanceItems = [
  {
    icon: Server,
    title: "Cloud-Backed Inference",
    description: "Scale inference with cloud resources. No impact on your local infrastructure.",
  },
  {
    icon: Zap,
    title: "Low-Latency Responses",
    description: "Optimized for speed. Get responses in milliseconds, not seconds.",
  },
  {
    icon: Gauge,
    title: "Scalable Usage",
    description: "Handle thousands of concurrent requests. Automatic scaling based on demand.",
  },
  {
    icon: Lock,
    title: "Secure Processing",
    description:
      "All inference runs in isolated environments. Your data never leaves the platform.",
  },
];

const useCases = [
  {
    icon: User,
    title: "AI-Assisted Development",
    description:
      "Accelerate development with intelligent code suggestions, automatic refactoring, and bug detection.",
    benefits: ["Real-time code completion", "Bug prediction", "Code explanation"],
  },
  {
    icon: FileText,
    title: "Automated Documentation",
    description:
      "Generate documentation automatically. Keep your docs in sync with your code without manual effort.",
    benefits: ["Auto-generated docs", "API documentation", "README updates"],
  },
  {
    icon: Workflow,
    title: "Intelligent CI Workflows",
    description:
      "Add AI-powered decision making to your pipelines. Automate code review, testing, and deployment.",
    benefits: ["Smart PR review", "Automated testing", "Deployment gates"],
  },
  {
    icon: Building2,
    title: "Enterprise AI Governance",
    description:
      "Maintain full control over AI usage. Ensure compliance, security, and cost management at scale.",
    benefits: ["Centralized control", "Audit trails", "Budget management"],
  },
];

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export default function ModelsPage() {
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
                AI Models Layer
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Build with
                <span className="block text-primary">AI Models.</span>
                <span className="block text-foreground">Integrated everywhere.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A centralized AI model layer designed to power intelligent workflows across the
                entire Giteria ecosystem. Models fuel Copilot, enable MCP integrations, and drive
                intelligent Actions — all from a single, managed platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Explore Models
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="https://docs.giteria.com/models" target="_blank" rel="noopener noreferrer">
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
                  <span>Privacy first</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Centralized</span>
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
                      giteria — Model Configuration
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Brain className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Available Models</span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border">
                      <span className="text-foreground flex-1">gpt-4-turbo</span>
                      <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-500 rounded">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border">
                      <span className="text-foreground flex-1">claude-3-opus</span>
                      <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-500 rounded">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border opacity-60">
                      <span className="text-foreground flex-1">gpt-3.5-turbo</span>
                      <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded">
                        Disabled
                      </span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex items-center gap-2 text-xs">
                      <Activity className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">24,847 requests today</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Cpu className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">98.5% uptime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Native AI Integration Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Native <span className="text-primary">AI integration</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete model management layer built into Giteria. From selection to deployment,
              everything is integrated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nativeIntegrationFeatures.map((feature, index) => (
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

      {/* Powering the Ecosystem Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Powering the
                <span className="block text-primary">ecosystem.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Giteria Models is a transversal layer that powers intelligent features across the
                platform. It&apos;s not a standalone feature — it&apos;s the foundation for
                AI-powered workflows everywhere.
              </p>

              <div className="space-y-3">
                {ecosystemItems.map((item, index) => (
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
                    Giteria — AI Integration Map
                  </span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-card border border-border text-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-foreground font-medium">Copilot</div>
                      <div className="text-xs text-muted-foreground mt-1">Powered by Models</div>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-border text-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                        <Rocket className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-foreground font-medium">MCP</div>
                      <div className="text-xs text-muted-foreground mt-1">Uses Models</div>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-border text-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                        <Workflow className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-foreground font-medium">Actions</div>
                      <div className="text-xs text-muted-foreground mt-1">Inference Step</div>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-border text-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                        <GitBranch className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-foreground font-medium">Repos</div>
                      <div className="text-xs text-muted-foreground mt-1">Context Aware</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-primary font-medium">Giteria Models</div>
                      <div className="text-xs text-muted-foreground">
                        Central Intelligence Layer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control & Governance Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">Organization Governance</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Active Models</span>
                    <span className="text-sm font-medium text-green-500">8 configured</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Daily Requests</span>
                    <span className="text-sm font-medium text-green-500">24,847</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Monthly Budget</span>
                    <span className="text-sm font-medium text-green-500">$2,450 / $5,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Rate Limits</span>
                    <span className="text-sm font-medium text-green-500">1,000/user/day</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Control & Governance
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Full control.
                <span className="block text-primary">Enterprise-ready.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Centralized model management with organization-level controls. Monitor usage, manage
                costs, and maintain security — all from one place.
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

      {/* Performance & Scalability Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Performance & <span className="text-primary">Scalability</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for production. Cloud-backed inference with low latency and automatic scaling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceItems.map((item, index) => (
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
              Use <span className="text-primary">cases</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From development assistance to enterprise governance — Models powers intelligent
              workflows across your organization.
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
            Ready to integrate AI?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Enable Giteria Models to power intelligent workflows across your entire platform.
            Copilot, Actions, and MCP — all connected through one centralized layer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Enable Models
                <Brain className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Read Documentation
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Self-hosted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Free during beta</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Disable anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
