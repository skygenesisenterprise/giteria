"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Search,
  Download,
  Upload,
  Link2,
  Shield,
  Lock,
  Globe,
  Server,
  Users,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Package,
  GitBranch,
  Layers,
  Zap,
  Rocket,
  Code2,
  Building2,
  Workflow,
  Settings,
  Key,
  Eye,
  Clock,
  Star,
  Verified,
  BookOpen,
  ChevronRight,
  FileCode,
  Container,
  WorkflowIcon,
} from "lucide-react";

const discoverFeatures = [
  {
    icon: Search,
    title: "Centralized MCP Discovery",
    description:
      "Browse and search all available MCPs in one place. Filter by category, language, or functionality.",
  },
  {
    icon: Layers,
    title: "Version Management",
    description:
      "Track and manage multiple versions of your MCPs. Easy rollbacks and version branching.",
  },
  {
    icon: Link2,
    title: "Dependency Linking",
    description: "Define and manage MCP dependencies. Automatic resolution and conflict detection.",
  },
  {
    icon: GitBranch,
    title: "Seamless Repository Integration",
    description:
      "Connect MCPs directly to your repositories. Automatic updates and sync with your code.",
  },
  {
    icon: Verified,
    title: "Verified Publishers",
    description:
      "Trust verified publishers with badge indicators. Review publisher reputation and history.",
  },
];

const publishFeatures = [
  {
    icon: Upload,
    title: "Easy MCP Publishing",
    description:
      "Publish your MCPs with a simple CLI command or through the web interface. Support for multiple formats.",
  },
  {
    icon: Clock,
    title: "Version Control",
    description:
      "Full version history with changelogs. Semantic versioning and automatic version detection.",
  },
  {
    icon: Key,
    title: "Access Management",
    description:
      "Control who can view and use your MCPs. Public, private, or organization-scoped publishing.",
  },
  {
    icon: Building2,
    title: "Organization-Level Ownership",
    description:
      "Publish under your organization. Transfer ownership and manage team publishing rights.",
  },
  {
    icon: Eye,
    title: "Audit Logs",
    description:
      "Full visibility into who downloaded or used your MCPs. Track usage patterns and metrics.",
  },
];

const ecosystemItems = [
  {
    icon: GitBranch,
    title: "Repository Integration",
    description: "Use MCPs directly in your repositories with native Giteria integration.",
  },
  {
    icon: Rocket,
    title: "Compatible with Actions",
    description: "Use MCPs in your CI/CD pipelines. Automate workflows with modular components.",
  },
  {
    icon: Container,
    title: "Compatible with Codespaces",
    description: "Bring MCPs into your cloud development environments. Pre-configured setups.",
  },
  {
    icon: Users,
    title: "Collaborative Workflows",
    description: "Share MCPs across teams. Collaborate on building and maintaining modules.",
  },
];

const securityItems = [
  {
    icon: Shield,
    title: "Permission Layers",
    description: "Fine-grained permissions at organization, team, and repository levels.",
  },
  {
    icon: Globe,
    title: "Visibility Controls",
    description: "Choose who can see your MCPs: public, private, or organization-only.",
  },
  {
    icon: CheckCircle2,
    title: "Integrity Verification",
    description: "Cryptographic checksums ensure your MCPs haven't been tampered with.",
  },
  {
    icon: Lock,
    title: "Controlled Distribution",
    description: "Approve specific versions for distribution. Maintain quality control.",
  },
];

const useCases = [
  {
    icon: Code2,
    title: "Open-Source MCP Authors",
    description: "Share your MCPs with the community. Build reputation and get contributions.",
    benefits: ["Public registry", "Community feedback", "Version tracking"],
  },
  {
    icon: Building2,
    title: "Enterprise Internal Registry",
    description: "Create internal MCPs for your organization. Reuse across projects securely.",
    benefits: ["Private registry", "Team access", "Compliance ready"],
  },
  {
    icon: Workflow,
    title: "AI Workflow Integration",
    description: "Build modular AI workflows with reusable MCPs. Compose complex pipelines.",
    benefits: ["Composable modules", "Version control", "Easy sharing"],
  },
  {
    icon: Users,
    title: "Team-Level Component Sharing",
    description:
      "Share MCPs across teams in your organization. Reduce duplication and speed up development.",
    benefits: ["Organization scope", "Access control", "Centralized management"],
  },
];

