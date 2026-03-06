import { db, STORES } from "@/lib/db";

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  visibility: "public" | "private";
  language?: string;
  languageColor?: string;
  stars: number;
  forks: number;
  watchers: number;
  updatedAt: number;
  url: string;
  isArchived: boolean;
  isMirror: boolean;
  isFork: boolean;
  owner: string;
}

export async function getRepository(owner: string, repo: string): Promise<Repository | null> {
  if (typeof window === "undefined") return null;
  const fullName = `${owner.toLowerCase()}/${repo.toLowerCase()}`;
  return db.getByIndex<Repository>(STORES.REPOSITORIES, "fullName", fullName);
}

export async function updateRepositoryStats(
  id: string,
  action: "star" | "unstar" | "watch" | "unwatch" | "fork"
): Promise<Repository | null> {
  const repo = await db.get<Repository>(STORES.REPOSITORIES, id);
  if (!repo) return null;

  const updated: Repository = {
    ...repo,
    stars: action === "star" ? repo.stars + 1 : action === "unstar" ? repo.stars - 1 : repo.stars,
    forks: action === "fork" ? repo.forks + 1 : repo.forks,
    watchers:
      action === "watch"
        ? repo.watchers + 1
        : action === "unwatch"
          ? repo.watchers - 1
          : repo.watchers,
  };

  return db.put(STORES.REPOSITORIES, updated);
}
