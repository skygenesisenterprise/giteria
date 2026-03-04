import type { Metadata } from "next";
import { authEngine } from "@/lib/auth/LocalAuthEngine";
import { OwnerHeaderProvider } from "./_components/OwnerHeaderProvider";
import { HeaderOwner } from "../_components/HeaderOwner";

export const metadata: Metadata = {
  title: "Giteria - The code platform for everyone",
  description:
    "Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD",
};

interface OwnerLayoutProps {
  children: React.ReactNode;
  params: Promise<{ owner: string }>;
}

export default async function OwnerLayout({ children, params }: OwnerLayoutProps) {
  const { owner: ownerSlug } = await params;

  const user = await authEngine.getUserByUsername(ownerSlug);
  const ownerType = user ? "user" : "organization";

  const owner = {
    type: ownerType as "user" | "organization",
    username: ownerSlug,
    name: user?.profile?.bio ? undefined : ownerSlug,
    avatarUrl: user?.profile?.avatarUrl,
    capabilities: {
      teams: ownerType === "organization",
      people: ownerType === "organization",
      insights: ownerType === "organization",
      sponsoring: ownerType === "user",
    },
  };

  return (
    <>
      <OwnerHeaderProvider owner={owner} />
      <HeaderOwner owner={owner} className="border-b border-border" />
      {children}
    </>
  );
}
