export interface RepositoryData {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  visibility: "public" | "private";
  language?: string;
  languageColor?: string;
  languages?: { name: string; color: string; percentage: number }[];
  stars: number;
  forks: number;
  updatedAt: number;
  url: string;
  isArchived: boolean;
  isMirror: boolean;
  mirrorFrom?: string;
  isFork: boolean;
  owner: string;
  license?: string;
  gitignore?: string;
  readme?: boolean;
  files?: {
    name: string;
    path: string;
    type: "file" | "folder";
    size?: number;
    modifiedAt?: number;
  }[];
}

export async function getRepositoriesByOwner(owner: string): Promise<RepositoryData[]> {
  if (typeof window === "undefined") return [];

  const { getRepositoriesByOwner: getRepos } = await import("./indexedDB");
  return getRepos(owner);
}

export async function createRepositoryInStorage(
  repo: Omit<
    RepositoryData,
    "id" | "url" | "stars" | "forks" | "updatedAt" | "isArchived" | "isFork"
  >
): Promise<RepositoryData> {
  const { createRepositoryInStorage: createRepo } = await import("./indexedDB");
  return createRepo(repo);
}

export function isOwnerOfRepositor(currentUser: string | null, owner: string): boolean {
  if (!currentUser) return false;
  return currentUser.toLowerCase() === owner.toLowerCase();
}

export async function getAllRepositories(): Promise<RepositoryData[]> {
  if (typeof window === "undefined") return [];

  const { getAllRepositories: getAll } = await import("./indexedDB");
  return getAll();
}

export async function getRepositoryById(id: string): Promise<RepositoryData | null> {
  const { getRepositoryById: getById } = await import("./indexedDB");
  return getById(id);
}

export async function deleteRepository(id: string): Promise<boolean> {
  const { deleteRepository: deleteRepo } = await import("./indexedDB");
  return deleteRepo(id);
}

export async function updateRepository(
  id: string,
  updates: Partial<RepositoryData>
): Promise<RepositoryData | null> {
  const { updateRepository: updateRepo } = await import("./indexedDB");
  return updateRepo(id, updates);
}
