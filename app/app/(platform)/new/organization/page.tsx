"use client";

import * as React from "react";
import { OrganizationForm } from "@/components/organizations/OrganizationForm";
import { Building2 } from "lucide-react";

export default function NewOrganizationPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center py-12">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Create a new organization</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Organizations allow teams to collaborate across repositories. Create one to get started.
          </p>
        </div>

        <OrganizationForm />
      </div>
    </div>
  );
}
