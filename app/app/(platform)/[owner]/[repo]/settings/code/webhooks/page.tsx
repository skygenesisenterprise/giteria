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
import { Textarea } from "@/components/ui/textarea";
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
  Webhook,
  Plus,
  Trash2,
  Edit,
  Play,
  Pause,
  Loader2,
  Info,
  ExternalLink,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  GitBranch,
  GitCommit,
  GitPullRequest,
  CircleDot,
  Tag,
  Star,
  GitFork,
} from "lucide-react";

interface WebhookEvent {
  id: string;
  event: string;
  active: boolean;
}

interface WebhookDelivery {
  id: string;
  status: "success" | "failed" | "pending";
  timestamp: string;
  duration: number;
  statusCode: number;
}

interface Webhook {
  id: string;
  url: string;
  active: boolean;
  events: string[];
  secret: string;
  sslVerification: boolean;
  lastTriggered?: string;
  deliveries: WebhookDelivery[];
}

interface SettingsWebhooksPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

const EVENT_OPTIONS = [
  { value: "push", label: "Push", icon: GitCommit, description: "Branch or tag created/deleted" },
  {
    value: "pull_request",
    label: "Pull request",
    icon: GitPullRequest,
    description: "PR opened/closed/merged",
  },
  { value: "issues", label: "Issues", icon: CircleDot, description: "Issue created/closed" },
  { value: "release", label: "Release", icon: Tag, description: "Release published" },
  { value: "watch", label: "Star", icon: Star, description: "Repository starred" },
  { value: "fork", label: "Fork", icon: GitFork, description: "Repository forked" },
];

