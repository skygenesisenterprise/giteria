"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, GitBranch, Shield, Zap, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Write Code",
    description:
      "Write, test, and fix code quickly with AI assistance, from simple boilerplate to complex features.",
  },
  {
    icon: GitBranch,
    title: "Plan & Collaborate",
    description:
      "Organize everything from high-level roadmaps to everyday tasks with powerful project management.",
  },
  {
    icon: Zap,
    title: "Automate",
    description:
      "Ship faster with secure, reliable CI/CD pipelines that automate your path to production.",
  },
  {
    icon: Shield,
    title: "Secure",
    description:
      "Use AI to find and fix vulnerabilities so your team can ship more secure software faster.",
  },
];

const stats = [
  { value: "10M+", label: "Developers" },
  { value: "4B+", label: "Repositories" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Countries" },
];

const testimonials = [
  {
    quote:
      "Giteria helps us onboard new developers and get them productive right away. It's a complete platform that frees us from menial tasks.",
    author: "Sarah Chen",
    role: "Engineering Lead at TechCorp",
  },
  {
    quote:
      "We've reduced our deployment time by 60% and improved code quality across all our projects.",
    author: "Marcus Johnson",
    role: "CTO at StartupXYZ",
  },
];

export default function HomePage() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f3a5f] via-[#0d1117] to-[#0d1117] opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21262d] border border-[#30363d] text-sm text-[#8b949e] mb-8">
              <Sparkles className="w-4 h-4 text-[#58a6ff]" />
              <span>AI-powered developer platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              The future of building
              <span className="block text-[#58a6ff]">happens together</span>
            </h1>

            <p className="text-xl text-[#8b949e] mb-12 max-w-2xl mx-auto">
              Tools and trends evolve, but collaboration endures. With Giteria, developers, teams,
              and code come together on one powerful platform.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-8"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md bg-[#0d1117] border border-[#30363d] text-white placeholder:text-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
              />
              <Button
                type="submit"
                className="px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold rounded-md"
              >
                Sign up free
              </Button>
            </form>

            <p className="text-sm text-[#8b949e]">
              <Link href="/copilot" className="text-[#58a6ff] hover:underline">
                Try Giteria Copilot free
              </Link>{" "}
              · No credit card required
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-[#8b949e]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Accelerate your entire workflow
            </h2>
            <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
              From your first line of code to final deployment, Giteria provides AI and automation
              tools to help you build and ship better software faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#21262d] flex items-center justify-center mb-4 group-hover:bg-[#58a6ff]/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#58a6ff]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Your AI partner everywhere
              </h2>
              <p className="text-lg text-[#8b949e] mb-8">
                Giteria Copilot is ready to work with you at each step of the software development
                lifecycle. Write code faster, debug smarter, and learn new technologies with AI
                assistance.
              </p>

              <div className="space-y-4">
                {[
                  "Intelligent code completion",
                  "Natural language explanations",
                  "Automated code reviews",
                  "Bug detection and fixes",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#238636]" />
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/copilot"
                className="inline-flex items-center gap-2 mt-8 text-[#58a6ff] hover:underline"
              >
                Explore Giteria Copilot <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#58a6ff] to-[#a371f7] opacity-20 blur-3xl" />
              <div className="relative bg-[#0d1117] border border-[#30363d] rounded-lg p-6 font-mono text-sm">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="space-y-2">
                  <div className="text-[#8b949e]">// AI suggests a function</div>
                  <div>
                    <span className="text-[#ff7b72]">function</span>{" "}
                    <span className="text-[#79c0ff]">calculateMetrics</span>(data) {"{"}
                  </div>
                  <div className="pl-4 text-[#8b949e]">// Returns optimized calculations</div>
                  <div className="pl-4 text-[#d2a8ff]">
                    return data.reduce((acc, item) ={">"} {"{"}
                  </div>
                  <div className="pl-8 text-[#79c0ff]">...acc,</div>
                  <div className="pl-8 text-[#7ee787]">[item.name]: item.value</div>
                  <div className="pl-4">
                    {"}"}, {});
                  </div>
                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built-in security where found means fixed
            </h2>
            <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
              Leverage AI-powered security to reduce vulnerabilities and protect your applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "AI-Powered Fixes",
                description:
                  "Apply fixes in seconds with Copilot Autofix. Spend less time debugging and more time building.",
                icon: Zap,
              },
              {
                title: "Dependency Updates",
                description:
                  "Update vulnerable dependencies with supported fixes for breaking changes automatically.",
                icon: GitBranch,
              },
              {
                title: "Secret Protection",
                description:
                  "Detect, prevent, and remediate leaked secrets across your organization.",
                icon: Shield,
              },
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
                <item.icon className="w-8 h-8 text-[#58a6ff] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#8b949e] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#161b22]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Work together, achieve more
          </h2>
          <p className="text-lg text-[#8b949e] mb-12">
            From planning and discussion to code review, Giteria keeps your team's conversation and
            context next to your code.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Plan with clarity", desc: "Organize everything from roadmaps to tasks" },
              { title: "Keep track", desc: "Create issues and manage projects" },
              { title: "Review together", desc: "Assign reviews to AI for speed" },
            ].map((item, index) => (
              <div key={index} className="p-4">
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-[#8b949e] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <blockquote key={index} className="border-l-2 border-[#30363d] pl-6 text-left">
                <p className="text-white mb-4">"{testimonial.quote}"</p>
                <footer className="text-[#8b949e]">
                  <strong className="text-white">{testimonial.author}</strong>
                  <span className="mx-2">·</span>
                  {testimonial.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
