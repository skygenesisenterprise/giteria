"use client";

import { useEffect } from "react";
import { useOwnerHeader } from "@/components/DashboardLayout";

interface Owner {
  type: "user" | "organization";
  username: string;
  name?: string;
  avatarUrl?: string;
  capabilities?: {
    teams?: boolean;
    people?: boolean;
    insights?: boolean;
    sponsoring?: boolean;
  };
}

export function OwnerHeaderProvider({ owner }: { owner: Owner }) {
  const { setOwner } = useOwnerHeader();

  useEffect(() => {
    setOwner(owner);
    return () => setOwner(null);
  }, [owner, setOwner]);

  return null;
}
