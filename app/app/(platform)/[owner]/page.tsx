"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { authEngine } from "@/lib/auth/LocalAuthEngine";
import { UserSidebar } from "./_components/UserSidebar";
import { ProfileReadme } from "./_components/ProfileReadme";
import { PinnedRepos } from "./_components/PinnedRepos";
import { ContributionGraph } from "./_components/ContributionGraph";
import { ActivityOverview } from "./_components/ActivityOverview";
import { ContributionActivity } from "./_components/ContributionActivity";
import type { User } from "@/lib/auth/types";

type ProfileType = "user" | "org" | "not-found";

interface ProfileData {
  type: ProfileType;
  user?: User;
  org?: unknown;
}

export default function OwnerPage() {
  const params = useParams();
  const owner = params.owner as string;

  const [profileData, setProfileData] = React.useState<ProfileData>({ type: "user" });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      try {
        const user = await authEngine.getUserByUsername(owner);
        if (user) {
          setProfileData({ type: "user", user });
        } else {
          setProfileData({ type: "org" });
        }
      } catch {
        setProfileData({ type: "not-found" });
      } finally {
        setIsLoading(false);
      }
    }

    if (owner) {
      fetchProfile();
    }
  }, [owner]);

  const renderContent = () => {
    if (profileData.type === "not-found") {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">404</h2>
          <p className="text-muted-foreground">This profile does not exist</p>
        </div>
      );
    }

    if (profileData.type === "org") {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">{owner}</h2>
          <p className="text-muted-foreground">Organization profile coming soon</p>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-80 shrink-0">
            <UserSidebar user={profileData.user!} />
          </div>

          <div className="flex-1 min-w-0 space-y-6">
            <ProfileReadme username={owner} />
            <PinnedRepos username={owner} />
            <ContributionGraph username={owner} />
            <ActivityOverview username={owner} />
            <ContributionActivity username={owner} />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}
