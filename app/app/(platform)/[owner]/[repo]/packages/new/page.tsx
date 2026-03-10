"use client";

import * as React from "react";
import Link from "next/link";
import { use } from "react";
import { ArrowLeft, Box, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RepoPackagesNewPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

const packageTypes = [
  { id: "npm", label: "npm", description: "Node.js packages" },
  { id: "docker", label: "Docker", description: "Container images" },
  { id: "maven", label: "Maven", description: "Java artifacts" },
  { id: "nuget", label: "NuGet", description: ".NET packages" },
];

export default function RepoPackagesNewPage({ params }: RepoPackagesNewPageProps) {
  const resolvedParams = use(params);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link
                href={`/${resolvedParams.owner}/${resolvedParams.repo}/packages`}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to packages
              </Link>
            </Button>
            <Badge variant="secondary">New package</Badge>
          </div>
        </div>

        <div className="mt-6 border border-border rounded-lg bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-muted/50 flex items-center justify-center">
              <Box className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Publish a package</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Follow these quick steps to publish your first package to Giteria.
              </p>
            </div>
          </div>

        <div className="mt-6 grid gap-4">
            {packageTypes.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 border border-border rounded-lg p-4 bg-background"
              >
                <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.label}</span>
                    <Badge variant="outline">Guide</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <Link href="https://docs.giteria.com/packages" className="flex items-center gap-1">
                Open publishing guide
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={`/${resolvedParams.owner}/${resolvedParams.repo}/packages`}
                className="flex items-center gap-1"
              >
                View packages
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
