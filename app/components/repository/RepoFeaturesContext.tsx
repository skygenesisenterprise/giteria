"use client";

import * as React from "react";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { db, STORES } from "@/lib/db";

export interface RepoFeatures {
  hasWiki?: boolean;
  hasIssues?: boolean;
  hasDiscussions?: boolean;
  hasProjects?: boolean;
  hasActions?: boolean;
  hasAgents?: boolean;
  hasModels?: boolean;
  hasPackages?: boolean;
  hasSecurity?: boolean;
  hasInsights?: boolean;
  hasSponsorships?: boolean;
}

interface RepoFeaturesContextType {
  features: RepoFeatures;
  updateFeatures: (features: RepoFeatures) => void;
  clearFeatures: () => void;
  isLoading: boolean;
}

const RepoFeaturesContext = createContext<RepoFeaturesContextType>({
  features: {},
  updateFeatures: () => {},
  clearFeatures: () => {},
  isLoading: true,
});

const REPO_FEATURES_KEY = "repo-features";

async function loadFeaturesFromDB(repoFullName: string): Promise<RepoFeatures | null> {
  try {
    const stored = await db.get<{ id: string; features: RepoFeatures }>(
      STORES.SETTINGS,
      `${REPO_FEATURES_KEY}-${repoFullName}`
    );
    return stored?.features || null;
  } catch (error) {
    console.error("Failed to load features from DB:", error);
    return null;
  }
}

async function saveFeaturesToDB(repoFullName: string, features: RepoFeatures): Promise<void> {
  try {
    await db.put(STORES.SETTINGS, {
      id: `${REPO_FEATURES_KEY}-${repoFullName}`,
      features,
    });
  } catch (error) {
    console.error("Failed to save features to DB:", error);
  }
}

export function RepoFeaturesProvider({
  children,
  owner,
  repo,
}: {
  children: React.ReactNode;
  owner: string;
  repo: string;
}) {
  const [features, setFeatures] = useState<RepoFeatures>({});
  const [isLoading, setIsLoading] = useState(true);

  const repoFullName = `${owner}/${repo}`.toLowerCase();

  useEffect(() => {
    async function loadFeatures() {
      setIsLoading(true);
      const storedFeatures = await loadFeaturesFromDB(repoFullName);
      if (storedFeatures) {
        setFeatures(storedFeatures);
      }
      setIsLoading(false);
    }
    loadFeatures();
  }, [repoFullName]);

  const updateFeatures = useCallback(
    async (newFeatures: RepoFeatures) => {
      const updated = { ...features, ...newFeatures };
      setFeatures(updated);
      await saveFeaturesToDB(repoFullName, updated);
    },
    [features, repoFullName]
  );

  const clearFeatures = useCallback(async () => {
    setFeatures({});
    try {
      await db.delete(STORES.SETTINGS, `${REPO_FEATURES_KEY}-${repoFullName}`);
    } catch (error) {
      console.error("Failed to clear features from DB:", error);
    }
  }, [repoFullName]);

  return (
    <RepoFeaturesContext.Provider value={{ features, updateFeatures, clearFeatures, isLoading }}>
      {children}
    </RepoFeaturesContext.Provider>
  );
}

export function useRepoFeatures() {
  return useContext(RepoFeaturesContext);
}
