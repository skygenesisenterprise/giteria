"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  MoreHorizontal,
  Play,
  Pause,
  Square,
  Trash2,
  Search,
  Bot,
  Settings,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  GitPullRequest,
  Ticket,
  Shield,
  BookOpen,
  Package,
  Calendar,
  Variable,
  Terminal,
  BarChart3,
  History,
  RefreshCw,
  ExternalLink,
  Copy,
} from "lucide-react";
import { db, STORES } from "@/lib/db";

type AgentType =
  | "code_review"
  | "issue_triage"
  | "security_scan"
  | "documentation"
  | "release_manager"
  | "custom";
type AgentStatus = "active" | "paused" | "disabled";
type AgentTrigger = "push" | "pull_request" | "issue_created" | "schedule" | "manual";

interface AgentActivity {
  id: string;
  agentId: string;
  type: "run" | "success" | "failure" | "warning";
  message: string;
  timestamp: number;
  duration?: number;
}

interface RepoAgent {
  id: string;
  repoFullName: string;
  name: string;
  type: AgentType;
  description: string;
  status: AgentStatus;
  trigger: AgentTrigger;
  config: Record<string, string>;
  instructions: string;
  lastActivity?: string;
  runCount: number;
  successRate: number;
  avgDuration: number;
  createdAt: number;
  updatedAt: number;
}

const AGENT_TYPE_INFO: Record<
  AgentType,
  { label: string; icon: React.ElementType; color: string; description: string }
> = {
  code_review: {
    label: "Code Review",
    icon: GitPullRequest,
    color: "text-blue-500",
    description: "Analyzes code changes and provides feedback",
  },
  issue_triage: {
    label: "Issue Triage",
    icon: Ticket,
    color: "text-purple-500",
    description: "Categorizes and labels issues automatically",
  },
  security_scan: {
    label: "Security Scan",
    icon: Shield,
    color: "text-red-500",
    description: "Scans for security vulnerabilities",
  },
  documentation: {
    label: "Documentation",
    icon: BookOpen,
    color: "text-green-500",
    description: "Maintains and updates documentation",
  },
  release_manager: {
    label: "Release Manager",
    icon: Package,
    color: "text-orange-500",
    description: "Manages release workflows",
  },
  custom: {
    label: "Custom Agent",
    icon: Bot,
    color: "text-gray-500",
    description: "Build your own agent",
  },
};

const TRIGGER_LABELS: Record<AgentTrigger, string> = {
  push: "On Push",
  pull_request: "On Pull Request",
  issue_created: "On Issue Created",
  schedule: "Scheduled",
  manual: "Manual Only",
};

const STATUS_CONFIG: Record<
  AgentStatus,
  { label: string; color: string; icon: React.ElementType }
> = {
  active: {
    label: "Active",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: Play,
  },
  paused: {
    label: "Paused",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: Pause,
  },
  disabled: {
    label: "Disabled",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    icon: Square,
  },
};

