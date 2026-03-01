"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Users,
  Server,
  Building2,
  Mail,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for individuals and small projects",
    price: "0€",
    period: "forever",
    cta: "Get Started",
    href: "/register",
    popular: false,
    features: [
      { name: "Unlimited public repositories", included: true },
      { name: "Unlimited private repositories", included: true },
      { name: "Up to 3 collaborators", included: true },
      { name: "500MB package storage", included: true },
      { name: "Basic code review", included: true },
      { name: "Issue tracking", included: true },
      { name: "Wiki", included: true },
      { name: "Community support", included: true },
      { name: "CI/CD pipelines (2 concurrent)", included: true },
      { name: "SSO / SAML", included: false },
      { name: "Advanced security scanning", included: false },
      { name: "Dedicated support", included: false },
      { name: "SLA guarantee", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For professional developers and small teams",
    price: "15€",
    period: "per user / month",
    cta: "Start Free Trial",
    href: "/register",
    popular: true,
    features: [
      { name: "Unlimited public repositories", included: true },
      { name: "Unlimited private repositories", included: true },
      { name: "Up to 10 collaborators", included: true },
      { name: "5GB package storage", included: true },
      { name: "Advanced code review", included: true },
      { name: "Issue tracking & projects", included: true },
      { name: "Wiki & documentation", included: true },
      { name: "Email support", included: true },
      { name: "CI/CD pipelines (10 concurrent)", included: true },
      { name: "SSO / SAML", included: true },
      { name: "Basic security scanning", included: true },
      { name: "Dedicated support", included: false },
      { name: "SLA guarantee", included: false },
    ],
  },
  {
    name: "Team",
    description: "For growing teams needing more power",
    price: "45€",
    period: "per user / month",
    cta: "Start Free Trial",
    href: "/register",
    popular: false,
    features: [
      { name: "Unlimited public repositories", included: true },
      { name: "Unlimited private repositories", included: true },
      { name: "Unlimited collaborators", included: true },
      { name: "50GB package storage", included: true },
      { name: "Advanced code review", included: true },
      { name: "Issue tracking & projects", included: true },
      { name: "Wiki & documentation", included: true },
      { name: "Priority support", included: true },
      { name: "CI/CD pipelines (50 concurrent)", included: true },
      { name: "SSO / SAML", included: true },
      { name: "Advanced security scanning", included: true },
      { name: "Dedicated support", included: true },
      { name: "SLA guarantee", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs",
    price: "Custom",
    period: "contact us",
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
    features: [
      { name: "Unlimited public repositories", included: true },
      { name: "Unlimited private repositories", included: true },
      { name: "Unlimited collaborators", included: true },
      { name: "Unlimited package storage", included: true },
      { name: "Advanced code review", included: true },
      { name: "Issue tracking & projects", included: true },
      { name: "Wiki & documentation", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Unlimited CI/CD pipelines", included: true },
      { name: "SSO / SAML / OIDC", included: true },
      { name: "Advanced security & compliance", included: true },
      { name: "Custom integrations", included: true },
      { name: "99.99% SLA guarantee", included: true },
    ],
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Flexible Plans",
    description:
      "Scale your plan as your team grows. Upgrade or downgrade anytime with no penalties.",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "No hidden fees. No surprise charges. What you see is what you pay.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Easily manage permissions, roles, and access across your entire organization.",
  },
  {
    icon: Server,
    title: "Self-Hosted Option",
    description: "Deploy on your own infrastructure. Full control with no per-user pricing.",
  },
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "We'll notify you when you're approaching limits. You can upgrade your plan or purchase additional resources as needed.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer:
      "Yes, we offer 50% off for verified non-profit organizations and educational institutions.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. Contact our support team to request a refund.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Simple, Transparent Pricing
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
              Simple, transparent plans
              <span className="block text-primary">designed for your team.</span>
            </h1>

            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              Choose the plan that fits your needs. All plans include unlimited public repositories,
              core collaboration features, and self-hosted deployment options. No surprises, no
              hidden fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/register">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="https://docs.giteria.com/self-hosted" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                >
                  <Server className="w-5 h-5 mr-2" />
                  Self-Hosted
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Plans & Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose your <span className="text-primary">plan</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              All plans include our core features. Upgrade anytime as your needs grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-xl bg-card border ${
                  plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                } overflow-hidden flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-sm font-medium py-1">
                    Most Popular
                  </div>
                )}

                <div className={`p-6 ${plan.popular ? "pt-8" : ""}`}>
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground text-sm ml-2">/ {plan.period}</span>
                    )}
                  </div>

                  <Link href={plan.href}>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-primary hover:bg-primary/90"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>

                <div className="flex-1 p-6 pt-0 border-t border-border mt-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        {feature.included ? (
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? "text-foreground" : "text-muted-foreground/60"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why choose <span className="text-primary">Giteria</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We believe in fair, transparent pricing that scales with your team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Building2 className="w-4 h-4" />
                Enterprise
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Need a custom
                <span className="block text-primary">solution?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Our Enterprise plan offers custom pricing and dedicated support for large
                organizations with specific requirements.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Custom deployment options</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Dedicated success manager</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">24/7 priority support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Advanced compliance features</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Custom integrations</span>
                </div>
              </div>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Sales
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-[#a371f7]/20 blur-3xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Enterprise Features</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">SLA Guarantee</span>
                    <span className="text-sm font-medium text-primary">99.99%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Support Response</span>
                    <span className="text-sm font-medium text-primary">&lt; 1 hour</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Max File Size</span>
                    <span className="text-sm font-medium text-primary">10GB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-sm text-foreground">Audit Logs</span>
                    <span className="text-sm font-medium text-primary">Unlimited</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently asked <span className="text-primary">questions</span>
            </h2>
            <p className="text-muted-foreground">Everything you need to know about our pricing.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl bg-card border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Still have questions?{" "}
              <Link href="/contact" className="text-primary hover:underline font-medium">
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of teams already using Giteria. Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary font-semibold rounded-md"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
