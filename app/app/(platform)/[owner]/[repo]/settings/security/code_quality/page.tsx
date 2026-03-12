"use client";

import * as React from "react";
import { use } from "react";
import { SettingSidebar } from "@/components/repository/settings/SettingSidebar";
import { Button } from "@/components/ui/button";
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
  Code,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Info,
  ExternalLink,
  Settings,
  FileCode,
  GitBranch,
} from "lucide-react";

interface CodeQualityTool {
  id: string;
  name: string;
  enabled: boolean;
  language: string;
  lastRun?: string;
  alertsCount: number;
}

interface CodeQualitySettings {
  enableCodeQuality: boolean;
  autoScan: boolean;
  scanOnPush: boolean;
  scanOnPR: boolean;
  failOnIssues: boolean;
  minSeverity: "none" | "low" | "medium" | "high" | "critical";
}

interface SettingsCodeQualityPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsCodeQualityPage({ params }: SettingsCodeQualityPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [settings, setSettings] = React.useState<CodeQualitySettings>({
    enableCodeQuality: true,
    autoScan: true,
    scanOnPush: true,
    scanOnPR: true,
    failOnIssues: true,
    minSeverity: "medium",
  });

  const [tools, setTools] = React.useState<CodeQualityTool[]>([
    {
      id: "1",
      name: "ESLint",
      enabled: true,
      language: "JavaScript/TypeScript",
      lastRun: "2024-01-15T10:30:00Z",
      alertsCount: 12,
    },
    {
      id: "2",
      name: "CodeQL",
      enabled: true,
      language: "Multiple",
      lastRun: "2024-01-15T09:00:00Z",
      alertsCount: 5,
    },
    {
      id: "3",
      name: "SonarQube",
      enabled: false,
      language: "Multiple",
      alertsCount: 0,
    },
    {
      id: "4",
      name: "Pylint",
      enabled: true,
      language: "Python",
      lastRun: "2024-01-14T18:00:00Z",
      alertsCount: 8,
    },
  ]);

  const [recentScans, setRecentScans] = React.useState([
    { id: "1", branch: "main", status: "passed", duration: "2m 30s", date: "2024-01-15T10:30:00Z" },
    {
      id: "2",
      branch: "feature/new-auth",
      status: "failed",
      duration: "1m 45s",
      date: "2024-01-15T09:15:00Z",
      issues: 3,
    },
    { id: "3", branch: "main", status: "passed", duration: "2m 15s", date: "2024-01-14T10:30:00Z" },
    {
      id: "4",
      branch: "fix/bug-123",
      status: "failed",
      duration: "1m 20s",
      date: "2024-01-13T16:45:00Z",
      issues: 7,
    },
  ]);

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleToggleTool = (toolId: string) => {
    setTools((prev) => prev.map((t) => (t.id === toolId ? { ...t, enabled: !t.enabled } : t)));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge className="bg-green-100 text-green-800">Passed</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      default:
        return null;
    }
  };

  const stats = {
    totalScans: 156,
    passedScans: 142,
    failedScans: 14,
    avgDuration: "1m 45s",
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
                <h1 className="text-2xl font-semibold">Code Quality</h1>
                <p className="text-muted-foreground mt-1">
                  Configure code quality and security analysis tools
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Code className="w-4 h-4" />
                      Total scans
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.totalScans}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4" />
                      Passed
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-green-600">
                      {stats.passedScans}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4" />
                      Failed
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-red-600">{stats.failedScans}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4" />
                      Avg duration
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.avgDuration}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Code quality settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure code quality analysis for this repository.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable code quality</p>
                        <p className="text-sm text-muted-foreground">
                          Run code quality and security analysis on this repository.
                        </p>
                      </div>
                      <Switch
                        checked={settings.enableCodeQuality}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, enableCodeQuality: checked }))
                        }
                      />
                    </div>

                    {settings.enableCodeQuality && (
                      <>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Auto-scan</p>
                            <p className="text-sm text-muted-foreground">
                              Automatically run code analysis on a schedule.
                            </p>
                          </div>
                          <Switch
                            checked={settings.autoScan}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, autoScan: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Scan on push</p>
                            <p className="text-sm text-muted-foreground">
                              Run analysis when code is pushed to the repository.
                            </p>
                          </div>
                          <Switch
                            checked={settings.scanOnPush}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, scanOnPush: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Scan on pull requests</p>
                            <p className="text-sm text-muted-foreground">
                              Run analysis when pull requests are opened or updated.
                            </p>
                          </div>
                          <Switch
                            checked={settings.scanOnPR}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, scanOnPR: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Fail on issues</p>
                            <p className="text-sm text-muted-foreground">
                              Block merging when code quality issues are found.
                            </p>
                          </div>
                          <Switch
                            checked={settings.failOnIssues}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, failOnIssues: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Minimum severity</p>
                            <p className="text-sm text-muted-foreground">
                              Minimum severity level to fail the build.
                            </p>
                          </div>
                          <Select
                            value={settings.minSeverity}
                            onValueChange={(value) =>
                              setSettings((prev) => ({
                                ...prev,
                                minSeverity: value as CodeQualitySettings["minSeverity"],
                              }))
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {settings.enableCodeQuality && (
                  <>
                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Analysis tools</h2>
                        <p className="text-sm text-muted-foreground">
                          Configure which tools are used for code analysis.
                        </p>
                      </div>

                      <div className="border rounded-lg">
                        {tools.map((tool) => (
                          <div
                            key={tool.id}
                            className="flex items-center justify-between p-4 border-b last:border-b-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <FileCode className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{tool.name}</p>
                                  {tool.enabled && tool.alertsCount > 0 && (
                                    <Badge className="bg-yellow-100 text-yellow-800">
                                      {tool.alertsCount} alert(s)
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {tool.language}
                                  {tool.lastRun &&
                                    ` • Last run: ${new Date(tool.lastRun).toLocaleDateString()}`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" disabled={!tool.enabled}>
                                <Settings className="w-4 h-4 mr-1" />
                                Configure
                              </Button>
                              <Switch
                                checked={tool.enabled}
                                onCheckedChange={() => handleToggleTool(tool.id)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Recent scans</h2>
                        <p className="text-sm text-muted-foreground">
                          View recent code quality scan results.
                        </p>
                      </div>

                      <div className="border rounded-lg">
                        <div className="divide-y">
                          {recentScans.map((scan) => (
                            <div key={scan.id} className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                  <GitBranch className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{scan.branch}</p>
                                    {getStatusBadge(scan.status)}
                                    {scan.issues && (
                                      <Badge className="bg-red-100 text-red-800">
                                        {scan.issues} issue(s)
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {scan.duration} • {new Date(scan.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" disabled>
                                View details
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About code quality</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about code quality and security quality.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Code scanning helps you detect security vulnerabilities and code quality
                          issues in your repository.
                        </p>
                        <p>
                          You can use built-in tools like CodeQL, or integrate with third-party
                          analysis tools.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/en/code-security/code-quality"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about code scanning
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
