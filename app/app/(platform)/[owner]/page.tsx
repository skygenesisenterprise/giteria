"use client";

import * as React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { authEngine } from "@/lib/auth/LocalAuthEngine";
import { UserProfile } from "./_components/UserProfile";
import { ProfileTabs } from "./_components/ProfileTabs";
import type { User } from "@/lib/auth/types";

type ProfileType = "user" | "org" | "not-found";

interface ProfileData {
  type: ProfileType;
  user?: User;
  org?: unknown;
}

export default function OwnerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const owner = params.owner as string;
  const activeTab = searchParams.get("tab") || "overview";

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (profileData.type === "not-found") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-bold text-foreground">404</h2>
        <p className="text-muted-foreground">This profile does not exist</p>
      </div>
    );
  }

  if (profileData.type === "org") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-bold text-foreground">{owner}</h2>
        <p className="text-muted-foreground">Organization profile coming soon</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <UserProfile user={profileData.user!} />
      <ProfileTabs username={owner} activeTab={activeTab} />

      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="text-muted-foreground text-center py-12">
            <p>Overview content coming soon...</p>
          </div>
        )}
        {activeTab === "repositories" && (
          <div className="text-muted-foreground text-center py-12">
            <p>Repositories coming soon...</p>
          </div>
        )}
        {activeTab === "projects" && (
          <div className="text-muted-foreground text-center py-12">
            <p>Projects coming soon...</p>
          </div>
        )}
        {activeTab === "packages" && (
          <div className="text-muted-foreground text-center py-12">
            <p>Packages coming soon...</p>
          </div>
        )}
        {activeTab === "stars" && (
          <div className="text-muted-foreground text-center py-12">
            <p>Stars coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
