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
  GitBranch,
  GitPullRequest,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Plus,
  Trash2,
  Edit,
  Copy,
  ArrowRight,
  Lock,
  Unlock,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

interface BranchProtectionRule {
  id: string;
  name: string;
  isDefault: boolean;
  requiresReview: boolean;
  requiredApprovals: number;
  dismissStaleReviews: boolean;
  requireCodeOwnerReview: boolean;
  requireLastPushApproval: boolean;
  requireStatusChecks: boolean;
  requireStrictStatusChecks: boolean;
  statusChecks: string[];
  restrictReviewDismissals: boolean;
  allowedReviewers: number;
  requireSignedCommits: boolean;
  requireLinearHistory: boolean;
  allowForcePushes: boolean;
  allowDeletions: boolean;
}

interface Branch {
  name: string;
  isDefault: boolean;
  isProtected: boolean;
  lastCommit: string;
  lastCommitDate: string;
}

interface SettingsBranchesPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsBranchesPage({ params }: SettingsBranchesPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [defaultBranch, setDefaultBranch] = React.useState("main");
  const [branches, setBranches] = React.useState<Branch[]>([
    {
      name: "main",
      isDefault: true,
      isProtected: true,
      lastCommit: "Update README",
      lastCommitDate: "2024-01-15",
    },
    {
      name: "develop",
      isDefault: false,
      isProtected: false,
      lastCommit: "Add new feature",
      lastCommitDate: "2024-01-14",
    },
    {
      name: "feature/new-ui",
      isDefault: false,
      isProtected: false,
      lastCommit: "Component changes",
      lastCommitDate: "2024-01-13",
    },
    {
      name: "fix/auth-bug",
      isDefault: false,
      isProtected: true,
      lastCommit: "Fix login issue",
      lastCommitDate: "2024-01-12",
    },
  ]);

  const [protectionRules, setProtectionRules] = React.useState<BranchProtectionRule[]>([
    {
      id: "1",
      name: "main",
      isDefault: true,
      requiresReview: true,
      requiredApprovals: 1,
      dismissStaleReviews: true,
      requireCodeOwnerReview: false,
      requireLastPushApproval: true,
      requireStatusChecks: true,
      requireStrictStatusChecks: true,
      statusChecks: ["build", "test", "lint"],
      restrictReviewDismissals: false,
      allowedReviewers: 0,
      requireSignedCommits: false,
      requireLinearHistory: false,
      allowForcePushes: false,
      allowDeletions: false,
    },
  ]);

  const [branchNamingPattern, setBranchNamingPattern] = React.useState({
    enabled: false,
    pattern: "",
    example: "feature/*, bugfix/*, hotfix/*",
  });

  const [selectedRule, setSelectedRule] = React.useState<BranchProtectionRule | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isAddRuleDialogOpen, setIsAddRuleDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [newRuleName, setNewRuleName] = React.useState("");

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleEditRule = (rule: BranchProtectionRule) => {
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
    if (!newRuleName.trim()) return;
    const newRule: BranchProtectionRule = {
      id: Date.now().toString(),
      name: newRuleName,
      isDefault: false,
      requiresReview: false,
      requiredApprovals: 1,
      dismissStaleReviews: true,
      requireCodeOwnerReview: false,
      requireLastPushApproval: false,
      requireStatusChecks: false,
      requireStrictStatusChecks: false,
      statusChecks: [],
      restrictReviewDismissals: false,
      allowedReviewers: 0,
      requireSignedCommits: false,
      requireLinearHistory: false,
      allowForcePushes: false,
      allowDeletions: false,
    };
    setProtectionRules((prev) => [...prev, newRule]);
    setNewRuleName("");
    setIsAddRuleDialogOpen(false);
  };

  const getStatusChecksLabel = (rule: BranchProtectionRule) => {
    if (!rule.requireStatusChecks) return "No status checks";
    if (rule.statusChecks.length === 0) return "Any status check";
    return `${rule.statusChecks.length} status check(s)`;
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
                <h1 className="text-2xl font-semibold">Branches</h1>
                <p className="text-muted-foreground mt-1">
                  Manage branch protection rules and default branch settings
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Default branch</h2>
                    <p className="text-sm text-muted-foreground">
                      The default branch is the branch that users see when they first visit your
                      repository.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <Label htmlFor="default-branch">Default branch name</Label>
                      <Select value={defaultBranch} onValueChange={setDefaultBranch}>
                        <SelectTrigger className="w-64 mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch.name} value={branch.name}>
                              {branch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" disabled>
                        <GitBranch className="w-4 h-4 mr-2" />
                        View branch
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Branch protection rules</h2>
                      <p className="text-sm text-muted-foreground">
                        Protect branches to enforce workflows and prevent force pushes or deletions.
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
                          <DialogTitle>New branch protection rule</DialogTitle>
                          <DialogDescription>
                            Create a new branch protection rule. You can use glob patterns to match
                            multiple branches.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="rule-name">Branch name pattern</Label>
                            <Input
                              id="rule-name"
                              placeholder="e.g., main, release/*, feature/*"
                              value={newRuleName}
                              onChange={(e) => setNewRuleName(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              Use * to match multiple branches. Example: feature/* matches all
                              feature branches.
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddRuleDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddRule} disabled={!newRuleName.trim()}>
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
                        <p className="text-muted-foreground">No branch protection rules</p>
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
                                {rule.isDefault ? (
                                  <ShieldCheck className="w-5 h-5 text-green-600" />
                                ) : (
                                  <Shield className="w-5 h-5 text-muted-foreground" />
                                )}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{rule.name}</p>
                                    {rule.isDefault && (
                                      <Badge className="bg-green-100 text-green-800">Default</Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>
                                      {rule.requiresReview
                                        ? `${rule.requiredApprovals} approval(s)`
                                        : "No reviews required"}
                                    </span>
                                    <span>•</span>
                                    <span>{getStatusChecksLabel(rule)}</span>
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
                    <h2 className="text-xl font-semibold">Branch naming</h2>
                    <p className="text-sm text-muted-foreground">
                      Require branches to follow a specific naming pattern.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable branch naming pattern</p>
                        <p className="text-sm text-muted-foreground">
                          Require branches to match a naming pattern.
                        </p>
                      </div>
                      <Switch
                        checked={branchNamingPattern.enabled}
                        onCheckedChange={(checked) =>
                          setBranchNamingPattern((prev) => ({ ...prev, enabled: checked }))
                        }
                      />
                    </div>

                    {branchNamingPattern.enabled && (
                      <div className="p-4 border rounded-lg space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="naming-pattern">Naming pattern (regex)</Label>
                          <Input
                            id="naming-pattern"
                            placeholder="^(feature|bugfix|hotfix)/.*$"
                            value={branchNamingPattern.pattern}
                            onChange={(e) =>
                              setBranchNamingPattern((prev) => ({
                                ...prev,
                                pattern: e.target.value,
                              }))
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter a regular expression pattern. Example: ^(feature|bugfix)/.+$
                          </p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Valid examples:</p>
                          <p className="text-sm font-mono mt-1">{branchNamingPattern.example}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Branch updates</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure how branches can be updated.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow force pushes</p>
                        <p className="text-sm text-muted-foreground">
                          Allow force pushes to protected branches.
                        </p>
                      </div>
                      <Switch disabled />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow branch deletions</p>
                        <p className="text-sm text-muted-foreground">
                          Allow deletion of protected branches.
                        </p>
                      </div>
                      <Switch disabled />
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
            <DialogTitle>Edit branch protection rule</DialogTitle>
            <DialogDescription>
              Configure protection settings for branches matching "{selectedRule?.name}"
            </DialogDescription>
          </DialogHeader>
          {selectedRule && (
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <h3 className="font-medium">Require reviews</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Require approvals</p>
                      <p className="text-xs text-muted-foreground">
                        Require at least one approving review
                      </p>
                    </div>
                    <Switch
                      checked={selectedRule.requiresReview}
                      onCheckedChange={(checked) =>
                        setSelectedRule((prev) =>
                          prev ? { ...prev, requiresReview: checked } : null
                        )
                      }
                    />
                  </div>
                  {selectedRule.requiresReview && (
                    <div className="ml-6 flex items-center gap-4 p-3 border rounded-lg">
                      <p className="text-sm">Required approvals:</p>
                      <Select
                        value={selectedRule.requiredApprovals.toString()}
                        onValueChange={(value) =>
                          setSelectedRule((prev) =>
                            prev ? { ...prev, requiredApprovals: parseInt(value) } : null
                          )
                        }
                      >
                        <SelectTrigger className="w-20">
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
                  )}
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Dismiss stale reviews</p>
                      <p className="text-xs text-muted-foreground">
                        Automatically dismiss reviews when new commits are pushed
                      </p>
                    </div>
                    <Switch
                      checked={selectedRule.dismissStaleReviews}
                      onCheckedChange={(checked) =>
                        setSelectedRule((prev) =>
                          prev ? { ...prev, dismissStaleReviews: checked } : null
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Require code owner reviews</p>
                      <p className="text-xs text-muted-foreground">
                        Require review from code owners
                      </p>
                    </div>
                    <Switch
                      checked={selectedRule.requireCodeOwnerReview}
                      onCheckedChange={(checked) =>
                        setSelectedRule((prev) =>
                          prev ? { ...prev, requireCodeOwnerReview: checked } : null
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Require last push approval</p>
                      <p className="text-xs text-muted-foreground">
                        Require approval after the most recent push
                      </p>
                    </div>
                    <Switch
                      checked={selectedRule.requireLastPushApproval}
                      onCheckedChange={(checked) =>
                        setSelectedRule((prev) =>
                          prev ? { ...prev, requireLastPushApproval: checked } : null
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Require status checks</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Require status checks</p>
                      <p className="text-xs text-muted-foreground">
                        Require status checks to pass before merging
                      </p>
                    </div>
                    <Switch
                      checked={selectedRule.requireStatusChecks}
                      onCheckedChange={(checked) =>
                        setSelectedRule((prev) =>
                          prev ? { ...prev, requireStatusChecks: checked } : null
                        )
                      }
                    />
                  </div>
                  {selectedRule.requireStatusChecks && (
                    <>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">Require strict status checks</p>
                          <p className="text-xs text-muted-foreground">
                            Require branches to be up to date with base branch
                          </p>
                        </div>
                        <Switch
                          checked={selectedRule.requireStrictStatusChecks}
                          onCheckedChange={(checked) =>
                            setSelectedRule((prev) =>
                              prev ? { ...prev, requireStrictStatusChecks: checked } : null
                            )
                          }
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm mb-2">Selected status checks:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedRule.statusChecks.length > 0 ? (
                            selectedRule.statusChecks.map((check) => (
                              <Badge key={check} variant="secondary">
                                {check}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              No status checks selected
                            </p>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="mt-3" disabled>
                          Select status checks
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Additional settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Require signed commits</p>
                      <p className="text-xs text-muted-foreground">
                        Require all commits to be signed
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
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Require linear history</p>
                      <p className="text-xs text-muted-foreground">
                        Prevent merge commits from being pushed
                      </p>
                    </div>
                    <Switch
                      checked={selectedRule.requireLinearHistory}
                      onCheckedChange={(checked) =>
                        setSelectedRule((prev) =>
                          prev ? { ...prev, requireLinearHistory: checked } : null
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Allow force pushes</p>
                      <p className="text-xs text-muted-foreground">
                        Allow force pushes to this branch
                      </p>
                    </div>
                    <Switch
                      checked={selectedRule.allowForcePushes}
                      onCheckedChange={(checked) =>
                        setSelectedRule((prev) =>
                          prev ? { ...prev, allowForcePushes: checked } : null
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Allow deletions</p>
                      <p className="text-xs text-muted-foreground">Allow branch to be deleted</p>
                    </div>
                    <Switch
                      checked={selectedRule.allowDeletions}
                      onCheckedChange={(checked) =>
                        setSelectedRule((prev) =>
                          prev ? { ...prev, allowDeletions: checked } : null
                        )
                      }
                    />
                  </div>
                </div>
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
