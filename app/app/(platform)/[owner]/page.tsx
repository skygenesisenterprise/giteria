"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { authEngine } from "@/lib/auth/IndexedDBAuthEngine";
import { getOrganizationBySlug } from "@/lib/organizations/LocalOrgEngine";
import { getRepositoriesByOwner } from "./_components/repositories/data";
import { UserSidebar } from "./_components/UserSidebar";
import { ProfileReadme } from "./_components/ProfileReadme";
import { ContributionGraph } from "./_components/ContributionGraph";
import { ActivityOverview } from "./_components/ActivityOverview";
import { ContributionActivity } from "./_components/ContributionActivity";
import {
  OrganizationDescription,
  mockOrganizationProfile,
  type OrganizationProfile,
} from "@/components/organizations/OrganizationDescription";
import { OrgOverview } from "@/components/organizations/OrgOverview";
import type { Organization } from "@/lib/organizations/api";
import { getOrganizationSettings } from "@/lib/organizations/OrgSettingsEngine";
import { Button } from "@/components/ui/button";
import type { RepositoryData } from "./_components/repositories/data";

export default function OwnerPage() {
  const params = useParams();
  const ownerSlug = params.owner as string;

  const [ownerType, setOwnerType] = React.useState<"user" | "organization" | "not-found" | null>(
    null
  );
  const [orgData, setOrgData] = React.useState<Organization | null>(null);
  const [repos, setRepos] = React.useState<RepositoryData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      if (!ownerSlug) return;

      setIsLoading(true);
      try {
        const user = await authEngine.getUserByUsername(ownerSlug);
        const org = await getOrganizationBySlug(ownerSlug);

        if (user) {
          setOwnerType("user");
        } else if (org) {
          setOwnerType("organization");
          setOrgData(org);
        } else {
          setOwnerType("not-found");
        }

        const dynamicRepos = await getRepositoriesByOwner(ownerSlug);
        setRepos(dynamicRepos);
      } catch {
        setOwnerType("not-found");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [ownerSlug]);

  if (isLoading || !ownerType) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (ownerType === "not-found") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <p className="mt-4 text-xl text-muted-foreground">This profile does not exist</p>
            <p className="mt-2 text-sm text-muted-foreground">
              The user or organization "{ownerSlug}" does not exist on Giteria.
            </p>
            <Link href="/">
              <Button className="mt-8">Go back home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (ownerType === "organization") {
    return <OrganizationPageContent ownerSlug={ownerSlug} orgData={orgData} repos={repos} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-80 shrink-0">
            <UserSidebarWrapper username={ownerSlug} />
          </div>

          <div className="flex-1 min-w-0 space-y-6">
            <ProfileReadme username={ownerSlug} />
            <UserPinnedRepos repositories={repos} />
            <ContributionGraph username={ownerSlug} />
            <ActivityOverview username={ownerSlug} />
            <ContributionActivity username={ownerSlug} />
          </div>
        </div>
      </div>
    </div>
  );
}

function OrganizationPageContent({
  ownerSlug,
  orgData,
  repos,
}: {
  ownerSlug: string;
  orgData: Organization | null;
  repos: RepositoryData[];
}) {
  const [settings, setSettings] = React.useState<Awaited<
    ReturnType<typeof getOrganizationSettings>
  > | null>(null);

  React.useEffect(() => {
    async function loadSettings() {
      const orgSettings = await getOrganizationSettings(ownerSlug);
      setSettings(orgSettings);
    }
    loadSettings();
  }, [ownerSlug]);

  const orgProfile: OrganizationProfile = orgData
    ? {
        name: settings?.displayName || orgData.name,
        slug: orgData.slug,
        description: settings?.description || orgData.description,
        avatarUrl: orgData.avatarUrl,
        verified: true,
        verifiedDomain: `${orgData.slug}.com`,
        sponsor: false,
        sponsors: true,
        sponsorsCount: Math.floor(Math.random() * 20) + 1,
        organizationType: "Organization",
        affiliation: settings?.affiliation || "Parent Company Inc.",
        affiliationUrl: settings?.affiliationUrl || "https://parentcompany.com",
        followers: repos.length,
        location: settings?.location || "Belgium",
        website: settings?.url || `https://${orgData.slug}.com`,
        twitter: settings?.social1
          ? settings.social1.replace(/^https?:\/\/(www\.)?/, "").replace(/^@/, "")
          : `@${orgData.slug}`,
        email: settings?.email || `github@${orgData.slug}.com`,
      }
    : mockOrganizationProfile;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <OrganizationDescription organization={orgProfile} />

          <OrgOverview
            organization={orgProfile}
            members={[]}
            repositories={repos.map((r) => ({
              id: r.id,
              name: r.name,
              description: r.description,
              language: r.language,
              visibility: r.visibility,
              stars: r.stars,
              forks: r.forks,
              updatedAt: new Date(r.updatedAt).toISOString(),
            }))}
            orgSlug={ownerSlug}
            isMember={true}
            isAdmin={true}
            canViewPrivate={true}
          />
        </div>
      </div>
    </div>
  );
}

function UserSidebarWrapper({ username }: { username: string }) {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    authEngine.getUserByUsername(username).then(setUser);
  }, [username]);

  if (!user) {
    return (
      <div className="rounded-md border border-border p-4">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <UserSidebar user={user} />;
}

function UserPinnedRepos({ repositories }: { repositories: RepositoryData[] }) {
  const pinnedRepos = repositories.slice(0, 4);

  if (pinnedRepos.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pinned</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pinnedRepos.map((repo) => (
          <Link
            key={repo.id}
            href={repo.url}
            className="rounded-md border border-border p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="font-semibold text-[#2f81f7]">{repo.name}</div>
            {repo.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{repo.description}</p>
            )}
            {repo.language && (
              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: repo.languageColor || "#6e7681" }}
                />
                {repo.language}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
