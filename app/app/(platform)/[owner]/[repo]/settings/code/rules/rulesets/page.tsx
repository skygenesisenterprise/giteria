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
  Shield,
  ShieldCheck,
  ShieldAlert,
  Plus,
  Trash2,
  Edit,
  Copy,
  GitBranch,
  GitPullRequest,
  Lock,
  Unlock,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  MoreHorizontal,
  Globe,
  Tag,
} from "lucide-react";

interface RulesetCondition {
  refName?: {
    include: string[];
    exclude: string[];
  };
  repositoryName?: {
    include: string[];
    exclude: string[];
  };
}

interface PullRequestRule {
  type: "pull_request";
  parameters: {
    required_approving_review_count: number;
    dismiss_stale_reviews_on_push: boolean;
    require_code_owner_review: boolean;
    require_last_push_approval: boolean;
    required_review_thread_resolution: boolean;
    automatic_copilot_code_review_enabled: boolean;
    allowed_merge_methods: ("merge" | "squash" | "rebase")[];
  };
}

interface CodeScanningRule {
  type: "code_scanning";
  parameters: {
    code_scanning_tools: {
      tool: string;
      security_alerts_threshold: string;
      alerts_threshold: string;
    }[];
  };
}

interface DeletionRule {
  type: "deletion";
  parameters?: never;
}

interface NonFastForwardRule {
  type: "non_fast_forward";
  parameters?: never;
}

interface RuleWithParams {
  type: string;
  parameters?: Record<string, unknown>;
}

interface BypassActor {
  actor_id: number | null;
  actor_type: "OrganizationAdmin" | "RepositoryAdmin" | "Workflow";
  bypass_mode: "always" | "pull_request";
}

type Rule = PullRequestRule | CodeScanningRule | DeletionRule | NonFastForwardRule | RuleWithParams;

interface Ruleset {
  id: number;
  name: string;
  target: "branch" | "tag";
  source_type: "Repository" | "Organization";
  source: string;
  enforcement: "active" | "disabled" | "evaluate";
  conditions: RulesetCondition;
  rules: Rule[];
  bypass_actors: BypassActor[];
}

