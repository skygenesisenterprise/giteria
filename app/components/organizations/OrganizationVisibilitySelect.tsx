"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Globe, Lock } from "lucide-react";

interface OrganizationVisibilitySelectProps {
  value: "public" | "private";
  onChange: (value: "public" | "private") => void;
}

export function OrganizationVisibilitySelect({
  value,
  onChange,
}: OrganizationVisibilitySelectProps) {
  return (
    <div className="space-y-3">
      <Label>Visibility</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as "public" | "private")}
        className="flex flex-col sm:flex-row gap-3"
      >
        <label
          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
            value === "public" ? "border-primary bg-primary/5" : "border-border bg-background"
          }`}
        >
          <RadioGroupItem value="public" id="visibility-public" />
          <Globe className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium text-foreground">Public</p>
            <p className="text-sm text-muted-foreground">
              Anyone can see this organization and its repos
            </p>
          </div>
        </label>
        <label
          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
            value === "private" ? "border-primary bg-primary/5" : "border-border bg-background"
          }`}
        >
          <RadioGroupItem value="private" id="visibility-private" />
          <Lock className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium text-foreground">Private</p>
            <p className="text-sm text-muted-foreground">Only members can see this organization</p>
          </div>
        </label>
      </RadioGroup>
    </div>
  );
}
