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
  Bot,
  Sparkles,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Info,
  ExternalLink,
  Brain,
  Code,
  FileCode,
  MessageSquare,
  GitPullRequest,
  Clock,
} from "lucide-react";

interface CopilotCodeReviewSettings {
  enableCodeReview: boolean;
  autoReview: boolean;
  reviewScope: "all" | "changed_files" | "new_code";
  maxFilesToReview: number;
  includeSuggestions: boolean;
  autoApproveSafe: boolean;
  blockOnSuggestions: boolean;
  minConfidence: number;
  languageFilter: string[];
}

interface CodeReviewPreset {
  id: string;
  name: string;
  description: string;
  config: CopilotCodeReviewSettings;
}

interface SettingsCopilotCodeReviewPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsCopilotCodeReviewPage({
  params,
}: SettingsCopilotCodeReviewPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [settings, setSettings] = React.useState<CopilotCodeReviewSettings>({
    enableCodeReview: true,
    autoReview: true,
    reviewScope: "changed_files",
    maxFilesToReview: 10,
    includeSuggestions: true,
    autoApproveSafe: true,
    blockOnSuggestions: false,
    minConfidence: 0.8,
    languageFilter: [],
  });

  const [selectedPreset, setSelectedPreset] = React.useState<string>("custom");
  const [isSaving, setIsSaving] = React.useState(false);

  const presets: CodeReviewPreset[] = [
    {
      id: "quick",
      name: "Quick Review",
      description: "Fast feedback on changed files only, high confidence only",
      config: {
        enableCodeReview: true,
        autoReview: true,
        reviewScope: "changed_files",
        maxFilesToReview: 5,
        includeSuggestions: false,
        autoApproveSafe: true,
        blockOnSuggestions: false,
        minConfidence: 0.9,
        languageFilter: [],
      },
    },
    {
      id: "thorough",
      name: "Thorough Review",
      description: "Comprehensive review with suggestions for all new code",
      config: {
        enableCodeReview: true,
        autoReview: true,
        reviewScope: "new_code",
        maxFilesToReview: 20,
        includeSuggestions: true,
        autoApproveSafe: true,
        blockOnSuggestions: true,
        minConfidence: 0.7,
        languageFilter: [],
      },
    },
    {
      id: "security",
      name: "Security Focused",
      description: "Focus on security vulnerabilities and best practices",
      config: {
        enableCodeReview: true,
        autoReview: true,
        reviewScope: "all",
        maxFilesToReview: 15,
        includeSuggestions: true,
        autoApproveSafe: false,
        blockOnSuggestions: true,
        minConfidence: 0.85,
        languageFilter: [],
      },
    },
    {
      id: "custom",
      name: "Custom",
      description: "Customize your own settings",
      config: settings,
    },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = presets.find((p) => p.id === presetId);
    if (preset && presetId !== "custom") {
      setSettings(preset.config);
    }
  };

  const handleToggleLanguage = (lang: string) => {
    setSettings((prev) => ({
      ...prev,
      languageFilter: prev.languageFilter.includes(lang)
        ? prev.languageFilter.filter((l) => l !== lang)
        : [...prev.languageFilter, lang],
    }));
  };

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
  ];

  const stats = {
    reviewsCompleted: 156,
    suggestionsMade: 423,
    issuesCaught: 28,
    timeSaved: "12h",
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
                <h1 className="text-2xl font-semibold">Copilot code review</h1>
                <p className="text-muted-foreground mt-1">
                  Configure AI-powered code review settings
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GitPullRequest className="w-4 h-4" />
                      Reviews completed
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.reviewsCompleted}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4" />
                      Suggestions made
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.suggestionsMade}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4" />
                      Issues caught
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-red-600">{stats.issuesCaught}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Time saved
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-green-600">{stats.timeSaved}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Enable Copilot code review</h2>
                    <p className="text-sm text-muted-foreground">
                      Use AI to automatically review pull requests and provide feedback.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable code review</p>
                        <p className="text-sm text-muted-foreground">
                          Allow Copilot to review pull requests in this repository.
                        </p>
                      </div>
                      <Switch
                        checked={settings.enableCodeReview}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, enableCodeReview: checked }))
                        }
                      />
                    </div>

                    {settings.enableCodeReview && (
                      <>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Auto-review</p>
                            <p className="text-sm text-muted-foreground">
                              Automatically start review when a PR is opened or updated.
                            </p>
                          </div>
                          <Switch
                            checked={settings.autoReview}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, autoReview: checked }))
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {settings.enableCodeReview && (
                  <>
                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Review preset</h2>
                        <p className="text-sm text-muted-foreground">
                          Choose a preset configuration or customize your own settings.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {presets.map((preset) => (
                          <div
                            key={preset.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedPreset === preset.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handlePresetChange(preset.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {selectedPreset === preset.id ? (
                                  <CheckCircle className="w-5 h-5 text-primary" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{preset.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {preset.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Review settings</h2>
                        <p className="text-sm text-muted-foreground">
                          Configure how Copilot reviews your code.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Review scope</p>
                            <p className="text-sm text-muted-foreground">
                              Which files to include in the review.
                            </p>
                          </div>
                          <Select
                            value={settings.reviewScope}
                            onValueChange={(value) =>
                              setSettings((prev) => ({
                                ...prev,
                                reviewScope: value as "all" | "changed_files" | "new_code",
                              }))
                            }
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All files</SelectItem>
                              <SelectItem value="changed_files">Changed files only</SelectItem>
                              <SelectItem value="new_code">New code only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Max files to review</p>
                            <p className="text-sm text-muted-foreground">
                              Maximum number of files to review in a single PR.
                            </p>
                          </div>
                          <Select
                            value={settings.maxFilesToReview.toString()}
                            onValueChange={(value) =>
                              setSettings((prev) => ({
                                ...prev,
                                maxFilesToReview: parseInt(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 files</SelectItem>
                              <SelectItem value="10">10 files</SelectItem>
                              <SelectItem value="15">15 files</SelectItem>
                              <SelectItem value="20">20 files</SelectItem>
                              <SelectItem value="30">30 files</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Minimum confidence</p>
                            <p className="text-sm text-muted-foreground">
                              Only show suggestions above this confidence level.
                            </p>
                          </div>
                          <Select
                            value={settings.minConfidence.toString()}
                            onValueChange={(value) =>
                              setSettings((prev) => ({
                                ...prev,
                                minConfidence: parseFloat(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.5">50%</SelectItem>
                              <SelectItem value="0.7">70%</SelectItem>
                              <SelectItem value="0.8">80%</SelectItem>
                              <SelectItem value="0.9">90%</SelectItem>
                              <SelectItem value="0.95">95%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Include suggestions</p>
                            <p className="text-sm text-muted-foreground">
                              Include code improvement suggestions in reviews.
                            </p>
                          </div>
                          <Switch
                            checked={settings.includeSuggestions}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, includeSuggestions: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Auto-approve safe changes</p>
                            <p className="text-sm text-muted-foreground">
                              Automatically approve PRs with no issues found.
                            </p>
                          </div>
                          <Switch
                            checked={settings.autoApproveSafe}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, autoApproveSafe: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Block on suggestions</p>
                            <p className="text-sm text-muted-foreground">
                              Block merging when suggestions are not addressed.
                            </p>
                          </div>
                          <Switch
                            checked={settings.blockOnSuggestions}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, blockOnSuggestions: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Language filters</h2>
                        <p className="text-sm text-muted-foreground">
                          Select which languages to include in code review (leave empty for all).
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {languages.map((lang) => (
                          <div
                            key={lang.value}
                            className={`px-3 py-2 border rounded-lg cursor-pointer transition-colors ${
                              settings.languageFilter.includes(lang.value)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handleToggleLanguage(lang.value)}
                          >
                            <div className="flex items-center gap-2">
                              {settings.languageFilter.includes(lang.value) ? (
                                <CheckCircle className="w-4 h-4 text-primary" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                              )}
                              <span className="text-sm">{lang.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About Copilot code review</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about AI-powered code review.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Copilot code review uses AI to analyze pull requests and provide
                          intelligent feedback on code quality, security, and best practices.
                        </p>
                        <p>
                          The review includes security vulnerability detection, code quality
                          suggestions, and best practice recommendations.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/copilot/code-review"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about Copilot code review
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
