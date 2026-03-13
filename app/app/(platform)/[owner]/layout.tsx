"use client";

import { useEffect, useState, use, useMemo } from "react";
import { usePathname } from "next/navigation";
import { authEngine } from "@/lib/auth/IndexedDBAuthEngine";
import { getOrganizationBySlug } from "@/lib/organizations/LocalOrgEngine";
import { OwnerHeaderProvider } from "./_components/OwnerHeaderProvider";
import { HeaderOwner } from "../_components/HeaderOwner";

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

interface OwnerLayoutProps {
  children: React.ReactNode;
  params: Promise<{ owner: string }>;
}

export default function OwnerLayout({ children, params }: OwnerLayoutProps) {
  const [resolvedParams, setResolvedParams] = useState<{ owner: string } | null>(null);
  const [owner, setOwner] = useState<OwnerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const isRepoPage = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length < 2) return false;

    const ownerLevelRoutes = [
      "repos",
      "discussions",
      "insights",
      "package",
      "people",
      "projects",
      "settings",
      "sponsors",
      "teams",
    ];
    const secondSegment = segments[1];
    return !ownerLevelRoutes.includes(secondSegment);
  }, [pathname]);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    async function resolveOwner() {
      if (!resolvedParams) return;

      const { owner: ownerSlug } = resolvedParams;
      setIsLoading(true);

      try {
        const user = await authEngine.getUserByUsername(ownerSlug);
        const org = await getOrganizationBySlug(ownerSlug);

        const ownerType: "user" | "organization" = user ? "user" : org ? "organization" : "user";

        const ownerData: OwnerData = {
          type: ownerType,
          username: ownerSlug,
          name: user?.profile?.bio ? undefined : org?.name || ownerSlug,
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
          username: resolvedParams.owner,
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

    resolveOwner();
  }, [resolvedParams]);

  if (isLoading || !owner) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <>
      <OwnerHeaderProvider owner={owner} />
      {!isRepoPage && <HeaderOwner owner={owner} className="border-b border-border" />}
      {children}
    </>
  );
}
