 "use client";

import * as React from "react";
import { use } from "react";
import { OrgSettingSidebar } from "@/components/organizations/OrgSettingSidebar";

interface OrgSettingsPageProps {
  params: Promise<{ owner: string }>;
}

export default function OrgSettingsPage({ params }: OrgSettingsPageProps) {
  const resolvedParams = use(params);
  const { owner } = resolvedParams;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <OrgSettingSidebar owner={owner} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your organization settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
