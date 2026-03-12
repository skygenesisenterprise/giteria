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
import { Tag, Plus, Trash2, Edit, Shield, ShieldCheck, Lock, Loader2, Copy } from "lucide-react";

interface TagProtectionRule {
  id: string;
  pattern: string;
  isProtected: boolean;
  requireSignedCommits: boolean;
  requireWorkflows: boolean;
  allowUpdates: boolean;
}

interface Tag {
  name: string;
  sha: string;
  date: string;
  message: string;
}

interface SettingsTagsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsTagsPage({ params }: SettingsTagsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [protectionRules, setProtectionRules] = React.useState<TagProtectionRule[]>([
    {
      id: "1",
      pattern: "v[0-9]*.[0-9]*.[0-9]*",
      isProtected: true,
      requireSignedCommits: true,
      requireWorkflows: false,
      allowUpdates: false,
    },
    {
      id: "2",
      pattern: "release/*",
      isProtected: true,
      requireSignedCommits: false,
      requireWorkflows: true,
      allowUpdates: false,
    },
  ]);

  const [tags, setTags] = React.useState<Tag[]>([
    { name: "v1.0.0", sha: "abc1234", date: "2024-01-15", message: "Release 1.0.0" },
    { name: "v0.9.0", sha: "def5678", date: "2024-01-10", message: "Release 0.9.0" },
    { name: "v0.8.5", sha: "ghi9012", date: "2024-01-05", message: "Hotfix release" },
    { name: "release/2024.01", sha: "jkl3456", date: "2024-01-01", message: "Monthly release" },
  ]);

  const [tagNamingPattern, setTagNamingPattern] = React.useState({
    enabled: false,
    pattern: "",
    example: "v1.0.0, release/*, hotfix/*",
  });

  const [deleteSettings, setDeleteSettings] = React.useState({
    allowDeletions: false,
    requireAdminApproval: true,
  });

  const [selectedRule, setSelectedRule] = React.useState<TagProtectionRule | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isAddRuleDialogOpen, setIsAddRuleDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [newRulePattern, setNewRulePattern] = React.useState("");

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleEditRule = (rule: TagProtectionRule) => {
    setSelectedRule({ ...rule });
    setIsEditDialogOpen(true);
  };

  const handleUpdateRule = () => {
    if (!selectedRule) return;
    setProtectionRules((prev) =>
      prev.map((rule) => (rule.id === selectedRule.id ? selectedRule : rule))
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteRule = (ruleId: string) => {
    setProtectionRules((prev) => prev.filter((rule) => rule.id !== ruleId));
  };

  const handleAddRule = () => {
    if (!newRulePattern.trim()) return;
    const newRule: TagProtectionRule = {
      id: Date.now().toString(),
      pattern: newRulePattern,
      isProtected: true,
      requireSignedCommits: false,
      requireWorkflows: false,
      allowUpdates: false,
    };
    setProtectionRules((prev) => [...prev, newRule]);
    setNewRulePattern("");
    setIsAddRuleDialogOpen(false);
  };

  const handleDeleteTag = (tagName: string) => {
    setTags((prev) => prev.filter((tag) => tag.name !== tagName));
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
                <h1 className="text-2xl font-semibold">Tags</h1>
                <p className="text-muted-foreground mt-1">
                  Manage tag protection rules and tag settings
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Tag protection rules</h2>
                      <p className="text-sm text-muted-foreground">
                        Protect tags to enforce release workflows and prevent unauthorized changes.
                      </p>
                    </div>
                    <Dialog open={isAddRuleDialogOpen} onOpenChange={setIsAddRuleDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add rule
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>New tag protection rule</DialogTitle>
                          <DialogDescription>
                            Create a new tag protection rule. You can use glob patterns to match
                            multiple tags.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="tag-pattern">Tag pattern</Label>
                            <Input
                              id="tag-pattern"
                              placeholder="e.g., v1.*, release/*, hotfix/*"
                              value={newRulePattern}
                              onChange={(e) => setNewRulePattern(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              Use * to match multiple tags. Example: v1.* matches v1.0, v1.1, etc.
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddRuleDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddRule} disabled={!newRulePattern.trim()}>
                            Create rule
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="border rounded-lg">
                    {protectionRules.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Shield className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No tag protection rules</p>
                        <Button
                          variant="link"
                          onClick={() => setIsAddRuleDialogOpen(true)}
                          className="mt-2"
                        >
                          Add your first rule
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {protectionRules.map((rule) => (
                          <div key={rule.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {rule.isProtected ? (
                                  <ShieldCheck className="w-5 h-5 text-green-600" />
                                ) : (
                                  <Shield className="w-5 h-5 text-muted-foreground" />
                                )}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium font-mono">{rule.pattern}</p>
                                    {rule.isProtected && (
                                      <Badge className="bg-green-100 text-green-800">
                                        Protected
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {rule.requireSignedCommits && (
                                      <span className="flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> Signed commits
                                      </span>
                                    )}
                                    {rule.requireWorkflows && <span>• Workflows required</span>}
                                    {!rule.allowUpdates && (
                                      <span className="flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> No updates
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditRule(rule)}
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteRule(rule.id)}
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
                    <h2 className="text-xl font-semibold">Tag naming</h2>
                    <p className="text-sm text-muted-foreground">
                      Require tags to follow a specific naming pattern.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable tag naming pattern</p>
                        <p className="text-sm text-muted-foreground">
                          Require tags to match a naming pattern.
                        </p>
                      </div>
                      <Switch
                        checked={tagNamingPattern.enabled}
                        onCheckedChange={(checked) =>
                          setTagNamingPattern((prev) => ({ ...prev, enabled: checked }))
                        }
                      />
                    </div>

                    {tagNamingPattern.enabled && (
                      <div className="p-4 border rounded-lg space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="tag-naming-pattern">Naming pattern (glob)</Label>
                          <Input
                            id="tag-naming-pattern"
                            placeholder="v[0-9]*.[0-9]*.[0-9]*"
                            value={tagNamingPattern.pattern}
                            onChange={(e) =>
                              setTagNamingPattern((prev) => ({ ...prev, pattern: e.target.value }))
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter a glob pattern. Example: v* matches all version tags.
                          </p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Valid examples:</p>
                          <p className="text-sm font-mono mt-1">{tagNamingPattern.example}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Tag deletion</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure how tags can be deleted.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow tag deletions</p>
                        <p className="text-sm text-muted-foreground">
                          Allow tags to be deleted from this repository.
                        </p>
                      </div>
                      <Switch
                        checked={deleteSettings.allowDeletions}
                        onCheckedChange={(checked) =>
                          setDeleteSettings((prev) => ({ ...prev, allowDeletions: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Require admin approval</p>
                        <p className="text-sm text-muted-foreground">
                          Require administrator approval to delete protected tags.
                        </p>
                      </div>
                      <Switch
                        checked={deleteSettings.requireAdminApproval}
                        onCheckedChange={(checked) =>
                          setDeleteSettings((prev) => ({ ...prev, requireAdminApproval: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Recent tags</h2>
                    <p className="text-sm text-muted-foreground">
                      View and manage recent tags in this repository.
                    </p>
                  </div>

                  <div className="border rounded-lg">
                    {tags.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Tag className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No tags found</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {tags.map((tag) => (
                          <div key={tag.name} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <Tag className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium font-mono">{tag.name}</p>
                                  {protectionRules.some((rule) => {
                                    const pattern = rule.pattern.replace(/\*/g, ".*");
                                    const regex = new RegExp(`^${pattern}$`);
                                    return regex.test(tag.name) && rule.isProtected;
                                  }) && (
                                    <Badge className="bg-green-100 text-green-800">Protected</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {tag.message} • {tag.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" disabled>
                                <Copy className="w-4 h-4 mr-1" />
                                {tag.sha.substring(0, 7)}
                              </Button>
                              {deleteSettings.allowDeletions && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteTag(tag.name)}
                                >
                                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
                                </Button>
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit tag protection rule</DialogTitle>
            <DialogDescription>
              Configure protection settings for tags matching "{selectedRule?.pattern}"
            </DialogDescription>
          </DialogHeader>
          {selectedRule && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Protected</p>
                  <p className="text-sm text-muted-foreground">
                    Enable protection for this tag pattern
                  </p>
                </div>
                <Switch
                  checked={selectedRule.isProtected}
                  onCheckedChange={(checked) =>
                    setSelectedRule((prev) => (prev ? { ...prev, isProtected: checked } : null))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Require signed commits</p>
                  <p className="text-sm text-muted-foreground">
                    Require signed commits for tags matching this pattern
                  </p>
                </div>
                <Switch
                  checked={selectedRule.requireSignedCommits}
                  onCheckedChange={(checked) =>
                    setSelectedRule((prev) =>
                      prev ? { ...prev, requireSignedCommits: checked } : null
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Require workflows</p>
                  <p className="text-sm text-muted-foreground">
                    Require workflows to pass before creating tags
                  </p>
                </div>
                <Switch
                  checked={selectedRule.requireWorkflows}
                  onCheckedChange={(checked) =>
                    setSelectedRule((prev) =>
                      prev ? { ...prev, requireWorkflows: checked } : null
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Allow updates</p>
                  <p className="text-sm text-muted-foreground">Allow existing tags to be updated</p>
                </div>
                <Switch
                  checked={selectedRule.allowUpdates}
                  onCheckedChange={(checked) =>
                    setSelectedRule((prev) => (prev ? { ...prev, allowUpdates: checked } : null))
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRule}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
