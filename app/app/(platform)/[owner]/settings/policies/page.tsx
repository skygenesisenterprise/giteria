"use client";

import * as React from "react";
import { use } from "react";
import { OrgSettingSidebar } from "@/components/organizations/OrgSettingSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, Globe, Users } from "lucide-react";

interface PoliciesPageProps {
  params: Promise<{ owner: string }>;
}

export default function PoliciesPage({ params }: PoliciesPageProps) {
  const resolvedParams = use(params);
  const { owner } = resolvedParams;

  const [isSaving, setIsSaving] = React.useState(false);
  const [formData, setFormData] = React.useState({
    baseRole: "read",
    defaultRepoPermission: "none",
    allowPrivateRepositoryForks: false,
    allowPublicRepositoryForks: true,
    allowForking: true,
    require2FA: false,
    requireSignedCommits: false,
    requireMergeQueue: false,
    requireStatusChecks: true,
    requireAdminReview: false,
    allowForcePushes: false,
    allowDeletion: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to save policies:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <OrgSettingSidebar owner={owner} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Policies</h1>
                <p className="text-muted-foreground mt-1">
                  Manage organization policies and default settings
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">General</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Configure base permission and forking settings for your organization.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="base-role">Base role</Label>
                      <Input id="base-role" value={formData.baseRole} disabled />
                      <p className="text-xs text-muted-foreground">
                        The default role for organization members. This setting cannot be changed.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="default-repo-permission">Default repository permission</Label>
                      <select
                        id="default-repo-permission"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.defaultRepoPermission}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            defaultRepoPermission: e.target.value,
                          }))
                        }
                      >
                        <option value="none">No access</option>
                        <option value="read">Read</option>
                        <option value="write">Write</option>
                        <option value="admin">Admin</option>
                      </select>
                      <p className="text-xs text-muted-foreground">
                        The default permission for organization members on new repositories.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      <Globe className="w-5 h-5 inline mr-2" />
                      Repository forking
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Control whether members can fork repositories within your organization.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow forking</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow organization members to fork private repositories
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowForking}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowForking: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow public repository forks</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow forking of public repositories
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowPublicRepositoryForks}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowPublicRepositoryForks: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow private repository forks</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow forking of private repositories
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowPrivateRepositoryForks}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowPrivateRepositoryForks: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      <Shield className="w-5 h-5 inline mr-2" />
                      Security
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Configure security policies for your organization.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require 2FA</Label>
                        <p className="text-sm text-muted-foreground">
                          Require two-factor authentication for all organization members
                        </p>
                      </div>
                      <Switch
                        checked={formData.require2FA}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, require2FA: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require signed commits</Label>
                        <p className="text-sm text-muted-foreground">
                          Require signed commits on all commits
                        </p>
                      </div>
                      <Switch
                        checked={formData.requireSignedCommits}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, requireSignedCommits: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow force pushes</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow force pushes to repositories
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowForcePushes}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowForcePushes: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow repository deletion</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow members to delete repositories
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowDeletion}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowDeletion: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      <Lock className="w-5 h-5 inline mr-2" />
                      Merge settings
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Configure merge requirements for pull requests.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require merge queue</Label>
                        <p className="text-sm text-muted-foreground">
                          Require pull requests to go through the merge queue
                        </p>
                      </div>
                      <Switch
                        checked={formData.requireMergeQueue}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, requireMergeQueue: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require status checks</Label>
                        <p className="text-sm text-muted-foreground">
                          Require status checks to pass before merging
                        </p>
                      </div>
                      <Switch
                        checked={formData.requireStatusChecks}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, requireStatusChecks: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require admin review</Label>
                        <p className="text-sm text-muted-foreground">
                          Require review from an admin before merging
                        </p>
                      </div>
                      <Switch
                        checked={formData.requireAdminReview}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, requireAdminReview: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save changes"}
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
