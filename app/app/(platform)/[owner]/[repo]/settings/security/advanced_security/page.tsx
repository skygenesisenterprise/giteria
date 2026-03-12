"use client";

import * as React from "react";
import { use } from "react";
import { SettingSidebar } from "@/components/repository/settings/SettingSidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  ShieldCheck,
  Loader2,
  Info,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Bug,
  Lock,
  GitBranch,
} from "lucide-react";

interface SecurityFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  status: "active" | "inactive" | "unavailable";
  alertsCount?: number;
}

interface SettingsAdvancedSecurityPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsAdvancedSecurityPage({
  params,
}: SettingsAdvancedSecurityPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [features, setFeatures] = React.useState<SecurityFeature[]>([
    {
      id: "1",
      name: "Dependency graph",
      description: "Visualize and manage project dependencies",
      enabled: true,
      status: "active",
    },
    {
      id: "2",
      name: "Dependabot alerts",
      description: "Get alerts when vulnerabilities are detected in dependencies",
      enabled: true,
      status: "active",
      alertsCount: 5,
    },
    {
      id: "3",
      name: "Dependabot security updates",
      description: "Automatically create pull requests to update vulnerable dependencies",
      enabled: true,
      status: "active",
    },
    {
      id: "4",
      name: "Code scanning",
      description: "Automatically detect security vulnerabilities in code",
      enabled: true,
      status: "active",
      alertsCount: 3,
    },
    {
      id: "5",
      name: "Secret scanning",
      description: "Detect secrets accidentally committed to the repository",
      enabled: true,
      status: "active",
      alertsCount: 0,
    },
    {
      id: "6",
      name: "Push protection",
      description: "Block commits containing secrets from being pushed",
      enabled: false,
      status: "inactive",
    },
  ]);

  const [codeScanningAlerts, setCodeScanningAlerts] = React.useState([
    {
      id: "1",
      tool: "CodeQL",
      severity: "high",
      file: "src/auth.js",
      line: 42,
      message: "SQL injection vulnerability",
    },
    {
      id: "2",
      tool: "CodeQL",
      severity: "medium",
      file: "src/utils.js",
      line: 15,
      message: "Use of insecure randomness",
    },
    {
      id: "3",
      tool: "ESLint",
      severity: "low",
      file: "src/config.js",
      line: 8,
      message: "Missing error handling",
    },
  ]);

  const [secretAlerts, setSecretAlerts] = React.useState([
    {
      id: "1",
      type: "AWS Key",
      file: "config/prod.json",
      line: 12,
      detected: "2024-01-10T10:30:00Z",
    },
    { id: "2", type: "GitHub Token", file: ".env", line: 5, detected: "2024-01-12T14:20:00Z" },
  ]);

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleToggleFeature = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === featureId
          ? { ...f, enabled: !f.enabled, status: !f.enabled ? "active" : "inactive" }
          : f
      )
    );
  };

  const getStatusBadge = (status: SecurityFeature["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "unavailable":
        return <Badge className="bg-yellow-100 text-yellow-800">Unavailable</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "high":
        return "text-orange-600 bg-orange-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const stats = {
    vulnerabilities: 8,
    dependencies: 156,
    secretLeaks: 2,
    lastScan: "2024-01-15T10:30:00Z",
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
                <h1 className="text-2xl font-semibold">Advanced Security</h1>
                <p className="text-muted-foreground mt-1">
                  Configure security features and manage security alerts
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4" />
                      Vulnerabilities
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-red-600">
                      {stats.vulnerabilities}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GitBranch className="w-4 h-4" />
                      Dependencies
                    </div>
                    <p className="text-2xl font-semibold mt-1">{stats.dependencies}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      Secret leaks
                    </div>
                    <p className="text-2xl font-semibold mt-1 text-orange-600">
                      {stats.secretLeaks}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="w-4 h-4" />
                      Last scan
                    </div>
                    <p className="text-2xl font-semibold mt-1">2h ago</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Security features</h2>
                    <p className="text-sm text-muted-foreground">
                      Enable and configure security features for this repository.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Shield className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{feature.name}</p>
                              {getStatusBadge(feature.status)}
                              {feature.alertsCount !== undefined && feature.alertsCount > 0 && (
                                <Badge className="bg-red-100 text-red-800">
                                  {feature.alertsCount} alert(s)
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={() => handleToggleFeature(feature.id)}
                          disabled={feature.status === "unavailable"}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {features.find((f) => f.id === "4" && f.enabled) && (
                  <>
                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Code scanning alerts</h2>
                        <p className="text-sm text-muted-foreground">
                          Security issues detected by code scanning tools.
                        </p>
                      </div>

                      <div className="border rounded-lg">
                        {codeScanningAlerts.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                            <p className="text-muted-foreground">No code scanning alerts</p>
                          </div>
                        ) : (
                          <div className="divide-y">
                            {codeScanningAlerts.map((alert) => (
                              <div key={alert.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityColor(alert.severity)}`}
                                  >
                                    <Bug className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{alert.message}</p>
                                      <Badge className={getSeverityColor(alert.severity)}>
                                        {alert.severity}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {alert.tool} • {alert.file}:{alert.line}
                                    </p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" disabled>
                                  View fix
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {features.find((f) => f.id === "5" && f.enabled) && (
                  <>
                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Secret scanning alerts</h2>
                        <p className="text-sm text-muted-foreground">
                          Secrets detected in your repository.
                        </p>
                      </div>

                      <div className="border rounded-lg">
                        {secretAlerts.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                            <p className="text-muted-foreground">No secret scanning alerts</p>
                          </div>
                        ) : (
                          <div className="divide-y">
                            {secretAlerts.map((alert) => (
                              <div key={alert.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-red-600" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{alert.type} detected</p>
                                      <Badge className="bg-red-100 text-red-800">Active</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {alert.file}:{alert.line} • Detected{" "}
                                      {new Date(alert.detected).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" disabled>
                                  View details
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About Advanced Security</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about Advanced Security features.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Advanced Security provides additional security features to help you secure
                          your repository.
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            <strong>Dependency graph:</strong> Visualize dependencies and known
                            vulnerabilities
                          </li>
                          <li>
                            <strong>Dependabot:</strong> Automatic alerts and updates for vulnerable
                            dependencies
                          </li>
                          <li>
                            <strong>Code scanning:</strong> Find security vulnerabilities in your
                            code
                          </li>
                          <li>
                            <strong>Secret scanning:</strong> Detect secrets accidentally committed
                            to the repository
                          </li>
                          <li>
                            <strong>Push protection:</strong> Block commits containing secrets from
                            being pushed
                          </li>
                        </ul>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.github.com/en/code-security"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about Advanced Security
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
