export interface LanguageInfo {
  name: string;
  color: string;
}

export const LANGUAGE_EXTENSIONS: Record<string, LanguageInfo> = {
  go: { name: "Go", color: "#00ADD8" },
  rs: { name: "Rust", color: "#DEA584" },
  ts: { name: "TypeScript", color: "#3178C6" },
  tsx: { name: "TypeScript", color: "#3178C6" },
  js: { name: "JavaScript", color: "#F7DF1E" },
  jsx: { name: "JavaScript", color: "#F7DF1E" },
  py: { name: "Python", color: "#3572A5" },
  java: { name: "Java", color: "#B07219" },
  kt: { name: "Kotlin", color: "#A97BFF" },
  swift: { name: "Swift", color: "#F05138" },
  c: { name: "C", color: "#555555" },
  cpp: { name: "C++", color: "#F34B7D" },
  cs: { name: "C#", color: "#178600" },
  rb: { name: "Ruby", color: "#701516" },
  php: { name: "PHP", color: "#4F5D95" },
  html: { name: "HTML", color: "#E34C26" },
  css: { name: "CSS", color: "#563D7C" },
  scss: { name: "SCSS", color: "#C6538C" },
  vue: { name: "Vue", color: "#41B883" },
  svelte: { name: "Svelte", color: "#FF3E00" },
  md: { name: "Markdown", color: "#083FA1" },
  yaml: { name: "YAML", color: "#CB171E" },
  yml: { name: "YAML", color: "#CB171E" },
  json: { name: "JSON", color: "#292929" },
  toml: { name: "TOML", color: "#9C4121" },
  sql: { name: "SQL", color: "#E38C00" },
  sh: { name: "Shell", color: "#89E051" },
  bash: { name: "Shell", color: "#89E051" },
  dockerfile: { name: "Dockerfile", color: "#384D54" },
  makefile: { name: "Makefile", color: "#427819" },
  xml: { name: "XML", color: "#0060AC" },
};

export const LANGUAGE_NAMES: Record<string, LanguageInfo> = {
  Go: { name: "Go", color: "#00ADD8" },
  Rust: { name: "Rust", color: "#DEA584" },
  TypeScript: { name: "TypeScript", color: "#3178C6" },
  JavaScript: { name: "JavaScript", color: "#F7DF1E" },
  Python: { name: "Python", color: "#3572A5" },
  Java: { name: "Java", color: "#B07219" },
  Kotlin: { name: "Kotlin", color: "#A97BFF" },
  Swift: { name: "Swift", color: "#F05138" },
  C: { name: "C", color: "#555555" },
  "C++": { name: "C++", color: "#F34B7D" },
  "C#": { name: "C#", color: "#178600" },
  Ruby: { name: "Ruby", color: "#701516" },
  PHP: { name: "PHP", color: "#4F5D95" },
  HTML: { name: "HTML", color: "#E34C26" },
  CSS: { name: "CSS", color: "#563D7C" },
  SCSS: { name: "SCSS", color: "#C6538C" },
  Vue: { name: "Vue", color: "#41B883" },
  Svelte: { name: "Svelte", color: "#FF3E00" },
  Markdown: { name: "Markdown", color: "#083FA1" },
  YAML: { name: "YAML", color: "#CB171E" },
  JSON: { name: "JSON", color: "#292929" },
  TOML: { name: "TOML", color: "#9C4121" },
  SQL: { name: "SQL", color: "#E38C00" },
  Shell: { name: "Shell", color: "#89E051" },
  Dockerfile: { name: "Dockerfile", color: "#384D54" },
  Makefile: { name: "Makefile", color: "#427819" },
  XML: { name: "XML", color: "#0060AC" },
};

export function getLanguageInfo(langName: string): LanguageInfo {
  return (
    LANGUAGE_NAMES[langName] ||
    LANGUAGE_EXTENSIONS[langName.toLowerCase()] || {
      name: langName,
      color: "#ededed",
    }
  );
}

export interface DetectedLanguage {
  name: string;
  color: string;
  percentage: number;
}

export function detectLanguagesFromFiles(files: string[]): DetectedLanguage[] {
  const languageCounts: Record<string, number> = {};
  let totalFiles = 0;

  for (const file of files) {
    if (file.includes("/") || file.startsWith(".")) continue;

    const ext = file.includes(".") ? file.split(".").pop()?.toLowerCase() : file.toLowerCase();

    if (ext && LANGUAGE_EXTENSIONS[ext]) {
      const langName = LANGUAGE_EXTENSIONS[ext].name;
      languageCounts[langName] = (languageCounts[langName] || 0) + 1;
      totalFiles++;
    } else if (file.toLowerCase() === "dockerfile") {
      languageCounts["Dockerfile"] = (languageCounts["Dockerfile"] || 0) + 1;
      totalFiles++;
    } else if (file.toLowerCase() === "makefile" || file === "Makefile") {
      languageCounts["Makefile"] = (languageCounts["Makefile"] || 0) + 1;
      totalFiles++;
    }
  }

  if (Object.keys(languageCounts).length === 0) {
    return [];
  }

  return Object.entries(languageCounts)
    .map(([name, count]) => {
      const langInfo = getLanguageInfo(name);
      return {
        name: langInfo.name,
        color: langInfo.color,
        percentage: Math.round((count / totalFiles) * 100),
      };
    })
    .sort((a, b) => b.percentage - a.percentage);
}

export function getPrimaryLanguage(
  repoLanguages?: { name: string; color: string; percentage: number }[],
  fileNames?: string[]
): { name: string; color: string } | undefined {
  if (repoLanguages && repoLanguages.length > 0) {
    const primary = repoLanguages[0];
    return { name: primary.name, color: primary.color };
  }

  if (fileNames && fileNames.length > 0) {
    const detected = detectLanguagesFromFiles(fileNames);
    if (detected.length > 0) {
      return { name: detected[0].name, color: detected[0].color };
    }
  }

  return undefined;
}

export const DEFAULT_REPO_FILES = [
  ".gitignore",
  "Dockerfile",
  "LICENSE",
  "README.md",
  "main.go",
  "go.mod",
  "go.sum",
];

export function getPrimaryLanguageWithDefault(
  repoLanguages?: { name: string; color: string; percentage: number }[],
  fileNames?: string[]
): { name: string; color: string } | undefined {
  if (repoLanguages && repoLanguages.length > 0) {
    const primary = repoLanguages[0];
    return { name: primary.name, color: primary.color };
  }

  const filesToUse = fileNames && fileNames.length > 0 ? fileNames : DEFAULT_REPO_FILES;
  const detected = detectLanguagesFromFiles(filesToUse);
  if (detected.length > 0) {
    return { name: detected[0].name, color: detected[0].color };
  }

  return undefined;
}
