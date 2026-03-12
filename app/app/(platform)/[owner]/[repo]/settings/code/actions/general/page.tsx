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
  Loader2,
  Info,
  ExternalLink,
  Workflow,
} from "lucide-react";

interface WorkflowSetting {
  id: string;
  name: string;
  enabled: boolean;
  path: string;
}

interface SettingsActionsGeneralPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsActionsGeneralPage({ params }: SettingsActionsGeneralPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [actionsSettings, setActionsSettings] = React.useState({
    enableActions: true,
    allowUnsecuredWorkflows: false,
    allowGiteriaActions: true,
    allowOfficialActions: true,
    allowThirdPartyActions: false,
    approvedActions: [] as string[],
  });

  const [workflowPermissions, setWorkflowPermissions] = React.useState({
    defaultWorkflowPermissions: "read" as "read" | "write" | "none",
    approveExternalWorkflows: false,
    allowPublicRepositoryActions: false,
  });

  const [runnerSettings, setRunnerSettings] = React.useState({
    enableConcurrentRuns: true,
    maxQueueTime: 360,
    timeoutMinutes: 360,
  });

  const [artifactsSettings, setArtifactsSettings] = React.useState({
    retentionDays: 90,
    enableArtifactory: false,
    artifactoryUrl: "",
  });

  const [workflows, setWorkflows] = React.useState<WorkflowSetting[]>([
    { id: "1", name: "CI", enabled: true, path: ".giteria/workflows/ci.yml" },
    { id: "2", name: "Release", enabled: true, path: ".giteria/workflows/release.yml" },
    { id: "3", name: "Security Scan", enabled: false, path: ".giteria/workflows/security.yml" },
  ]);

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleToggleWorkflow = (workflowId: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === workflowId ? { ...wf, enabled: !wf.enabled } : wf))
    );
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
                <h1 className="text-2xl font-semibold">Actions</h1>
                <p className="text-muted-foreground mt-1">
                  Manage Giteria Actions settings for this repository
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">General</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure basic Giteria Actions settings for this repository.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable Giteria Actions</p>
                        <p className="text-sm text-muted-foreground">
                          Allow Giteria Actions to run workflows in this repository.
                        </p>
                      </div>
                      <Switch
                        checked={actionsSettings.enableActions}
                        onCheckedChange={(checked) =>
                          setActionsSettings((prev) => ({ ...prev, enableActions: checked }))
                        }
                      />
                    </div>

                    {actionsSettings.enableActions && (
                      <>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Allow unsecure workflows</p>
                            <p className="text-sm text-muted-foreground">
                              Allow Giteria Actions workflows from pull requests.
                            </p>
                          </div>
                          <Switch
                            checked={actionsSettings.allowUnsecuredWorkflows}
                            onCheckedChange={(checked) =>
                              setActionsSettings((prev) => ({
                                ...prev,
                                allowUnsecuredWorkflows: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Allow Giteria Actions actions</p>
                            <p className="text-sm text-muted-foreground">
                              Allow actions from Giteria in workflows.
                            </p>
                          </div>
                          <Switch
                            checked={actionsSettings.allowGiteriaActions}
                            onCheckedChange={(checked) =>
                              setActionsSettings((prev) => ({
                                ...prev,
                                allowGiteriaActions: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Allow actions from Verified Creator</p>
                            <p className="text-sm text-muted-foreground">
                              Allow actions from verified creators in workflows.
                            </p>
                          </div>
                          <Switch
                            checked={actionsSettings.allowOfficialActions}
                            onCheckedChange={(checked) =>
                              setActionsSettings((prev) => ({
                                ...prev,
                                allowOfficialActions: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Allow third-party actions</p>
                            <p className="text-sm text-muted-foreground">
                              Allow actions from third-party creators in workflows.
                            </p>
                          </div>
                          <Switch
                            checked={actionsSettings.allowThirdPartyActions}
                            onCheckedChange={(checked) =>
                              setActionsSettings((prev) => ({
                                ...prev,
                                allowThirdPartyActions: checked,
                              }))
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Workflow permissions</h2>
                    <p className="text-sm text-muted-foreground">
                      Control what workflows can do with repository contents.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Default workflow permissions</p>
                        <p className="text-sm text-muted-foreground">
                          Set the default permissions granted to the GITERIA_TOKEN.
                        </p>
                      </div>
                      <Select
                        value={workflowPermissions.defaultWorkflowPermissions}
                        onValueChange={(value) =>
                          setWorkflowPermissions((prev) => ({
                            ...prev,
                            defaultWorkflowPermissions: value as "read" | "write" | "none",
                          }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="read">Read-only</SelectItem>
                          <SelectItem value="write">Read and write</SelectItem>
                          <SelectItem value="none">No access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Approve external workflow pull requests</p>
                        <p className="text-sm text-muted-foreground">
                          Allow workflows from pull requests to approve their own runs.
                        </p>
                      </div>
                      <Switch
                        checked={workflowPermissions.approveExternalWorkflows}
                        onCheckedChange={(checked) =>
                          setWorkflowPermissions((prev) => ({
                            ...prev,
                            approveExternalWorkflows: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Allow public repository actions</p>
                        <p className="text-sm text-muted-foreground">
                          Allow workflows from public repositories to access this repository.
                        </p>
                      </div>
                      <Switch
                        checked={workflowPermissions.allowPublicRepositoryActions}
                        onCheckedChange={(checked) =>
                          setWorkflowPermissions((prev) => ({
                            ...prev,
                            allowPublicRepositoryActions: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Runner settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure runner behavior for this repository.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable concurrent workflow runs</p>
                        <p className="text-sm text-muted-foreground">
                          Allow multiple workflow runs to run concurrently.
                        </p>
                      </div>
                      <Switch
                        checked={runnerSettings.enableConcurrentRuns}
                        onCheckedChange={(checked) =>
                          setRunnerSettings((prev) => ({
                            ...prev,
                            enableConcurrentRuns: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Queue timeout (minutes)</p>
                        <p className="text-sm text-muted-foreground">
                          Maximum time a workflow can be queued before failing.
                        </p>
                      </div>
                      <Select
                        value={runnerSettings.maxQueueTime.toString()}
                        onValueChange={(value) =>
                          setRunnerSettings((prev) => ({
                            ...prev,
                            maxQueueTime: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="180">3 hours</SelectItem>
                          <SelectItem value="360">6 hours</SelectItem>
                          <SelectItem value="720">12 hours</SelectItem>
                          <SelectItem value="1440">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Workflow timeout (minutes)</p>
                        <p className="text-sm text-muted-foreground">
                          Maximum time a workflow can run before being cancelled.
                        </p>
                      </div>
                      <Select
                        value={runnerSettings.timeoutMinutes.toString()}
                        onValueChange={(value) =>
                          setRunnerSettings((prev) => ({
                            ...prev,
                            timeoutMinutes: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="180">3 hours</SelectItem>
                          <SelectItem value="360">6 hours</SelectItem>
                          <SelectItem value="720">12 hours</SelectItem>
                          <SelectItem value="1440">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Artifacts and logs</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure artifact retention and storage settings.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Artifact retention period</p>
                        <p className="text-sm text-muted-foreground">
                          Number of days to retain workflow artifacts and logs.
                        </p>
                      </div>
                      <Select
                        value={artifactsSettings.retentionDays.toString()}
                        onValueChange={(value) =>
                          setArtifactsSettings((prev) => ({
                            ...prev,
                            retentionDays: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Active workflows</h2>
                    <p className="text-sm text-muted-foreground">
                      Manage which workflows are enabled for this repository.
                    </p>
                  </div>

                  <div className="border rounded-lg">
                    {workflows.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Workflow className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No workflows found</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {workflows.map((workflow) => (
                          <div key={workflow.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <Workflow className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{workflow.name}</p>
                                  <Badge
                                    className={
                                      workflow.enabled
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {workflow.enabled ? "Enabled" : "Disabled"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{workflow.path}</p>
                              </div>
                            </div>
                            <Switch
                              checked={workflow.enabled}
                              onCheckedChange={() => handleToggleWorkflow(workflow.id)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About Giteria Actions</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about Giteria Actions and how to configure workflows.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Giteria Actions enables you to automate your software development workflows
                          right from within your repository.
                        </p>
                        <p>
                          Create workflows that build, test, deploy, or release any code project on
                          Giteria.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/en/actions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about Giteria Actions
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
    </div>
  );
}
