"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Users,
  BarChart3,
  Building2,
  Globe,
  Server,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Code2,
  Container,
  Rocket,
  Zap,
  Award,
  Handshake,
  Clock,
  HeadphonesIcon,
} from "lucide-react";

const enterpriseBenefits = [
  {
    icon: Shield,
    title: "Secure and Compliant Development",
    description:
      "Enterprise-grade security with SSO/SAML, SOC 2 compliance, and regulatory frameworks. Protect your intellectual property with confidence.",
  },
  {
    icon: Server,
    title: "Scalable Infrastructure",
    description:
      "Deploy on-premises, in the cloud, or hybrid. Scale from hundreds to thousands of users without compromising performance.",
  },
  {
    icon: Users,
    title: "Team Collaboration at Scale",
    description:
      "Manage thousands of developers across multiple teams and organizations. Unified workflows, policies, and governance.",
  },
  {
    icon: Building2,
    title: "Centralized Management",
    description:
      "Single pane of glass for all your repositories. Global policies, user provisioning, and resource management.",
  },
  {
    icon: BarChart3,
    title: "Advanced Insights and Analytics",
    description:
      "Gain visibility into developer productivity, code quality metrics, and compliance reporting across your organization.",
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "Enterprise Access Control",
    description:
      "Fine-grained permissions at organization, team, and repository levels. LDAP/AD integration for seamless identity management.",
  },
  {
    icon: Terminal,
    title: "Audit Logging",
    description:
      "Comprehensive audit trails for all actions. Export logs for compliance and security analysis.",
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description:
      "Meet SOC 2, ISO 27001, GDPR, and HIPAA requirements with built-in compliance features.",
  },
  {
    icon: Zap,
    title: "Threat Mitigation",
    description:
      "Automated vulnerability scanning, secret detection, and dependency analysis to keep your code secure.",
  },
];

const integrationItems = [
  {
    icon: Code2,
    title: "Giteria Codespaces",
    description: "Cloud development environments integrated directly with your repositories.",
  },
  {
    icon: Terminal,
    title: "Giteria Copilot",
    description: "AI-powered code completion and assistance for your development teams.",
  },
  {
    icon: Container,
    title: "Container Registry",
    description: "Secure Docker container hosting and distribution for your CI/CD workflows.",
  },
  {
    icon: Rocket,
    title: "CI/CD Pipelines",
    description: "Automated build, test, and deployment workflows with enterprise scaling.",
  },
];

const useCases = [
  {
    icon: Building2,
    title: "Large Software Companies",
    description:
      "Centralize development across multiple business units with unified governance and security policies.",
  },
  {
    icon: Shield,
    title: "Regulated Industries",
    description:
      "Meet strict compliance requirements in finance, healthcare, and government with full audit trails.",
  },
  {
    icon: Globe,
    title: "Remote Engineering Teams",
    description:
      "Enable seamless collaboration across time zones with integrated communication and code review.",
  },
  {
    icon: Award,
    title: "Open Source at Scale",
    description:
      "Manage large open-source projects with thousands of contributors while maintaining quality.",
  },
];

