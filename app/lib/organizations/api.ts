import { createOrgInStorage, checkOrgSlugAvailability } from "./LocalOrgEngine";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  visibility: "public" | "private";
  avatarUrl?: string;
  createdAt: Date;
}

export interface CreateOrganizationInput {
  name: string;
  slug: string;
  description?: string;
  visibility: "public" | "private";
}

export async function createOrganization(input: CreateOrganizationInput): Promise<Organization> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return createOrgInStorage(input);
}

export async function checkSlugAvailability(slug: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return checkOrgSlugAvailability(slug);
}
