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
  Bot,
  Sparkles,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Info,
  ExternalLink,
  Brain,
  Code,
  FileCode,
  MessageSquare,
  GitPullRequest,
  Clock,
  Play,
  Pause,
  Trash2,
  Edit,
  Plus,
  Cpu,
  Workflow,
  Terminal,
} from "lucide-react";

interface AgentCapability {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  capabilities: AgentCapability[];
  model: string;
  lastRun?: string;
}

interface CodingAgentSettings {
  enableAgents: boolean;
  allowCustomAgents: boolean;
  maxConcurrentAgents: number;
  defaultModel: string;
  timeout: number;
  autoApprove: boolean;
  requireReview: boolean;
}

interface SettingsCopilotCodingAgentPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsCopilotCodingAgentPage({
  params,
}: SettingsCopilotCodingAgentPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [settings, setSettings] = React.useState<CodingAgentSettings>({
    enableAgents: true,
    allowCustomAgents: false,
    maxConcurrentAgents: 3,
    defaultModel: "gpt-4",
    timeout: 30,
    autoApprove: false,
    requireReview: true,
  });

  const [agents, setAgents] = React.useState<Agent[]>([
    {
      id: "1",
      name: "Code Review Agent",
      description: "Automatically reviews pull requests and provides feedback",
      status: "active",
      capabilities: [
        {
          id: "c1",
          name: "Security scan",
          description: "Scan for security vulnerabilities",
          enabled: true,
        },
        {
          id: "c2",
          name: "Code quality",
          description: "Check code quality and style",
          enabled: true,
        },
        { id: "c3", name: "Test coverage", description: "Verify test coverage", enabled: false },
      ],
      model: "gpt-4",
      lastRun: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Fix Agent",
      description: "Automatically fixes common issues and appliessuggestions",
      status: "active",
      capabilities: [
        {
          id: "c4",
          name: "Auto-fix lint",
          description: "Fix linting errors automatically",
          enabled: true,
        },
        { id: "c5", name: "Format code", description: "Apply code formatting", enabled: true },
        {
          id: "c6",
          name: "Dependency update",
          description: "Update outdated dependencies",
          enabled: false,
        },
      ],
      model: "gpt-4",
      lastRun: "2024-01-15T09:15:00Z",
    },
    {
      id: "3",
      name: "Documentation Agent",
      description: "Generates and updates documentation automatically",
      status: "inactive",
      capabilities: [
        { id: "c7", name: "README update", description: "Keep README up to date", enabled: true },
        { id: "c8", name: "API docs", description: "Generate API documentation", enabled: true },
      ],
      model: "gpt-3.5-turbo",
    },
  ]);

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleToggleAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId ? { ...a, status: a.status === "active" ? "inactive" : "active" } : a
      )
    );
  };

  const handleToggleCapability = (agentId: string, capabilityId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? {
              ...a,
              capabilities: a.capabilities.map((c) =>
                c.id === capabilityId ? { ...c, enabled: !c.enabled } : c
              ),
            }
          : a
      )
    );
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== agentId));
  };

  const getStatusBadge = (status: Agent["status"]) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter((a) => a.status === "active").length,
    totalRuns: 234,
    issuesFixed: 89,
  };

  const availableModels = [
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
  ];

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
                <h1 className="text-2xl font-semibold">Coding agents</h1>
                <p className="text-muted-foreground mt-1">
                  Configure AI coding agents for your repository
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Bot className="w-4 h-4" />
                      Total agents
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.totalAgents}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-green-600">
                      {stats.activeAgents}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4" />
                      Total runs
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.totalRuns}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4" />
                      Issues fixed
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-green-600">
                      {stats.issuesFixed}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Enable coding agents</h2>
                    <p className="text-sm text-muted-foreground">
                      Allow AI coding agents to automate tasks in this repository.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable coding agents</p>
                        <p className="text-sm text-muted-foreground">
                          Allow AI agents to run and perform tasks in this repository.
                        </p>
                      </div>
                      <Switch
                        checked={settings.enableAgents}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, enableAgents: checked }))
                        }
                      />
                    </div>

                    {settings.enableAgents && (
                      <>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Allow custom agents</p>
                            <p className="text-sm text-muted-foreground">
                              Allow users to create and add custom agents.
                            </p>
                          </div>
                          <Switch
                            checked={settings.allowCustomAgents}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, allowCustomAgents: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Max concurrent agents</p>
                            <p className="text-sm text-muted-foreground">
                              Maximum number of agents that can run simultaneously.
                            </p>
                          </div>
                          <Select
                            value={settings.maxConcurrentAgents.toString()}
                            onValueChange={(value) =>
                              setSettings((prev) => ({
                                ...prev,
                                maxConcurrentAgents: parseInt(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="10">10</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Default model</p>
                            <p className="text-sm text-muted-foreground">
                              Model used by default for all agents.
                            </p>
                          </div>
                          <Select
                            value={settings.defaultModel}
                            onValueChange={(value) =>
                              setSettings((prev) => ({ ...prev, defaultModel: value }))
                            }
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {availableModels.map((model) => (
                                <SelectItem key={model.value} value={model.value}>
                                  {model.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Agent timeout (minutes)</p>
                            <p className="text-sm text-muted-foreground">
                              Maximum time an agent can run before being cancelled.
                            </p>
                          </div>
                          <Select
                            value={settings.timeout.toString()}
                            onValueChange={(value) =>
                              setSettings((prev) => ({
                                ...prev,
                                timeout: parseInt(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 min</SelectItem>
                              <SelectItem value="15">15 min</SelectItem>
                              <SelectItem value="30">30 min</SelectItem>
                              <SelectItem value="60">60 min</SelectItem>
                              <SelectItem value="120">120 min</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Auto-approve agent changes</p>
                            <p className="text-sm text-muted-foreground">
                              Automatically approve changes made by agents.
                            </p>
                          </div>
                          <Switch
                            checked={settings.autoApprove}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, autoApprove: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Require review for agent changes</p>
                            <p className="text-sm text-muted-foreground">
                              Require human review before merging agent changes.
                            </p>
                          </div>
                          <Switch
                            checked={settings.requireReview}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, requireReview: checked }))
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {settings.enableAgents && (
                  <>
                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-xl font-semibold">Agents</h2>
                          <p className="text-sm text-muted-foreground">
                            Manage AI coding agents for this repository.
                          </p>
                        </div>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add agent
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {agents.map((agent) => (
                          <div key={agent.id} className="border rounded-lg">
                            <div className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{agent.name}</p>
                                      {getStatusBadge(agent.status)}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {agent.description}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Model: {agent.model} • Last run: {formatDate(agent.lastRun)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleToggleAgent(agent.id)}
                                  >
                                    {agent.status === "active" ? (
                                      <>
                                        <Pause className="w-4 h-4 mr-1" />
                                        Disable
                                      </>
                                    ) : (
                                      <>
                                        <Play className="w-4 h-4 mr-1" />
                                        Enable
                                      </>
                                    )}
                                  </Button>
                                  <Button variant="outline" size="sm" disabled>
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteAgent(agent.id)}
                                  >
                                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            {agent.status === "active" && (
                              <div className="border-t p-4 bg-muted/30">
                                <p className="text-sm font-medium mb-3">Capabilities</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {agent.capabilities.map((capability) => (
                                    <div
                                      key={capability.id}
                                      className="flex items-center justify-between p-2 border rounded-lg"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Switch
                                          checked={capability.enabled}
                                          onCheckedChange={() =>
                                            handleToggleCapability(agent.id, capability.id)
                                          }
                                        />
                                        <div>
                                          <p className="text-sm font-medium">{capability.name}</p>
                                          <p className="text-xs text-muted-foreground">
                                            {capability.description}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About coding agents</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about AI coding agents.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          AI coding agents are autonomous AI assistants that can perform coding
                          tasks on your behalf.
                        </p>
                        <p>
                          They can review code, fix issues, generate documentation, and more - all
                          while you maintain full control with review requirements and approval
                          workflows.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/copilot/coding-agents"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about coding agents
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
