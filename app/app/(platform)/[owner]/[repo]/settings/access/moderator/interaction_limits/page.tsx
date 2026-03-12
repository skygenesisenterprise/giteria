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
  Users,
  Ban,
  Clock,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  UserMinus,
  Eye,
  EyeOff,
} from "lucide-react";

interface RestrictedUser {
  id: string;
  username: string;
  avatarUrl?: string;
  restrictionType: "temporary" | "permanent";
  expiresAt?: string;
  reason: string;
}

interface SettingsModeratorInteractionLimitsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsModeratorInteractionLimitsPage({
  params,
}: SettingsModeratorInteractionLimitsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [interactionSettings, setInteractionSettings] = React.useState({
    limitRepositoryInteractions: false,
    interactionLimitDuration: "6months",
    limitType: "first-time",
    newUserRestrictions: false,
    newUserLimitDays: 90,
    allowExistingUsers: true,
  });

  const [temporaryLimits, setTemporaryLimits] = React.useState({
    enableTempRestrictions: false,
    tempRestrictionType: "create-issues",
    tempLimitHours: 24,
  });

  const [restrictedUsers, setRestrictedUsers] = React.useState<RestrictedUser[]>([
    {
      id: "1",
      username: "spammer_user",
      restrictionType: "permanent",
      reason: "Repeated spam behavior in issues",
    },
    {
      id: "2",
      username: "temp_block",
      restrictionType: "temporary",
      expiresAt: "2024-02-01T00:00:00Z",
      reason: "Violated community guidelines",
    },
  ]);

  const [newUserSettings, setNewUserSettings] = React.useState({
    enableNewUserLimits: false,
    limitDays: 90,
    allowedInteractions: ["pull-requests", "issues"],
    exemptUsers: [] as string[],
  });

  const [isSaving, setIsSaving] = React.useState(false);
  const [isAddingUser, setIsAddingUser] = React.useState(false);
  const [newUserToAdd, setNewUserToAdd] = React.useState("");
  const [newUserReason, setNewUserReason] = React.useState("");
  const [newUserExpiry, setNewUserExpiry] = React.useState("");

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleAddRestrictedUser = async () => {
    if (!newUserToAdd.trim() || !newUserReason.trim()) return;
    setIsAddingUser(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: RestrictedUser = {
      id: Date.now().toString(),
      username: newUserToAdd,
      restrictionType: newUserExpiry ? "temporary" : "permanent",
      expiresAt: newUserExpiry || undefined,
      reason: newUserReason,
    };

    setRestrictedUsers((prev) => [...prev, newUser]);
    setNewUserToAdd("");
    setNewUserReason("");
    setNewUserExpiry("");
    setIsAddingUser(false);
  };

  const handleRemoveUser = (userId: string) => {
    setRestrictedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const getExpiryBadge = (user: RestrictedUser) => {
    if (user.restrictionType === "permanent") {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Permanent</Badge>;
    }
    if (user.expiresAt) {
      const isExpired = new Date(user.expiresAt) < new Date();
      return (
        <Badge
          className={isExpired ? "bg-gray-100 text-gray-800" : "bg-yellow-100 text-yellow-800"}
        >
          {isExpired ? "Expired" : "Temporary"}
        </Badge>
      );
    }
    return null;
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
                <h1 className="text-2xl font-semibold">Interaction limits</h1>
                <p className="text-muted-foreground mt-1">
                  Manage interaction limits and user restrictions
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Repository interaction limits</h2>
                    <p className="text-sm text-muted-foreground">
                      Temporarily restrict certain interactions in this repository.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Limit interactions</p>
                        <p className="text-sm text-muted-foreground">
                          Temporarily limit certain users from interacting with this repository.
                        </p>
                      </div>
                      <Switch
                        checked={interactionSettings.limitRepositoryInteractions}
                        onCheckedChange={(checked) =>
                          setInteractionSettings((prev) => ({
                            ...prev,
                            limitRepositoryInteractions: checked,
                          }))
                        }
                      />
                    </div>

                    {interactionSettings.limitRepositoryInteractions && (
                      <div className="ml-6 space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Limit duration</p>
                            <p className="text-sm text-muted-foreground">
                              How long the interaction limit will be in effect.
                            </p>
                          </div>
                          <Select
                            value={interactionSettings.interactionLimitDuration}
                            onValueChange={(value) =>
                              setInteractionSettings((prev) => ({
                                ...prev,
                                interactionLimitDuration: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="24hours">24 hours</SelectItem>
                              <SelectItem value="3days">3 days</SelectItem>
                              <SelectItem value="1week">1 week</SelectItem>
                              <SelectItem value="1month">1 month</SelectItem>
                              <SelectItem value="6months">6 months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Limit type</p>
                            <p className="text-sm text-muted-foreground">
                              Which users are affected by this limit.
                            </p>
                          </div>
                          <Select
                            value={interactionSettings.limitType}
                            onValueChange={(value) =>
                              setInteractionSettings((prev) => ({
                                ...prev,
                                limitType: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="first-time">
                                Users with first-time contributions
                              </SelectItem>
                              <SelectItem value="new-users">New users</SelectItem>
                              <SelectItem value="everyone">Everyone</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">New user restrictions</h2>
                    <p className="text-sm text-muted-foreground">
                      Restrict interactions from newly created accounts.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable new user restrictions</p>
                        <p className="text-sm text-muted-foreground">
                          Restrict interactions from accounts less than a certain age.
                        </p>
                      </div>
                      <Switch
                        checked={newUserSettings.enableNewUserLimits}
                        onCheckedChange={(checked) =>
                          setNewUserSettings((prev) => ({
                            ...prev,
                            enableNewUserLimits: checked,
                          }))
                        }
                      />
                    </div>

                    {newUserSettings.enableNewUserLimits && (
                      <div className="ml-6 space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Account age limit</p>
                            <p className="text-sm text-muted-foreground">
                              Minimum account age in days to interact.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={newUserSettings.limitDays}
                              onChange={(e) =>
                                setNewUserSettings((prev) => ({
                                  ...prev,
                                  limitDays: parseInt(e.target.value) || 90,
                                }))
                              }
                              className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">days</span>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <div className="space-y-3">
                            <p className="font-medium">Allowed interactions</p>
                            <p className="text-sm text-muted-foreground">
                              Select which interactions are allowed for new users.
                            </p>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={newUserSettings.allowedInteractions.includes(
                                    "pull-requests"
                                  )}
                                  onCheckedChange={(checked) => {
                                    setNewUserSettings((prev) => ({
                                      ...prev,
                                      allowedInteractions: checked
                                        ? [...prev.allowedInteractions, "pull-requests"]
                                        : prev.allowedInteractions.filter(
                                            (i) => i !== "pull-requests"
                                          ),
                                    }));
                                  }}
                                />
                                <Label>Pull requests</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={newUserSettings.allowedInteractions.includes("issues")}
                                  onCheckedChange={(checked) => {
                                    setNewUserSettings((prev) => ({
                                      ...prev,
                                      allowedInteractions: checked
                                        ? [...prev.allowedInteractions, "issues"]
                                        : prev.allowedInteractions.filter((i) => i !== "issues"),
                                    }));
                                  }}
                                />
                                <Label>Issues</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={newUserSettings.allowedInteractions.includes("comments")}
                                  onCheckedChange={(checked) => {
                                    setNewUserSettings((prev) => ({
                                      ...prev,
                                      allowedInteractions: checked
                                        ? [...prev.allowedInteractions, "comments"]
                                        : prev.allowedInteractions.filter((i) => i !== "comments"),
                                    }));
                                  }}
                                />
                                <Label>Comments</Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Temporary restrictions</h2>
                    <p className="text-sm text-muted-foreground">
                      Set up temporary interaction restrictions for specific activities.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable temporary restrictions</p>
                        <p className="text-sm text-muted-foreground">
                          Temporarily restrict specific interaction types.
                        </p>
                      </div>
                      <Switch
                        checked={temporaryLimits.enableTempRestrictions}
                        onCheckedChange={(checked) =>
                          setTemporaryLimits((prev) => ({
                            ...prev,
                            enableTempRestrictions: checked,
                          }))
                        }
                      />
                    </div>

                    {temporaryLimits.enableTempRestrictions && (
                      <div className="ml-6 space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Restriction type</p>
                            <p className="text-sm text-muted-foreground">
                              Which interactions to temporarily restrict.
                            </p>
                          </div>
                          <Select
                            value={temporaryLimits.tempRestrictionType}
                            onValueChange={(value) =>
                              setTemporaryLimits((prev) => ({
                                ...prev,
                                tempRestrictionType: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="create-issues">Create issues</SelectItem>
                              <SelectItem value="create-prs">Create pull requests</SelectItem>
                              <SelectItem value="create-comments">Create comments</SelectItem>
                              <SelectItem value="all">All interactions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Limit duration</p>
                            <p className="text-sm text-muted-foreground">
                              How long the temporary restriction will last.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={temporaryLimits.tempLimitHours}
                              onChange={(e) =>
                                setTemporaryLimits((prev) => ({
                                  ...prev,
                                  tempLimitHours: parseInt(e.target.value) || 24,
                                }))
                              }
                              className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">hours</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Restricted users</h2>
                    <p className="text-sm text-muted-foreground">
                      Manage users who are restricted from interacting with this repository.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          placeholder="Enter username"
                          value={newUserToAdd}
                          onChange={(e) => setNewUserToAdd(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason</Label>
                        <Input
                          id="reason"
                          placeholder="Reason for restriction"
                          value={newUserReason}
                          onChange={(e) => setNewUserReason(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expires">Expires (optional)</Label>
                        <Input
                          id="expires"
                          type="date"
                          value={newUserExpiry}
                          onChange={(e) => setNewUserExpiry(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleAddRestrictedUser}
                      disabled={isAddingUser || !newUserToAdd.trim() || !newUserReason.trim()}
                    >
                      {isAddingUser && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      <UserMinus className="w-4 h-4 mr-2" />
                      Restrict user
                    </Button>

                    <div className="border rounded-lg">
                      {restrictedUsers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Users className="w-12 h-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No restricted users</p>
                        </div>
                      ) : (
                        <div className="divide-y">
                          {restrictedUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                  <Ban className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{user.username}</p>
                                    {getExpiryBadge(user)}
                                  </div>
                                  <p className="text-sm text-muted-foreground">{user.reason}</p>
                                  {user.expiresAt && (
                                    <p className="text-xs text-muted-foreground">
                                      Expires:{" "}
                                      {new Date(user.expiresAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveUser(user.id)}
                              >
                                <XCircle className="w-4 h-4 text-muted-foreground hover:text-green-600" />
                              </Button>
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
