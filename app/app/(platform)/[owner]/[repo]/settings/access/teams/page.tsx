"use client";

import * as React from "react";
import { use } from "react";
import { SettingSidebar } from "@/components/repository/settings/SettingSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
  Users,
  UserPlus,
  Trash2,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Search,
  MoreHorizontal,
  Loader2,
} from "lucide-react";

interface TeamAccess {
  id: string;
  name: string;
  slug: string;
  avatarUrl?: string;
  permission: "admin" | "maintain" | "push" | "pull" | "triage";
  defaultPermission?: boolean;
}

interface SettingsTeamsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsTeamsPage({ params }: SettingsTeamsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [teams, setTeams] = React.useState<TeamAccess[]>([
    {
      id: "1",
      name: "Owners",
      slug: "owners",
      permission: "admin",
      defaultPermission: true,
    },
    {
      id: "2",
      name: "Maintainers",
      slug: "maintainers",
      permission: "maintain",
    },
    {
      id: "3",
      name: "Developers",
      slug: "developers",
      permission: "push",
    },
  ]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [newTeamSlug, setNewTeamSlug] = React.useState("");
  const [newTeamPermission, setNewTeamPermission] = React.useState<string>("push");
  const [defaultPermission, setDefaultPermission] = React.useState("pull");

  const filteredTeams = React.useMemo(() => {
    if (!searchQuery) return teams;
    const query = searchQuery.toLowerCase();
    return teams.filter(
      (team) => team.name.toLowerCase().includes(query) || team.slug.toLowerCase().includes(query)
    );
  }, [teams, searchQuery]);

  const handleAddTeam = async () => {
    if (!newTeamSlug.trim()) return;
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newTeam: TeamAccess = {
      id: Date.now().toString(),
      name: newTeamSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      slug: newTeamSlug.toLowerCase(),
      permission: newTeamPermission as TeamAccess["permission"],
    };

    setTeams((prev) => [...prev, newTeam]);
    setNewTeamSlug("");
    setNewTeamPermission("push");
    setIsAddDialogOpen(false);
    setIsLoading(false);
  };

  const handleRemoveTeam = (teamId: string) => {
    setTeams((prev) => prev.filter((team) => team.id !== teamId));
  };

  const handlePermissionChange = (teamId: string, permission: string) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId ? { ...team, permission: permission as TeamAccess["permission"] } : team
      )
    );
  };

  const handleDefaultPermissionChange = (value: string) => {
    setDefaultPermission(value);
    setTeams((prev) =>
      prev.map((team) =>
        team.defaultPermission ? { ...team, permission: value as TeamAccess["permission"] } : team
      )
    );
  };

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case "admin":
        return <ShieldAlert className="w-4 h-4 text-red-600" />;
      case "maintain":
        return <Shield className="w-4 h-4 text-orange-600" />;
      case "push":
        return <ShieldCheck className="w-4 h-4 text-green-600" />;
      case "pull":
        return <Shield className="w-4 h-4 text-blue-600" />;
      case "triage":
        return <Shield className="w-4 h-4 text-purple-600" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getPermissionLabel = (permission: string) => {
    switch (permission) {
      case "admin":
        return "Admin";
      case "maintain":
        return "Maintain";
      case "push":
        return "Write";
      case "pull":
        return "Read";
      case "triage":
        return "Triage";
      default:
        return permission;
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
                <h1 className="text-2xl font-semibold">Teams</h1>
                <p className="text-muted-foreground mt-1">Manage team access to this repository</p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Team access</h2>
                    <p className="text-sm text-muted-foreground">
                      Control which teams have access to this repository and their permission
                      levels.
                    </p>
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add teams
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add team access</DialogTitle>
                        <DialogDescription>
                          Add a team to this repository and set their permission level.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="team-slug">Team slug</Label>
                          <Input
                            id="team-slug"
                            placeholder="team-name"
                            value={newTeamSlug}
                            onChange={(e) => setNewTeamSlug(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            The URL-friendly name of the team (e.g., my-team)
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="permission">Permission</Label>
                          <Select value={newTeamPermission} onValueChange={setNewTeamPermission}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select permission" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="maintain">Maintain</SelectItem>
                              <SelectItem value="push">Write</SelectItem>
                              <SelectItem value="triage">Triage</SelectItem>
                              <SelectItem value="pull">Read</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddTeam} disabled={isLoading || !newTeamSlug.trim()}>
                          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                          Add team
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Filter teams..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <div className="border rounded-lg">
                    {filteredTeams.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Users className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No teams found</p>
                        <Button
                          variant="link"
                          onClick={() => setIsAddDialogOpen(true)}
                          className="mt-2"
                        >
                          Add a team
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {filteredTeams.map((team) => (
                          <div key={team.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <Users className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{team.name}</p>
                                  {team.defaultPermission && (
                                    <span className="text-xs text-muted-foreground">(Default)</span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{team.slug}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                {getPermissionIcon(team.permission)}
                                <Select
                                  value={team.permission}
                                  onValueChange={(value) => handlePermissionChange(team.id, value)}
                                  disabled={team.defaultPermission}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="maintain">Maintain</SelectItem>
                                    <SelectItem value="push">Write</SelectItem>
                                    <SelectItem value="triage">Triage</SelectItem>
                                    <SelectItem value="pull">Read</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {!team.defaultPermission && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveTeam(team.id)}
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

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Base permissions</h2>
                    <p className="text-sm text-muted-foreground">
                      Choose the default permission for team members outside this repository.
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="text-sm">
                      <p className="font-medium">Default permission</p>
                      <p className="text-muted-foreground text-xs">
                        The permission to grant to all team members when they are added to this
                        repository.
                      </p>
                    </div>
                    <Select value={defaultPermission} onValueChange={handleDefaultPermissionChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="maintain">Maintain</SelectItem>
                        <SelectItem value="push">Write</SelectItem>
                        <SelectItem value="triage">Triage</SelectItem>
                        <SelectItem value="pull">Read</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Team sync</h2>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync team membership with your identity provider.
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="text-sm">
                      <p className="font-medium">Enable team sync</p>
                      <p className="text-muted-foreground text-xs">
                        Sync team members from your identity provider.
                      </p>
                    </div>
                    <Switch disabled />
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
