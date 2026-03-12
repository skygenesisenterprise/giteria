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
  Server,
  Plus,
  Trash2,
  Edit,
  Play,
  Pause,
  Loader2,
  Info,
  ExternalLink,
  CheckCircle,
  Clock,
  Lock,
  Key,
  Rocket,
  GitBranch,
  Shield,
} from "lucide-react";

interface EnvironmentVariable {
  id: string;
  name: string;
  value: string;
  secret: boolean;
}

interface Environment {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  waitTimer: number;
  requiredReviewers: number;
  branchPolicy: string;
  deploymentFrequency: "manual" | "on_push" | "on_schedule";
  variables: EnvironmentVariable[];
  lastDeployment?: string;
}

interface SettingsEnvironmentsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsEnvironmentsPage({ params }: SettingsEnvironmentsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [environments, setEnvironments] = React.useState<Environment[]>([
    {
      id: "1",
      name: "Production",
      description: "Production environment for live deployments",
      status: "active",
      waitTimer: 30,
      requiredReviewers: 2,
      branchPolicy: "main",
      deploymentFrequency: "manual",
      variables: [
        { id: "v1", name: "DATABASE_URL", value: "***", secret: true },
        { id: "v2", name: "API_KEY", value: "***", secret: true },
        { id: "v3", name: "ENVIRONMENT", value: "production", secret: false },
      ],
      lastDeployment: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Staging",
      description: "Staging environment for pre-production testing",
      status: "active",
      waitTimer: 15,
      requiredReviewers: 1,
      branchPolicy: "develop",
      deploymentFrequency: "on_push",
      variables: [
        { id: "v4", name: "DATABASE_URL", value: "***", secret: true },
        { id: "v5", name: "ENVIRONMENT", value: "staging", secret: false },
      ],
      lastDeployment: "2024-01-15T09:00:00Z",
    },
    {
      id: "3",
      name: "Development",
      description: "Development environment for feature testing",
      status: "active",
      waitTimer: 0,
      requiredReviewers: 0,
      branchPolicy: "*",
      deploymentFrequency: "on_push",
      variables: [{ id: "v6", name: "DEBUG", value: "true", secret: false }],
      lastDeployment: "2024-01-14T16:45:00Z",
    },
  ]);

  const [selectedEnvironment, setSelectedEnvironment] = React.useState<Environment | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isVariableDialogOpen, setIsVariableDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const [newEnvironment, setNewEnvironment] = React.useState({
    name: "",
    description: "",
    branchPolicy: "*",
  });

  const [newVariable, setNewVariable] = React.useState({
    name: "",
    value: "",
    secret: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleAddEnvironment = () => {
    if (!newEnvironment.name.trim()) return;
    const env: Environment = {
      id: Date.now().toString(),
      name: newEnvironment.name,
      description: newEnvironment.description,
      status: "active",
      waitTimer: 0,
      requiredReviewers: 0,
      branchPolicy: newEnvironment.branchPolicy,
      deploymentFrequency: "manual",
      variables: [],
    };
    setEnvironments((prev) => [...prev, env]);
    setNewEnvironment({ name: "", description: "", branchPolicy: "*" });
    setIsAddDialogOpen(false);
  };

  const handleEditEnvironment = (env: Environment) => {
    setSelectedEnvironment({ ...env });
    setIsEditDialogOpen(true);
  };

  const handleUpdateEnvironment = () => {
    if (!selectedEnvironment) return;
    setEnvironments((prev) =>
      prev.map((e) => (e.id === selectedEnvironment.id ? selectedEnvironment : e))
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteEnvironment = (envId: string) => {
    setEnvironments((prev) => prev.filter((e) => e.id !== envId));
  };

  const handleToggleEnvironment = (envId: string) => {
    setEnvironments((prev) =>
      prev.map((e) =>
        e.id === envId ? { ...e, status: e.status === "active" ? "inactive" : "active" } : e
      )
    );
  };

  const handleAddVariable = () => {
    if (!newVariable.name.trim()) return;
    if (!selectedEnvironment) return;
    const variable: EnvironmentVariable = {
      id: Date.now().toString(),
      name: newVariable.name,
      value: newVariable.value,
      secret: newVariable.secret,
    };
    setEnvironments((prev) =>
      prev.map((e) =>
        e.id === selectedEnvironment.id ? { ...e, variables: [...e.variables, variable] } : e
      )
    );
    setNewVariable({ name: "", value: "", secret: false });
    setIsVariableDialogOpen(false);
  };

  const handleDeleteVariable = (envId: string, variableId: string) => {
    setEnvironments((prev) =>
      prev.map((e) =>
        e.id === envId ? { ...e, variables: e.variables.filter((v) => v.id !== variableId) } : e
      )
    );
  };

  const handleOpenVariables = (env: Environment) => {
    setSelectedEnvironment({ ...env });
    setIsVariableDialogOpen(true);
  };

  const getStatusBadge = (status: Environment["status"]) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    );
  };

  const getDeploymentFrequencyLabel = (freq: Environment["deploymentFrequency"]) => {
    switch (freq) {
      case "manual":
        return "Manual";
      case "on_push":
        return "On push";
      case "on_schedule":
        return "On schedule";
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

  const stats = {
    total: environments.length,
    active: environments.filter((e) => e.status === "active").length,
    totalDeployments: 156,
    lastDeployment:
      environments
        .filter((e) => e.lastDeployment)
        .sort(
          (a, b) =>
            new Date(b.lastDeployment || 0).getTime() - new Date(a.lastDeployment || 0).getTime()
        )[0]?.lastDeployment || "",
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
                <h1 className="text-2xl font-semibold">Environments</h1>
                <p className="text-muted-foreground mt-1">
                  Manage deployment environments for this repository
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Server className="w-4 h-4" />
                      Total environments
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.total}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-green-600">{stats.active}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Rocket className="w-4 h-4" />
                      Deployments
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.totalDeployments}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Last deployment
                    </div>
                    <p className="text-2xl font-semibold mt-1">
                      {formatDate(stats.lastDeployment)}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Environments</h2>
                      <p className="text-sm text-muted-foreground">
                        Manage your deployment environments.
                      </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          New environment
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>New environment</DialogTitle>
                          <DialogDescription>
                            Create a new deployment environment.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="env-name">Environment name</Label>
                            <Input
                              id="env-name"
                              placeholder="e.g., Production, Staging, Development"
                              value={newEnvironment.name}
                              onChange={(e) =>
                                setNewEnvironment((prev) => ({ ...prev, name: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="env-description">Description</Label>
                            <Input
                              id="env-description"
                              placeholder="Brief description of the environment"
                              value={newEnvironment.description}
                              onChange={(e) =>
                                setNewEnvironment((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="env-branch">Branch policy</Label>
                            <Input
                              id="env-branch"
                              placeholder="e.g., main, develop, release/*"
                              value={newEnvironment.branchPolicy}
                              onChange={(e) =>
                                setNewEnvironment((prev) => ({
                                  ...prev,
                                  branchPolicy: e.target.value,
                                }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Branch or pattern that can deploy to this environment.
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddEnvironment}
                            disabled={!newEnvironment.name.trim()}
                          >
                            Create environment
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-4">
                    {environments.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Server className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No environments configured</p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Create your first environment
                        </Button>
                      </div>
                    ) : (
                      environments.map((env) => (
                        <div key={env.id} className="border rounded-lg">
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                  <Server className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{env.name}</p>
                                    {getStatusBadge(env.status)}
                                  </div>
                                  <p className="text-sm text-muted-foreground">{env.description}</p>
                                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <GitBranch className="w-3 h-3" />
                                      {env.branchPolicy}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {env.waitTimer > 0 ? `${env.waitTimer}s wait` : "No wait"}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Shield className="w-3 h-3" />
                                      {env.requiredReviewers > 0
                                        ? `${env.requiredReviewers} reviewer(s)`
                                        : "No review required"}
                                    </span>
                                    <span>
                                      {getDeploymentFrequencyLabel(env.deploymentFrequency)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenVariables(env)}
                                >
                                  <Key className="w-4 h-4 mr-1" />
                                  Variables ({env.variables.length})
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditEnvironment(env)}
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleEnvironment(env.id)}
                                >
                                  {env.status === "active" ? (
                                    <Pause className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <Play className="w-4 h-4 text-green-600" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteEnvironment(env.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About environments</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about deployment environments.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Environments allow you to manage different deployment targets for your
                          repository, such as production, staging, and development.
                        </p>
                        <p>Each environment can have its own:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Protection rules (required reviewers, wait times)</li>
                          <li>Branch deployment policies</li>
                          <li>Environment-specific variables and secrets</li>
                          <li>Deployment frequency settings</li>
                        </ul>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/environments"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about environments
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
            <DialogTitle>Edit environment: {selectedEnvironment?.name}</DialogTitle>
            <DialogDescription>Configure environment settings.</DialogDescription>
          </DialogHeader>
          {selectedEnvironment && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={selectedEnvironment.description}
                  onChange={(e) =>
                    setSelectedEnvironment((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-branch">Branch policy</Label>
                <Input
                  id="edit-branch"
                  value={selectedEnvironment.branchPolicy}
                  onChange={(e) =>
                    setSelectedEnvironment((prev) =>
                      prev ? { ...prev, branchPolicy: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Wait timer (seconds)</Label>
                <Select
                  value={selectedEnvironment.waitTimer.toString()}
                  onValueChange={(value) =>
                    setSelectedEnvironment((prev) =>
                      prev ? { ...prev, waitTimer: parseInt(value) } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No wait</SelectItem>
                    <SelectItem value="10">10 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Required reviewers</Label>
                <Select
                  value={selectedEnvironment.requiredReviewers.toString()}
                  onValueChange={(value) =>
                    setSelectedEnvironment((prev) =>
                      prev ? { ...prev, requiredReviewers: parseInt(value) } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No review required</SelectItem>
                    <SelectItem value="1">1 reviewer</SelectItem>
                    <SelectItem value="2">2 reviewers</SelectItem>
                    <SelectItem value="3">3 reviewers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Deployment frequency</Label>
                <Select
                  value={selectedEnvironment.deploymentFrequency}
                  onValueChange={(value) =>
                    setSelectedEnvironment((prev) =>
                      prev
                        ? {
                            ...prev,
                            deploymentFrequency: value as Environment["deploymentFrequency"],
                          }
                        : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="on_push">On push</SelectItem>
                    <SelectItem value="on_schedule">On schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEnvironment}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isVariableDialogOpen} onOpenChange={setIsVariableDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Environment variables: {selectedEnvironment?.name}</DialogTitle>
            <DialogDescription>
              Manage environment variables and secrets for this environment.
            </DialogDescription>
          </DialogHeader>
          {selectedEnvironment && (
            <div className="space-y-4 py-4">
              <div className="space-y-4">
                {selectedEnvironment.variables.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No variables configured
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedEnvironment.variables.map((variable) => (
                      <div
                        key={variable.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          {variable.secret ? (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Key className="w-4 h-4 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{variable.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {variable.secret ? "***" : variable.value}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteVariable(selectedEnvironment.id, variable.id)}
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Separator />
              <div className="space-y-3">
                <p className="font-medium text-sm">Add new variable</p>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Variable name"
                    value={newVariable.name}
                    onChange={(e) => setNewVariable((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Value"
                    type={newVariable.secret ? "password" : "text"}
                    value={newVariable.value}
                    onChange={(e) => setNewVariable((prev) => ({ ...prev, value: e.target.value }))}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={newVariable.secret}
                    onCheckedChange={(checked) =>
                      setNewVariable((prev) => ({ ...prev, secret: checked }))
                    }
                  />
                  <Label>Secret variable</Label>
                </div>
                <Button onClick={handleAddVariable} disabled={!newVariable.name.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add variable
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVariableDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
