"use client";

import * as React from "react";
import { use } from "react";
import { SettingSidebar } from "@/components/repository/settings/SettingSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  Loader2,
  Info,
  ExternalLink,
  AlertTriangle,
  Rocket,
  Clock,
} from "lucide-react";

interface PagesSettings {
  enablePages: boolean;
  source: "none" | "branch" | "action";
  branch: string;
  folder: string;
  buildType: "static" | "action";
  customDomain: string;
  enableHTTPS: boolean;
  enforceHTTPS: boolean;
  cdnEnabled: boolean;
}

interface SettingsPagesPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsPagesPage({ params }: SettingsPagesPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [settings, setSettings] = React.useState<PagesSettings>({
    enablePages: true,
    source: "branch",
    branch: "gh-pages",
    folder: "/ (root)",
    buildType: "static",
    customDomain: "",
    enableHTTPS: true,
    enforceHTTPS: true,
    cdnEnabled: true,
  });

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const stats = {
    builds: 156,
    lastBuild: "2024-01-15T10:30:00Z",
    views: 12500,
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <SettingSidebar owner={owner} repo={repo} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Pages</h1>
                <p className="text-muted-foreground mt-1">
                  Configure Giteria Pages settings for this repository
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Rocket className="w-4 h-4" />
                      Total builds
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.builds}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Last build
                    </div>
                    <p className="text-2xl font-semibold mt-1">2h ago</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      Total views
                    </div>
                    <p className="text-2xl font-semibold mt-1">
                      {(stats.views / 1000).toFixed(1)}K
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Giteria Pages</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure how your site is built and deployed.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable Giteria Pages</p>
                        <p className="text-sm text-muted-foreground">
                          Publish a static website from this repository.
                        </p>
                      </div>
                      <Switch
                        checked={settings.enablePages}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, enablePages: checked }))
                        }
                      />
                    </div>

                    {settings.enablePages && (
                      <>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Source</p>
                            <p className="text-sm text-muted-foreground">
                              Choose how to build your site.
                            </p>
                          </div>
                          <Select
                            value={settings.source}
                            onValueChange={(value) =>
                              setSettings((prev) => ({
                                ...prev,
                                source: value as PagesSettings["source"],
                              }))
                            }
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="branch">Deploy from a branch</SelectItem>
                              <SelectItem value="action">Giteria Actions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {settings.source === "branch" && (
                          <>
                            <div className="ml-6 space-y-4 p-4 border rounded-lg bg-muted/30">
                              <div className="space-y-2">
                                <Label>Branch</Label>
                                <Select
                                  value={settings.branch}
                                  onValueChange={(value) =>
                                    setSettings((prev) => ({ ...prev, branch: value }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="main">main</SelectItem>
                                    <SelectItem value="gh-pages">gh-pages</SelectItem>
                                    <SelectItem value="docs">docs</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Folder</Label>
                                <Select
                                  value={settings.folder}
                                  onValueChange={(value) =>
                                    setSettings((prev) => ({ ...prev, folder: value }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="/ (root)">/ (root)</SelectItem>
                                    <SelectItem value="/docs">/docs</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </>
                        )}

                        {settings.source === "action" && (
                          <div className="ml-6 p-4 border rounded-lg bg-muted/30">
                            <div className="flex items-start gap-3">
                              <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                              <div className="space-y-2">
                                <p className="font-medium">Using Giteria Actions</p>
                                <p className="text-sm text-muted-foreground">
                                  Create a workflow file in .giteria/workflows to build and deploy
                                  your site.
                                </p>
                                <Button variant="outline" size="sm" disabled>
                                  <Rocket className="w-4 h-4 mr-2" />
                                  View workflow
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {settings.enablePages && (
                  <>
                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Build and deployment</h2>
                        <p className="text-sm text-muted-foreground">
                          Configure build settings for your Giteria Pages site.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Build type</p>
                            <p className="text-sm text-muted-foreground">How your site is built.</p>
                          </div>
                          <Select
                            value={settings.buildType}
                            onValueChange={(value) =>
                              setSettings((prev) => ({
                                ...prev,
                                buildType: value as PagesSettings["buildType"],
                              }))
                            }
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="static">Static site</SelectItem>
                              <SelectItem value="action">Giteria Actions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">CDN</p>
                            <p className="text-sm text-muted-foreground">
                              Enable CDN for faster content delivery.
                            </p>
                          </div>
                          <Switch
                            checked={settings.cdnEnabled}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, cdnEnabled: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Custom domain</h2>
                        <p className="text-sm text-muted-foreground">
                          Configure a custom domain for your GitHub Pages site.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="custom-domain">Custom domain</Label>
                            <Input
                              id="custom-domain"
                              placeholder="example.com"
                              value={settings.customDomain}
                              onChange={(e) =>
                                setSettings((prev) => ({ ...prev, customDomain: e.target.value }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Enter a custom domain to use for your Giteria Pages site.
                            </p>
                          </div>

                          {settings.customDomain && (
                            <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                              <AlertTriangle className="w-5 h-5 text-yellow-600" />
                              <div className="text-sm">
                                <p className="font-medium">DNS configuration required</p>
                                <p className="text-muted-foreground">
                                  Add the following records to your DNS provider:
                                </p>
                                <div className="mt-2 font-mono text-xs space-y-1">
                                  <p>CNAME @ your-username.giteria.io</p>
                                  <p>TXT _giteria-pages-challenge.yourdomain.com [value]</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Enforce HTTPS</p>
                            <p className="text-sm text-muted-foreground">
                              Redirect HTTP traffic to HTTPS.
                            </p>
                          </div>
                          <Switch
                            checked={settings.enforceHTTPS}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, enforceHTTPS: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Privacy</h2>
                        <p className="text-sm text-muted-foreground">
                          Control who can view your site.
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium">Public</p>
                            <p className="text-sm text-muted-foreground">
                              Your site is publicly available.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto" disabled>
                            Change visibility
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About Giteria Pages</h2>
                    <p className="text-sm text-muted-foreground">Learn more about Giteria Pages.</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Giteria Pages is a static site hosting service that takes HTML, CSS, and
                          JavaScript files directly from your repository.
                        </p>
                        <p>
                          You can host your site for free on giteria.io domain or use your own custom
                          domain.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/en/pages"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about Giteria Pages
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
