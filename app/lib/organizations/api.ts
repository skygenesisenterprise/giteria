export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  visibility: "public" | "private";
  createdAt: Date;
}

export interface CreateOrganizationInput {
  name: string;
  slug: string;
  description?: string;
  visibility: "public" | "private";
}

const mockOrganizations: Map<string, Organization> = new Map();

export async function createOrganization(input: CreateOrganizationInput): Promise<Organization> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (mockOrganizations.has(input.slug)) {
    throw new Error("Organization slug already exists");
  }

  const organization: Organization = {
    id: crypto.randomUUID(),
    name: input.name,
    slug: input.slug,
    description: input.description,
    visibility: input.visibility,
    createdAt: new Date(),
  };

  mockOrganizations.set(input.slug, organization);
  return organization;
}

export async function checkSlugAvailability(slug: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return !mockOrganizations.has(slug);
}
