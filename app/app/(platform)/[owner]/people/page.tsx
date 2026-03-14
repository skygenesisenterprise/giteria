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
  Mail,
  Calendar,
  ChevronDown,
  UserMinus,
  ShieldAlert,
  Crown,
  UserCog,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import {
  getMembersByOrganization,
  createMember,
  updateMember,
  deleteMember,
  type OrgMember,
} from "@/lib/org-members/LocalOrgMembersEngine";

interface PeoplePageProps {
  params: Promise<{ owner: string }>;
}

const defaultMembers: Omit<OrgMember, "id" | "joinedAt">[] = [
  {
    username: "liamvonastoria",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=LA&backgroundColor=0ea5e9",
    role: "owner",
    organizationSlug: "",
    email: "liam@skygenesisenterprise.com",
  },
  {
    username: "alexdev",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AD&backgroundColor=10b981",
    role: "admin",
    organizationSlug: "",
    email: "alex@skygenesisenterprise.com",
  },
  {
    username: "johndoe",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=f59e0b",
    role: "member",
    organizationSlug: "",
    email: "john@skygenesisenterprise.com",
  },
  {
    username: "sarahdev",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=SD&backgroundColor=ec4899",
    role: "member",
    organizationSlug: "",
    email: "sarah@skygenesisenterprise.com",
  },
  {
    username: "mikeops",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=MO&backgroundColor=14b8a6",
    role: "billing_manager",
    organizationSlug: "",
    email: "mike@skygenesisenterprise.com",
  },
];

function getRoleIcon(role: OrgMember["role"]) {
  switch (role) {
    case "owner":
      return <Crown className="w-4 h-4 text-yellow-500" />;
    case "admin":
      return <ShieldAlert className="w-4 h-4 text-red-500" />;
    case "billing_manager":
      return <Shield className="w-4 h-4 text-blue-500" />;
    case "moderator":
      return <UserCog className="w-4 h-4 text-purple-500" />;
    default:
      return <Users className="w-4 h-4 text-muted-foreground" />;
  }
}

