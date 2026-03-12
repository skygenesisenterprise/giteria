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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  Server,
  Plus,
  Trash2,
  Edit,
  Play,
  Pause,
  Power,
  PowerOff,
  Loader2,
  Info,
  ExternalLink,
  Settings,
  Cpu,
  HardDrive,
  MemoryStick,
  Clock,
  Circle,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Runner {
  id: string;
  name: string;
  status: "online" | "offline" | "busy";
  os: string;
  version: string;
  labels: string[];
  lastSeen: string;
}

interface RunnerGroup {
  id: string;
  name: string;
  runners: number;
  access: "selected" | "all";
}

interface SettingsActionsRunnersPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsActionsRunnersPage({ params }: SettingsActionsRunnersPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [runners, setRunners] = React.useState<Runner[]>([
    {
      id: "1",
      name: "ubuntu-runner-1",
      status: "online",
      os: "Ubuntu 22.04",
      version: "2.308.0",
      labels: ["ubuntu", "self-hosted"],
      lastSeen: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "ubuntu-runner-2",
      status: "busy",
      os: "Ubuntu 22.04",
      version: "2.308.0",
      labels: ["ubuntu", "self-hosted", "large"],
      lastSeen: "2024-01-15T10:25:00Z",
    },
    {
      id: "3",
      name: "windows-runner-1",
      status: "online",
      os: "Windows Server 2022",
      version: "2.308.0",
      labels: ["windows", "self-hosted"],
      lastSeen: "2024-01-15T10:20:00Z",
    },
    {
      id: "4",
      name: "macos-runner-1",
      status: "offline",
      os: "macOS 13",
      version: "2.307.0",
      labels: ["macos", "self-hosted"],
      lastSeen: "2024-01-14T18:00:00Z",
    },
  ]);

  const [runnerGroups, setRunnerGroups] = React.useState<RunnerGroup[]>([
    { id: "1", name: "Default", runners: 3, access: "all" },
    { id: "2", name: "Large Runners", runners: 1, access: "selected" },
  ]);

  const [autoScaleSettings, setAutoScaleSettings] = React.useState({
    enableAutoScale: false,
    minRunners: 1,
    maxRunners: 5,
    scalingType: "dynamic" as "dynamic" | "fixed",
  });

  const [runnerSettings, setRunnerSettings] = React.useState({
    enableEphemeralRunners: false,
    preserveDockerVolumes: true,
    tokenExpiration: 1,
  });

  const [selectedRunner, setSelectedRunner] = React.useState<Runner | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleEditRunner = (runner: Runner) => {
    setSelectedRunner({ ...runner });
    setIsEditDialogOpen(true);
  };

  const handleUpdateRunner = () => {
    if (!selectedRunner) return;
    setRunners((prev) => prev.map((r) => (r.id === selectedRunner.id ? selectedRunner : r)));
    setIsEditDialogOpen(false);
  };

  const handleDeleteRunner = (runnerId: string) => {
    setRunners((prev) => prev.filter((r) => r.id !== runnerId));
  };

  const handleToggleRunnerStatus = (runnerId: string) => {
    setRunners((prev) =>
      prev.map((r) =>
        r.id === runnerId ? { ...r, status: r.status === "online" ? "offline" : "online" } : r
      )
    );
  };

  const getStatusIcon = (status: Runner["status"]) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "busy":
        return <Circle className="w-4 h-4 text-yellow-600" />;
      case "offline":
        return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Runner["status"]) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case "busy":
        return <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>;
      case "offline":
        return <Badge className="bg-gray-100 text-gray-800">Offline</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stats = React.useMemo(() => {
    return {
      total: runners.length,
      online: runners.filter((r) => r.status === "online").length,
      busy: runners.filter((r) => r.status === "busy").length,
      offline: runners.filter((r) => r.status === "offline").length,
    };
  }, [runners]);

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
                <h1 className="text-2xl font-semibold">Runners</h1>
                <p className="text-muted-foreground mt-1">
                  Manage self-hosted runners for GitHub Actions
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Server className="w-4 h-4" />
                      Total runners
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.total}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4" />
                      Online
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-green-600">{stats.online}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Circle className="w-4 h-4" />
                      Busy
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-yellow-600">{stats.busy}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4" />
                      Offline
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-gray-600">{stats.offline}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Self-hosted runners</h2>
                      <p className="text-sm text-muted-foreground">
                        Manage your self-hosted runners for this repository.
                      </p>
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add runner
                    </Button>
                  </div>

                  <div className="border rounded-lg">
                    {runners.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Bot className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No runners configured</p>
                        <Button variant="link" className="mt-2">
                          Learn how to add a self-hosted runner
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {runners.map((runner) => (
                          <div key={runner.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <Server className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{runner.name}</p>
                                  {getStatusBadge(runner.status)}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{runner.os}</span>
                                  <span>•</span>
                                  <span>v{runner.version}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  {runner.labels.map((label) => (
                                    <Badge key={label} variant="outline" className="text-xs">
                                      {label}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Last seen</p>
                                <p className="text-sm">{formatDate(runner.lastSeen)}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleToggleRunnerStatus(runner.id)}
                              >
                                {runner.status === "online" ? (
                                  <PowerOff className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <Power className="w-4 h-4 text-green-600" />
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditRunner(runner)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteRunner(runner.id)}
                              >
                                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
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
                    <h2 className="text-xl font-semibold">Runner groups</h2>
                    <p className="text-sm text-muted-foreground">
                      Organize runners into groups to manage access.
                    </p>
                  </div>

                  <div className="border rounded-lg">
                    {runnerGroups.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-muted-foreground">No runner groups configured</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {runnerGroups.map((group) => (
                          <div key={group.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <Bot className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-medium">{group.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {group.runners} runner(s) •{" "}
                                  {group.access === "all"
                                    ? "All repositories"
                                    : "Selected repositories"}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" disabled>
                              <Settings className="w-4 h-4 mr-1" />
                              Configure
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Auto-scaling</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure automatic scaling for your runners.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable auto-scaling</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically scale the number of runners based on demand.
                        </p>
                      </div>
                      <Switch
                        checked={autoScaleSettings.enableAutoScale}
                        onCheckedChange={(checked) =>
                          setAutoScaleSettings((prev) => ({ ...prev, enableAutoScale: checked }))
                        }
                      />
                    </div>

                    {autoScaleSettings.enableAutoScale && (
                      <div className="ml-6 space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Scaling type</p>
                            <p className="text-sm text-muted-foreground">
                              How runners should be scaled.
                            </p>
                          </div>
                          <Select
                            value={autoScaleSettings.scalingType}
                            onValueChange={(value) =>
                              setAutoScaleSettings((prev) => ({
                                ...prev,
                                scalingType: value as "dynamic" | "fixed",
                              }))
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dynamic">Dynamic</SelectItem>
                              <SelectItem value="fixed">Fixed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <Label>Minimum runners</Label>
                            <Input
                              type="number"
                              value={autoScaleSettings.minRunners}
                              onChange={(e) =>
                                setAutoScaleSettings((prev) => ({
                                  ...prev,
                                  minRunners: parseInt(e.target.value) || 1,
                                }))
                              }
                              className="mt-2"
                            />
                          </div>
                          <div className="p-4 border rounded-lg">
                            <Label>Maximum runners</Label>
                            <Input
                              type="number"
                              value={autoScaleSettings.maxRunners}
                              onChange={(e) =>
                                setAutoScaleSettings((prev) => ({
                                  ...prev,
                                  maxRunners: parseInt(e.target.value) || 5,
                                }))
                              }
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Runner settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure additional runner behavior.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Ephemeral runners</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically remove runners after each job execution.
                        </p>
                      </div>
                      <Switch
                        checked={runnerSettings.enableEphemeralRunners}
                        onCheckedChange={(checked) =>
                          setRunnerSettings((prev) => ({
                            ...prev,
                            enableEphemeralRunners: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Preserve Docker volumes</p>
                        <p className="text-sm text-muted-foreground">
                          Preserve Docker volumes after job completion.
                        </p>
                      </div>
                      <Switch
                        checked={runnerSettings.preserveDockerVolumes}
                        onCheckedChange={(checked) =>
                          setRunnerSettings((prev) => ({ ...prev, preserveDockerVolumes: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Token expiration (hours)</p>
                        <p className="text-sm text-muted-foreground">
                          Set the expiration time for runner registration tokens.
                        </p>
                      </div>
                      <Select
                        value={runnerSettings.tokenExpiration.toString()}
                        onValueChange={(value) =>
                          setRunnerSettings((prev) => ({
                            ...prev,
                            tokenExpiration: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="8">8 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About self-hosted runners</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about self-hosted runners and how to set them up.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Self-hosted runners give you more control over computing resources within
                          your own environment.
                        </p>
                        <p>
                          You can create custom images with specific tools, choose hardware specs,
                          and manage security policies.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.github.com/en/actions/hosting-your-own-runners"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about self-hosted runners
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit runner: {selectedRunner?.name}</DialogTitle>
            <DialogDescription>Configure runner settings and labels.</DialogDescription>
          </DialogHeader>
          {selectedRunner && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="runner-name">Runner name</Label>
                <Input
                  id="runner-name"
                  value={selectedRunner.name}
                  onChange={(e) =>
                    setSelectedRunner((prev) => (prev ? { ...prev, name: e.target.value } : null))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Labels</Label>
                <Input
                  placeholder="Comma-separated labels (e.g., ubuntu, self-hosted, large)"
                  value={selectedRunner.labels.join(", ")}
                  onChange={(e) =>
                    setSelectedRunner((prev) =>
                      prev
                        ? {
                            ...prev,
                            labels: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          }
                        : null
                    )
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Add labels to categorize your runner for specific workflows.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRunner}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
