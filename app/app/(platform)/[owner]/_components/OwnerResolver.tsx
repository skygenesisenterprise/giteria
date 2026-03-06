"use client";

import { useEffect, useState } from "react";
import { authEngine } from "@/lib/auth/IndexedDBAuthEngine";
import { getOrganizationBySlug } from "@/lib/organizations/LocalOrgEngine";

interface OwnerData {
  type: "user" | "organization";
  username: string;
  name?: string;
  avatarUrl?: string;
  capabilities: {
    teams: boolean;
    people: boolean;
    insights: boolean;
    sponsoring: boolean;
  };
}

interface OwnerResolverProps {
  username: string;
  children: (owner: OwnerData) => React.ReactNode;
}

export function OwnerResolver({ username, children }: OwnerResolverProps) {
  const [owner, setOwner] = useState<OwnerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function resolveOwner() {
      setIsLoading(true);
      try {
        const user = await authEngine.getUserByUsername(username);
        const org = await getOrganizationBySlug(username);

        const ownerType = user ? "user" : org ? "organization" : "user";

        const ownerData: OwnerData = {
          type: ownerType as "user" | "organization",
          username,
          name: user?.profile?.bio ? undefined : org?.name || username,
          avatarUrl: user?.profile?.avatarUrl || org?.avatarUrl,
          capabilities: {
            teams: ownerType === "organization",
            people: ownerType === "organization",
            insights: ownerType === "organization",
            sponsoring: ownerType === "user",
          },
        };

        setOwner(ownerData);
      } catch {
        setOwner({
          type: "user",
          username,
          capabilities: {
            teams: false,
            people: false,
            insights: false,
            sponsoring: false,
          },
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (username) {
      resolveOwner();
    }
  }, [username]);

  if (isLoading || !owner) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return <>{children(owner)}</>;
}
