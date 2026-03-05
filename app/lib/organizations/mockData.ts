import type { Organization } from "@/lib/organizations/api";

export interface OrgMember {
  id: string;
  username: string;
  avatarUrl: string;
  role: "owner" | "admin" | "member";
  joinedAt: Date;
}

export interface OrgRepository {
  id: string;
  name: string;
  slug: string;
  description?: string;
  visibility: "public" | "private";
  language?: string;
  stars: number;
  forks: number;
  updatedAt: Date;
}

const mockMembers: OrgMember[] = [
  {
    id: "user-liamvonastoria",
    username: "liamvonastoria",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=LA&backgroundColor=0ea5e9",
    role: "owner",
    joinedAt: new Date("2023-01-15"),
  },
  {
    id: "user-alexdev",
    username: "alexdev",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AD&backgroundColor=10b981",
    role: "admin",
    joinedAt: new Date("2023-03-20"),
  },
  {
    id: "user-johndoe",
    username: "johndoe",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=f59e0b",
    role: "member",
    joinedAt: new Date("2023-06-10"),
  },
];

const mockRepos: OrgRepository[] = [
  {
    id: "repo-1",
    name: "core",
    slug: "core",
    description: "Core libraries and utilities",
    visibility: "public",
    language: "TypeScript",
    stars: 234,
    forks: 45,
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "repo-2",
    name: "docs",
    slug: "docs",
    description: "Documentation website",
    visibility: "public",
    language: "Markdown",
    stars: 89,
    forks: 12,
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "repo-3",
    name: "infrastructure",
    slug: "infrastructure",
    description: "Infrastructure as code",
    visibility: "private",
    language: "HCL",
    stars: 34,
    forks: 8,
    updatedAt: new Date("2024-01-08"),
  },
  {
    id: "repo-4",
    name: "mobile-app",
    slug: "mobile-app",
    description: "Mobile application",
    visibility: "public",
    language: "TypeScript",
    stars: 156,
    forks: 23,
    updatedAt: new Date("2024-01-05"),
  },
];

export function getOrganizationBySlug(slug: string): Organization | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("giteria:organizations");
  if (!data) return null;

  try {
    const orgs = JSON.parse(data);
    const org = orgs.find((o: Organization) => o.slug.toLowerCase() === slug.toLowerCase());
    if (org) {
      return { ...org, createdAt: new Date(org.createdAt) };
    }
  } catch {
    return null;
  }
  return null;
}

export function getOrganizationMembers(slug: string): OrgMember[] {
  return mockMembers;
}

export function getOrganizationRepositories(slug: string): OrgRepository[] {
  return mockRepos;
}

export function getPinnedRepositories(slug: string): OrgRepository[] {
  return mockRepos.slice(0, 2);
}
