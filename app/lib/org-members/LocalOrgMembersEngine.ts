export interface OrgMember {
  id: string;
  username: string;
  avatarUrl: string;
  role: "owner" | "admin" | "member" | "billing_manager" | "moderator";
  organizationSlug: string;
  joinedAt: Date;
  email?: string;
}

const STORAGE_KEY = "giteria:org-members";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function getAllMembers(): OrgMember[] {
  const storage = getStorage();
  if (!storage) return [];
  const data = storage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const members = JSON.parse(data);
    return members.map((member: OrgMember) => ({
      ...member,
      joinedAt: new Date(member.joinedAt),
    }));
  } catch {
    return [];
  }
}

function saveMembers(members: OrgMember[]): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(members));
}

export function getMembersByOrganization(organizationSlug: string): OrgMember[] {
  const members = getAllMembers();
  return members.filter(
    (member) => member.organizationSlug.toLowerCase() === organizationSlug.toLowerCase()
  );
}

export function getMemberById(id: string): OrgMember | null {
  const members = getAllMembers();
  return members.find((member) => member.id === id) || null;
}

export function createMember(member: Omit<OrgMember, "id" | "joinedAt">): OrgMember {
  const members = getAllMembers();
  const existing = members.find(
    (m) =>
      m.organizationSlug.toLowerCase() === member.organizationSlug.toLowerCase() &&
      m.username.toLowerCase() === member.username.toLowerCase()
  );
  if (existing) {
    throw new Error("Member already exists in this organization");
  }

  const newMember: OrgMember = {
    ...member,
    id: crypto.randomUUID(),
    joinedAt: new Date(),
  };

  const newMembers = [...members, newMember];
  saveMembers(newMembers);
  return newMember;
}

export function updateMember(id: string, updates: Partial<OrgMember>): OrgMember | null {
  const members = getAllMembers();
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;

  const updatedMember = { ...members[index], ...updates };
  members[index] = updatedMember;
  saveMembers(members);
  return updatedMember;
}

export function deleteMember(id: string): boolean {
  const members = getAllMembers();
  const filtered = members.filter((m) => m.id !== id);
  if (filtered.length === members.length) return false;
  saveMembers(filtered);
  return true;
}

export function initializeMembers(initialMembers: Omit<OrgMember, "id" | "joinedAt">[]): void {
  const storage = getStorage();
  if (!storage) return;
  const existing = storage.getItem(STORAGE_KEY);
  if (!existing) {
    const membersWithDates = initialMembers.map((member, index) => ({
      ...member,
      id: `default-${index}`,
      joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    }));
    saveMembers(membersWithDates);
  }
}