interface SettingsRulesetsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsRulesetsPage({ params }: SettingsRulesetsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [rulesets, setRulesets] = React.useState<Ruleset[]>([
    {
      id: 8715120,
      name: "Main branch Protect",
      target: "branch",
      source_type: "Repository",
      source: `${owner}/${repo}`,
      enforcement: "active",
      conditions: {
        refName: {
          include: ["~ALL", "~DEFAULT_BRANCH"],
          exclude: [],
        },
      },
      rules: [
        { type: "deletion" },
        { type: "non_fast_forward" },
        {
          type: "pull_request",
          parameters: {
            required_approving_review_count: 0,
            dismiss_stale_reviews_on_push: false,
            require_code_owner_review: true,
            require_last_push_approval: false,
            required_review_thread_resolution: true,
            automatic_copilot_code_review_enabled: false,
            allowed_merge_methods: ["merge", "squash", "rebase"],
          },
        },
        {
          type: "code_scanning",
          parameters: {
            code_scanning_tools: [
              {
                tool: "CodeQL",
                security_alerts_threshold: "high_or_higher",
                alerts_threshold: "errors",
              },
            ],
          },
        },
      ],
      bypass_actors: [
        {
          actor_id: null,
          actor_type: "OrganizationAdmin",
          bypass_mode: "always",
        },
      ],
    },
    {
      id: 8715121,
      name: "Release tags",
      target: "tag",
      source_type: "Repository",
      source: `${owner}/${repo}`,
      enforcement: "active",
      conditions: {
        refName: {
          include: ["release/*"],
          exclude: [],
        },
      },
      rules: [{ type: "deletion" }, { type: "non_fast_forward" }],
      bypass_actors: [
        {
          actor_id: null,
          actor_type: "OrganizationAdmin",
          bypass_mode: "always",
        },
      ],
    },
  ]);

  const [selectedRuleset, setSelectedRuleset] = React.useState<Ruleset | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [newRulesetName, setNewRulesetName] = React.useState("");
  const [newRulesetTarget, setNewRulesetTarget] = React.useState<"branch" | "tag">("branch");

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleEditRuleset = (ruleset: Ruleset) => {
    setSelectedRuleset({ ...ruleset, conditions: { ...ruleset.conditions } });
    setIsEditDialogOpen(true);
  };

  const handleUpdateRuleset = () => {
    if (!selectedRuleset) return;
    setRulesets((prev) => prev.map((r) => (r.id === selectedRuleset.id ? selectedRuleset : r)));
    setIsEditDialogOpen(false);
  };

  const handleDeleteRuleset = (rulesetId: number) => {
    setRulesets((prev) => prev.filter((r) => r.id !== rulesetId));
  };

  const handleAddRuleset = () => {
    if (!newRulesetName.trim()) return;
    const newRuleset: Ruleset = {
      id: Date.now(),
      name: newRulesetName,
      target: newRulesetTarget,
      source_type: "Repository",
      source: `${owner}/${repo}`,
      enforcement: "disabled",
      conditions: {
        refName: {
          include: [],
          exclude: [],
        },
      },
      rules: [],
      bypass_actors: [],
    };
    setRulesets((prev) => [...prev, newRuleset]);
    setNewRulesetName("");
    setNewRulesetTarget("branch");
    setIsAddDialogOpen(false);
  };

  const handleToggleEnforcement = (rulesetId: number, enforcement: Ruleset["enforcement"]) => {
    setRulesets((prev) => prev.map((r) => (r.id === rulesetId ? { ...r, enforcement } : r)));
  };

  const getRulesCount = (ruleset: Ruleset) => {
    return ruleset.rules.length;
  };

  const getEnforcementBadge = (enforcement: Ruleset["enforcement"]) => {
    switch (enforcement) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "disabled":
        return <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>;
      case "evaluate":
        return <Badge className="bg-yellow-100 text-yellow-800">Evaluate</Badge>;
      default:
        return null;
    }
  };

  const getRuleTypeLabel = (rule: Ruleset["rules"][0]) => {
    switch (rule.type) {
      case "deletion":
        return "Delete";
      case "non_fast_forward":
        return "Non-fast-forward";
      case "pull_request":
        return "Pull request";
      case "code_scanning":
        return "Code scanning";
      default:
        return rule.type;
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
                <h1 className="text-2xl font-semibold">Rulesets</h1>
                <p className="text-muted-foreground mt-1">
                  Manage rulesets to control who can push to specific branches and tags
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Rulesets</h2>
                      <p className="text-sm text-muted-foreground">
                        Rulesets let you control who can push to specific branches and tags.
                      </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          New ruleset
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>New ruleset</DialogTitle>
                          <DialogDescription>
                            Create a new ruleset to control who can push to specific branches or
                            tags.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="ruleset-name">Ruleset name</Label>
                            <Input
                              id="ruleset-name"
                              placeholder="e.g., Main branch protection"
                              value={newRulesetName}
                              onChange={(e) => setNewRulesetName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Target</Label>
                            <Select
                              value={newRulesetTarget}
                              onValueChange={(value) =>
                                setNewRulesetTarget(value as "branch" | "tag")
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="branch">Branches</SelectItem>
                                <SelectItem value="tag">Tags</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddRuleset} disabled={!newRulesetName.trim()}>
                            Create ruleset
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="border rounded-lg">
                    {rulesets.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Shield className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No rulesets configured</p>
                        <Button
                          variant="link"
                          onClick={() => setIsAddDialogOpen(true)}
                          className="mt-2"
                        >
                          Create your first ruleset
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {rulesets.map((ruleset) => (
                          <div key={ruleset.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {ruleset.enforcement === "active" ? (
                                  <ShieldCheck className="w-5 h-5 text-green-600" />
                                ) : ruleset.enforcement === "evaluate" ? (
                                  <ShieldAlert className="w-5 h-5 text-yellow-600" />
                                ) : (
                                  <Shield className="w-5 h-5 text-muted-foreground" />
                                )}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{ruleset.name}</p>
                                    <Badge variant="secondary" className="capitalize">
                                      {ruleset.target}
                                    </Badge>
                                    {getEnforcementBadge(ruleset.enforcement)}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{getRulesCount(ruleset)} rule(s)</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <Globe className="w-3 h-3" /> {ruleset.source}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Select
                                  value={ruleset.enforcement}
                                  onValueChange={(value) =>
                                    handleToggleEnforcement(
                                      ruleset.id,
                                      value as Ruleset["enforcement"]
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="disabled">Disabled</SelectItem>
                                    <SelectItem value="evaluate">Evaluate</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditRuleset(ruleset)}
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteRuleset(ruleset.id)}
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
                    <h2 className="text-xl font-semibold">About rulesets</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn how to use rulesets to protect your branches and tags.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <GitBranch className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Branch rulesets</p>
                          <p className="text-sm text-muted-foreground">
                            Control who can push to specific branches and enforce review
                            requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <Tag className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Tag rulesets</p>
                          <p className="text-sm text-muted-foreground">
                            Protect your release tags from being modified or deleted.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Enforcement modes</p>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>
                            <strong>Active:</strong> Rules are enforced and blocking pushes that
                            don't meet the requirements.
                          </li>
                          <li>
                            <strong>Disabled:</strong> Rules are not enforced.
                          </li>
                          <li>
                            <strong>Evaluate:</strong> Rules are tested but pushes are not blocked.
                            View the audit log to see what would have been blocked.
                          </li>
                        </ul>
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit ruleset: {selectedRuleset?.name}</DialogTitle>
            <DialogDescription>Configure rules and conditions for this ruleset.</DialogDescription>
          </DialogHeader>
          {selectedRuleset && (
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Enforcement</p>
                    <p className="text-sm text-muted-foreground">
                      Control whether this ruleset is active, disabled, or in evaluate mode.
                    </p>
                  </div>
                  <Select
                    value={selectedRuleset.enforcement}
                    onValueChange={(value) =>
                      setSelectedRuleset((prev) =>
                        prev ? { ...prev, enforcement: value as Ruleset["enforcement"] } : null
                      )
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="evaluate">Evaluate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Conditions</h3>
                <p className="text-sm text-muted-foreground">
                  Define which branches or tags this ruleset applies to.
                </p>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg space-y-3">
                    <Label>Ref name (branches/tags)</Label>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Include patterns</Label>
                        <Input
                          placeholder="e.g., ~DEFAULT_BRANCH, main, release/*"
                          value={selectedRuleset.conditions.refName?.include.join(", ") || ""}
                          onChange={(e) =>
                            setSelectedRuleset((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    conditions: {
                                      ...prev.conditions,
                                      refName: {
                                        include: e.target.value
                                          .split(",")
                                          .map((s) => s.trim())
                                          .filter(Boolean),
                                        exclude: prev.conditions.refName?.exclude || [],
                                      },
                                    },
                                  }
                                : null
                            )
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Exclude patterns</Label>
                        <Input
                          placeholder="e.g., docs/*"
                          value={selectedRuleset.conditions.refName?.exclude.join(", ") || ""}
                          onChange={(e) =>
                            setSelectedRuleset((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    conditions: {
                                      ...prev.conditions,
                                      refName: {
                                        include: prev.conditions.refName?.include || [],
                                        exclude: e.target.value
                                          .split(",")
                                          .map((s) => s.trim())
                                          .filter(Boolean),
                                      },
                                    },
                                  }
                                : null
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Rules</h3>
                <p className="text-sm text-muted-foreground">
                  Configure what is required or blocked by this ruleset.
                </p>
                <div className="space-y-3">
                  {selectedRuleset.rules.map((rule, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{getRuleTypeLabel(rule)}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setSelectedRuleset((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    rules: prev.rules.filter((_, i) => i !== index),
                                  }
                                : null
                            )
                          }
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
                        </Button>
                      </div>
                      {rule.type === "pull_request" && "parameters" in rule && rule.parameters && (
                        <div className="mt-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Required approving reviews</Label>
                            <Input
                              type="number"
                              className="w-20"
                              value={
                                (rule.parameters as { required_approving_review_count?: number })
                                  .required_approving_review_count ?? 0
                              }
                              onChange={(e) =>
                                setSelectedRuleset((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        rules: prev.rules.map((r, i) =>
                                          i === index && "parameters" in r && r.parameters
                                            ? {
                                                ...r,
                                                parameters: {
                                                  ...(r.parameters as Record<string, unknown>),
                                                  required_approving_review_count:
                                                    parseInt(e.target.value) || 0,
                                                },
                                              }
                                            : r
                                        ),
                                      }
                                    : null
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Require code owner review</Label>
                            <Switch
                              checked={
                                (rule.parameters as { require_code_owner_review?: boolean })
                                  .require_code_owner_review ?? false
                              }
                              onCheckedChange={(checked) =>
                                setSelectedRuleset((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        rules: prev.rules.map((r, i) =>
                                          i === index && "parameters" in r && r.parameters
                                            ? {
                                                ...r,
                                                parameters: {
                                                  ...(r.parameters as Record<string, unknown>),
                                                  require_code_owner_review: checked,
                                                },
                                              }
                                            : r
                                        ),
                                      }
                                    : null
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Require review thread resolution</Label>
                            <Switch
                              checked={
                                (rule.parameters as { required_review_thread_resolution?: boolean })
                                  .required_review_thread_resolution ?? false
                              }
                              onCheckedChange={(checked) =>
                                setSelectedRuleset((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        rules: prev.rules.map((r, i) =>
                                          i === index && "parameters" in r && r.parameters
                                            ? {
                                                ...r,
                                                parameters: {
                                                  ...(r.parameters as Record<string, unknown>),
                                                  required_review_thread_resolution: checked,
                                                },
                                              }
                                            : r
                                        ),
                                      }
                                    : null
                                )
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedRuleset((prev) =>
                          prev
                            ? {
                                ...prev,
                                rules: [
                                  ...prev.rules,
                                  {
                                    type: "pull_request" as const,
                                    parameters: {
                                      required_approving_review_count: 1,
                                      dismiss_stale_reviews_on_push: false,
                                      require_code_owner_review: false,
                                      require_last_push_approval: false,
                                      required_review_thread_resolution: false,
                                      automatic_copilot_code_review_enabled: false,
                                      allowed_merge_methods: ["merge", "squash", "rebase"],
                                    },
                                  },
                                ],
                              }
                            : null
                        )
                      }
                    >
                      <GitPullRequest className="w-4 h-4 mr-1" />
                      Pull request
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedRuleset((prev) =>
                          prev
                            ? {
                                ...prev,
                                rules: [...prev.rules, { type: "deletion" as const }],
                              }
                            : null
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Deletion
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedRuleset((prev) =>
                          prev
                            ? {
                                ...prev,
                                rules: [...prev.rules, { type: "non_fast_forward" as const }],
                              }
                            : null
                        )
                      }
                    >
                      <GitBranch className="w-4 h-4 mr-1" />
                      Non-fast-forward
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Bypass actors</h3>
                <p className="text-sm text-muted-foreground">
                  Configure who can bypass these rules.
                </p>
                <div className="space-y-3">
                  {selectedRuleset.bypass_actors.map((actor, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{actor.actor_type}</Badge>
                          <Badge variant="secondary">{actor.bypass_mode}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setSelectedRuleset((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    bypass_actors: prev.bypass_actors.filter((_, i) => i !== index),
                                  }
                                : null
                            )
                          }
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedRuleset((prev) =>
                        prev
                          ? {
                              ...prev,
                              bypass_actors: [
                                ...prev.bypass_actors,
                                {
                                  actor_id: null,
                                  actor_type: "OrganizationAdmin",
                                  bypass_mode: "always",
                                },
                              ],
                            }
                          : null
                      )
                    }
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add bypass actor
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRuleset}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
