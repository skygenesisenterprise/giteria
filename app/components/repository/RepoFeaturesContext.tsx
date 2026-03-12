"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";

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
}

interface RepoFeaturesContextType {
  features: RepoFeatures;
  updateFeatures: (features: RepoFeatures) => void;
  clearFeatures: () => void;
}

const RepoFeaturesContext = createContext<RepoFeaturesContextType>({
  features: {},
  updateFeatures: () => {},
  clearFeatures: () => {},
});

export function RepoFeaturesProvider({
  children,
  initialFeatures,
}: {
  children: React.ReactNode;
  initialFeatures?: RepoFeatures;
}) {
  const [features, setFeatures] = useState<RepoFeatures>(initialFeatures || {});

  const updateFeatures = (newFeatures: RepoFeatures) => {
    setFeatures((prev) => ({ ...prev, ...newFeatures }));
  };

  const clearFeatures = () => {
    setFeatures({});
  };

  return (
    <RepoFeaturesContext.Provider value={{ features, updateFeatures, clearFeatures }}>
      {children}
    </RepoFeaturesContext.Provider>
  );
}

export function useRepoFeatures() {
  return useContext(RepoFeaturesContext);
}
