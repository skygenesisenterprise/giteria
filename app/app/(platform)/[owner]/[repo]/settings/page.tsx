"use client";

import * as React from "react";
import { use } from "react";
import { cn } from "@/lib/utils";
import { SettingSidebar } from "@/components/repository/settings/SettingSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  AlertTriangle,
  Upload,
  Shield,
  Archive,
  Trash2,
  GitBranch,
  MessageSquare,
  FileText,
  Users,
  HandHeart,
  FolderKanban,
  GitPullRequest,
  ArchiveIcon,
  CirclePlay,
  Bot,
  Boxes,
  Package,
  BarChart3,
} from "lucide-react";
import { getRepository, updateRepositoryDetails, type Repository } from "@/lib/repo/RepositoryData";
import { useRepoFeatures } from "@/components/repository/RepoFeaturesContext";

interface SettingsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;
  const {
    updateFeatures,
    features: contextFeatures,
    isLoading: isContextLoading,
  } = useRepoFeatures();

  const [repository, setRepository] = React.useState<Repository | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [defaultBranch, setDefaultBranch] = React.useState("main");
  const [repoName, setRepoName] = React.useState(repo);
  const [description, setDescription] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  const [mergeOptions, setMergeOptions] = React.useState({
    allowMergeCommits: true,
    allowSquashMerging: true,
    allowRebaseMerging: true,
    allowAutoMerge: false,
    alwaysSuggestUpdateBranch: true,
    autoDeleteHeadBranches: false,
  });

  const [pushSettings, setPushSettings] = React.useState({
    requireSignedCommits: false,
    limitBranchTagUpdates: false,
    limitBranchTagValue: 5,
  });

  const [issueSettings, setIssueSettings] = React.useState({
    autoCloseIssues: true,
  });

  const [archiveSettings, setArchiveSettings] = React.useState({
    includeGitLFS: false,
  });

  const features = React.useMemo(
    () => ({
      hasWiki: contextFeatures.hasWiki ?? false,
      hasIssues: contextFeatures.hasIssues ?? true,
      hasProjects: contextFeatures.hasProjects ?? false,
      hasDiscussions: contextFeatures.hasDiscussions ?? false,
      hasSponsorships: false,
      hasPullRequests: true,
      hasActions: contextFeatures.hasActions ?? true,
      hasAgents: contextFeatures.hasAgents ?? false,
      hasModels: contextFeatures.hasModels ?? false,
      hasPackages: contextFeatures.hasPackages ?? true,
      hasSecurity: contextFeatures.hasSecurity ?? true,
      hasInsights: contextFeatures.hasInsights ?? true,
      isTemplate: false,
      isArchived: false,
      includeReleases: true,
      includeDeployments: true,
    }),
    [contextFeatures]
  );

  React.useEffect(() => {
    async function loadRepository() {
      const repoData = await getRepository(owner, repo);
      if (repoData) {
        setRepository(repoData);
        setRepoName(repoData.name);
        setDescription(repoData.description || "");
        setWebsite(repoData.website || "");
        setArchiveSettings((prev) => ({
          ...prev,
          includeGitLFS: repoData.includePackages ?? false,
        }));
      }
      setIsLoading(false);
    }
    loadRepository();
  }, [owner, repo]);

  const handleSave = async () => {
    if (!repository) return;
    setIsSaving(true);
    try {
      await updateRepositoryDetails(repository.id, {
        description,
        website,
        includeReleases: features.includeReleases,
        includeDeployments: features.includeDeployments,
        hasWiki: features.hasWiki,
        hasIssues: features.hasIssues,
        hasDiscussions: features.hasDiscussions,
        hasProjects: features.hasProjects,
        hasActions: features.hasActions,
        hasAgents: features.hasAgents,
        hasModels: features.hasModels,
        hasPackages: features.hasPackages,
        hasSecurity: features.hasSecurity,
        hasInsights: features.hasInsights,
      });
      updateFeatures({
        hasWiki: features.hasWiki,
        hasIssues: features.hasIssues,
        hasDiscussions: features.hasDiscussions,
        hasProjects: features.hasProjects,
        hasActions: features.hasActions,
        hasAgents: features.hasAgents,
        hasModels: features.hasModels,
        hasPackages: features.hasPackages,
        hasSecurity: features.hasSecurity,
        hasInsights: features.hasInsights,
      });
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
    setIsSaving(false);
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
                <h1 className="text-2xl font-semibold">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your repository settings</p>
              </div>

              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="pull-requests">Pull requests</TabsTrigger>
                  <TabsTrigger value="archives">Archives</TabsTrigger>
                  <TabsTrigger value="danger">Danger zone</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">General</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Manage your repository name, default branch, and other settings.
                      </p>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="repo-name">Repository name</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{owner}/</span>
                          <Input
                            id="repo-name"
                            value={repoName}
                            onChange={(e) => setRepoName(e.target.value)}
                            className="w-75"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="template">Template repository</Label>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Loading</p>
                              <p className="text-muted-foreground text-xs">
                                Template repositories let users generate new repositories with the
                                same directory structure and files. Learn more about template
                                repositories.
                              </p>
                            </div>
                          </div>
                          <Switch id="template" checked={features.isTemplate} disabled />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="default-branch">Default branch</Label>
                        <div className="flex items-center gap-2">
                          <Select value={defaultBranch} onValueChange={setDefaultBranch}>
                            <SelectTrigger className="w-75">
                              <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="main">main</SelectItem>
                              <SelectItem value="master">master</SelectItem>
                              <SelectItem value="develop">develop</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="sm">
                            <GitBranch className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          The default branch is considered the &quot;base&quot; branch in your
                          repository, against which all pull requests and code commits are
                          automatically made, unless you specify a different branch.
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="homepage">Homepage URL</Label>
                        <Input
                          id="homepage"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://example.com"
                        />
                        <p className="text-xs text-muted-foreground">
                          The URL of a website associated with this repository.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="A short description of your repository"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Releases</Label>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Archive className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Enable release immutability</p>
                              <p className="text-muted-foreground text-xs">
                                Disallow assets and tags from being modified once a release is
                                published.
                              </p>
                            </div>
                          </div>
                          <Switch id="release-immutability" disabled />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Social preview</Label>
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-16 bg-muted rounded flex items-center justify-center">
                              <Upload className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <Button variant="outline" size="sm">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload image
                              </Button>
                              <p className="text-xs text-muted-foreground mt-2">
                                Images should be at least 640×320px (1280×640px for best display).
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSave} disabled={isSaving}>
                          {isSaving ? "Saving..." : "Save changes"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-6 mt-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-muted-foreground">Loading features...</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-semibold">Features</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          Manage which features are enabled for this repository.
                        </p>
                      </div>
                      <Separator />

                      <div className="space-y-4">
                        <div
                          className={cn(
                            "flex items-center justify-between p-3 border rounded-lg transition-colors",
                            features.hasWiki
                              ? "border-green-500/50 bg-green-500/5"
                              : "border-border"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <FileText
                              className={cn(
                                "w-5 h-5",
                                features.hasWiki ? "text-green-600" : "text-muted-foreground"
                              )}
                            />
                            <div className="text-sm">
                              <p className="font-medium">Wikis</p>
                              <p className="text-muted-foreground text-xs">
                                Wikis host documentation for your repository.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasWiki}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasWiki: checked });
                            }}
                          />
                        </div>
                        {features.hasWiki && (
                          <div className="ml-8 flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                            <div className="text-sm">
                              <p className="font-medium">
                                Restrict editing to users in teams with push access only
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Public wikis will still be readable by everyone.
                              </p>
                            </div>
                            <Switch disabled />
                          </div>
                        )}

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Issues</p>
                              <p className="text-muted-foreground text-xs">
                                Issues integrate lightweight task tracking into your repository.
                                Keep projects on track with issue labels and milestones, and
                                reference them in commit messages.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasIssues}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasIssues: checked });
                            }}
                          />
                        </div>
                        {features.hasIssues && (
                          <div className="ml-8 space-y-3">
                            <div className="p-3 border rounded-lg bg-muted/30">
                              <div className="text-sm">
                                <p className="font-medium">Get organized with issue templates</p>
                                <p className="text-muted-foreground text-xs">
                                  Give contributors issue templates that help you cut through the
                                  noise and help them push your project forward.
                                </p>
                              </div>
                              <Button variant="outline" size="sm" className="mt-2" disabled>
                                Edit
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <HandHeart className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Sponsorships</p>
                              <p className="text-muted-foreground text-xs">
                                Sponsorships help your community know how to financially support
                                this repository.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasSponsorships}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasSponsorships: checked });
                            }}
                          />
                        </div>
                        {features.hasSponsorships && (
                          <div className="ml-8 p-3 border rounded-lg bg-muted/30">
                            <div className="text-sm">
                              <p className="font-medium">Display a &quot;Sponsor&quot; button</p>
                              <p className="text-muted-foreground text-xs">
                                Add links to GitHub Sponsors or third-party methods your repository
                                accepts for financial contributions to your project.
                              </p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-2" disabled>
                              Edit
                            </Button>
                          </div>
                        )}

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <ArchiveIcon className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Preserve this repository</p>
                              <p className="text-muted-foreground text-xs">
                                Include this code in the GitHub Archive Program.
                              </p>
                            </div>
                          </div>
                          <Switch disabled />
                        </div>

                        <div
                          className={cn(
                            "flex items-center justify-between p-3 border rounded-lg transition-colors",
                            features.hasDiscussions
                              ? "border-green-500/50 bg-green-500/5"
                              : "border-border"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <MessageSquare
                              className={cn(
                                "w-5 h-5",
                                features.hasDiscussions ? "text-green-600" : "text-muted-foreground"
                              )}
                            />
                            <div className="text-sm">
                              <p className="font-medium">Discussions</p>
                              <p className="text-muted-foreground text-xs">
                                Discussions is the space for your community to have conversations,
                                ask questions and post answers without opening issues.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasDiscussions}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasDiscussions: checked });
                            }}
                          />
                        </div>
                        {features.hasDiscussions && (
                          <div className="ml-8 p-3 border rounded-lg bg-muted/30">
                            <div className="text-sm">
                              <p className="font-medium">Get started with Discussions</p>
                              <p className="text-muted-foreground text-xs">
                                Engage your community by having discussions right in your
                                repository, where your community already lives
                              </p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-2" disabled>
                              Set up
                            </Button>
                          </div>
                        )}

                        <div
                          className={cn(
                            "flex items-center justify-between p-3 border rounded-lg transition-colors",
                            features.hasProjects
                              ? "border-green-500/50 bg-green-500/5"
                              : "border-border"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <FolderKanban
                              className={cn(
                                "w-5 h-5",
                                features.hasProjects ? "text-green-600" : "text-muted-foreground"
                              )}
                            />
                            <div className="text-sm">
                              <p className="font-medium">Projects</p>
                              <p className="text-muted-foreground text-xs">
                                Projects on GitHub are created at the repository owner&apos;s level
                                (organization or user) and can be linked to a repository&apos;s
                                Projects tab. Projects are suitable for cross-repository development
                                efforts such as feature work, complex product roadmaps or even Issue
                                triage.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasProjects}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasProjects: checked });
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <CirclePlay className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Actions</p>
                              <p className="text-muted-foreground text-xs">
                                Automate your workflow from idea to production with GitHub Actions.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasActions}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasActions: checked });
                            }}
                          />
                        </div>

                        <div
                          className={cn(
                            "flex items-center justify-between p-3 border rounded-lg transition-colors",
                            features.hasAgents
                              ? "border-green-500/50 bg-green-500/5"
                              : "border-border"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Bot
                              className={cn(
                                "w-5 h-5",
                                features.hasAgents ? "text-green-600" : "text-muted-foreground"
                              )}
                            />
                            <div className="text-sm">
                              <p className="font-medium">Agents</p>
                              <p className="text-muted-foreground text-xs">
                                Create and manage AI agents for repository automation.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasAgents}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasAgents: checked });
                            }}
                          />
                        </div>

                        <div
                          className={cn(
                            "flex items-center justify-between p-3 border rounded-lg transition-colors",
                            features.hasModels
                              ? "border-green-500/50 bg-green-500/5"
                              : "border-border"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Boxes
                              className={cn(
                                "w-5 h-5",
                                features.hasModels ? "text-green-600" : "text-muted-foreground"
                              )}
                            />
                            <div className="text-sm">
                              <p className="font-medium">Models</p>
                              <p className="text-muted-foreground text-xs">
                                Deploy and manage machine learning models in your repository.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasModels}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasModels: checked });
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Packages</p>
                              <p className="text-muted-foreground text-xs">
                                Host and manage software packages in your repository.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasPackages}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasPackages: checked });
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Security</p>
                              <p className="text-muted-foreground text-xs">
                                Keep your code secure with vulnerability alerts and security
                                scanning.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasSecurity}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasSecurity: checked });
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <BarChart3 className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Insights</p>
                              <p className="text-muted-foreground text-xs">
                                View analytics and activity data about your repository.
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={features.hasInsights}
                            onCheckedChange={(checked) => {
                              updateFeatures({ hasInsights: checked });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="pull-requests" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">Pull Requests</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Manage pull request settings and merge behavior.
                      </p>
                    </div>
                    <Separator />

                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        When merging pull requests, you can allow any combination of merge commits,
                        squashing, or rebasing. At least one option must be enabled. If you have
                        linear history requirement enabled on any protected branch, you must enable
                        squashing or rebasing.
                      </p>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <GitPullRequest className="w-5 h-5 text-muted-foreground" />
                          <div className="text-sm">
                            <p className="font-medium">Allow merge commits</p>
                            <p className="text-muted-foreground text-xs">
                              Add all commits from the head branch to the base branch with a merge
                              commit.
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={mergeOptions.allowMergeCommits}
                          onCheckedChange={(checked) => {
                            updateFeatures({ hasProjects: checked });
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <GitPullRequest className="w-5 h-5 text-muted-foreground" />
                          <div className="text-sm">
                            <p className="font-medium">Allow squash merging</p>
                            <p className="text-muted-foreground text-xs">
                              Combine all commits from the head branch into a single commit in the
                              base branch.
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={mergeOptions.allowSquashMerging}
                          onCheckedChange={(checked) => {
                            updateFeatures({ hasActions: checked });
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <GitPullRequest className="w-5 h-5 text-muted-foreground" />
                          <div className="text-sm">
                            <p className="font-medium">Allow rebase merging</p>
                            <p className="text-muted-foreground text-xs">
                              Add all commits from the head branch onto the base branch
                              individually.
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={mergeOptions.allowRebaseMerging}
                          onCheckedChange={(checked) => {
                            updateFeatures({ hasModels: checked });
                          }}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="text-sm">
                          <p className="font-medium">
                            Always suggest updating pull request branches
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Control how and when users are prompted to update their branches if
                            there are new changes available in the base branch.
                          </p>
                        </div>
                        <Switch
                          checked={mergeOptions.alwaysSuggestUpdateBranch}
                          onCheckedChange={(checked) =>
                            setMergeOptions((prev) => ({
                              ...prev,
                              alwaysSuggestUpdateBranch: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="text-sm">
                          <p className="font-medium">Allow auto-merge</p>
                          <p className="text-muted-foreground text-xs">
                            You can allow setting pull requests to merge automatically once all
                            required reviews and status checks have passed.
                          </p>
                        </div>
                        <Switch
                          checked={mergeOptions.allowAutoMerge}
                          onCheckedChange={(checked) => {
                            updateFeatures({ hasDiscussions: checked });
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="text-sm">
                          <p className="font-medium">Automatically delete head branches</p>
                          <p className="text-muted-foreground text-xs">
                            After pull requests are merged, you can have head branches deleted
                            automatically.
                          </p>
                        </div>
                        <Switch
                          checked={mergeOptions.autoDeleteHeadBranches}
                          onCheckedChange={(checked) =>
                            setMergeOptions((prev) => ({
                              ...prev,
                              autoDeleteHeadBranches: checked,
                            }))
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="text-sm">
                          <p className="font-medium">
                            Require contributors to sign off on web-based commits
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Enabling this setting will require contributors to sign off on commits
                            made through GitHub&apos;s web interface. Signing off is a way for
                            contributors to affirm that their commit complies with the
                            repository&apos;s terms, commonly the Developer Certificate of Origin
                            (DCO).
                          </p>
                        </div>
                        <Switch
                          checked={pushSettings.requireSignedCommits}
                          onCheckedChange={(checked) => {
                            updateFeatures({ hasPackages: checked });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="archives" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">Archives</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Configure archive behavior for this repository.
                      </p>
                    </div>
                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="text-sm">
                          <p className="font-medium">Include Git LFS objects in archives</p>
                          <p className="text-muted-foreground text-xs">
                            When creating source code archives, you can choose to include files
                            stored using Git LFS in the archive. Git LFS usage in archives is billed
                            at the same rate as usage with the client.
                          </p>
                        </div>
                        <Switch
                          checked={archiveSettings.includeGitLFS}
                          onCheckedChange={(checked) => {
                            updateFeatures({ hasAgents: checked });
                          }}
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>
                          Limit how many branches and tags can be updated in a single push
                        </Label>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={pushSettings.limitBranchTagUpdates}
                            onCheckedChange={(checked) =>
                              setPushSettings((prev) => ({
                                ...prev,
                                limitBranchTagUpdates: checked,
                              }))
                            }
                          />
                          {pushSettings.limitBranchTagUpdates && (
                            <Input
                              type="number"
                              value={pushSettings.limitBranchTagValue}
                              onChange={(e) =>
                                setPushSettings((prev) => ({
                                  ...prev,
                                  limitBranchTagValue: parseInt(e.target.value) || 5,
                                }))
                              }
                              className="w-20"
                            />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Pushes will be rejected if they attempt to update more than this.
                        </p>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="text-sm">
                          <p className="font-medium">
                            Auto-close issues with merged linked pull requests
                          </p>
                          <p className="text-muted-foreground text-xs">
                            After merging a pull request, linked issues can be closed automatically.
                          </p>
                        </div>
                        <Switch
                          checked={issueSettings.autoCloseIssues}
                          onCheckedChange={(checked) => {
                            updateFeatures({ hasIssues: checked });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="danger" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Irreversible and destructive actions for this repository.
                      </p>
                    </div>
                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-red-600" />
                          <div className="text-sm">
                            <p className="font-medium">Change repository visibility</p>
                            <p className="text-muted-foreground text-xs">
                              This repository is currently public.
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-100"
                          disabled
                        >
                          Change visibility
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-red-600" />
                          <div className="text-sm">
                            <p className="font-medium">Disable branch protection rules</p>
                            <p className="text-muted-foreground text-xs">
                              Disable branch protection rules enforcement and APIs
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-100"
                          disabled
                        >
                          Disable rules
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-red-600" />
                          <div className="text-sm">
                            <p className="font-medium">Transfer ownership</p>
                            <p className="text-muted-foreground text-xs">
                              Transfer this repository to another user or to an organization where
                              you have the ability to create repositories.
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-100"
                          disabled
                        >
                          Transfer
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-3">
                          <ArchiveIcon className="w-5 h-5 text-red-600" />
                          <div className="text-sm">
                            <p className="font-medium">Archive this repository</p>
                            <p className="text-muted-foreground text-xs">
                              Mark this repository as archived and read-only.
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-100"
                          disabled
                        >
                          Archive
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border-2 border-red-400 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-3">
                          <Trash2 className="w-5 h-5 text-red-600" />
                          <div className="text-sm">
                            <p className="font-medium">Delete this repository</p>
                            <p className="text-muted-foreground text-xs">
                              Once you delete a repository, there is no going back. Please be
                              certain.
                            </p>
                          </div>
                        </div>
                        <Button variant="destructive" disabled>
                          Delete this repository
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