const customerStats = [
  { value: "Self-Hosted", label: "Deployment" },
  { value: "SSO/SAML", label: "Authentication" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Support" },
];

export default function EnterprisePage() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
                Enterprise Solutions
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Enterprise-grade
                <span className="block text-primary">development solutions</span>
                <span className="block text-foreground">for large organizations.</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Scale your development teams with a secure, reliable platform designed for
                enterprise requirements. Full data sovereignty, compliance, and governance — on your
                infrastructure or ours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                  >
                    Request a Demo
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
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>24/7 Support</span>
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
                      Giteria Enterprise Dashboard
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-2xl font-bold text-primary">2,847</div>
                      <div className="text-xs text-muted-foreground">Active Developers</div>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-2xl font-bold text-primary">156</div>
                      <div className="text-xs text-muted-foreground">Organizations</div>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-2xl font-bold text-primary">12.4K</div>
                      <div className="text-xs text-muted-foreground">Repositories</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="text-2xl font-bold text-green-500">99.9%</div>
                      <div className="text-xs text-muted-foreground">System Health</div>
                    </div>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span>LDAP/AD Sync completed</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span>Security audit passed</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span>Compliance report generated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Trusted by leading enterprises worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Building2 className="w-5 h-5" />
                Enterprise
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Shield className="w-5 h-5" />
                SOC 2 Certified
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Lock className="w-5 h-5" />
                ISO 27001
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Globe className="w-5 h-5" />
                Global Scale
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Enterprise Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-primary">enterprise scale</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything large organizations need to secure, manage, and accelerate their
              development workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enterpriseBenefits.map((benefit, index) => (
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

      {/* Security & Compliance Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Security & Compliance
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Enterprise security
                <span className="block text-primary">you can trust.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Built from the ground up with security-first principles. Meet the most demanding
                compliance requirements without sacrificing developer productivity.
              </p>

              <div className="space-y-4">
                {securityFeatures.map((item, index) => (
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
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">Security Compliance Report</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">SOC 2 Type II</span>
                    <span className="text-sm font-medium text-green-500">Compliant</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">ISO 27001</span>
                    <span className="text-sm font-medium text-green-500">Certified</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">GDPR</span>
                    <span className="text-sm font-medium text-green-500">Ready</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-foreground">HIPAA</span>
                    <span className="text-sm font-medium text-green-500">Supported</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Integration Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Seamless
                <span className="block text-primary">workflow integration.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Integrate with the tools your teams already use. From IDEs to CI/CD pipelines,
                Giteria fits into your existing workflow.
              </p>

              <div className="space-y-3">
                {integrationItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{item.title}</span>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
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
                    .giteria/workflows/enterprise.yml
                  </span>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div>
                    <span className="text-primary">name</span>: Enterprise CI/CD
                  </div>
                  <div>
                    <span className="text-primary">on</span>: [push, pull_request]
                  </div>
                  <div className="pt-2">
                    <span className="text-primary">jobs</span>:
                  </div>
                  <div className="pl-3">
                    <span className="text-primary">enterprise-build</span>:
                  </div>
                  <div className="pl-5">
                    <span className="text-primary">runs-on</span>: self-hosted
                  </div>
                  <div className="pl-5">
                    <span className="text-primary">steps</span>:
                  </div>
                  <div className="pl-7">- uses: actions/checkout@v4</div>
                  <div className="pl-7">- name: Security Scan</div>
                  <div className="pl-9 text-muted-foreground">run: giteria security scan</div>
                  <div className="pl-7">- name: Build & Deploy</div>
                  <div className="pl-9 text-muted-foreground">run: giteria deploy --enterprise</div>
                  <div className="pt-2 text-green-500">✓ Enterprise pipeline complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Success / Use Cases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Enterprise <span className="text-primary">use cases</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how leading organizations use Giteria to power their development workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <useCase.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {customerStats.map((stat, index) => (
              <div
                key={index}
                className="p-4 md:p-6 rounded-xl bg-card border border-border text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Enterprises Choose Giteria */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why enterprises
                <span className="block text-primary">choose Giteria</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of enterprises that trust Giteria for their mission-critical
                development infrastructure.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Data Sovereignty</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep your code on your infrastructure. No vendor lock-in, complete control
                      over your intellectual property.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <HeadphonesIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Enterprise Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Dedicated support team with SLA guarantees. Migration assistance and
                      onboarding included.
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
                      Predictable release cycles and backward compatibility. Your workflows stay
                      stable for years.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Data Ownership</div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">0</div>
                <div className="text-sm text-muted-foreground">Cloud Dependencies</div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">∞</div>
                <div className="text-sm text-muted-foreground">Scaling Potential</div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Enterprise Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Demo Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to scale your development?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Get a personalized demo of Giteria Enterprise. Our team will show you how we can meet
            your organization's unique requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Request a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <Handshake className="w-5 h-5 mr-2" />
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
