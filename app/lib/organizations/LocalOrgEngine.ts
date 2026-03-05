import type { Organization, CreateOrganizationInput } from "./api";

const STORAGE_KEY = "giteria:organizations";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function getOrganizations(): Organization[] {
  const storage = getStorage();
  if (!storage) return [];
  const data = storage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const orgs = JSON.parse(data);
    return orgs.map((org: Organization) => ({
      ...org,
      createdAt: new Date(org.createdAt),
    }));
  } catch {
    return [];
  }
}

export function saveOrganizations(orgs: Organization[]): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(orgs));
}

export function getOrganizationBySlug(slug: string): Organization | null {
  const orgs = getOrganizations();
  return orgs.find((o) => o.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function createOrgInStorage(input: CreateOrganizationInput): Organization {
  const orgs = getOrganizations();

  if (orgs.some((o) => o.slug.toLowerCase() === input.slug.toLowerCase())) {
    throw new Error("Organization slug already exists");
  }

  const organization: Organization = {
    id: crypto.randomUUID(),
    name: input.name,
    slug: input.slug,
    description: input.description,
    visibility: input.visibility,
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${input.slug}&backgroundColor=6366f1`,
    createdAt: new Date(),
  };

  orgs.push(organization);
  saveOrganizations(orgs);

  return organization;
}

export function checkOrgSlugAvailability(slug: string): boolean {
  const orgs = getOrganizations();
  return !orgs.some((o) => o.slug.toLowerCase() === slug.toLowerCase());
}
