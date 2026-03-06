import type { Organization, CreateOrganizationInput } from "./api";
import { db, STORES } from "../db";

export async function getOrganizations(): Promise<Organization[]> {
  const orgs = await db.getAll<Organization>(STORES.ORGANIZATIONS);
  return orgs.map((org) => ({
    ...org,
    createdAt: new Date(org.createdAt),
  }));
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  return db.getByIndex<Organization>(STORES.ORGANIZATIONS, "slug", slug);
}

export async function createOrgInStorage(input: CreateOrganizationInput): Promise<Organization> {
  const existing = await db.getByIndex<Organization>(STORES.ORGANIZATIONS, "slug", input.slug);

  if (existing) {
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

  await db.add(STORES.ORGANIZATIONS, organization);
  return organization;
}

export async function checkOrgSlugAvailability(slug: string): Promise<boolean> {
  const existing = await db.getByIndex<Organization>(STORES.ORGANIZATIONS, "slug", slug);
  return !existing;
}