function getRoleBadgeVariant(role: OrgMember["role"]) {
  switch (role) {
    case "owner":
      return "default";
    case "admin":
      return "destructive";
    case "billing_manager":
      return "outline";
    case "moderator":
      return "secondary";
    default:
      return "secondary";
  }
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PeoplePage({ params }: PeoplePageProps) {
  const resolvedParams = use(params);
  const { owner } = resolvedParams;

  const [currentUser, setCurrentUser] = React.useState<string | null>(null);
  const [ownerType, setOwnerType] = React.useState<"user" | "organization">("user");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("all");
  const [members, setMembers] = React.useState<OrgMember[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [showInviteDialog, setShowInviteDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<OrgMember | null>(null);

  const [inviteForm, setInviteForm] = React.useState({
    username: "",
    email: "",
    role: "member" as OrgMember["role"],
    message: "",
  });
  const [editForm, setEditForm] = React.useState({
    role: "member" as OrgMember["role"],
  });
  const [error, setError] = React.useState("");

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
    async function loadMembers() {
      setIsLoading(true);
      try {
        const loadedMembers = getMembersByOrganization(owner);

        if (loadedMembers.length === 0) {
          const membersWithOrg = defaultMembers.map((m) => ({
            ...m,
            organizationSlug: owner,
          }));
          membersWithOrg.forEach((member) => createMember(member));
          const savedMembers = getMembersByOrganization(owner);
          setMembers(savedMembers);
        } else {
          setMembers(loadedMembers);
        }
      } catch (err) {
        console.error("Failed to load members:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (owner && ownerType === "organization") {
      loadMembers();
    } else {
      setIsLoading(false);
    }
  }, [owner, ownerType]);

  const isOwner = currentUser?.toLowerCase() === owner.toLowerCase();

  const filteredMembers = React.useMemo(() => {
    let result = [...members];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (member) =>
          member.username.toLowerCase().includes(query) ||
          member.email?.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== "all") {
      result = result.filter((member) => member.role === roleFilter);
    }

    return result;
  }, [members, searchQuery, roleFilter]);

  const handleInvite = async () => {
    if (!inviteForm.username && !inviteForm.email) {
      setError("Username or email is required");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const username = inviteForm.username || inviteForm.email.split("@")[0];
      const created = createMember({
        username,
        email: inviteForm.email,
        role: inviteForm.role,
        organizationSlug: owner,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=6366f1`,
      });
      setMembers((prev) => [...prev, created]);
      setShowInviteDialog(false);
      setInviteForm({ username: "", email: "", role: "member", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to invite member");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedMember) return;

    setIsProcessing(true);
    setError("");

    try {
      const updated = updateMember(selectedMember.id, { role: editForm.role });
      if (updated) {
        setMembers((prev) => prev.map((m) => (m.id === selectedMember.id ? updated : m)));
      }
      setShowEditDialog(false);
      setSelectedMember(null);
      setEditForm({ role: "member" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveMember = async (member: OrgMember) => {
    if (!confirm(`Are you sure you want to remove ${member.username} from the organization?`)) {
      return;
    }

    try {
      deleteMember(member.id);
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    } catch (err) {
      console.error("Failed to remove member:", err);
    }
  };

  const openEditDialog = (member: OrgMember) => {
    setSelectedMember(member);
    setEditForm({ role: member.role });
    setShowEditDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6" />
            People
          </h1>
          {isOwner && ownerType === "organization" && (
            <Button onClick={() => setShowInviteDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Invite member
            </Button>
          )}
        </div>

        {ownerType === "user" && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 p-4 mb-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              People management is only available for organizations.{" "}
              <Link href="/new/organization" className="underline hover:text-yellow-900">
                Create an organization
              </Link>{" "}
              to manage members.
            </p>
          </div>
        )}

        {ownerType === "organization" && isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading members...</div>
          </div>
        )}

        {ownerType === "organization" && !isLoading && (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setRoleFilter(roleFilter === "all" ? "member" : "all")}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border bg-background hover:bg-muted transition-colors"
                >
                  {roleFilter === "all" ? "All roles" : roleFilter}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {roleFilter !== "all" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-1"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setRoleFilter("all")}
                        className="px-2 py-1 h-auto text-xs"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{filteredMembers.length} members</span>
              {filteredMembers.filter((m) => m.role === "owner").length > 0 && (
                <Badge variant="outline" className="gap-1">
                  <Crown className="w-3 h-3" />
                  {filteredMembers.filter((m) => m.role === "owner").length} owner
                </Badge>
              )}
              {filteredMembers.filter((m) => m.role === "admin").length > 0 && (
                <Badge variant="destructive" className="gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  {filteredMembers.filter((m) => m.role === "admin").length} admin
                </Badge>
              )}
              {filteredMembers.filter((m) => m.role === "member").length > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Users className="w-3 h-3" />
                  {filteredMembers.filter((m) => m.role === "member").length} member
                </Badge>
              )}
            </div>

            {filteredMembers.length > 0 ? (
              <div className="border border-border rounded-lg bg-card divide-y divide-border">
                {filteredMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        <img
                          src={member.avatarUrl}
                          alt={member.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/${member.username}`}
                            className="font-semibold hover:underline"
                          >
                            {member.username}
                          </Link>
                          <Badge variant={getRoleBadgeVariant(member.role)} className="gap-1">
                            {getRoleIcon(member.role)}
                            <span className="capitalize">{member.role.replace("_", " ")}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          {member.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {member.email}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Joined {formatDate(member.joinedAt)}
                          </span>
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
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        {isOwner && member.role !== "owner" && (
                          <>
                            <DropdownMenuItem onClick={() => openEditDialog(member)}>
                              Change role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => handleRemoveMember(member)}
                            >
                              <UserMinus className="w-4 h-4 mr-2" />
                              Remove from organization
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No members found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "Invite members to join your organization"}
                </p>
                {isOwner && (
                  <Button onClick={() => setShowInviteDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Invite member
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Invite member</DialogTitle>
            <DialogDescription>Invite a new member to join your organization.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username or email</Label>
              <Input
                id="username"
                placeholder="e.g. johndoe or john@example.com"
                value={inviteForm.username || inviteForm.email}
                onChange={(e) =>
                  setInviteForm((prev) => ({
                    ...prev,
                    username: e.target.value.includes("@") ? "" : e.target.value,
                    email: e.target.value.includes("@") ? e.target.value : "",
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={inviteForm.role}
                onValueChange={(value: OrgMember["role"]) =>
                  setInviteForm((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Member
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" />
                      Admin
                    </div>
                  </SelectItem>
                  <SelectItem value="billing_manager">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Billing Manager
                    </div>
                  </SelectItem>
                  <SelectItem value="moderator">
                    <div className="flex items-center gap-2">
                      <UserCog className="w-4 h-4" />
                      Moderator
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Personal message (optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message to the invitation"
                value={inviteForm.message}
                onChange={(e) => setInviteForm((prev) => ({ ...prev, message: e.target.value }))}
                rows={3}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvite} disabled={isProcessing}>
              {isProcessing ? "Inviting..." : "Send invitation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-100">
          <DialogHeader>
            <DialogTitle>Change role</DialogTitle>
            <DialogDescription>Update the role for {selectedMember?.username}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={editForm.role}
                onValueChange={(value: OrgMember["role"]) =>
                  setEditForm((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Member
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" />
                      Admin
                    </div>
                  </SelectItem>
                  <SelectItem value="billing_manager">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Billing Manager
                    </div>
                  </SelectItem>
                  <SelectItem value="moderator">
                    <div className="flex items-center gap-2">
                      <UserCog className="w-4 h-4" />
                      Moderator
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRole} disabled={isProcessing}>
              {isProcessing ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
