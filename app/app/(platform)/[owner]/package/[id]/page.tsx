"use client";

import * as React from "react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  ExternalLink,
  Download,
  History,
  Settings,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGitHubToken } from "@/lib/github-token";

interface OrgPackageDetailPageProps {
  params: Promise<{ owner: string; id: string }>;
}

interface GitHubPackage {
  id?: number;
  name?: string;
  package_type?: string;
  visibility?: "public" | "private" | "internal";
  updated_at?: string;
  html_url?: string;
  repository?: {
    name?: string;
    full_name?: string;
  };
  version_count?: number;
  registry_url?: string;
}

interface PackageVersion {
  id: number;
  name: string;
  version: string;
  created_at: string;
  html_url: string;
}

function formatDate(dateString?: string) {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function OrgPackageDetailPage({ params }: OrgPackageDetailPageProps) {
  const resolvedParams = use(params);
  const [pkg, setPkg] = useState<GitHubPackage | null>(null);
  const [versions, setVersions] = useState<PackageVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchPackage() {
      if (typeof window === "undefined") {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const token = await getGitHubToken();
        const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const endpoints = [
          `https://api.github.com/users/${resolvedParams.owner}/packages/${resolvedParams.id}`,
          `https://api.github.com/orgs/${resolvedParams.owner}/packages/${resolvedParams.id}`,
        ];

        let data: GitHubPackage | null = null;
        let baseUrl = "";
        for (const ep of endpoints) {
          const response = await fetch(ep, { headers }).catch(() => null);
          if (response?.ok) {
            data = await response.json();
            baseUrl = ep.replace(`/${resolvedParams.id}`, "");
            break;
          }
        }

        if (isMounted && data) {
          setPkg(data);

          const versionsResponse = await fetch(`https://api.github.com${baseUrl}/versions`, {
            headers,
          }).catch(() => null);
          if (versionsResponse?.ok) {
            const versionsData = await versionsResponse.json();
            if (isMounted && Array.isArray(versionsData)) {
              setVersions(versionsData.slice(0, 10));
            }
          }
        }
      } catch {
        if (isMounted) setPkg(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPackage();

    return () => {
      isMounted = false;
    };
  }, [resolvedParams.owner, resolvedParams.id]);

  const copyToClipboard = async () => {
    if (!pkg?.registry_url) return;
    await navigator.clipboard.writeText(pkg.registry_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
          </div>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={`/${resolvedParams.owner}/packages`}
              className="flex items-center gap-1 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to packages
            </Link>
          </Button>
          <div className="text-center py-20">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">Package not found</h2>
            <p className="text-muted-foreground mt-2">
              The package "{resolvedParams.id}" does not exist or you do not have access to it.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/${resolvedParams.owner}/packages`} className="flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to packages
          </Link>
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-lg bg-muted/50 flex items-center justify-center">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-semibold">{pkg.name}</h1>
                <Badge variant="outline" className="capitalize">
                  {pkg.package_type}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {pkg.visibility}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {pkg.repository?.full_name
                  ? `Published from ${pkg.repository.full_name}`
                  : `Published by ${resolvedParams.owner}`}
              </p>
              <p className="text-sm text-muted-foreground">
                Updated {formatDate(pkg.updated_at)} · {pkg.version_count || 0} versions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link
                href={pkg.html_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1"
              >
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {pkg.registry_url && (
            <div className="flex items-center gap-2">
              <code className="px-3 py-1.5 bg-muted rounded text-sm">{pkg.registry_url}</code>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="versions" className="mt-6">
          <TabsList>
            <TabsTrigger value="versions" className="gap-1">
              <History className="h-4 w-4" />
              Versions
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="versions" className="mt-4">
            {versions.length > 0 ? (
              <div className="border border-border rounded-lg bg-card">
                <div className="divide-y divide-border">
                  {versions.map((version) => (
                    <div key={version.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Download className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{version.version || version.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Published {formatDate(version.created_at)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={version.html_url || "#"} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-border rounded-lg">
                <History className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No versions available</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <div className="border border-border rounded-lg bg-card p-6">
              <h3 className="font-semibold mb-4">Package Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Visibility</p>
                    <p className="text-sm text-muted-foreground">Current: {pkg.visibility}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {pkg.visibility}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Package Type</p>
                    <p className="text-sm text-muted-foreground">{pkg.package_type}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {pkg.package_type}
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
