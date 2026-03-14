"use client";

import * as React from "react";
import Link from "next/link";
import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Users,
  Search,
  MoreHorizontal,
  Shield,
  Lock,
  Globe,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authEngine } from "@/lib/auth/IndexedDBAuthEngine";
import { getOrganizationBySlug } from "@/lib/organizations/LocalOrgEngine";
import { getTeamsByOrganization, createTeam, type Team } from "@/lib/teams/LocalTeamEngine";

interface TeamsPageProps {
  params: Promise<{ owner: string }>;
}

const defaultTeams: Omit<Team, "id" | "createdAt" | "membersCount" | "reposCount">[] = [
  {
    slug: "engineering",
    name: "Engineering",
    description: "Core development team",
    privacy: "closed",
    organizationSlug: "",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=ENG&backgroundColor=6366f1",
  },
  {
    slug: "design",
    name: "Design",
    description: "UI/UX and design systems",
    privacy: "closed",
    organizationSlug: "",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=DSG&backgroundColor=ec4899",
  },
  {
    slug: "infrastructure",
    name: "Infrastructure",
    description: "DevOps and infrastructure team",
    privacy: "closed",
    organizationSlug: "",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=INF&backgroundColor=14b8a6",
  },
  {
    slug: "security",
    name: "Security",
    description: "Security research and vulnerability management",
    privacy: "secret",
    organizationSlug: "",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=SEC&backgroundColor=ef4444",
  },
  {
    slug: "community",
    name: "Community",
    description: "Community support and outreach",
    privacy: "closed",
    organizationSlug: "",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=CMN&backgroundColor=f59e0b",
  },
];

