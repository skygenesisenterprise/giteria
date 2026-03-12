"use client";

import * as React from "react";
import { use } from "react";
import { SettingSidebar } from "@/components/repository/settings/SettingSidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AppWindow,
  Plus,
  Loader2,
  Info,
  ExternalLink,
  Settings,
  CheckCircle,
  AlertTriangle,
  Key,
  Eye,
} from "lucide-react";

interface InstalledApp {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  installed: boolean;
  permissions: string[];
  lastUsed?: string;
}

interface AvailableApp {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  publisher: string;
  category: string;
  installs: number;
  rating: number;
}

interface SettingsAppsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsAppsPage({ params }: SettingsAppsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [installedApps, setInstalledApps] = React.useState<InstalledApp[]>([
    {
      id: "1",
      name: "CI/CD Pipeline",
      description: "Automated continuous integration and deployment",
      installed: true,
      permissions: ["read", "write"],
      lastUsed: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Code Quality Checker",
      description: "Automated code quality and style analysis",
      installed: true,
      permissions: ["read"],
      lastUsed: "2024-01-14T15:20:00Z",
    },
    {
      id: "3",
      name: "Security Scanner",
      description: "Security vulnerability detection",
      installed: true,
      permissions: ["read", "write"],
      lastUsed: "2024-01-13T09:00:00Z",
    },
  ]);

  const [availableApps] = React.useState<AvailableApp[]>([
    {
      id: "4",
      name: "Slack Notifications",
      description: "Send notifications to Slack channels",
      publisher: "Giteria",
      category: "Notifications",
      installs: 1250,
      rating: 4.5,
    },
    {
      id: "5",
      name: "Jira Integration",
      description: "Link pull requests to Jira issues",
      publisher: "Atlassian",
      category: "Project Management",
      installs: 890,
      rating: 4.2,
    },
    {
      id: "6",
      name: "Dependabot",
      description: "Automated dependency updates",
      publisher: "GitHub",
      category: "Security",
      installs: 2100,
      rating: 4.8,
    },
    {
      id: "7",
      name: "Sentry",
      description: "Error tracking and performance monitoring",
      publisher: "Sentry",
      category: "Monitoring",
      installs: 650,
      rating: 4.6,
    },
    {
      id: "8",
      name: "Docker Hub",
      description: "Build and push Docker images",
      publisher: "Docker",
      category: "Container",
      installs: 420,
      rating: 4.3,
    },
  ]);

  const [isInstallDialogOpen, setIsInstallDialogOpen] = React.useState(false);
  const [selectedApp, setSelectedApp] = React.useState<AvailableApp | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleInstall = (app: AvailableApp) => {
    setSelectedApp(app);
    setIsInstallDialogOpen(true);
  };

  const handleConfirmInstall = () => {
    if (!selectedApp) return;
    const newApp: InstalledApp = {
      id: selectedApp.id,
      name: selectedApp.name,
      description: selectedApp.description,
      installed: true,
      permissions: ["read"],
    };
    setInstalledApps((prev) => [...prev, newApp]);
    setIsInstallDialogOpen(false);
    setSelectedApp(null);
  };

  const handleUninstall = (appId: string) => {
    setInstalledApps((prev) => prev.filter((app) => app.id !== appId));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Security":
        return "bg-red-100 text-red-800";
      case "Notifications":
        return "bg-blue-100 text-blue-800";
      case "Project Management":
        return "bg-purple-100 text-purple-800";
      case "Monitoring":
        return "bg-green-100 text-green-800";
      case "Container":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
                <h1 className="text-2xl font-semibold">Giteria Apps</h1>
                <p className="text-muted-foreground mt-1">
                  Manage installed apps and browse available integrations
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Installed apps</h2>
                    <p className="text-sm text-muted-foreground">
                      Apps currently installed on this repository.
                    </p>
                  </div>

                  <div className="border rounded-lg">
                    {installedApps.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <AppWindow className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No apps installed</p>
                        <Button variant="link" className="mt-2">
                          Browse apps below
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {installedApps.map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <AppWindow className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{app.name}</p>
                                  <Badge className="bg-green-100 text-green-800">Installed</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{app.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    Permissions: {app.permissions.join(", ")}
                                  </span>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">
                                    Last used: {formatDate(app.lastUsed)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" disabled>
                                <Settings className="w-4 h-4 mr-1" />
                                Configure
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUninstall(app.id)}
                              >
                                Uninstall
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Browse apps</h2>
                    <p className="text-sm text-muted-foreground">
                      Discover and install apps from the Giteria Marketplace.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableApps.map((app) => (
                      <div key={app.id} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <AppWindow className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{app.name}</p>
                              <Badge className={getCategoryColor(app.category)}>
                                {app.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{app.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>{app.publisher}</span>
                              <span className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                {app.installs.toLocaleString()} installs
                              </span>
                              <span className="flex items-center gap-1">★ {app.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button size="sm" onClick={() => handleInstall(app)}>
                            <Plus className="w-4 h-4 mr-1" />
                            Install
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">App permissions</h2>
                    <p className="text-sm text-muted-foreground">
                      Manage which permissions are granted to installed apps.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow apps to read repository data</p>
                        <p className="text-sm text-muted-foreground">
                          Apps can read files, commits, and pull requests.
                        </p>
                      </div>
                      <Switch defaultChecked disabled />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow apps to write repository data</p>
                        <p className="text-sm text-muted-foreground">
                          Apps can create and update issues, pull requests, and commits.
                        </p>
                      </div>
                      <Switch defaultChecked disabled />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Require admin approval for new apps</p>
                        <p className="text-sm text-muted-foreground">
                          New app installations require administrator approval.
                        </p>
                      </div>
                      <Switch defaultChecked disabled />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About Giteria Apps</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about Giteria Apps and the marketplace.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Giteria Apps extend the functionality of your repositories with
                          integrations and automation.
                        </p>
                        <p>
                          Install apps to automate workflows, enhance security, send notifications,
                          and more.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://giteria.com/apps"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Browse the Giteria Marketplace
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

      <Dialog open={isInstallDialogOpen} onOpenChange={setIsInstallDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Install {selectedApp?.name}</DialogTitle>
            <DialogDescription>
              Review the permissions required by this app before installing.
            </DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4 py-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <AppWindow className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedApp.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedApp.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Publisher: {selectedApp.publisher}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Required permissions:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Read access</p>
                      <p className="text-xs text-muted-foreground">
                        Read repository metadata, files, and commit history
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Key className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Webhooks</p>
                      <p className="text-xs text-muted-foreground">
                        Receive events about repository activity
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    This app will have access to your repository data. Only install apps from
                    trusted publishers.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInstallDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmInstall}>Install app</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
