import { db, STORES } from "@/lib/db";

export interface RepositoryData {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  visibility: "public" | "private";
  language?: string;
  languageColor?: string;
  stars: number;
  forks: number;
  updatedAt: number;
  url: string;
  isArchived: boolean;
  isMirror: boolean;
  isFork: boolean;
  owner: string;
  website?: string;
  license?: string;
  languages?: { name: string; color: string; percentage: number }[];
  readme?: boolean;
  codeOfConduct?: boolean;
  contributing?: boolean;
  securityPolicy?: boolean;
  topics?: string[];
  includeReleases?: boolean;
  includeDeployments?: boolean;
  includePackages?: boolean;
  contributors?: string[];
}

export async function getRepositoriesByOwner(owner: string): Promise<RepositoryData[]> {
  if (typeof window === "undefined") return [];
  return db.getAllByIndex<RepositoryData>(STORES.REPOSITORIES, "owner", owner);
}

export async function createRepositoryInStorage(
  repo: Omit<
    RepositoryData,
    "id" | "url" | "stars" | "forks" | "updatedAt" | "isArchived" | "isMirror" | "isFork"
  >
): Promise<RepositoryData> {
  const ownerLower = repo.owner.toLowerCase();
  const fullNameLower = `${ownerLower}/${repo.name.toLowerCase()}`;

  const existing = await db.getByIndex<RepositoryData>(
    STORES.REPOSITORIES,
    "fullName",
    fullNameLower
  );

  if (existing) {
    throw new Error("Repository already exists");
  }

  const newRepo: RepositoryData = {
    ...repo,
    name: repo.name.toLowerCase(),
    fullName: fullNameLower,
    owner: ownerLower,
    id: crypto.randomUUID(),
    url: `/${ownerLower}/${repo.name.toLowerCase()}`,
    stars: 0,
    forks: 0,
    updatedAt: Date.now(),
    isArchived: false,
    isMirror: false,
    isFork: false,
  };

  return db.add(STORES.REPOSITORIES, newRepo);
}

export function isOwnerOfRepositor(currentUser: string | null, owner: string): boolean {
  if (!currentUser) return false;
  return currentUser.toLowerCase() === owner.toLowerCase();
}

export async function getAllRepositories(): Promise<RepositoryData[]> {
  if (typeof window === "undefined") return [];
  return db.getAll<RepositoryData>(STORES.REPOSITORIES);
}

export async function getRepositoryById(id: string): Promise<RepositoryData | null> {
  return db.get<RepositoryData>(STORES.REPOSITORIES, id);
}

export async function deleteRepository(id: string): Promise<boolean> {
  return db.delete(STORES.REPOSITORIES, id);
}

export async function updateRepository(
  id: string,
  updates: Partial<RepositoryData>
): Promise<RepositoryData | null> {
  const existing = await db.get<RepositoryData>(STORES.REPOSITORIES, id);
  if (!existing) return null;

  const updated = { ...existing, ...updates };
  return db.put(STORES.REPOSITORIES, updated);
}

async function seedDefaultRepositories(): Promise<void> {
  const existing = await db.getAll<RepositoryData>(STORES.REPOSITORIES);
  if (existing.length > 0) return;

  const defaultRepo: RepositoryData = {
    id: crypto.randomUUID(),
    name: "test",
    fullName: "giteria/test",
    description:
      "Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD",
    visibility: "public",
    stars: 0,
    forks: 0,
    updatedAt: Date.now(),
    url: "/giteria/test",
    isArchived: false,
    isMirror: false,
    isFork: false,
    owner: "giteria",
    website: "https://giteria.com",
    license: "MIT",
    topics: ["git", "ci-cd", "devops"],
    includeReleases: true,
    includeDeployments: true,
    includePackages: true,
    contributors: ["liamvnastoria", "dependabot[bot]"],
  };

  await db.add(STORES.REPOSITORIES, defaultRepo);
}

seedDefaultRepositories();