export default function TeamsPage({ params }: TeamsPageProps) {
  const resolvedParams = use(params);
  const { owner } = resolvedParams;

  const [currentUser, setCurrentUser] = React.useState<string | null>(null);
  const [ownerType, setOwnerType] = React.useState<"user" | "organization">("user");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [showPrivacyFilter, setShowPrivacyFilter] = React.useState(false);
  const [privacyFilter, setPrivacyFilter] = React.useState<"all" | "closed" | "secret">("all");
  const [isLoading, setIsLoading] = React.useState(true);

  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [newTeam, setNewTeam] = React.useState({
    name: "",
    slug: "",
    description: "",
    privacy: "closed" as "closed" | "secret",
  });
  const [createError, setCreateError] = React.useState("");

  React.useEffect(() => {
    async function loadUser() {
      try {
        const user = await authEngine.getCurrentUser();
        setCurrentUser(user?.username || null);
      } catch {
        setCurrentUser(null);
      }
    }
    loadUser();
  }, []);

  React.useEffect(() => {
    async function loadOwnerData() {
      const org = await getOrganizationBySlug(owner);
      setOwnerType(org ? "organization" : "user");
    }
    loadOwnerData();
  }, [owner]);

  React.useEffect(() => {
    async function loadTeams() {
      setIsLoading(true);
      try {
        const loadedTeams = getTeamsByOrganization(owner);

        if (loadedTeams.length === 0) {
          const teamsWithOrg = defaultTeams.map((t) => ({ ...t, organizationSlug: owner }));
          teamsWithOrg.forEach((team) => createTeam(team));
          setTeams(
            teamsWithOrg.map((t, i) => ({
              ...t,
              id: `default-${i}`,
              membersCount: Math.floor(Math.random() * 10) + 1,
              reposCount: Math.floor(Math.random() * 8) + 1,
              createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
            }))
          );
        } else {
          setTeams(loadedTeams);
        }
      } catch (error) {
        console.error("Failed to load teams:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (owner && ownerType === "organization") {
      loadTeams();
    } else {
      setIsLoading(false);
    }
  }, [owner, ownerType]);

  const isOwner = currentUser?.toLowerCase() === owner.toLowerCase();

  const filteredTeams = React.useMemo(() => {
    let result = [...teams];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (team) =>
          team.name.toLowerCase().includes(query) ||
          team.slug.toLowerCase().includes(query) ||
          team.description.toLowerCase().includes(query)
      );
    }

    if (privacyFilter !== "all") {
      result = result.filter((team) => team.privacy === privacyFilter);
    }

    return result;
  }, [teams, searchQuery, privacyFilter]);

  const handleCreateTeam = async () => {
    if (!newTeam.name || !newTeam.slug) {
      setCreateError("Name and slug are required");
      return;
    }

    setIsCreating(true);
    setCreateError("");

    try {
      const created = createTeam({
        name: newTeam.name,
        slug: newTeam.slug.toLowerCase().replace(/\s+/g, "-"),
        description: newTeam.description,
        privacy: newTeam.privacy,
        organizationSlug: owner,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${newTeam.slug}&backgroundColor=6366f1`,
      });
      setTeams((prev) => [...prev, created]);
      setShowCreateDialog(false);
      setNewTeam({ name: "", slug: "", description: "", privacy: "closed" });
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Failed to create team");
    } finally {
      setIsCreating(false);
    }
  };

  const handleNameChange = (name: string) => {
    setNewTeam((prev) => ({
      ...prev,
      name,
      slug: prev.slug || name.toLowerCase().replace(/\s+/g, "-"),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6" />
            Teams
          </h1>
          {isOwner && ownerType === "organization" && (
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Team
            </Button>
          )}
        </div>

        {ownerType === "user" && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 p-4 mb-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Teams are only available for organizations.{" "}
              <Link href="/new/organization" className="underline hover:text-yellow-900">
                Create an organization
              </Link>{" "}
              to use teams.
            </p>
          </div>
        )}

        {ownerType === "organization" && isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading teams...</div>
          </div>
        )}

        {ownerType === "organization" && !isLoading && (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowPrivacyFilter(!showPrivacyFilter)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border bg-background hover:bg-muted transition-colors"
                >
                  {privacyFilter === "all"
                    ? "All teams"
                    : privacyFilter === "closed"
                      ? "Closed"
                      : "Secret"}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showPrivacyFilter && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10"
                        onClick={() => setShowPrivacyFilter(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-1 w-40 rounded-md border border-border bg-popover shadow-lg z-20"
                      >
                        <button
                          onClick={() => {
                            setPrivacyFilter("all");
                            setShowPrivacyFilter(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm rounded-t-md transition-colors ${
                            privacyFilter === "all"
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          All teams
                        </button>
                        <button
                          onClick={() => {
                            setPrivacyFilter("closed");
                            setShowPrivacyFilter(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                            privacyFilter === "closed"
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          Closed
                        </button>
                        <button
                          onClick={() => {
                            setPrivacyFilter("secret");
                            setShowPrivacyFilter(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm rounded-b-md transition-colors ${
                            privacyFilter === "secret"
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          Secret
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {filteredTeams.length > 0 ? (
              <div className="grid gap-4">
                {filteredTeams.map((team) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-border bg-card p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                          {team.avatarUrl ? (
                            <img
                              src={team.avatarUrl}
                              alt={team.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Shield className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/${owner}/teams/${team.slug}`}
                              className="text-lg font-semibold hover:underline"
                            >
                              {team.name}
                            </Link>
                            {team.privacy === "secret" ? (
                              <Badge variant="secondary" className="gap-1">
                                <Lock className="w-3 h-3" />
                                Secret
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="gap-1">
                                <Globe className="w-3 h-3" />
                                Closed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{team.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{team.membersCount} members</span>
                            <span>{team.reposCount} repositories</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View team</DropdownMenuItem>
                          {isOwner && <DropdownMenuItem>Manage team</DropdownMenuItem>}
                          <DropdownMenuItem>Copy team URL</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No teams found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "Create your first team to organize members and repositories"}
                </p>
                {isOwner && (
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create team
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Create new team</DialogTitle>
            <DialogDescription>
              Teams allow you to organize members and manage permissions across repositories.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team name</Label>
              <Input
                id="team-name"
                placeholder="e.g. Engineering"
                value={newTeam.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-slug">Team slug</Label>
              <Input
                id="team-slug"
                placeholder="e.g. engineering"
                value={newTeam.slug}
                onChange={(e) =>
                  setNewTeam((prev) => ({
                    ...prev,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  }))
                }
              />
              <p className="text-xs text-muted-foreground">
                Will be used in URLs: {owner}/teams/{newTeam.slug || "team-slug"}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-description">Description</Label>
              <Textarea
                id="team-description"
                placeholder="A brief description of the team"
                value={newTeam.description}
                onChange={(e) => setNewTeam((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-privacy">Privacy</Label>
              <Select
                value={newTeam.privacy}
                onValueChange={(value: "closed" | "secret") =>
                  setNewTeam((prev) => ({ ...prev, privacy: value }))
                }
              >
                <SelectTrigger id="team-privacy">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="closed">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Closed (visible to all organization members)
                    </div>
                  </SelectItem>
                  <SelectItem value="secret">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Secret (only visible to team members)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {createError && <p className="text-sm text-red-500">{createError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeam} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create team"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
