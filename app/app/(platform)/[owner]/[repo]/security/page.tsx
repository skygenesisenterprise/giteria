"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { SecuritySidebar } from "@/components/repository/security/SecuritySidebar";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Bug,
  Search,
  Lock,
  FileText,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

interface SecurityPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SecurityPage({ params }: SecurityPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const securityFeatures = [
    {
      name: "Code scanning",
      description: "One or more analysis tools are reporting problems",
      status: "warning",
      statusText: "CodeQL is reporting warnings. Check the status page for help.",
      href: `/${owner}/${repo}/security/code-scanning`,
      icon: Search,
    },
    {
      name: "Security policy",
      description: "View how to securely report security vulnerabilities for this repository",
      status: "enabled",
      statusText: "Enabled",
      href: `/${owner}/${repo}/security/policy`,
      icon: FileText,
    },
    {
      name: "Security advisories",
      description: "View or disclose security advisories for this repository",
      status: "enabled",
      statusText: "Enabled",
      href: `/${owner}/${repo}/security/advisories`,
      icon: ShieldAlert,
    },
    {
      name: "Private vulnerability reporting",
      description: "Allow users to privately report potential security vulnerabilities",
      status: "enabled",
      statusText: "Enabled",
      href: undefined,
      icon: ShieldCheck,
    },
    {
      name: "Dependabot alerts",
      description: "Get notified when one of your dependencies has a vulnerability",
      status: "enabled",
      statusText: "Enabled",
      href: `/${owner}/${repo}/security/dependabot`,
      icon: AlertTriangle,
    },
    {
      name: "Code scanning alerts",
      description: "Automatically detect common vulnerability and coding errors",
      status: "warning",
      statusText: "3 alerts",
      href: `/${owner}/${repo}/security/code-scanning`,
      icon: Bug,
    },
    {
      name: "Secret scanning alerts",
      description: "Get notified when a secret is pushed to this repository",
      status: "enabled",
      statusText: "Enabled",
      href: `/${owner}/${repo}/security/secret-scanning`,
      icon: Lock,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "enabled":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "disabled":
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <SecuritySidebar owner={owner} repo={repo} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Security
                </h1>
                <p className="text-muted-foreground mt-1">
                  Security overview for {owner}/{repo}
                </p>
              </div>

              <div className="border rounded-lg">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Security overview</h2>
                </div>
                <div className="divide-y">
                  {securityFeatures.map((feature) => {
                    const Icon = feature.icon;
                    const FeatureComponent = feature.href ? Link : "div";

                    return (
                      <FeatureComponent
                        key={feature.name}
                        href={feature.href || "#"}
                        className={`flex items-start gap-4 p-4 ${feature.href ? "hover:bg-accent/50" : ""} transition-colors`}
                      >
                        <div className="mt-0.5">{getStatusIcon(feature.status)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{feature.name}</span>
                            <span className="text-sm text-muted-foreground">
                              • {feature.statusText}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {feature.description}
                          </p>
                        </div>
                        {feature.href && (
                          <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                        )}
                      </FeatureComponent>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
