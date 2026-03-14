export interface Team {
  id: string;
  slug: string;
  name: string;
  description: string;
  privacy: "closed" | "secret";
  membersCount: number;
  reposCount: number;
  createdAt: Date;
  organizationSlug: string;
  avatarUrl?: string;
}

const STORAGE_KEY = "giteria:teams";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function getAllTeams(): Team[] {
  const storage = getStorage();
  if (!storage) return [];
  const data = storage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const teams = JSON.parse(data);
    return teams.map((team: Team) => ({
      ...team,
      createdAt: new Date(team.createdAt),
    }));
  } catch {
    return [];
  }
}

function saveTeams(teams: Team[]): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

export function getTeamsByOrganization(organizationSlug: string): Team[] {
  const teams = getAllTeams();
  return teams.filter(
    (team) => team.organizationSlug.toLowerCase() === organizationSlug.toLowerCase()
  );
}

export function getTeamById(id: string): Team | null {
  const teams = getAllTeams();
  return teams.find((team) => team.id === id) || null;
}

export function getTeamBySlug(organizationSlug: string, teamSlug: string): Team | null {
  const teams = getAllTeams();
  return (
    teams.find(
      (team) =>
        team.organizationSlug.toLowerCase() === organizationSlug.toLowerCase() &&
        team.slug.toLowerCase() === teamSlug.toLowerCase()
    ) || null
  );
}

export function createTeam(
  team: Omit<Team, "id" | "createdAt" | "membersCount" | "reposCount">
): Team {
  const teams = getAllTeams();
  const existing = teams.find(
    (t) =>
      t.organizationSlug.toLowerCase() === team.organizationSlug.toLowerCase() &&
      t.slug.toLowerCase() === team.slug.toLowerCase()
  );
  if (existing) {
    throw new Error("Team already exists in this organization");
  }

  const newTeam: Team = {
    ...team,
    id: crypto.randomUUID(),
    membersCount: 0,
    reposCount: 0,
    createdAt: new Date(),
  };

  const newTeams = [...teams, newTeam];
  saveTeams(newTeams);
  return newTeam;
}

export function updateTeam(id: string, updates: Partial<Team>): Team | null {
  const teams = getAllTeams();
  const index = teams.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const updatedTeam = { ...teams[index], ...updates };
  teams[index] = updatedTeam;
  saveTeams(teams);
  return updatedTeam;
}

export function deleteTeam(id: string): boolean {
  const teams = getAllTeams();
  const filtered = teams.filter((t) => t.id !== id);
  if (filtered.length === teams.length) return false;
  saveTeams(filtered);
  return true;
}

export function initializeTeams(initialTeams: Team[]): void {
  const storage = getStorage();
  if (!storage) return;
  const existing = storage.getItem(STORAGE_KEY);
  if (!existing) {
    const teamsWithDates = initialTeams.map((team) => ({
      ...team,
      createdAt: new Date(team.createdAt),
    }));
    saveTeams(teamsWithDates);
  }
}
