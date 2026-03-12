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
  Flag,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Eye,
  EyeOff,
  Trash2,
  Loader2,
  Filter,
  Ban,
  UserX,
} from "lucide-react";

interface ReportedContent {
  id: string;
  type: "issue" | "pull_request" | "comment" | "discussion";
  author: string;
  reporter: string;
  reason: string;
  status: "pending" | "reviewed" | "dismissed" | "action_taken";
  reportedAt: string;
  content: string;
}

interface SettingsModeratorReportedContentPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsModeratorReportedContentPage({
  params,
}: SettingsModeratorReportedContentPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [moderationSettings, setModerationSettings] = React.useState({
    enableContentReporting: true,
    requireAuthToReport: false,
    autoHideReportedContent: false,
    notifyModerators: true,
    notifyEmail: "",
  });

  const [reportedContent, setReportedContent] = React.useState<ReportedContent[]>([
    {
      id: "1",
      type: "issue",
      author: "user123",
      reporter: "citizen_reporter",
      reason: "Spam",
      status: "pending",
      reportedAt: "2024-01-15T10:30:00Z",
      content: "This is spam content trying to sell something...",
    },
    {
      id: "2",
      type: "comment",
      author: "angry_user",
      reporter: "concerned_dev",
      reason: "Harassment",
      status: "reviewed",
      reportedAt: "2024-01-14T09:15:00Z",
      content: "Inappropriate comments targeting team members...",
    },
    {
      id: "3",
      type: "pull_request",
      author: "new_contributor",
      reporter: "code_reviewer",
      reason: "Malicious code",
      status: "action_taken",
      reportedAt: "2024-01-13T14:20:00Z",
      content: "Suspicious code that could be harmful...",
    },
    {
      id: "4",
      type: "discussion",
      author: "off_topic_user",
      reporter: "community_member",
      reason: "Off-topic",
      status: "dismissed",
      reportedAt: "2024-01-12T11:00:00Z",
      content: "Discussion not related to the project...",
    },
  ]);

  const [filterStatus, setFilterStatus] = React.useState<string>("all");
  const [filterType, setFilterType] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedContent, setSelectedContent] = React.useState<ReportedContent | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const filteredContent = React.useMemo(() => {
    return reportedContent.filter((content) => {
      const matchesStatus = filterStatus === "all" || content.status === filterStatus;
      const matchesType = filterType === "all" || content.type === filterType;
      const matchesSearch =
        !searchQuery ||
        content.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [reportedContent, filterStatus, filterType, searchQuery]);

  const handleViewContent = (content: ReportedContent) => {
    setSelectedContent(content);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (contentId: string, newStatus: ReportedContent["status"]) => {
    setReportedContent((prev) =>
      prev.map((content) =>
        content.id === contentId ? { ...content, status: newStatus } : content
      )
    );
    setIsViewDialogOpen(false);
  };

  const handleDismissContent = (contentId: string) => {
    setReportedContent((prev) =>
      prev.map((content) =>
        content.id === contentId ? { ...content, status: "dismissed" as const } : content
      )
    );
  };

  const handleTakeAction = (contentId: string) => {
    setReportedContent((prev) =>
      prev.map((content) =>
        content.id === contentId ? { ...content, status: "action_taken" as const } : content
      )
    );
  };

  const getStatusBadge = (status: ReportedContent["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "reviewed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Reviewed</Badge>;
      case "dismissed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Dismissed</Badge>;
      case "action_taken":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Action taken</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: ReportedContent["type"]) => {
    switch (type) {
      case "issue":
        return <AlertTriangle className="w-4 h-4" />;
      case "pull_request":
        return <Flag className="w-4 h-4" />;
      case "comment":
        return <MessageSquare className="w-4 h-4" />;
      case "discussion":
        return <Flag className="w-4 h-4" />;
      default:
        return <Flag className="w-4 h-4" />;
    }
  };

  const getReasonLabel = (reason: string) => {
    return reason
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const stats = React.useMemo(() => {
    return {
      total: reportedContent.length,
      pending: reportedContent.filter((c) => c.status === "pending").length,
      reviewed: reportedContent.filter((c) => c.status === "reviewed").length,
      actionTaken: reportedContent.filter((c) => c.status === "action_taken").length,
    };
  }, [reportedContent]);

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
                <h1 className="text-2xl font-semibold">Reported content</h1>
                <p className="text-muted-foreground mt-1">
                  Manage reported content and moderation settings
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Total reports</p>
                    <p className="text-2xl font-semibold">{stats.total}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-semibold text-yellow-600">{stats.pending}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Reviewed</p>
                    <p className="text-2xl font-semibold text-blue-600">{stats.reviewed}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Action taken</p>
                    <p className="text-2xl font-semibold text-red-600">{stats.actionTaken}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Moderation settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure how reported content is handled.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable content reporting</p>
                        <p className="text-sm text-muted-foreground">
                          Allow users to report inappropriate content.
                        </p>
                      </div>
                      <Switch
                        checked={moderationSettings.enableContentReporting}
                        onCheckedChange={(checked) =>
                          setModerationSettings((prev) => ({
                            ...prev,
                            enableContentReporting: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Require authentication to report</p>
                        <p className="text-sm text-muted-foreground">
                          Users must be signed in to report content.
                        </p>
                      </div>
                      <Switch
                        checked={moderationSettings.requireAuthToReport}
                        onCheckedChange={(checked) =>
                          setModerationSettings((prev) => ({
                            ...prev,
                            requireAuthToReport: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Auto-hide reported content</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically hide content with multiple reports.
                        </p>
                      </div>
                      <Switch
                        checked={moderationSettings.autoHideReportedContent}
                        onCheckedChange={(checked) =>
                          setModerationSettings((prev) => ({
                            ...prev,
                            autoHideReportedContent: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Notify moderators</p>
                        <p className="text-sm text-muted-foreground">
                          Send notifications when new content is reported.
                        </p>
                      </div>
                      <Switch
                        checked={moderationSettings.notifyModerators}
                        onCheckedChange={(checked) =>
                          setModerationSettings((prev) => ({
                            ...prev,
                            notifyModerators: checked,
                          }))
                        }
                      />
                    </div>

                    {moderationSettings.notifyModerators && (
                      <div className="p-4 border rounded-lg space-y-2">
                        <Label htmlFor="notify-email">Notification email</Label>
                        <Input
                          id="notify-email"
                          type="email"
                          placeholder="moderators@example.com"
                          value={moderationSettings.notifyEmail}
                          onChange={(e) =>
                            setModerationSettings((prev) => ({
                              ...prev,
                              notifyEmail: e.target.value,
                            }))
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Reported content</h2>
                    <p className="text-sm text-muted-foreground">
                      Review and manage reported content in this repository.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                      <Input
                        placeholder="Search by author or content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="dismissed">Dismissed</SelectItem>
                        <SelectItem value="action_taken">Action taken</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="issue">Issues</SelectItem>
                        <SelectItem value="pull_request">Pull requests</SelectItem>
                        <SelectItem value="comment">Comments</SelectItem>
                        <SelectItem value="discussion">Discussions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-lg">
                    {filteredContent.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Flag className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No reported content found</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {filteredContent.map((content) => (
                          <div key={content.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                {getTypeIcon(content.type)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{content.author}</p>
                                  <span className="text-sm text-muted-foreground capitalize">
                                    {content.type.replace("_", " ")}
                                  </span>
                                  {getStatusBadge(content.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Reported by {content.reporter} - {getReasonLabel(content.reason)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(content.reportedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewContent(content)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              {content.status === "pending" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDismissContent(content.id)}
                                  >
                                    <XCircle className="w-4 h-4 text-muted-foreground" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleTakeAction(content.id)}
                                  >
                                    <Ban className="w-4 h-4 text-red-600" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reported content details</DialogTitle>
            <DialogDescription>
              Review the reported content and take appropriate action.
            </DialogDescription>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Author</p>
                  <p className="text-sm text-muted-foreground">{selectedContent.author}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Reporter</p>
                  <p className="text-sm text-muted-foreground">{selectedContent.reporter}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Reason</p>
                  <p className="text-sm text-muted-foreground">
                    {getReasonLabel(selectedContent.reason)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  {getStatusBadge(selectedContent.status)}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Reported content</p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{selectedContent.content}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedContent?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleUpdateStatus(selectedContent.id, "dismissed")}
                >
                  Dismiss
                </Button>
                <Button onClick={() => handleUpdateStatus(selectedContent.id, "action_taken")}>
                  Take action
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
