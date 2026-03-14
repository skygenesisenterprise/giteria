import { db, STORES } from "../db";

export interface OrganizationSettings {
  id: string;
  slug: string;
  displayName: string;
  email: string;
  description: string;
  url: string;
  social1: string;
  social2: string;
  social3: string;
  social4: string;
  location: string;
  billingEmail: string;
  gravatarEmail: string;
  sponsorsEmail: string;
  profilePicture: string;
  supportEmail: string;
  productWebsite: string;
  orgType: "corporate" | "individual";
  affiliation: string;
  affiliationUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const defaultSettings: Omit<OrganizationSettings, "id" | "slug" | "createdAt" | "updatedAt"> = {
  displayName: "",
  email: "",
  description: "",
  url: "",
  social1: "",
  social2: "",
  social3: "",
  social4: "",
  location: "",
  billingEmail: "",
  gravatarEmail: "",
  sponsorsEmail: "",
  profilePicture: "",
  supportEmail: "",
  productWebsite: "",
  orgType: "corporate",
  affiliation: "",
  affiliationUrl: "",
};

export async function getOrganizationSettings(slug: string): Promise<OrganizationSettings | null> {
  try {
    return await db.getByIndex<OrganizationSettings>(STORES.SETTINGS, "slug", slug);
  } catch (error) {
    console.warn("Failed to get organization settings by index:", error);
    const allSettings = await db.getAll<OrganizationSettings>(STORES.SETTINGS);
    return allSettings.find((s) => s.slug === slug) || null;
  }
}

export async function saveOrganizationSettings(
  slug: string,
  settings: Partial<Omit<OrganizationSettings, "id" | "slug" | "createdAt" | "updatedAt">>
): Promise<OrganizationSettings> {
  const existing = await getOrganizationSettings(slug);
  const now = new Date();

  const orgSettings: OrganizationSettings = {
    id: existing?.id || crypto.randomUUID(),
    slug,
    displayName: settings.displayName ?? existing?.displayName ?? defaultSettings.displayName,
    email: settings.email ?? existing?.email ?? defaultSettings.email,
    description: settings.description ?? existing?.description ?? defaultSettings.description,
    url: settings.url ?? existing?.url ?? defaultSettings.url,
    social1: settings.social1 ?? existing?.social1 ?? defaultSettings.social1,
    social2: settings.social2 ?? existing?.social2 ?? defaultSettings.social2,
    social3: settings.social3 ?? existing?.social3 ?? defaultSettings.social3,
    social4: settings.social4 ?? existing?.social4 ?? defaultSettings.social4,
    location: settings.location ?? existing?.location ?? defaultSettings.location,
    billingEmail: settings.billingEmail ?? existing?.billingEmail ?? defaultSettings.billingEmail,
    gravatarEmail:
      settings.gravatarEmail ?? existing?.gravatarEmail ?? defaultSettings.gravatarEmail,
    sponsorsEmail:
      settings.sponsorsEmail ?? existing?.sponsorsEmail ?? defaultSettings.sponsorsEmail,
    profilePicture:
      settings.profilePicture ?? existing?.profilePicture ?? defaultSettings.profilePicture,
    supportEmail: settings.supportEmail ?? existing?.supportEmail ?? defaultSettings.supportEmail,
    productWebsite:
      settings.productWebsite ?? existing?.productWebsite ?? defaultSettings.productWebsite,
    orgType: settings.orgType ?? existing?.orgType ?? defaultSettings.orgType,
    affiliation: settings.affiliation ?? existing?.affiliation ?? defaultSettings.affiliation,
    affiliationUrl:
      settings.affiliationUrl ?? existing?.affiliationUrl ?? defaultSettings.affiliationUrl,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  await db.put(STORES.SETTINGS, orgSettings);
  return orgSettings;
}

export async function deleteOrganizationSettings(slug: string): Promise<boolean> {
  const existing = await getOrganizationSettings(slug);
  if (existing) {
    return db.delete(STORES.SETTINGS, existing.id);
  }
  return false;
}
