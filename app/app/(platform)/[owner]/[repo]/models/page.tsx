"use client";

import * as React from "react";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Database,
  Plus,
  Trash2,
  Edit,
  Play,
  Pause,
  Brain,
  Cpu,
  Code,
  Eye,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Settings,
  Loader2,
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

interface ModelsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function ModelsPage({ params }: ModelsPageProps) {
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
      description: "Most capable model for complex reasoning and generation",
    },
    {
      id: "2",
      name: "GPT-4o",
      provider: "OpenAI",
      status: "active",
      type: "chat",
      contextWindow: 128000,
      description: "Multimodal model with enhanced speed and capabilities",
    },
    {
      id: "3",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      status: "beta",
      type: "chat",
      contextWindow: 200000,
      description: "Advanced model with excellent reasoning capabilities",
    },
    {
      id: "4",
      name: "text-embedding-3-small",
      provider: "OpenAI",
      status: "active",
      type: "embedding",
      contextWindow: 8192,
      description: "Efficient embedding model for text similarity",
    },
    {
      id: "5",
      name: "CodeLlama-34b",
      provider: "Meta",
      status: "inactive",
      type: "code",
      contextWindow: 16384,
      description: "Open source code generation model",
    },
  ]);

  const [usage] = React.useState<ModelUsage[]>([
    { modelId: "1", requests: 1250, tokens: 450000, errors: 12, avgLatency: 2.3 },
    { modelId: "2", requests: 890, tokens: 320000, errors: 5, avgLatency: 1.8 },
    { modelId: "3", requests: 456, tokens: 180000, errors: 3, avgLatency: 2.1 },
    { modelId: "4", requests: 2100, tokens: 850000, errors: 0, avgLatency: 0.5 },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "beta":
        return <Badge className="bg-blue-100 text-blue-800">Beta</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <Brain className="w-4 h-4" />;
      case "embedding":
        return <Database className="w-4 h-4" />;
      case "code":
        return <Code className="w-4 h-4" />;
      case "vision":
        return <Eye className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  const getModelUsage = (modelId: string) => {
    return usage.find((u) => u.modelId === modelId);
  };

  const totalRequests = usage.reduce((sum, u) => sum + u.requests, 0);
  const totalTokens = usage.reduce((sum, u) => sum + u.tokens, 0);
  const totalErrors = usage.reduce((sum, u) => sum + u.errors, 0);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <Bot className="w-6 h-6" />
                Models
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage AI models for {owner}/{repo}
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add model
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Brain className="w-4 h-4" />
                Total Requests
              </div>
              <div className="text-2xl font-semibold">{totalRequests.toLocaleString()}</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Database className="w-4 h-4" />
                Total Tokens
              </div>
              <div className="text-2xl font-semibold">{totalTokens.toLocaleString()}</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <AlertTriangle className="w-4 h-4" />
                Errors
              </div>
              <div className="text-2xl font-semibold">{totalErrors}</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Cpu className="w-4 h-4" />
                Active Models
              </div>
              <div className="text-2xl font-semibold">
                {models.filter((m) => m.status === "active").length}
              </div>
            </div>
          </div>

          <div className="border rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Configured models</h2>
            </div>
            <div className="divide-y">
              {models.map((model) => {
                const modelUsage = getModelUsage(model.id);
                return (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">{getTypeIcon(model.type)}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{model.name}</span>
                          {getStatusBadge(model.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{model.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            Provider: {model.provider}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Context: {(model.contextWindow / 1000).toFixed(0)}K tokens
                          </span>
                          <span className="text-xs text-muted-foreground capitalize">
                            Type: {model.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {modelUsage && (
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {modelUsage.requests.toLocaleString()} requests
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {modelUsage.tokens.toLocaleString()} tokens • {modelUsage.avgLatency}s
                            avg latency
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          {model.status === "active" ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">About Models</h2>
            <p className="text-muted-foreground">
              Configure AI models to use in your repository. Models can be used for code completion,
              chat interactions, embeddings, and vision tasks. Visit the{" "}
              <a
                href={`/${owner}/${repo}/settings/code/models`}
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                settings <ExternalLink className="w-3 h-3" />
              </a>{" "}
              page to configure default models and provider settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
