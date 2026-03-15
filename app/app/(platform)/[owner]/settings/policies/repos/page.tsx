"use client";

import * as React from "react";
import { use } from "react";
import { OrgSettingSidebar } from "@/components/organizations/OrgSettingSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { GitBranch, Eye, Archive, Trash2 } from "lucide-react";

interface ReposPoliciesPageProps {
  params: Promise<{ owner: string }>;
}

export default function ReposPoliciesPage({ params }: ReposPoliciesPageProps) {
  const resolvedParams = use(params);
  const { owner } = resolvedParams;

  const [isSaving, setIsSaving] = React.useState(false);
  const [formData, setFormData] = React.useState({
    allowRepositoryCreation: true,
    repositoryCreationType: "all",
    allowRepositoryDeletion: true,
    allowRepositoryRenaming: true,
    allowPublicRepositoryCreation: true,
    allowPrivateRepositoryCreation: true,
    allowPublicVisibilityChanges: true,
    allowPrivateVisibilityChanges: true,
    allowForking: true,
    allowPrivateForking: false,
    defaultBranchName: "main",
    allowArchivedRepos: true,
    allowArchivedForking: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to save repository policies:", error);
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
                <h1 className="text-2xl font-semibold">Repository policies</h1>
                <p className="text-muted-foreground mt-1">
                  Manage repository creation and management policies for your organization
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      <GitBranch className="w-5 h-5 inline mr-2" />
                      Repository creation
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Control who can create repositories in your organization.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow repository creation</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow members to create repositories in the organization
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowRepositoryCreation}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowRepositoryCreation: checked }))
                        }
                      />
                    </div>

                    {formData.allowRepositoryCreation && (
                      <div className="space-y-3 pl-4 border-l-2 border-muted">
                        <div className="space-y-2">
                          <Label>Who can create repositories</Label>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                id="creation-all"
                                name="creation-type"
                                className="w-4 h-4"
                                checked={formData.repositoryCreationType === "all"}
                                onChange={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    repositoryCreationType: "all",
                                  }))
                                }
                              />
                              <Label htmlFor="creation-all" className="font-normal cursor-pointer">
                                All members
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                id="creation-admin"
                                name="creation-type"
                                className="w-4 h-4"
                                checked={formData.repositoryCreationType === "admin"}
                                onChange={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    repositoryCreationType: "admin",
                                  }))
                                }
                              />
                              <Label
                                htmlFor="creation-admin"
                                className="font-normal cursor-pointer"
                              >
                                Admin members only
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                id="creation-none"
                                name="creation-type"
                                className="w-4 h-4"
                                checked={formData.repositoryCreationType === "none"}
                                onChange={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    repositoryCreationType: "none",
                                  }))
                                }
                              />
                              <Label htmlFor="creation-none" className="font-normal cursor-pointer">
                                No one
                              </Label>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Allow public repository creation</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow members to create public repositories
                            </p>
                          </div>
                          <Switch
                            checked={formData.allowPublicRepositoryCreation}
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({
                                ...prev,
                                allowPublicRepositoryCreation: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Allow private repository creation</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow members to create private repositories
                            </p>
                          </div>
                          <Switch
                            checked={formData.allowPrivateRepositoryCreation}
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({
                                ...prev,
                                allowPrivateRepositoryCreation: checked,
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
                  <div>
                    <h2 className="text-xl font-semibold">
                      <Trash2 className="w-5 h-5 inline mr-2" />
                      Repository deletion and renaming
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Control repository deletion and renaming capabilities.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow repository deletion</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow members to delete repositories in the organization
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowRepositoryDeletion}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowRepositoryDeletion: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow repository renaming</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow members to rename repositories
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowRepositoryRenaming}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowRepositoryRenaming: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      <Eye className="w-5 h-5 inline mr-2" />
                      Visibility changes
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Control who can change repository visibility.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow public visibility changes</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow changing repositories to public
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowPublicVisibilityChanges}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            allowPublicVisibilityChanges: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow private visibility changes</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow changing repositories to private
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowPrivateVisibilityChanges}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            allowPrivateVisibilityChanges: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      <GitBranch className="w-5 h-5 inline mr-2" />
                      Repository forking
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Control forking settings for organization repositories.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow forking</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow forking of organization repositories
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowForking}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowForking: checked }))
                        }
                      />
                    </div>

                    {formData.allowForking && (
                      <div className="flex items-center justify-between pl-4 border-l-2 border-muted">
                        <div className="space-y-0.5">
                          <Label>Allow private repository forking</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow forking of private repositories
                          </p>
                        </div>
                        <Switch
                          checked={formData.allowPrivateForking}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, allowPrivateForking: checked }))
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      <Archive className="w-5 h-5 inline mr-2" />
                      Archived repositories
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage settings for archived repositories.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow archiving repositories</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow members to archive repositories
                        </p>
                      </div>
                      <Switch
                        checked={formData.allowArchivedRepos}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, allowArchivedRepos: checked }))
                        }
                      />
                    </div>

                    {formData.allowArchivedRepos && (
                      <div className="flex items-center justify-between pl-4 border-l-2 border-muted">
                        <div className="space-y-0.5">
                          <Label>Allow forking archived repositories</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow forking of archived repositories
                          </p>
                        </div>
                        <Switch
                          checked={formData.allowArchivedForking}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, allowArchivedForking: checked }))
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      <GitBranch className="w-5 h-5 inline mr-2" />
                      Default branch
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Configure default branch settings for new repositories.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-branch">Default branch name</Label>
                      <Input
                        id="default-branch"
                        value={formData.defaultBranchName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, defaultBranchName: e.target.value }))
                        }
                        placeholder="main"
                      />
                      <p className="text-xs text-muted-foreground">
                        The default name for new repositories in your organization.
                      </p>
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
