export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor?: string;
  stars: number;
  forks: number;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
  isMirror: boolean;
  updatedAt: number;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  body: string;
  state: "open" | "closed";
  visibility: "public" | "private";
  updatedAt: number;
  url: string;
}

export interface Package {
  id: string;
  name: string;
  type: "npm" | "docker" | "maven" | "go" | "nuget" | "container";
  description: string;
  version: string;
  visibility: "public" | "private";
  updatedAt: number;
  registry: string;
}

export interface Contribution {
  date: string;
  count: number;
}

export interface PinnedRepo {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor?: string;
  stars: number;
  forks: number;
  url: string;
}

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Scala: "#c22d40",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Dart: "#00B4AB",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Lua: "#000080",
  R: "#198CE7",
  MATLAB: "#e16737",
  Jupyter: "#DA5B0B",
};

export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] || "#8b949e";
}