export default function MCPPage() {
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
                MCP Registry
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Your centralized registry for
                <span className="block text-primary">modular components.</span>
                <span className="block text-foreground">Built for AI workflows.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                A centralized and secure registry designed to power the next generation of modular
                and AI-driven workflows inside Giteria. Discover, publish, and integrate MCPs
                seamlessly across your organization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/marketplace/mcp">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Explore the Registry
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Publish an MCP
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Public & private</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Version control</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Organization scoped</span>
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
                      giteria — MCP Registry
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Package className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">@giteria/ai-workflow-core</span>
                    <span className="ml-auto text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                      v2.4.0
                    </span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex gap-2">
                      <Download className="w-3 h-3" />
                      <span className="text-foreground">12.4k downloads</span>
                    </div>
                    <div className="h-px bg-border my-3" />
                    <div className="flex items-center gap-2 text-xs">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-foreground">128 stars</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Verified className="w-3 h-3 text-primary" />
                      <span className="text-foreground">Verified publisher</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-2">
                      <FileCode className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">TypeScript</span>
                      <span className="text-muted-foreground/60">•</span>
                      <Shield className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">Security verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Discover & Integrate Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover & <span className="text-primary">Integrate</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find the MCPs you need and integrate them into your workflow in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {discoverFeatures.map((feature, index) => (
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

      {/* Publish with Confidence Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Publish with
                <span className="block text-primary">confidence.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                A complete publishing workflow designed for maintainers. From CLI to web interface,
                manage your MCPs with full control and visibility.
              </p>

              <div className="space-y-4">
                {publishFeatures.map((item, index) => (
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
                    giteria mcp publish
                  </span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="text-muted-foreground">
                    $ <span className="text-foreground">giteria mcp publish</span>
                  </div>
                  <div className="text-muted-foreground pt-2">? Select package to publish:</div>
                  <div className="text-primary pl-3">❯ @my-org/data-processor</div>
                  <div className="text-muted-foreground pt-2">
                    ? Package version (current: 2.1.0):
                  </div>
                  <div className="text-primary pl-3">❯ 2.2.0</div>
                  <div className="text-muted-foreground pt-2">? Release notes (optional):</div>
                  <div className="text-primary pl-3">❯ Add support for async processing</div>
                  <div className="pt-3">
                    <span className="text-green-500">✓</span> Publishing
                    @my-org/data-processor@v2.2.0...
                    <br />
                    <span className="text-green-500">✓</span> Verifying integrity...
                    <br />
                    <span className="text-green-500">✓</span> Updating metadata...
                    <br />
                    <span className="text-green-500">✓</span> Published successfully!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for the Ecosystem Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for the <span className="text-primary">ecosystem</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              MCP Registry integrates seamlessly with Giteria. Not a standalone tool — part of your
              complete development platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ecosystemItems.map((item, index) => (
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

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground">
              <GitBranch className="w-4 h-4 text-primary" />
              <span>Repository Integration</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground">
              <Rocket className="w-4 h-4 text-primary" />
              <span>Actions Compatible</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground">
              <Container className="w-4 h-4 text-primary" />
              <span>Codespaces Ready</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>Team Collaboration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Governance Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Security First
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Security &<span className="block text-primary">Governance.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Enterprise-grade security features built into every aspect of MCP Registry. Control
                who can access, modify, and distribute your components.
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
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">MCP Security Scan</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Integrity check</span>
                    <span className="text-sm font-medium text-green-500">Verified</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Dependencies scanned</span>
                    <span className="text-sm font-medium text-green-500">142 checked</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Vulnerabilities</span>
                    <span className="text-sm font-medium text-green-500">0 found</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">Publisher verified</span>
                    <span className="text-sm font-medium text-green-500">Yes</span>
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
              Use <span className="text-primary">cases</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From open-source communities to enterprise teams, MCP Registry powers modular
              development at scale.
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
            Ready to build modular?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Discover, publish, and share MCPs. Part of your complete development platform — not a
            standalone tool.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace/mcp">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Explore MCP Registry
                <Search className="w-5 h-5 ml-2" />
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
