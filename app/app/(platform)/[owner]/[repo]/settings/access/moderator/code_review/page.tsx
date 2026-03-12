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
  ShieldCheck,
  Users,
  Ban,
  Clock,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

interface ReviewRequest {
  id: string;
  user: string;
  avatarUrl?: string;
  status: "pending" | "approved" | "rejected" | "changes_requested";
  requestedAt: string;
}

interface SettingsModeratorCodeReviewPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsModeratorCodeReviewPage({
  params,
}: SettingsModeratorCodeReviewPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [reviewRequirements, setReviewRequirements] = React.useState({
    requireReviews: true,
    dismissStaleReviews: true,
    requireCodeOwnerReviews: false,
    requiredReviewers: 1,
    requireLastPushApproval: true,
    restrictReviewDismissals: false,
  });

  const [commentPermissions, setCommentPermissions] = React.useState({
    allowEdits: true,
    allowDeletion: true,
    allowMarkedReview: true,
    allowReviewNavigation: true,
  });

  const [autoDismiss, setAutoDismiss] = React.useState({
    dismissApproved: true,
    dismissPending: false,
  });

  const [pendingReviewRequests, setPendingReviewRequests] = React.useState<ReviewRequest[]>([
    {
      id: "1",
      user: "johndoe",
      status: "pending",
      requestedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      user: "janesmith",
      status: "approved",
      requestedAt: "2024-01-14T09:00:00Z",
    },
    {
      id: "3",
      user: "alexwilson",
      status: "changes_requested",
      requestedAt: "2024-01-13T14:20:00Z",
    },
  ]);

  const [filter, setFilter] = React.useState<string>("all");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const filteredRequests = React.useMemo(() => {
    if (filter === "all") return pendingReviewRequests;
    return pendingReviewRequests.filter((req) => req.status === filter);
  }, [pendingReviewRequests, filter]);

  const getStatusBadge = (status: ReviewRequest["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case "changes_requested":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Changes requested
          </Badge>
        );
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const getStatusIcon = (status: ReviewRequest["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "changes_requested":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
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
                <h1 className="text-2xl font-semibold">Code review</h1>
                <p className="text-muted-foreground mt-1">
                  Manage code review settings and moderator requirements
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Review requirements</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure when pull requests can be merged based on reviews.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Require reviews</p>
                        <p className="text-sm text-muted-foreground">
                          Require at least one approving review before merging.
                        </p>
                      </div>
                      <Switch
                        checked={reviewRequirements.requireReviews}
                        onCheckedChange={(checked) =>
                          setReviewRequirements((prev) => ({ ...prev, requireReviews: checked }))
                        }
                      />
                    </div>

                    {reviewRequirements.requireReviews && (
                      <div className="ml-6 space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Dismiss stale reviews</p>
                            <p className="text-sm text-muted-foreground">
                              Automatically dismiss reviews when new commits are pushed.
                            </p>
                          </div>
                          <Switch
                            checked={reviewRequirements.dismissStaleReviews}
                            onCheckedChange={(checked) =>
                              setReviewRequirements((prev) => ({
                                ...prev,
                                dismissStaleReviews: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Require code owner reviews</p>
                            <p className="text-sm text-muted-foreground">
                              Require review from code owners when changes affect their code.
                            </p>
                          </div>
                          <Switch
                            checked={reviewRequirements.requireCodeOwnerReviews}
                            onCheckedChange={(checked) =>
                              setReviewRequirements((prev) => ({
                                ...prev,
                                requireCodeOwnerReviews: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Required approving reviewers</p>
                            <p className="text-sm text-muted-foreground">
                              Number of approving reviews required before merging.
                            </p>
                          </div>
                          <Select
                            value={reviewRequirements.requiredReviewers.toString()}
                            onValueChange={(value) =>
                              setReviewRequirements((prev) => ({
                                ...prev,
                                requiredReviewers: parseInt(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Require last push approval</p>
                            <p className="text-sm text-muted-foreground">
                              Require approval after the most recent push.
                            </p>
                          </div>
                          <Switch
                            checked={reviewRequirements.requireLastPushApproval}
                            onCheckedChange={(checked) =>
                              setReviewRequirements((prev) => ({
                                ...prev,
                                requireLastPushApproval: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Restrict review dismissal</p>
                            <p className="text-sm text-muted-foreground">
                              Only allow review dismissal by admins or code owners.
                            </p>
                          </div>
                          <Switch
                            checked={reviewRequirements.restrictReviewDismissals}
                            onCheckedChange={(checked) =>
                              setReviewRequirements((prev) => ({
                                ...prev,
                                restrictReviewDismissals: checked,
                              }))
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Review comment permissions</h2>
                    <p className="text-sm text-muted-foreground">
                      Control what reviewers can do with their reviews.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow review edits</p>
                        <p className="text-sm text-muted-foreground">
                          Allow reviewers to update their review after submitting.
                        </p>
                      </div>
                      <Switch
                        checked={commentPermissions.allowEdits}
                        onCheckedChange={(checked) =>
                          setCommentPermissions((prev) => ({ ...prev, allowEdits: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow review deletions</p>
                        <p className="text-sm text-muted-foreground">
                          Allow reviewers to delete their review.
                        </p>
                      </div>
                      <Switch
                        checked={commentPermissions.allowDeletion}
                        onCheckedChange={(checked) =>
                          setCommentPermissions((prev) => ({ ...prev, allowDeletion: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow marked review dismissal</p>
                        <p className="text-sm text-muted-foreground">
                          Allow dismissing reviews that have been marked as "changes requested".
                        </p>
                      </div>
                      <Switch
                        checked={commentPermissions.allowMarkedReview}
                        onCheckedChange={(checked) =>
                          setCommentPermissions((prev) => ({ ...prev, allowMarkedReview: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow review navigation</p>
                        <p className="text-sm text-muted-foreground">
                          Allow navigating between changed files in a review.
                        </p>
                      </div>
                      <Switch
                        checked={commentPermissions.allowReviewNavigation}
                        onCheckedChange={(checked) =>
                          setCommentPermissions((prev) => ({
                            ...prev,
                            allowReviewNavigation: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Auto-dismiss</h2>
                    <p className="text-sm text-muted-foreground">
                      Automatically dismiss review requests when conditions are met.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Auto-dismiss approved reviews</p>
                        <p className="text-sm text-muted-foreground">
                          Dismiss approved reviews when new commits are pushed.
                        </p>
                      </div>
                      <Switch
                        checked={autoDismiss.dismissApproved}
                        onCheckedChange={(checked) =>
                          setAutoDismiss((prev) => ({ ...prev, dismissApproved: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Auto-dismiss pending reviews</p>
                        <p className="text-sm text-muted-foreground">
                          Dismiss pending reviews when new commits are pushed.
                        </p>
                      </div>
                      <Switch
                        checked={autoDismiss.dismissPending}
                        onCheckedChange={(checked) =>
                          setAutoDismiss((prev) => ({ ...prev, dismissPending: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Review monitoring</h2>
                    <p className="text-sm text-muted-foreground">
                      Track and monitor pending review requests in this repository.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All statuses</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="changes_requested">Changes requested</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border rounded-lg">
                      {filteredRequests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <ShieldCheck className="w-12 h-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No pending reviews</p>
                        </div>
                      ) : (
                        <div className="divide-y">
                          {filteredRequests.map((request) => (
                            <div key={request.id} className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                  <Users className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="font-medium">{request.user}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Requested{" "}
                                    {new Date(request.requestedAt).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(request.status)}
                                {getStatusBadge(request.status)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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
