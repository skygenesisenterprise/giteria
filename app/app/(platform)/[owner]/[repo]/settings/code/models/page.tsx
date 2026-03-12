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
  Database,
  Plus,
  Trash2,
  Edit,
  Play,
  Pause,
  Loader2,
  Info,
  ExternalLink,
  Settings,
  Cpu,
  Brain,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Code,
  Eye,
} from "lucide-react";

interface Model {
  id: string;
  name: string;
  provider: string;
  status: "active" | "inactive" | "beta";
  type: "chat" | "embedding" | "code" | "vision";
  contextWindow: number;
  description: string;
}

interface ModelUsage {
  modelId: string;
  requests: number;
  tokens: number;
  errors: number;
  avgLatency: number;
}

interface SettingsModelsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsModelsPage({ params }: SettingsModelsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [models, setModels] = React.useState<Model[]>([
    {
      id: "1",
      name: "GPT-4",
      provider: "OpenAI",
      status: "active",
      type: "chat",
      contextWindow: 128000,
      description: "Most capable GPT model for complex reasoning tasks",
    },
    {
      id: "2",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      status: "active",
      type: "chat",
      contextWindow: 200000,
      description: "Anthropic's most capable model for advanced reasoning",
    },
    {
      id: "3",
      name: "CodeLlama",
      provider: "Meta",
      status: "beta",
      type: "code",
      contextWindow: 16384,
      description: "Open source model specialized for code generation",
    },
    {
      id: "4",
      name: "text-embedding-3-large",
      provider: "OpenAI",
      status: "active",
      type: "embedding",
      contextWindow: 8192,
      description: "High-quality embeddings for semantic search",
    },
  ]);

  const [modelUsage, setModelUsage] = React.useState<ModelUsage[]>([
    { modelId: "1", requests: 1250, tokens: 450000, errors: 12, avgLatency: 2500 },
    { modelId: "2", requests: 890, tokens: 320000, errors: 8, avgLatency: 1800 },
    { modelId: "3", requests: 450, tokens: 89000, errors: 5, avgLatency: 1200 },
    { modelId: "4", requests: 2100, tokens: 1200000, errors: 3, avgLatency: 400 },
  ]);

  const [defaultModel, setDefaultModel] = React.useState("1");

  const [modelSettings, setModelSettings] = React.useState({
    enableModels: true,
    allowCustomModels: false,
    requireApproval: true,
    maxTokensPerRequest: 100000,
    defaultTemperature: 0.7,
    enableStreaming: true,
  });

  const [selectedModel, setSelectedModel] = React.useState<Model | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleEditModel = (model: Model) => {
    setSelectedModel({ ...model });
    setIsEditDialogOpen(true);
  };

  const handleUpdateModel = () => {
    if (!selectedModel) return;
    setModels((prev) => prev.map((m) => (m.id === selectedModel.id ? selectedModel : m)));
    setIsEditDialogOpen(false);
  };

  const handleDeleteModel = (modelId: string) => {
    setModels((prev) => prev.filter((m) => m.id !== modelId));
  };

  const handleToggleModelStatus = (modelId: string) => {
    setModels((prev) =>
      prev.map((m) =>
        m.id === modelId ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m
      )
    );
  };

  const getStatusBadge = (status: Model["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "beta":
        return <Badge className="bg-blue-100 text-blue-800">Beta</Badge>;
    }
  };

  const getTypeBadge = (type: Model["type"]) => {
    const icons = {
      chat: <Brain className="w-3 h-3 mr-1" />,
      embedding: <Database className="w-3 h-3 mr-1" />,
      code: <Code className="w-3 h-3 mr-1" />,
      vision: <Eye className="w-3 h-3 mr-1" />,
    };
    const labels = {
      chat: "Chat",
      embedding: "Embedding",
      code: "Code",
      vision: "Vision",
    };
    return (
      <Badge variant="outline" className="flex items-center">
        {icons[type]}
        {labels[type]}
      </Badge>
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const stats = React.useMemo(() => {
    return {
      totalModels: models.length,
      activeModels: models.filter((m) => m.status === "active").length,
      totalRequests: modelUsage.reduce((acc, u) => acc + u.requests, 0),
      totalTokens: modelUsage.reduce((acc, u) => acc + u.tokens, 0),
    };
  }, [models, modelUsage]);

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
                <h1 className="text-2xl font-semibold">Models</h1>
                <p className="text-muted-foreground mt-1">
                  Configure AI models for your repository
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Bot className="w-4 h-4" />
                      Total models
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.totalModels}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-green-600">
                      {stats.activeModels}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4" />
                      Total requests
                    </div>
                    <p className="text-2xl font-semibold mt-1">
                      {formatNumber(stats.totalRequests)}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Cpu className="w-4 h-4" />
                      Total tokens
                    </div>
                    <p className="text-2xl font-semibold mt-1">{formatNumber(stats.totalTokens)}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Default model</h2>
                    <p className="text-sm text-muted-foreground">
                      Select the default model used for AI-powered features.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Default model for repository</Label>
                        <p className="text-sm text-muted-foreground">
                          This model will be used for features like code review, agents, and more.
                        </p>
                      </div>
                      <Select value={defaultModel} onValueChange={setDefaultModel}>
                        <SelectTrigger className="w-64">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {models
                            .filter((m) => m.status === "active")
                            .map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                {model.name} ({model.provider})
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Available models</h2>
                      <p className="text-sm text-muted-foreground">
                        Manage AI models available for this repository.
                      </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add model
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add new model</DialogTitle>
                          <DialogDescription>
                            Configure a new AI model for your repository.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Model name</Label>
                            <Input placeholder="e.g., GPT-4" />
                          </div>
                          <div className="space-y-2">
                            <Label>Provider</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select provider" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="openai">OpenAI</SelectItem>
                                <SelectItem value="anthropic">Anthropic</SelectItem>
                                <SelectItem value="meta">Meta</SelectItem>
                                <SelectItem value="google">Google</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Model type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="chat">Chat</SelectItem>
                                <SelectItem value="code">Code</SelectItem>
                                <SelectItem value="embedding">Embedding</SelectItem>
                                <SelectItem value="vision">Vision</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsAddDialogOpen(false)}>Add model</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="border rounded-lg">
                    {models.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Bot className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No models configured</p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Add your first model
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {models.map((model) => (
                          <div key={model.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <Bot className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{model.name}</p>
                                  {getStatusBadge(model.status)}
                                  {getTypeBadge(model.type)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {model.provider} • Context: {formatNumber(model.contextWindow)}{" "}
                                  tokens
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {model.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {modelSettings.enableModels && model.status === "active" && (
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">Usage</p>
                                  <p className="text-sm font-medium">
                                    {formatNumber(
                                      modelUsage.find((u) => u.modelId === model.id)?.requests || 0
                                    )}{" "}
                                    requests
                                  </p>
                                </div>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleToggleModelStatus(model.id)}
                              >
                                {model.status === "active" ? (
                                  <Pause className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <Play className="w-4 h-4 text-green-600" />
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditModel(model)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteModel(model.id)}
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
                    <h2 className="text-xl font-semibold">Model settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure default settings for AI model interactions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable AI models</p>
                        <p className="text-sm text-muted-foreground">
                          Allow AI models to be used in this repository.
                        </p>
                      </div>
                      <Switch
                        checked={modelSettings.enableModels}
                        onCheckedChange={(checked) =>
                          setModelSettings((prev) => ({ ...prev, enableModels: checked }))
                        }
                      />
                    </div>

                    {modelSettings.enableModels && (
                      <>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Allow custom models</p>
                            <p className="text-sm text-muted-foreground">
                              Allow users to add custom model configurations.
                            </p>
                          </div>
                          <Switch
                            checked={modelSettings.allowCustomModels}
                            onCheckedChange={(checked) =>
                              setModelSettings((prev) => ({ ...prev, allowCustomModels: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Require approval for new models</p>
                            <p className="text-sm text-muted-foreground">
                              Require admin approval before new models can be used.
                            </p>
                          </div>
                          <Switch
                            checked={modelSettings.requireApproval}
                            onCheckedChange={(checked) =>
                              setModelSettings((prev) => ({ ...prev, requireApproval: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Enable streaming</p>
                            <p className="text-sm text-muted-foreground">
                              Allow streaming responses from AI models.
                            </p>
                          </div>
                          <Switch
                            checked={modelSettings.enableStreaming}
                            onCheckedChange={(checked) =>
                              setModelSettings((prev) => ({ ...prev, enableStreaming: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Default temperature</p>
                            <p className="text-sm text-muted-foreground">
                              Default creativity level for model responses (0-1).
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              max="2"
                              value={modelSettings.defaultTemperature}
                              onChange={(e) =>
                                setModelSettings((prev) => ({
                                  ...prev,
                                  defaultTemperature: parseFloat(e.target.value) || 0.7,
                                }))
                              }
                              className="w-20"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Max tokens per request</p>
                            <p className="text-sm text-muted-foreground">
                              Maximum number of tokens allowed per request.
                            </p>
                          </div>
                          <Select
                            value={modelSettings.maxTokensPerRequest.toString()}
                            onValueChange={(value) =>
                              setModelSettings((prev) => ({
                                ...prev,
                                maxTokensPerRequest: parseInt(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="4000">4K</SelectItem>
                              <SelectItem value="16000">16K</SelectItem>
                              <SelectItem value="32000">32K</SelectItem>
                              <SelectItem value="64000">64K</SelectItem>
                              <SelectItem value="100000">100K</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About AI models</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about configuring AI models for your repository.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          AI models can be used for various features including code review, agents,
                          code completion, and more.
                        </p>
                        <p>
                          Different models have different capabilities, pricing, and context
                          windows. Choose the best model for your use case.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/models"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about models
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
            <DialogTitle>Edit model: {selectedModel?.name}</DialogTitle>
            <DialogDescription>Configure model settings.</DialogDescription>
          </DialogHeader>
          {selectedModel && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Model name</Label>
                <Input
                  value={selectedModel.name}
                  onChange={(e) =>
                    setSelectedModel((prev) => (prev ? { ...prev, name: e.target.value } : null))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={selectedModel.description}
                  onChange={(e) =>
                    setSelectedModel((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Context window (tokens)</Label>
                <Input
                  type="number"
                  value={selectedModel.contextWindow}
                  onChange={(e) =>
                    setSelectedModel((prev) =>
                      prev ? { ...prev, contextWindow: parseInt(e.target.value) || 0 } : null
                    )
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateModel}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