export default function SettingsWebhooksPage({ params }: SettingsWebhooksPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [webhooks, setWebhooks] = React.useState<Webhook[]>([
    {
      id: "1",
      url: "https://api.example.com/webhook",
      active: true,
      events: ["push", "pull_request", "issues"],
      secret: "",
      sslVerification: true,
      lastTriggered: "2024-01-15T10:30:00Z",
      deliveries: [
        {
          id: "d1",
          status: "success",
          timestamp: "2024-01-15T10:30:00Z",
          duration: 250,
          statusCode: 200,
        },
        {
          id: "d2",
          status: "success",
          timestamp: "2024-01-15T09:15:00Z",
          duration: 180,
          statusCode: 200,
        },
        {
          id: "d3",
          status: "failed",
          timestamp: "2024-01-14T18:00:00Z",
          duration: 5000,
          statusCode: 500,
        },
      ],
    },
    {
      id: "2",
      url: "https://slack.com/api/hooks",
      active: true,
      events: ["release", "push"],
      secret: "",
      sslVerification: true,
      lastTriggered: "2024-01-14T14:20:00Z",
      deliveries: [
        {
          id: "d4",
          status: "success",
          timestamp: "2024-01-14T14:20:00Z",
          duration: 320,
          statusCode: 200,
        },
        {
          id: "d5",
          status: "success",
          timestamp: "2024-01-13T10:00:00Z",
          duration: 290,
          statusCode: 200,
        },
      ],
    },
  ]);

  const [selectedWebhook, setSelectedWebhook] = React.useState<Webhook | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const [newWebhook, setNewWebhook] = React.useState({
    url: "",
    events: ["push"] as string[],
    secret: "",
    sslVerification: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleAddWebhook = () => {
    if (!newWebhook.url.trim()) return;
    const webhook: Webhook = {
      id: Date.now().toString(),
      url: newWebhook.url,
      active: true,
      events: newWebhook.events,
      secret: newWebhook.secret,
      sslVerification: newWebhook.sslVerification,
      deliveries: [],
    };
    setWebhooks((prev) => [...prev, webhook]);
    setNewWebhook({ url: "", events: ["push"], secret: "", sslVerification: true });
    setIsAddDialogOpen(false);
  };

  const handleEditWebhook = (webhook: Webhook) => {
    setSelectedWebhook({ ...webhook });
    setIsEditDialogOpen(true);
  };

  const handleUpdateWebhook = () => {
    if (!selectedWebhook) return;
    setWebhooks((prev) => prev.map((w) => (w.id === selectedWebhook.id ? selectedWebhook : w)));
    setIsEditDialogOpen(false);
  };

  const handleDeleteWebhook = (webhookId: string) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== webhookId));
  };

  const handleToggleWebhook = (webhookId: string) => {
    setWebhooks((prev) => prev.map((w) => (w.id === webhookId ? { ...w, active: !w.active } : w)));
  };

  const handleToggleEvent = (event: string, currentEvents: string[]) => {
    if (currentEvents.includes(event)) {
      return currentEvents.filter((e) => e !== event);
    }
    return [...currentEvents, event];
  };

  const getStatusIcon = (status: WebhookDelivery["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (active: boolean) => {
    return active ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    );
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
      total: webhooks.length,
      active: webhooks.filter((w) => w.active).length,
      totalDeliveries: webhooks.reduce((acc, w) => acc + w.deliveries.length, 0),
      failedDeliveries: webhooks.reduce(
        (acc, w) => acc + w.deliveries.filter((d) => d.status === "failed").length,
        0
      ),
    };
  }, [webhooks]);

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
                <h1 className="text-2xl font-semibold">Webhooks</h1>
                <p className="text-muted-foreground mt-1">Manage webhooks for your repository</p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Webhook className="w-4 h-4" />
                      Total webhooks
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
                      <Loader2 className="w-4 h-4" />
                      Deliveries
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.totalDeliveries}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4" />
                      Failed
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-red-600">
                      {stats.failedDeliveries}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Webhooks</h2>
                      <p className="text-sm text-muted-foreground">
                        Webhooks allow external services to be notified when certain events occur.
                      </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add webhook
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add webhook</DialogTitle>
                          <DialogDescription>
                            Configure a new webhook to receive events from this repository.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="webhook-url">Payload URL</Label>
                            <Input
                              id="webhook-url"
                              placeholder="https://example.com/webhook"
                              value={newWebhook.url}
                              onChange={(e) =>
                                setNewWebhook((prev) => ({ ...prev, url: e.target.value }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              The URL where the webhook payload will be delivered.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label>Events</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {EVENT_OPTIONS.map((event) => (
                                <div
                                  key={event.value}
                                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                    newWebhook.events.includes(event.value)
                                      ? "border-primary bg-primary/5"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                  onClick={() => {
                                    setNewWebhook((prev) => ({
                                      ...prev,
                                      events: handleToggleEvent(event.value, prev.events),
                                    }));
                                  }}
                                >
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      checked={newWebhook.events.includes(event.value)}
                                      onCheckedChange={() => {}}
                                    />
                                    <div>
                                      <p className="text-sm font-medium">{event.label}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {event.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="webhook-secret">Secret (optional)</Label>
                            <Input
                              id="webhook-secret"
                              type="password"
                              placeholder="Enter secret"
                              value={newWebhook.secret}
                              onChange={(e) =>
                                setNewWebhook((prev) => ({ ...prev, secret: e.target.value }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              A secret token that will be included in the webhook payload.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={newWebhook.sslVerification}
                              onCheckedChange={(checked) =>
                                setNewWebhook((prev) => ({ ...prev, sslVerification: checked }))
                              }
                            />
                            <Label>Enable SSL verification</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddWebhook} disabled={!newWebhook.url.trim()}>
                            Add webhook
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="border rounded-lg">
                    {webhooks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Webhook className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No webhooks configured</p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Add your first webhook
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {webhooks.map((webhook) => (
                          <div key={webhook.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                  <Webhook className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium font-mono text-sm">{webhook.url}</p>
                                    {getStatusBadge(webhook.active)}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>
                                      {webhook.events
                                        .map(
                                          (e) =>
                                            EVENT_OPTIONS.find((ev) => ev.value === e)?.label || e
                                        )
                                        .join(", ")}
                                    </span>
                                    {webhook.lastTriggered && (
                                      <>
                                        <span>•</span>
                                        <span>
                                          Last triggered: {formatDate(webhook.lastTriggered)}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedWebhook(webhook);
                                    setIsDeliveryDialogOpen(true);
                                  }}
                                >
                                  <Loader2 className="w-4 h-4 mr-1" />
                                  Deliveries
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditWebhook(webhook)}
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleWebhook(webhook.id)}
                                >
                                  {webhook.active ? (
                                    <Pause className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <Play className="w-4 h-4 text-green-600" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteWebhook(webhook.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
                                </Button>
                              </div>
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
                    <h2 className="text-xl font-semibold">Webhook settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure global webhook behavior for this repository.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Webhooks can be configured to send HTTP POST requests to a URL when
                          specific events occur in the repository.
                        </p>
                        <p>Common use cases include:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Continuous integration triggers</li>
                          <li>Notification systems (Slack, Discord, etc.)</li>
                          <li>Deployment automation</li>
                          <li>Backup and sync services</li>
                        </ul>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/webhooks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about webhooks
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit webhook</DialogTitle>
            <DialogDescription>Configure webhook settings.</DialogDescription>
          </DialogHeader>
          {selectedWebhook && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-url">Payload URL</Label>
                <Input
                  id="edit-url"
                  value={selectedWebhook.url}
                  onChange={(e) =>
                    setSelectedWebhook((prev) => (prev ? { ...prev, url: e.target.value } : null))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Events</Label>
                <div className="grid grid-cols-2 gap-2">
                  {EVENT_OPTIONS.map((event) => (
                    <div
                      key={event.value}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedWebhook.events.includes(event.value)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => {
                        if (!selectedWebhook) return;
                        setSelectedWebhook((prev) =>
                          prev
                            ? {
                                ...prev,
                                events: handleToggleEvent(event.value, prev.events),
                              }
                            : null
                        );
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={selectedWebhook.events.includes(event.value)}
                          onCheckedChange={() => {}}
                        />
                        <div>
                          <p className="text-sm font-medium">{event.label}</p>
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-secret">Secret</Label>
                <Input
                  id="edit-secret"
                  type="password"
                  placeholder="Leave blank to keep current secret"
                  value={selectedWebhook.secret}
                  onChange={(e) =>
                    setSelectedWebhook((prev) =>
                      prev ? { ...prev, secret: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={selectedWebhook.sslVerification}
                  onCheckedChange={(checked) =>
                    setSelectedWebhook((prev) =>
                      prev ? { ...prev, sslVerification: checked } : null
                    )
                  }
                />
                <Label>Enable SSL verification</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateWebhook}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeliveryDialogOpen} onOpenChange={setIsDeliveryDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Webhook deliveries</DialogTitle>
            <DialogDescription>
              Recent delivery attempts for {selectedWebhook?.url}
            </DialogDescription>
          </DialogHeader>
          {selectedWebhook && (
            <div className="space-y-4 py-4">
              {selectedWebhook.deliveries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No deliveries yet</div>
              ) : (
                <div className="border rounded-lg divide-y">
                  {selectedWebhook.deliveries.map((delivery) => (
                    <div key={delivery.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(delivery.status)}
                        <div>
                          <p className="text-sm font-medium">
                            {delivery.status === "success" ? "Success" : "Failed"} -{" "}
                            {delivery.statusCode}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(delivery.timestamp)} • {delivery.duration}ms
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        View payload
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeliveryDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
