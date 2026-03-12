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
  mirrorFrom?: string;
  isFork: boolean;
  owner: string;
  website?: string;
  license?: string;
  gitignore?: string;
  languages?: { name: string; color: string; percentage: number }[];
  files?: {
    name: string;
    path: string;
    type: "file" | "folder";
    size?: number;
    modifiedAt?: number;
  }[];
  readme?: boolean;
  codeOfConduct?: boolean;
  contributing?: boolean;
  securityPolicy?: boolean;
  topics?: string[];
  includeReleases?: boolean;
  includeDeployments?: boolean;
  includePackages?: boolean;
  contributors?: string[];
  hasWiki?: boolean;
  hasIssues?: boolean;
  hasDiscussions?: boolean;
  hasProjects?: boolean;
  hasActions?: boolean;
  hasAgents?: boolean;
  hasModels?: boolean;
  hasPackages?: boolean;
  hasSecurity?: boolean;
  hasInsights?: boolean;
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

export interface UpdateRepositoryDetailsInput {
  description?: string;
  website?: string;
  topics?: string[];
  includeReleases?: boolean;
  includeDeployments?: boolean;
  includePackages?: boolean;
  hasWiki?: boolean;
  hasIssues?: boolean;
  hasDiscussions?: boolean;
  hasProjects?: boolean;
  hasActions?: boolean;
  hasAgents?: boolean;
  hasModels?: boolean;
  hasPackages?: boolean;
  hasSecurity?: boolean;
  hasInsights?: boolean;
}

export async function updateRepositoryDetails(
  id: string,
  details: UpdateRepositoryDetailsInput
): Promise<Repository | null> {
  const repo = await db.get<Repository>(STORES.REPOSITORIES, id);
  if (!repo) return null;

  const updated: Repository = {
    ...repo,
    ...details,
  };

  return db.put(STORES.REPOSITORIES, updated);
}
