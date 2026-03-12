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
  Bell,
  Plus,
  Trash2,
  Edit,
  Loader2,
  Info,
  ExternalLink,
  Mail,
  MessageSquare,
  GitPullRequest,
  CircleDot,
  GitCommit,
  ShieldAlert,
} from "lucide-react";

interface ScheduledReminder {
  id: string;
  name: string;
  channel: "email" | "slack" | "webhook";
  destination: string;
  events: string[];
  frequency: "realtime" | "daily" | "weekly";
  status: "active" | "inactive";
  lastSent?: string;
}

interface NotificationSetting {
  id: string;
  type: "pull_request" | "issue" | "push" | "release" | "security_alert";
  enabled: boolean;
  channels: string[];
}

interface SettingsNotificationsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsNotificationsPage({ params }: SettingsNotificationsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [reminders, setReminders] = React.useState<ScheduledReminder[]>([
    {
      id: "1",
      name: "Daily Digest",
      channel: "email",
      destination: "team@example.com",
      events: ["pull_request", "issue"],
      frequency: "daily",
      status: "active",
      lastSent: "2024-01-15T08:00:00Z",
    },
    {
      id: "2",
      name: "Slack Alerts",
      channel: "slack",
      destination: "#engineering",
      events: ["pull_request", "security_alert"],
      frequency: "realtime",
      status: "active",
      lastSent: "2024-01-15T10:30:00Z",
    },
    {
      id: "3",
      name: "Weekly Report",
      channel: "email",
      destination: "management@example.com",
      events: ["push", "release"],
      frequency: "weekly",
      status: "inactive",
    },
  ]);

  const [notificationSettings, setNotificationSettings] = React.useState<NotificationSetting[]>([
    { id: "1", type: "pull_request", enabled: true, channels: ["email", "slack"] },
    { id: "2", type: "issue", enabled: true, channels: ["email"] },
    { id: "3", type: "push", enabled: false, channels: [] },
    { id: "4", type: "release", enabled: true, channels: ["email", "slack"] },
    { id: "5", type: "security_alert", enabled: true, channels: ["email", "slack", "webhook"] },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedReminder, setSelectedReminder] = React.useState<ScheduledReminder | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const [newReminder, setNewReminder] = React.useState({
    name: "",
    channel: "email" as ScheduledReminder["channel"],
    destination: "",
    events: [] as string[],
    frequency: "daily" as ScheduledReminder["frequency"],
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleAddReminder = () => {
    if (!newReminder.name.trim() || !newReminder.destination.trim()) return;
    const reminder: ScheduledReminder = {
      id: Date.now().toString(),
      name: newReminder.name,
      channel: newReminder.channel,
      destination: newReminder.destination,
      events: newReminder.events,
      frequency: newReminder.frequency,
      status: "active",
    };
    setReminders((prev) => [...prev, reminder]);
    setNewReminder({
      name: "",
      channel: "email",
      destination: "",
      events: [],
      frequency: "daily",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditReminder = (reminder: ScheduledReminder) => {
    setSelectedReminder({ ...reminder });
    setIsEditDialogOpen(true);
  };

  const handleUpdateReminder = () => {
    if (!selectedReminder) return;
    setReminders((prev) => prev.map((r) => (r.id === selectedReminder.id ? selectedReminder : r)));
    setIsEditDialogOpen(false);
  };

  const handleDeleteReminder = (reminderId: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== reminderId));
  };

  const handleToggleReminder = (reminderId: string) => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === reminderId ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r
      )
    );
  };

  const handleToggleEvent = (event: string, currentEvents: string[]) => {
    if (currentEvents.includes(event)) {
      return currentEvents.filter((e) => e !== event);
    }
    return [...currentEvents, event];
  };

  const getChannelIcon = (channel: ScheduledReminder["channel"]) => {
    switch (channel) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "slack":
        return <MessageSquare className="w-4 h-4" />;
      case "webhook":
        return <Bell className="w-4 h-4" />;
    }
  };

  const getFrequencyLabel = (frequency: ScheduledReminder["frequency"]) => {
    switch (frequency) {
      case "realtime":
        return "Real-time";
      case "daily":
        return "Daily digest";
      case "weekly":
        return "Weekly digest";
    }
  };

  const getEventLabel = (event: string) => {
    switch (event) {
      case "pull_request":
        return "Pull requests";
      case "issue":
        return "Issues";
      case "push":
        return "Pushes";
      case "release":
        return "Releases";
      case "security_alert":
        return "Security alerts";
    }
  };

  const getEventIcon = (event: string) => {
    switch (event) {
      case "pull_request":
        return <GitPullRequest className="w-4 h-4" />;
      case "issue":
        return <CircleDot className="w-4 h-4" />;
      case "push":
        return <GitCommit className="w-4 h-4" />;
      case "security_alert":
        return <ShieldAlert className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: ScheduledReminder["status"]) => {
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

  const eventOptions = [
    { value: "pull_request", label: "Pull requests" },
    { value: "issue", label: "Issues" },
    { value: "push", label: "Pushes" },
    { value: "release", label: "Releases" },
    { value: "security_alert", label: "Security alerts" },
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
                <h1 className="text-2xl font-semibold">Scheduled reminders</h1>
                <p className="text-muted-foreground mt-1">
                  Configure notifications and scheduled reminders for this repository
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Event notifications</h2>
                      <p className="text-sm text-muted-foreground">
                        Configure which events trigger notifications.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {notificationSettings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            {getEventIcon(setting.type)}
                          </div>
                          <div>
                            <p className="font-medium">{getEventLabel(setting.type)}</p>
                            <p className="text-sm text-muted-foreground">
                              {setting.channels.length > 0
                                ? `Notified via ${setting.channels.join(", ")}`
                                : "No notifications"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex gap-2">
                            {setting.enabled && setting.channels.includes("email") && (
                              <Badge variant="outline">
                                <Mail className="w-3 h-3 mr-1" /> Email
                              </Badge>
                            )}
                            {setting.enabled && setting.channels.includes("slack") && (
                              <Badge variant="outline">
                                <MessageSquare className="w-3 h-3 mr-1" /> Slack
                              </Badge>
                            )}
                            {setting.enabled && setting.channels.includes("webhook") && (
                              <Badge variant="outline">
                                <Bell className="w-3 h-3 mr-1" /> Webhook
                              </Badge>
                            )}
                          </div>
                          <Switch
                            checked={setting.enabled}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) =>
                                prev.map((s) =>
                                  s.id === setting.id
                                    ? {
                                        ...s,
                                        enabled: checked,
                                        channels: checked ? ["email"] : [],
                                      }
                                    : s
                                )
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Scheduled reminders</h2>
                      <p className="text-sm text-muted-foreground">
                        Set up recurring notifications for repository activity.
                      </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add reminder
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add scheduled reminder</DialogTitle>
                          <DialogDescription>
                            Create a new scheduled reminder for repository activity.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="reminder-name">Reminder name</Label>
                            <Input
                              id="reminder-name"
                              placeholder="e.g., Daily Digest"
                              value={newReminder.name}
                              onChange={(e) =>
                                setNewReminder((prev) => ({ ...prev, name: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Channel</Label>
                            <Select
                              value={newReminder.channel}
                              onValueChange={(value) =>
                                setNewReminder((prev) => ({
                                  ...prev,
                                  channel: value as ScheduledReminder["channel"],
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="slack">Slack</SelectItem>
                                <SelectItem value="webhook">Webhook</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reminder-destination">
                              {newReminder.channel === "email"
                                ? "Email address"
                                : newReminder.channel === "slack"
                                  ? "Slack channel"
                                  : "Webhook URL"}
                            </Label>
                            <Input
                              id="reminder-destination"
                              placeholder={
                                newReminder.channel === "email"
                                  ? "team@example.com"
                                  : newReminder.channel === "slack"
                                    ? "#channel-name"
                                    : "https://example.com/webhook"
                              }
                              value={newReminder.destination}
                              onChange={(e) =>
                                setNewReminder((prev) => ({ ...prev, destination: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Events to include</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {eventOptions.map((event) => (
                                <div
                                  key={event.value}
                                  className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                                    newReminder.events.includes(event.value)
                                      ? "border-primary bg-primary/5"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                  onClick={() =>
                                    setNewReminder((prev) => ({
                                      ...prev,
                                      events: handleToggleEvent(event.value, prev.events),
                                    }))
                                  }
                                >
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      checked={newReminder.events.includes(event.value)}
                                      onCheckedChange={() => {}}
                                    />
                                    <span className="text-sm">{event.label}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Frequency</Label>
                            <Select
                              value={newReminder.frequency}
                              onValueChange={(value) =>
                                setNewReminder((prev) => ({
                                  ...prev,
                                  frequency: value as ScheduledReminder["frequency"],
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="realtime">Real-time</SelectItem>
                                <SelectItem value="daily">Daily digest</SelectItem>
                                <SelectItem value="weekly">Weekly digest</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddReminder}
                            disabled={!newReminder.name.trim() || !newReminder.destination.trim()}
                          >
                            Add reminder
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="border rounded-lg">
                    {reminders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Bell className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No scheduled reminders</p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Add your first reminder
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {reminders.map((reminder) => (
                          <div key={reminder.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                {getChannelIcon(reminder.channel)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{reminder.name}</p>
                                  {getStatusBadge(reminder.status)}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{reminder.destination}</span>
                                  <span>•</span>
                                  <span>{getFrequencyLabel(reminder.frequency)}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  {reminder.events.map((event) => (
                                    <Badge key={event} variant="outline" className="text-xs">
                                      {getEventLabel(event)}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground mr-2">
                                Last sent: {formatDate(reminder.lastSent)}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditReminder(reminder)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleReminder(reminder.id)}
                              >
                                {reminder.status === "active" ? "Disable" : "Enable"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteReminder(reminder.id)}
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
                    <h2 className="text-xl font-semibold">About scheduled reminders</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about scheduled reminders.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Scheduled reminders help you stay informed about activity in your
                          repository without checking manually.
                        </p>
                        <p>
                          You can receive real-time alerts for critical events like security
                          vulnerabilities, or daily/weekly digests for pull requests and issues.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/notifications"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about notifications
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit reminder: {selectedReminder?.name}</DialogTitle>
            <DialogDescription>Configure the scheduled reminder.</DialogDescription>
          </DialogHeader>
          {selectedReminder && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Channel</Label>
                <Select
                  value={selectedReminder.channel}
                  onValueChange={(value) =>
                    setSelectedReminder((prev) =>
                      prev ? { ...prev, channel: value as ScheduledReminder["channel"] } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Destination</Label>
                <Input
                  value={selectedReminder.destination}
                  onChange={(e) =>
                    setSelectedReminder((prev) =>
                      prev ? { ...prev, destination: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select
                  value={selectedReminder.frequency}
                  onValueChange={(value) =>
                    setSelectedReminder((prev) =>
                      prev ? { ...prev, frequency: value as ScheduledReminder["frequency"] } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateReminder}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
