import type { RepositoryData } from "../../app/(platform)/[owner]/_components/repositories/data";

const STORAGE_KEY = "giteria:repositories";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function getAllRepositories(): RepositoryData[] {
  const storage = getStorage();
  if (!storage) return [];
  const data = storage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveRepositories(repos: RepositoryData[]): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(repos));
}

export function getRepositoriesByOwner(owner: string): RepositoryData[] {
  const repos = getAllRepositories();
  return repos.filter((repo) => repo.owner.toLowerCase() === owner.toLowerCase());
}

export function getRepositoryById(id: string): RepositoryData | null {
  const repos = getAllRepositories();
  return repos.find((repo) => repo.id === id) || null;
}

export function createRepository(repo: RepositoryData): RepositoryData {
  const repos = getAllRepositories();
  const existing = repos.find((r) => r.fullName.toLowerCase() === repo.fullName.toLowerCase());
  if (existing) {
    throw new Error("Repository already exists");
  }
  const newRepos = [...repos, repo];
  saveRepositories(newRepos);
  return repo;
}

export function updateRepository(
  id: string,
  updates: Partial<RepositoryData>
): RepositoryData | null {
  const repos = getAllRepositories();
  const index = repos.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const updatedRepo = { ...repos[index], ...updates };
  repos[index] = updatedRepo;
  saveRepositories(repos);
  return updatedRepo;
}

export function deleteRepository(id: string): boolean {
  const repos = getAllRepositories();
  const filtered = repos.filter((r) => r.id !== id);
  if (filtered.length === repos.length) return false;
  saveRepositories(filtered);
  return true;
}

export function initializeRepositories(initialRepos: RepositoryData[]): void {
  const storage = getStorage();
  if (!storage) return;
  const existing = storage.getItem(STORAGE_KEY);
  if (!existing) {
    saveRepositories(initialRepos);
  }
}
