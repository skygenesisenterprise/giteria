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
  BarChart3,
  TrendingUp,
  TrendingDown,
  Shield,
  ShieldCheck,
  ShieldAlert,
  GitPullRequest,
  GitBranch,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Info,
  RefreshCw,
} from "lucide-react";

interface RuleInsight {
  id: string;
  ruleName: string;
  ruleType: string;
  totalTriggered: number;
  blocked: number;
  bypassed: number;
  lastTriggered: string;
  trend: "up" | "down" | "stable";
  changePercent: number;
}

interface SettingsRulesInsightsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsRulesInsightsPage({ params }: SettingsRulesInsightsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [timeRange, setTimeRange] = React.useState("30days");
  const [isLoading, setIsLoading] = React.useState(false);

  const [insights, setInsights] = React.useState<RuleInsight[]>([
    {
      id: "1",
      ruleName: "Main branch Protect",
      ruleType: "Pull request",
      totalTriggered: 156,
      blocked: 23,
      bypassed: 5,
      lastTriggered: "2024-01-15T10:30:00Z",
      trend: "up",
      changePercent: 12,
    },
    {
      id: "2",
      ruleName: "Main branch Protect",
      ruleType: "Non-fast-forward",
      totalTriggered: 89,
      blocked: 12,
      bypassed: 2,
      lastTriggered: "2024-01-14T15:20:00Z",
      trend: "down",
      changePercent: -8,
    },
    {
      id: "3",
      ruleName: "Main branch Protect",
      ruleType: "Deletion",
      totalTriggered: 45,
      blocked: 8,
      bypassed: 1,
      lastTriggered: "2024-01-13T09:00:00Z",
      trend: "stable",
      changePercent: 0,
    },
    {
      id: "4",
      ruleName: "Release tags",
      ruleType: "Non-fast-forward",
      totalTriggered: 34,
      blocked: 6,
      bypassed: 0,
      lastTriggered: "2024-01-12T14:45:00Z",
      trend: "up",
      changePercent: 25,
    },
  ]);

  const [insightsSettings, setInsightsSettings] = React.useState({
    enableInsights: true,
    retentionDays: 90,
    notifyOnAnomalies: true,
  });

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const stats = React.useMemo(() => {
    return {
      totalRules: insights.length,
      totalTriggered: insights.reduce((acc, i) => acc + i.totalTriggered, 0),
      totalBlocked: insights.reduce((acc, i) => acc + i.blocked, 0),
      totalBypassed: insights.reduce((acc, i) => acc + i.bypassed, 0),
    };
  }, [insights]);

  const getTrendIcon = (trend: RuleInsight["trend"], changePercent: number) => {
    if (trend === "up") {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    }
    if (trend === "down") {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <span className="text-muted-foreground">-</span>;
  };

  const getTrendText = (trend: RuleInsight["trend"], changePercent: number) => {
    if (changePercent === 0) return "No change";
    if (changePercent > 0) return `+${changePercent}%`;
    return `${changePercent}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">Rules insights</h1>
                  <p className="text-muted-foreground mt-1">
                    View analytics and trends for your rulesets
                  </p>
                </div>
                <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Overview</h2>
                    <p className="text-sm text-muted-foreground">
                      Summary of ruleset activity across your repository.
                    </p>
                  </div>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      Active rules
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.totalRules}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GitPullRequest className="w-4 h-4" />
                      Total triggered
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.totalTriggered}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4" />
                      Blocked
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-red-600">{stats.totalBlocked}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4" />
                      Bypassed
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-yellow-600">
                      {stats.totalBypassed}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Rules activity</h2>
                    <p className="text-sm text-muted-foreground">
                      Detailed breakdown of each rule&apos;s activity and performance.
                    </p>
                  </div>

                  <div className="border rounded-lg">
                    {insights.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No rules activity data</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {insights.map((insight) => (
                          <div key={insight.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                  <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{insight.ruleName}</p>
                                    <Badge variant="outline" className="text-xs">
                                      {insight.ruleType}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>Last triggered: {formatDate(insight.lastTriggered)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-8">
                                <div className="text-center">
                                  <p className="text-lg font-semibold">{insight.totalTriggered}</p>
                                  <p className="text-xs text-muted-foreground">Triggered</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-lg font-semibold text-red-600">
                                    {insight.blocked}
                                  </p>
                                  <p className="text-xs text-muted-foreground">Blocked</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-lg font-semibold text-yellow-600">
                                    {insight.bypassed}
                                  </p>
                                  <p className="text-xs text-muted-foreground">Bypassed</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {getTrendIcon(insight.trend, insight.changePercent)}
                                  <span
                                    className={`text-sm ${
                                      insight.changePercent > 0
                                        ? "text-green-600"
                                        : insight.changePercent < 0
                                          ? "text-red-600"
                                          : "text-muted-foreground"
                                    }`}
                                  >
                                    {getTrendText(insight.trend, insight.changePercent)}
                                  </span>
                                </div>
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
                    <h2 className="text-xl font-semibold">Insights settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure how rules insights are collected and displayed.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Enable rules insights</p>
                        <p className="text-sm text-muted-foreground">
                          Collect and display insights about ruleset activity.
                        </p>
                      </div>
                      <Switch
                        checked={insightsSettings.enableInsights}
                        onCheckedChange={(checked) =>
                          setInsightsSettings((prev) => ({ ...prev, enableInsights: checked }))
                        }
                      />
                    </div>

                    {insightsSettings.enableInsights && (
                      <>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Data retention period</p>
                            <p className="text-sm text-muted-foreground">
                              How long to keep rules activity data.
                            </p>
                          </div>
                          <Select
                            value={insightsSettings.retentionDays.toString()}
                            onValueChange={(value) =>
                              setInsightsSettings((prev) => ({
                                ...prev,
                                retentionDays: parseInt(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="180">180 days</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Notify on anomalies</p>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications when unusual patterns are detected.
                            </p>
                          </div>
                          <Switch
                            checked={insightsSettings.notifyOnAnomalies}
                            onCheckedChange={(checked) =>
                              setInsightsSettings((prev) => ({
                                ...prev,
                                notifyOnAnomalies: checked,
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
                    <h2 className="text-xl font-semibold">About rules insights</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn how to interpret rules insights data.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          <strong>Triggered:</strong> Number of times a rule was evaluated when
                          pushing to a matching branch or tag.
                        </p>
                        <p>
                          <strong>Blocked:</strong> Number of pushes that were blocked because they
                          did not meet the rule requirements.
                        </p>
                        <p>
                          <strong>Bypassed:</strong> Number of times a rule was bypassed by an actor
                          with bypass permissions.
                        </p>
                        <p>
                          <strong>Trend:</strong> Comparison of triggered events with the previous
                          time period.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
