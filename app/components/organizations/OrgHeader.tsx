"use client";

import * as React from "react";
import { Building2 } from "lucide-react";

interface OrgHeaderProps {
  organization: {
    name: string;
    slug: string;
    description?: string;
    avatarUrl?: string;
  };
}

export function OrgHeader({ organization }: OrgHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      {organization.avatarUrl ? (
        <img
          src={organization.avatarUrl}
          alt={organization.name}
          className="w-20 h-20 rounded-full"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Building2 className="w-10 h-10 text-primary" />
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{organization.name}</h1>
        <p className="text-muted-foreground">{organization.slug}</p>
        {organization.description && (
          <p className="mt-1 text-sm text-muted-foreground">{organization.description}</p>
        )}
      </div>
    </div>
  );
}
