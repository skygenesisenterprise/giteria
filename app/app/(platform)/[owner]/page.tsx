"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { authEngine } from "@/lib/auth/LocalAuthEngine";
import {
  getOrganizationBySlug,
  getOrganizationMembers,
  getPinnedRepositories,
} from "@/lib/organizations/mockData";
import { UserSidebar } from "./_components/UserSidebar";
import { ProfileReadme } from "./_components/ProfileReadme";
import { PinnedRepos } from "./_components/PinnedRepos";
import { ContributionGraph } from "./_components/ContributionGraph";
import { ActivityOverview } from "./_components/ActivityOverview";
import { ContributionActivity } from "./_components/ContributionActivity";
import { OrgHeader } from "@/components/organizations/OrgHeader";
import {
  OrganizationDescription,
  mockOrganizationProfile,
  type OrganizationProfile,
} from "@/components/organizations/OrganizationDescription";
import { OrgMembersList } from "@/components/organizations/OrgMembersList";
import { OrgRepositoriesList } from "@/components/organizations/OrgRepositoriesList";
import type { Organization } from "@/lib/organizations/api";
import type { OrgMember, OrgRepository } from "@/lib/organizations/mockData";
import { Users, FolderGit2, Star, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OwnerPage() {
  const params = useParams();
  const ownerSlug = params.owner as string;

  const [ownerType, setOwnerType] = React.useState<"user" | "organization" | "not-found" | null>(
    null
  );
  const [orgData, setOrgData] = React.useState<Organization | null>(null);
  const [members, setMembers] = React.useState<OrgMember[]>([]);
  const [repos, setRepos] = React.useState<OrgRepository[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      if (!ownerSlug) return;

      setIsLoading(true);
      try {
        const user = await authEngine.getUserByUsername(ownerSlug);
        const org = getOrganizationBySlug(ownerSlug);

        if (user) {
          setOwnerType("user");
        } else if (org) {
          setOwnerType("organization");
          setOrgData(org);
          setMembers(getOrganizationMembers(ownerSlug));
          setRepos(getPinnedRepositories(ownerSlug));
        } else {
          setOwnerType("not-found");
        }
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
    const orgProfile: OrganizationProfile = orgData
      ? {
          name: orgData.name,
          slug: orgData.slug,
          description: orgData.description,
          avatarUrl: orgData.avatarUrl,
          verified: true,
          verifiedDomain: `${orgData.slug}.com`,
          sponsor: false,
          sponsors: true,
          sponsorsCount: Math.floor(Math.random() * 20) + 1,
          organizationType: "Organization",
          affiliation: "Parent Company Inc.",
          affiliationUrl: "https://parentcompany.com",
          followers: members.length,
          location: "Belgium",
          website: `https://${orgData.slug}.com`,
          twitter: `@${orgData.slug}`,
          email: `github@${orgData.slug}.com`,
        }
      : mockOrganizationProfile;

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <OrganizationDescription organization={orgProfile} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Pinned repositories</h2>
                  </div>
                  <OrgRepositoriesList repositories={repos} orgSlug={ownerSlug} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-md border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Members</h3>
                    <Link href={`/${ownerSlug}/people`}>
                      <Button variant="ghost" size="sm">
                        View all
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {members.slice(0, 3).map((member: any) => (
                      <Link
                        key={member.id}
                        href={`/${member.username}`}
                        className="flex items-center gap-2 hover:text-[#2f81f7]"
                      >
                        <img
                          src={member.avatarUrl}
                          alt={member.username}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm">{member.username}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
            <PinnedRepos username={ownerSlug} />
            <ContributionGraph username={ownerSlug} />
            <ActivityOverview username={ownerSlug} />
            <ContributionActivity username={ownerSlug} />
          </div>
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