function formatTimeAgo(dateString?: string): string {
  if (!dateString) return "Never";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function AgentCard({
  agent,
  onSelect,
  onStatusChange,
  onDelete,
}: {
  agent: RepoAgent;
  onSelect: (agent: RepoAgent) => void;
  onStatusChange: (agent: RepoAgent, status: AgentStatus) => void;
  onDelete: (agent: RepoAgent) => void;
}) {
  const typeInfo = AGENT_TYPE_INFO[agent.type];
  const StatusIcon = STATUS_CONFIG[agent.status].icon;

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(agent)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-muted ${typeInfo.color}`}>
              <typeInfo.icon className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base">{agent.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{typeInfo.label}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {agent.status === "active" && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(agent, "paused");
                  }}
                >
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </DropdownMenuItem>
              )}
              {agent.status === "paused" && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(agent, "active");
                  }}
                >
                  <Play className="mr-2 h-4 w-4" /> Activate
                </DropdownMenuItem>
              )}
              {agent.status !== "disabled" && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(agent, "disabled");
                  }}
                >
                  <Square className="mr-2 h-4 w-4" /> Disable
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(agent);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{agent.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span className="bg-muted px-2 py-1 rounded flex items-center gap-1">
            {agent.trigger === "pull_request" && <GitPullRequest className="w-3 h-3" />}
            {agent.trigger === "issue_created" && <Ticket className="w-3 h-3" />}
            {agent.trigger === "push" && <Zap className="w-3 h-3" />}
            {agent.trigger === "schedule" && <Calendar className="w-3 h-3" />}
            {agent.trigger === "manual" && <Terminal className="w-3 h-3" />}
            {TRIGGER_LABELS[agent.trigger]}
          </span>
          <Badge variant="secondary" className={STATUS_CONFIG[agent.status].color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {STATUS_CONFIG[agent.status].label}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {agent.runCount} runs
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {agent.successRate}%
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(agent.avgDuration)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AgentDetail({
  agent,
  onClose,
  onStatusChange,
  onRun,
}: {
  agent: RepoAgent;
  onClose: () => void;
  onStatusChange: (agent: RepoAgent, status: AgentStatus) => void;
  onRun: (agent: RepoAgent) => void;
}) {
  const typeInfo = AGENT_TYPE_INFO[agent.type];
  const StatusIcon = STATUS_CONFIG[agent.status].icon;

  const mockActivities: AgentActivity[] = [
    {
      id: "1",
      agentId: agent.id,
      type: "success",
      message: "Analyzed pull request #42",
      timestamp: Date.now() - 3600000,
      duration: 45000,
    },
    {
      id: "2",
      agentId: agent.id,
      type: "success",
      message: "Reviewed 5 files",
      timestamp: Date.now() - 7200000,
      duration: 32000,
    },
    {
      id: "3",
      agentId: agent.id,
      type: "warning",
      message: "Large PR detected - limited analysis",
      timestamp: Date.now() - 14400000,
      duration: 12000,
    },
    {
      id: "4",
      agentId: agent.id,
      type: "failure",
      message: "API rate limit exceeded",
      timestamp: Date.now() - 86400000,
      duration: 5000,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg bg-muted ${typeInfo.color}`}>
            <typeInfo.icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{agent.name}</h2>
            <p className="text-sm text-muted-foreground">{typeInfo.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {agent.status === "active" && (
            <Button onClick={() => onRun(agent)}>
              <Play className="w-4 h-4 mr-2" />
              Run Now
            </Button>
          )}
          <Badge variant="secondary" className={STATUS_CONFIG[agent.status].color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {STATUS_CONFIG[agent.status].label}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Total Runs</span>
            </div>
            <p className="text-2xl font-semibold">{agent.runCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Success Rate</span>
            </div>
            <p className="text-2xl font-semibold">{agent.successRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Avg Duration</span>
            </div>
            <p className="text-2xl font-semibold">{formatDuration(agent.avgDuration)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <History className="w-4 h-4" />
              <span className="text-sm">Last Run</span>
            </div>
            <p className="text-2xl font-semibold">{formatTimeAgo(agent.lastActivity)}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {mockActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50"
                    >
                      {activity.type === "success" && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      )}
                      {activity.type === "failure" && (
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      )}
                      {activity.type === "warning" && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(new Date(activity.timestamp).toISOString())}
                          {activity.duration && ` · ${formatDuration(activity.duration)}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Agent Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={agent.instructions}
                readOnly
                rows={6}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Variable className="w-4 h-4" />
                Environment Variables
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(agent.config).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(agent.config).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-2 bg-muted rounded"
                    >
                      <code className="text-sm">{key}</code>
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-muted-foreground">••••••••</code>
                        <Button variant="ghost" size="icon-sm" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No environment variables configured</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  const templates = [
    {
      type: "code_review" as AgentType,
      name: "Code Review Agent",
      description: "Automated code review for PRs",
    },
    {
      type: "issue_triage" as AgentType,
      name: "Issue Triage",
      description: "Auto-categorize issues",
    },
    {
      type: "security_scan" as AgentType,
      name: "Security Scanner",
      description: "Find vulnerabilities",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Bot className="w-16 h-16 text-muted-foreground mb-6" />
      <h2 className="text-xl font-semibold mb-2">No agents configured</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Create an agent to automate tasks and enhance your repository workflow.
      </p>
      <Button onClick={onCreate} size="lg">
        <Plus className="w-4 h-4 mr-2" />
        Create your first agent
      </Button>

      <div className="mt-12 w-full max-w-2xl">
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Quick start templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => {
            const typeInfo = AGENT_TYPE_INFO[template.type];
            return (
              <Card
                key={template.type}
                className="hover:border-primary cursor-pointer transition-colors"
                onClick={onCreate}
              >
                <CardContent className="pt-6">
                  <div className={`p-2 rounded-lg bg-muted w-fit mb-3 ${typeInfo.color}`}>
                    <typeInfo.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium mb-1">{template.name}</h4>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const params = useParams();
  const owner = params.owner as string;
  const repo = params.repo as string;
  const repoFullName = `${owner}/${repo}`;

  const [agents, setAgents] = useState<RepoAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<RepoAgent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AgentStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<AgentType | "all">("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    type: "" as AgentType | "",
    description: "",
    trigger: "" as AgentTrigger | "",
    instructions: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadAgents();
  }, [repoFullName]);

  async function loadAgents() {
    setIsLoading(true);
    try {
      const allAgents = await db.getAllByIndex<RepoAgent>(
        STORES.AGENTS,
        "repoFullName",
        repoFullName
      );
      setAgents(allAgents);
    } catch (error) {
      console.error("Failed to load agents:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateAgent() {
    if (!newAgent.name.trim() || !newAgent.type || !newAgent.trigger) return;
    setIsCreating(true);
    try {
      const agent: RepoAgent = {
        id: `${repoFullName}-${Date.now()}`,
        repoFullName,
        name: newAgent.name,
        type: newAgent.type as AgentType,
        description: newAgent.description,
        status: "active",
        trigger: newAgent.trigger as AgentTrigger,
        config: {},
        instructions: newAgent.instructions,
        runCount: 0,
        successRate: 0,
        avgDuration: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await db.add(STORES.AGENTS, agent);
      setNewAgent({ name: "", type: "", description: "", trigger: "", instructions: "" });
      setIsCreateDialogOpen(false);
      loadAgents();
    } catch (error) {
      console.error("Failed to create agent:", error);
    } finally {
      setIsCreating(false);
    }
  }

  async function handleStatusChange(agent: RepoAgent, newStatus: AgentStatus) {
    await db.put(STORES.AGENTS, { ...agent, status: newStatus, updatedAt: Date.now() });
    if (selectedAgent?.id === agent.id) {
      setSelectedAgent({ ...agent, status: newStatus });
    }
    loadAgents();
  }

  async function handleDeleteAgent(agent: RepoAgent) {
    await db.delete(STORES.AGENTS, agent.id);
    if (selectedAgent?.id === agent.id) {
      setSelectedAgent(null);
    }
    loadAgents();
  }

  async function handleRunAgent(agent: RepoAgent) {
    const updatedAgent = {
      ...agent,
      lastActivity: new Date().toISOString(),
      runCount: agent.runCount + 1,
      updatedAt: Date.now(),
    };
    await db.put(STORES.AGENTS, updatedAgent);
    if (selectedAgent?.id === agent.id) {
      setSelectedAgent(updatedAgent);
    }
    loadAgents();
  }

  const filteredAgents = React.useMemo(() => {
    let result = [...agents];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (a) => a.name.toLowerCase().includes(query) || a.description.toLowerCase().includes(query)
      );
    }
    if (statusFilter !== "all") result = result.filter((a) => a.status === statusFilter);
    if (typeFilter !== "all") result = result.filter((a) => a.type === typeFilter);
    return result;
  }, [agents, searchQuery, statusFilter, typeFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {selectedAgent ? (
          <div>
            <Button variant="ghost" onClick={() => setSelectedAgent(null)} className="mb-4">
              ← Back to agents
            </Button>
            <AgentDetail
              agent={selectedAgent}
              onClose={() => setSelectedAgent(null)}
              onStatusChange={handleStatusChange}
              onRun={handleRunAgent}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Agents</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {agents.length} agent{agents.length !== 1 ? "s" : ""} ·{" "}
                  {agents.filter((a) => a.status === "active").length} active
                </p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Agent
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create new agent</DialogTitle>
                    <DialogDescription>Configure a new agent for {repoFullName}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          placeholder="My Agent"
                          value={newAgent.name}
                          onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Type</label>
                        <Select
                          value={newAgent.type}
                          onValueChange={(v) => setNewAgent({ ...newAgent, type: v as AgentType })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(AGENT_TYPE_INFO).map(([value, info]) => (
                              <SelectItem key={value} value={value}>
                                <div className="flex items-center gap-2">
                                  <info.icon className={`w-4 h-4 ${info.color}`} />
                                  {info.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Trigger</label>
                        <Select
                          value={newAgent.trigger}
                          onValueChange={(v) =>
                            setNewAgent({ ...newAgent, trigger: v as AgentTrigger })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select trigger" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(TRIGGER_LABELS).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        placeholder="Brief description of what this agent does"
                        value={newAgent.description}
                        onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Instructions</label>
                      <Textarea
                        placeholder="Instructions for the agent (e.g., 'Review code for best practices, check for security issues...')"
                        value={newAgent.instructions}
                        onChange={(e) => setNewAgent({ ...newAgent, instructions: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateAgent}
                      disabled={
                        isCreating || !newAgent.name.trim() || !newAgent.type || !newAgent.trigger
                      }
                    >
                      {isCreating ? "Creating..." : "Create agent"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {agents.length === 0 ? (
              <EmptyState onCreate={() => setIsCreateDialogOpen(true)} />
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search agents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={statusFilter}
                      onValueChange={(v) => setStatusFilter(v as AgentStatus | "all")}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={typeFilter}
                      onValueChange={(v) => setTypeFilter(v as AgentType | "all")}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {Object.entries(AGENT_TYPE_INFO).map(([value, info]) => (
                          <SelectItem key={value} value={value}>
                            {info.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAgents.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      onSelect={setSelectedAgent}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteAgent}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
