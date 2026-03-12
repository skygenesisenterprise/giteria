"use client";

import * as React from "react";
import { use } from "react";
import { SettingSidebar } from "@/components/repository/settings/SettingSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  Key,
  Plus,
  Trash2,
  Loader2,
  Info,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Clock,
  Server,
} from "lucide-react";

interface Secret {
  id: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  visible: boolean;
}

interface RepositorySecret extends Secret {
  environment?: string;
}

interface SettingsSecretsActionsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsSecretsActionsPage({ params }: SettingsSecretsActionsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [secrets, setSecrets] = React.useState<RepositorySecret[]>([
    {
      id: "1",
      name: "NPM_TOKEN",
      value: "npm_xxxxxxxxxxxxx",
      createdAt: "2024-01-10T10:30:00Z",
      updatedAt: "2024-01-15T08:45:00Z",
      visible: false,
    },
    {
      id: "2",
      name: "AWS_ACCESS_KEY_ID",
      value: "AKIAIOSFODNN7EXAMPLE",
      createdAt: "2024-01-05T14:20:00Z",
      updatedAt: "2024-01-14T22:30:00Z",
      visible: false,
    },
    {
      id: "3",
      name: "DATABASE_URL",
      value: "postgresql://user:pass@localhost:5432/db",
      createdAt: "2023-12-20T09:00:00Z",
      updatedAt: "2024-01-13T16:00:00Z",
      visible: false,
    },
    {
      id: "4",
      name: "SLACK_WEBHOOK",
      value: "https://hooks.slack.com/services/xxx/xxx/xxx",
      createdAt: "2024-01-08T11:00:00Z",
      updatedAt: "2024-01-12T10:00:00Z",
      visible: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSecret, setShowSecret] = React.useState<string | null>(null);

  const [newSecret, setNewSecret] = React.useState({
    name: "",
    value: "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleAddSecret = () => {
    if (!newSecret.name.trim() || !newSecret.value.trim()) return;
    const secret: RepositorySecret = {
      id: Date.now().toString(),
      name: newSecret.name.toUpperCase().replace(/[^A-Z0-9_]/g, "_"),
      value: newSecret.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      visible: false,
    };
    setSecrets((prev) => [...prev, secret]);
    setNewSecret({ name: "", value: "" });
    setIsAddDialogOpen(false);
  };

  const handleDeleteSecret = (secretId: string) => {
    setSecrets((prev) => prev.filter((s) => s.id !== secretId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const validateSecretName = (name: string) => {
    const regex = /^[A-Z][A-Z0-9_]*$/;
    return regex.test(name);
  };

  const stats = {
    total: secrets.length,
    lastUpdated: secrets.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0]?.updatedAt,
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
                <h1 className="text-2xl font-semibold">Actions secrets</h1>
                <p className="text-muted-foreground mt-1">
                  Manage secrets for GitHub Actions workflows
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Key className="w-4 h-4" />
                      Total secrets
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.total}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Server className="w-4 h-4" />
                      Workflows
                    </div>
                    <p className="text-2xl font-semibold mt-1">3</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Last updated
                    </div>
                    <p className="text-2xl font-semibold mt-1">
                      {stats.lastUpdated ? formatDate(stats.lastUpdated) : "Never"}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium text-yellow-800">Security notice</p>
                      <p className="text-sm text-yellow-700">
                        Never store sensitive values like passwords or API keys directly in your
                        workflow files. Use secrets to keep them secure.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Repository secrets</h2>
                      <p className="text-sm text-muted-foreground">
                        Secrets are encrypted variables that you can use in your workflows.
                      </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          New secret
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add new secret</DialogTitle>
                          <DialogDescription>
                            Add a new encrypted secret for GitHub Actions workflows.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="secret-name">Name</Label>
                            <Input
                              id="secret-name"
                              placeholder="e.g., NPM_TOKEN"
                              value={newSecret.name}
                              onChange={(e) =>
                                setNewSecret((prev) => ({
                                  ...prev,
                                  name: e.target.value.toUpperCase(),
                                }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Use only letters, numbers, and underscores. Must start with a letter.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="secret-value">Value</Label>
                            <Input
                              id="secret-value"
                              type="password"
                              placeholder="Secret value"
                              value={newSecret.value}
                              onChange={(e) =>
                                setNewSecret((prev) => ({ ...prev, value: e.target.value }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              The secret value. Will be encrypted and hidden after saving.
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddSecret}
                            disabled={
                              !newSecret.name.trim() ||
                              !newSecret.value.trim() ||
                              !validateSecretName(newSecret.name)
                            }
                          >
                            Add secret
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="border rounded-lg">
                    {secrets.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Key className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No secrets configured</p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Add your first secret
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {secrets.map((secret) => (
                          <div key={secret.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <Lock className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium font-mono">{secret.name}</p>
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>Updated {formatDate(secret.updatedAt)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    showSecret === secret.id ? secret.value : "********"
                                  )
                                }
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                {showSecret === secret.id ? "Copied!" : "Copy"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setShowSecret(showSecret === secret.id ? null : secret.id)
                                }
                              >
                                {showSecret === secret.id ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteSecret(secret.id)}
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
                    <h2 className="text-xl font-semibold">Usage in workflows</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn how to use secrets in your GitHub Actions workflows.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="space-y-3">
                      <p className="font-medium text-sm">Example usage:</p>
                      <pre className="text-sm bg-background p-3 rounded border overflow-x-auto">
                        {`jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm publish
        env:
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}`}
                      </pre>
                      <p className="text-xs text-muted-foreground">
                        Access secrets using the{" "}
                        <code className="bg-muted px-1 rounded">secrets</code> context in your
                        workflow file.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About secrets</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about encrypted secrets.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Secrets are encrypted environment variables that you can create in a
                          repository.
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Secrets are encrypted and hidden after saving</li>
                          <li>They can be used in workflow files using the secrets context</li>
                          <li>Each secret has a 64KB limit</li>
                          <li>Secrets are available to all workflows in the repository</li>
                        </ul>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.github.com/en/actions/security-guides/encrypted-secrets"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about encrypted secrets
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
