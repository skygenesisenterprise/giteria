"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RepositoryEmptyStateProps {
  owner: string;
  canCreate?: boolean;
}

export function RepositoryEmptyState({ owner, canCreate = false }: RepositoryEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <BookMarked className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        This owner has no repositories yet.
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        Get started by creating a new repository or forking one from the community.
      </p>
      {canCreate && (
        <Link href={`/new?owner=${owner}`}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create repository
          </Button>
        </Link>
      )}
    </div>
  );
}
