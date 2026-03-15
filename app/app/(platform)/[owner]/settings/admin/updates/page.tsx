"use client";

import * as React from "react";
import { use } from "react";
import { OrgSettingSidebar } from "@/components/organizations/OrgSettingSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Download, CheckCircle, AlertCircle, Github, Info, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UpdatesPageProps {
  params: Promise<{ owner: string }>;
}

interface VersionInfo {
  currentVersion: string;
  latestVersion: string;
  releaseNotes: string;
  releaseDate: string;
  downloadUrl: string;
  isUpdateAvailable: boolean;
}

const CURRENT_VERSION = "1.0.0";

export default function UpdatesPage({ params }: UpdatesPageProps) {
  const resolvedParams = use(params);
  const { owner } = resolvedParams;

  const [versionInfo, setVersionInfo] = React.useState<VersionInfo | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isChecking, setIsChecking] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [githubToken, setGithubToken] = React.useState("");

  const fetchLatestVersion = React.useCallback(async () => {
    setIsChecking(true);
    setError(null);
    try {
      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Giteria-SelfHosted",
      };

      if (githubToken) {
        headers.Authorization = `Bearer ${githubToken}`;
      }

      const response = await fetch(
        "https://api.github.com/repos/skygenesisenterprise/giteria/releases/latest",
        { headers }
      );

      if (!response.ok) {
        const status = response.status;
        if (status === 403) {
          throw new Error("GitHub API rate limit exceeded. Provide a GitHub token or wait.");
        } else if (status === 404) {
          throw new Error("Repository not found or no releases available");
        } else {
          throw new Error(`GitHub API error: ${status}`);
        }
      }

      const data = await response.json();
      const latestVersion = data.tag_name?.replace("v", "") || "0.0.0";

      const info: VersionInfo = {
        currentVersion: CURRENT_VERSION,
        latestVersion,
        releaseNotes: data.body || "No release notes available",
        releaseDate: data.published_at || new Date().toISOString(),
        downloadUrl: data.html_url || "",
        isUpdateAvailable: latestVersion !== CURRENT_VERSION,
      };

      setVersionInfo(info);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(
        `Unable to check for updates: ${message}. This may be due to GitHub API rate limiting.`
      );
      console.error("Failed to fetch version:", err);
    } finally {
      setIsChecking(false);
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLatestVersion();
  }, [fetchLatestVersion]);

  const handleUpdate = async () => {
    if (!versionInfo?.downloadUrl) return;

    setIsUpdating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.open(versionInfo.downloadUrl, "_blank");
    } catch (err) {
      setError("Failed to start update. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex gap-8">
            <div className="w-64 shrink-0">
              <OrgSettingSidebar owner={owner} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center py-12">
                <div className="text-muted-foreground">Loading updates...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <OrgSettingSidebar owner={owner} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Instance Updates</h1>
                <p className="text-muted-foreground mt-1">
                  Check for updates and keep your Giteria instance up to date
                </p>
              </div>

              <Separator />

              {error && (
                <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      <p>{error}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      Current Version
                    </CardTitle>
                    <CardDescription>The currently installed version of Giteria</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold">
                          {versionInfo?.currentVersion || "..."}
                        </span>
                        {versionInfo && !versionInfo.isUpdateAvailable && (
                          <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 dark:bg-green-950/20 px-2 py-1 rounded-full">
                            <CheckCircle className="w-4 h-4" />
                            Up to date
                          </span>
                        )}
                      </div>
                      <Button variant="outline" onClick={fetchLatestVersion} disabled={isChecking}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
                        {isChecking ? "Checking..." : "Check for updates"}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github-token" className="flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        GitHub Token (optional)
                      </Label>
                      <Input
                        id="github-token"
                        type="password"
                        placeholder="ghp_xxxxxxxxxxxx"
                        value={githubToken}
                        onChange={(e) => setGithubToken(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Provide a GitHub personal access token to avoid API rate limiting
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {versionInfo?.isUpdateAvailable && (
                  <>
                    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          Update Available
                        </CardTitle>
                        <CardDescription>A new version of Giteria is available</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Latest version</p>
                            <p className="text-2xl font-bold">{versionInfo.latestVersion}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Released</p>
                            <p className="text-sm">
                              {new Date(versionInfo.releaseDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Release Notes</p>
                          <div className="max-h-48 overflow-y-auto text-sm text-muted-foreground bg-background dark:bg-black/20 p-3 rounded-md border">
                            {versionInfo.releaseNotes || "No release notes available"}
                          </div>
                        </div>

                        <Button className="w-full" onClick={handleUpdate} disabled={isUpdating}>
                          {isUpdating ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Starting update...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Download and Install Update
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="text-sm text-amber-800 dark:text-amber-200">
                            <p className="font-medium">Before updating</p>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                              <li>Backup your database</li>
                              <li>Review the release notes</li>
                              <li>Ensure you have sufficient disk space</li>
                              <li>Schedule during a maintenance window</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
