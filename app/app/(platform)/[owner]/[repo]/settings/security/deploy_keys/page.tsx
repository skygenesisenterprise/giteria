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
  Key,
  Plus,
  Trash2,
  Loader2,
  Info,
  ExternalLink,
  CheckCircle,
  Lock,
  Unlock,
  Terminal,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";

interface DeployKey {
  id: string;
  title: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  readOnly: boolean;
  verified: boolean;
}

interface SettingsDeployKeysPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsDeployKeysPage({ params }: SettingsDeployKeysPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [deployKeys, setDeployKeys] = React.useState<DeployKey[]>([
    {
      id: "1",
      title: "CI/CD Server",
      key: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ...",
      createdAt: "2024-01-10T10:30:00Z",
      lastUsed: "2024-01-15T08:45:00Z",
      readOnly: false,
      verified: true,
    },
    {
      id: "2",
      title: "Production Deploy",
      key: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI...",
      createdAt: "2024-01-05T14:20:00Z",
      lastUsed: "2024-01-14T22:30:00Z",
      readOnly: false,
      verified: true,
    },
    {
      id: "3",
      title: "Read-Only Backup",
      key: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQ...",
      createdAt: "2023-12-20T09:00:00Z",
      readOnly: true,
      verified: true,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [showKey, setShowKey] = React.useState<string | null>(null);

  const [newKey, setNewKey] = React.useState({
    title: "",
    key: "",
    readOnly: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleAddKey = () => {
    if (!newKey.title.trim() || !newKey.key.trim()) return;
    const key: DeployKey = {
      id: Date.now().toString(),
      title: newKey.title,
      key: newKey.key,
      createdAt: new Date().toISOString(),
      readOnly: newKey.readOnly,
      verified: true,
    };
    setDeployKeys((prev) => [...prev, key]);
    setNewKey({ title: "", key: "", readOnly: false });
    setIsAddDialogOpen(false);
  };

  const handleDeleteKey = (keyId: string) => {
    setDeployKeys((prev) => prev.filter((k) => k.id !== keyId));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const stats = {
    total: deployKeys.length,
    readWrite: deployKeys.filter((k) => !k.readOnly).length,
    readOnly: deployKeys.filter((k) => k.readOnly).length,
    lastUsed: deployKeys
      .filter((k) => k.lastUsed)
      .sort((a, b) => new Date(b.lastUsed || 0).getTime() - new Date(a.lastUsed || 0).getTime())[0]
      ?.lastUsed,
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
                <h1 className="text-2xl font-semibold">Deploy keys</h1>
                <p className="text-muted-foreground mt-1">
                  Manage deploy keys for repository access
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Key className="w-4 h-4" />
                      Total keys
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.total}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Unlock className="w-4 h-4" />
                      Read/Write
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.readWrite}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      Read-only
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.readOnly}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Terminal className="w-4 h-4" />
                      Last used
                    </div>
                    <p className="text-2xl font-semibold mt-1">
                      {stats.lastUsed ? formatDate(stats.lastUsed) : "Never"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Deploy keys</h2>
                      <p className="text-sm text-muted-foreground">
                        Deploy keys allow read or read/write access to your repository from another
                        server.
                      </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add deploy key
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add deploy key</DialogTitle>
                          <DialogDescription>
                            Add a new SSH deploy key to grant server access to this repository.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="key-title">Title</Label>
                            <Input
                              id="key-title"
                              placeholder="e.g., Production Server"
                              value={newKey.title}
                              onChange={(e) =>
                                setNewKey((prev) => ({ ...prev, title: e.target.value }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              A descriptive name for this key.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="key-value">Public key</Label>
                            <Input
                              id="key-value"
                              placeholder="ssh-rsa AAAA..."
                              value={newKey.key}
                              onChange={(e) =>
                                setNewKey((prev) => ({ ...prev, key: e.target.value }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Paste the public key from your server.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={newKey.readOnly}
                              onCheckedChange={(checked) =>
                                setNewKey((prev) => ({ ...prev, readOnly: checked }))
                              }
                            />
                            <Label>Read-only access</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddKey}
                            disabled={!newKey.title.trim() || !newKey.key.trim()}
                          >
                            Add key
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="border rounded-lg">
                    {deployKeys.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Key className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No deploy keys configured</p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Add your first deploy key
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {deployKeys.map((deployKey) => (
                          <div key={deployKey.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                {deployKey.readOnly ? (
                                  <Lock className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                  <Unlock className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{deployKey.title}</p>
                                  {deployKey.verified && (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  )}
                                  <Badge variant="outline">
                                    {deployKey.readOnly ? "Read-only" : "Read/Write"}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>Added {formatDate(deployKey.createdAt)}</span>
                                  {deployKey.lastUsed && (
                                    <>
                                      <span>•</span>
                                      <span>Last used {formatDate(deployKey.lastUsed)}</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={() =>
                                      copyToClipboard(
                                        showKey === deployKey.id
                                          ? deployKey.key
                                          : deployKey.key.substring(0, 20) + "..."
                                      )
                                    }
                                  >
                                    <Copy className="w-3 h-3 mr-1" />
                                    {showKey === deployKey.id
                                      ? deployKey.key.substring(0, 30) + "..."
                                      : "ssh-rsa AAAA..."}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6"
                                    onClick={() =>
                                      setShowKey(showKey === deployKey.id ? null : deployKey.id)
                                    }
                                  >
                                    {showKey === deployKey.id ? (
                                      <EyeOff className="w-3 h-3" />
                                    ) : (
                                      <Eye className="w-3 h-3" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteKey(deployKey.id)}
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
                    <h2 className="text-xl font-semibold">About deploy keys</h2>
                    <p className="text-sm text-muted-foreground">Learn more about deploy keys.</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Deploy keys are SSH keys that grant access to a single repository. They
                          are useful for granting server access to pull code from your repository.
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            <strong>Read/Write keys:</strong> Can push and pull code
                          </li>
                          <li>
                            <strong>Read-only keys:</strong> Can only pull code, cannot push
                          </li>
                          <li>Each key can only be used on one repository</li>
                          <li>Keys can be revoked at any time</li>
                        </ul>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-deploy-keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about deploy keys
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
