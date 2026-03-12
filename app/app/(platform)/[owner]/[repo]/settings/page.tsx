"use client";

import * as React from "react";
import { use } from "react";
import { SettingSidebar } from "@/components/repository/settings/SettingSidebar";

interface SettingsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <SettingSidebar owner={owner} repo={repo} />
          </div>
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your repository settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
