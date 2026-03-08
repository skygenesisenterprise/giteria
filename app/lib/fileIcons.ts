const iconRulesData = require("../../options/fileicon/material-icon-rules.json") as {
  folderNames: Record<string, string>;
  folderNamesExpanded: Record<string, string>;
  fileExtensions: Record<string, string>;
  fileNames: Record<string, string>;
  fileNamesExpanded: Record<string, string>;
  languageIds: Record<string, string>;
  rootFolder: string;
  rootFolderNames: Record<string, string>;
  rootFolderNamesExpanded: Record<string, string>;
};

export interface FileIconResult {
  iconName: string;
  color?: string;
}

const DEFAULT_FOLDER_ICON = "folder";
const DEFAULT_FILE_ICON = "file";

const ICON_COLORS: Record<string, string> = {
  folder: "text-blue-500",
  "folder-open": "text-blue-500",
  "folder-rust": "text-orange-500",
  "folder-robot": "text-purple-500",
  "folder-src": "text-blue-500",
  "folder-dist": "text-blue-500",
  "folder-css": "text-pink-500",
  "folder-sass": "text-pink-500",
  "folder-html": "text-orange-500",
  "folder-images": "text-purple-500",
  "folder-json": "text-yellow-500",
  "folder-markdown": "text-blue-500",
  "folder-config": "text-blue-500",
  "folder-git": "text-orange-500",
  "folder-github": "text-gray-500",
  "folder-npm": "text-red-500",
  "folder-node": "text-green-500",
  "folder-docker": "text-blue-500",
  "folder-database": "text-yellow-500",
  "folder-plugin": "text-purple-500",
  "folder-controller": "text-blue-500",
  "folder-tools": "text-gray-500",
  "folder-resource": "text-green-500",
  "folder-terraform": "text-purple-500",
  "folder-server": "text-gray-500",
  go: "text-cyan-500",
  golang: "text-cyan-500",
  typescript: "text-blue-500",
  javascript: "text-yellow-500",
  python: "text-green-500",
  rust: "text-orange-500",
  java: "text-orange-500",
  c: "text-blue-500",
  cpp: "text-blue-500",
  csharp: "text-purple-500",
  ruby: "text-red-500",
  php: "text-purple-500",
  swift: "text-orange-500",
  kotlin: "text-purple-500",
  scala: "text-red-500",
  html: "text-orange-500",
  css: "text-pink-500",
  sass: "text-pink-500",
  less: "text-blue-500",
  json: "text-yellow-500",
  yaml: "text-pink-500",
  yml: "text-pink-500",
  xml: "text-orange-500",
  markdown: "text-blue-500",
  md: "text-blue-500",
  dockerfile: "text-blue-500",
  git: "text-orange-500",
  github: "text-gray-500",
  settings: "text-gray-500",
  toml: "text-gray-500",
  ini: "text-gray-500",
  makefile: "text-gray-500",
  shell: "text-green-500",
  sh: "text-green-500",
  bash: "text-green-500",
  zsh: "text-green-500",
  powershell: "text-blue-500",
  bat: "text-green-500",
  cmd: "text-green-500",
  sql: "text-yellow-500",
  graphql: "text-pink-500",
  vue: "text-green-500",
  svelte: "text-orange-500",
  react: "text-blue-500",
  next: "text-gray-500",
  nuxt: "text-green-500",
  astro: "text-orange-500",
  npm: "text-red-500",
  yarn: "text-blue-500",
  pnpm: "text-yellow-500",
  cargo: "text-orange-500",
  composer: "text-purple-500",
  env: "text-green-500",
  gitignore: "text-orange-500",
  license: "text-purple-500",
  readme: "text-blue-500",
  changelog: "text-green-500",
  contributing: "text-yellow-500",
  code_of_conduct: "text-red-500",
  security: "text-green-500",
  authors: "text-gray-500",
  maintainers: "text-gray-500",
  contributors: "text-gray-500",
};

export function getFolderIcon(folderName: string): FileIconResult {
  const lowerName = folderName.toLowerCase();

  const customFolderIcons: Record<string, string> = {
    contrib: "folder-resource",
    contribution: "folder-resource",
    contributions: "folder-resource",
    infrastructure: "folder-server",
    infra: "folder-server",
    server: "folder-server",
    servers: "folder-server",
    giteria: "folder-git",
    ".giteria": "folder-git",
    github: "folder-github",
    ".github": "folder-github",
  };

  if (customFolderIcons[lowerName]) {
    const iconName = customFolderIcons[lowerName];
    return {
      iconName,
      color: ICON_COLORS[iconName] || ICON_COLORS.folder,
    };
  }

  if (iconRulesData.folderNamesExpanded?.[lowerName]) {
    const iconName = iconRulesData.folderNamesExpanded[lowerName];
    return {
      iconName,
      color: ICON_COLORS[iconName] || ICON_COLORS.folder,
    };
  }

  if (iconRulesData.folderNames?.[lowerName]) {
    const iconName = iconRulesData.folderNames[lowerName];
    return {
      iconName,
      color: ICON_COLORS[iconName] || ICON_COLORS.folder,
    };
  }

  return {
    iconName: DEFAULT_FOLDER_ICON,
    color: ICON_COLORS.folder,
  };
}

export function getFileIcon(fileName: string): FileIconResult {
  const lowerName = fileName.toLowerCase();

  if (iconRulesData.fileNamesExpanded?.[lowerName]) {
    const iconName = iconRulesData.fileNamesExpanded[lowerName];
    return {
      iconName,
      color: ICON_COLORS[iconName] || ICON_COLORS[DEFAULT_FILE_ICON],
    };
  }

  if (iconRulesData.fileNames?.[lowerName]) {
    const iconName = iconRulesData.fileNames[lowerName];
    return {
      iconName,
      color: ICON_COLORS[iconName] || ICON_COLORS[DEFAULT_FILE_ICON],
    };
  }

  const ext = fileName.includes(".") ? fileName.split(".").pop()?.toLowerCase() : "";
  if (ext && iconRulesData.fileExtensions?.[ext]) {
    const iconName = iconRulesData.fileExtensions[ext];
    return {
      iconName,
      color: ICON_COLORS[iconName] || ICON_COLORS[DEFAULT_FILE_ICON],
    };
  }

  return {
    iconName: DEFAULT_FILE_ICON,
    color: ICON_COLORS[DEFAULT_FILE_ICON],
  };
}

export function getSpecialFileIcon(fileName: string): FileIconResult | null {
  const lowerName = fileName.toLowerCase();

  if (
    lowerName === "readme.md" ||
    lowerName === "readme" ||
    lowerName === "readme.txt" ||
    lowerName === "readme.markdown"
  ) {
    return {
      iconName: "readme",
      color: ICON_COLORS.readme,
    };
  }

  if (
    lowerName.startsWith("license") ||
    lowerName === "licence" ||
    lowerName === "copying" ||
    lowerName === "notice" ||
    lowerName === "copyright"
  ) {
    return {
      iconName: "license",
      color: ICON_COLORS.license,
    };
  }

  if (lowerName === ".gitignore" || lowerName === "gitignore" || lowerName === ".gitattributes") {
    return {
      iconName: "git",
      color: ICON_COLORS.gitignore,
    };
  }

  if (
    lowerName === ".ignore" ||
    lowerName === ".dockerignore" ||
    lowerName === ".prettierignore" ||
    lowerName === ".eslintignore" ||
    lowerName === ".npmignore" ||
    lowerName === ".gitmodules"
  ) {
    return {
      iconName: "docker",
      color: ICON_COLORS.gitignore,
    };
  }

  if (lowerName === "changelog" || lowerName === "changelog.md" || lowerName === "history") {
    return {
      iconName: "history",
      color: ICON_COLORS.changelog,
    };
  }

  if (lowerName.includes("contributing")) {
    return {
      iconName: "contributing",
      color: ICON_COLORS.contributing,
    };
  }

  if (lowerName.includes("code_of_conduct") || lowerName.includes("codeofconduct")) {
    return {
      iconName: "conduct",
      color: ICON_COLORS.code_of_conduct,
    };
  }

  if (lowerName.includes("security")) {
    return {
      iconName: "lock",
      color: ICON_COLORS.security,
    };
  }

  if (lowerName === "package.json" || lowerName === "package-lock.json") {
    return {
      iconName: "npm",
      color: ICON_COLORS.npm,
    };
  }

  if (lowerName === "yarn.lock") {
    return {
      iconName: "yarn",
      color: ICON_COLORS.yarn,
    };
  }

  if (lowerName === "pnpm-lock.yaml" || lowerName === "pnpm-workspace.yaml") {
    return {
      iconName: "pnpm",
      color: ICON_COLORS.pnpm,
    };
  }

  if (lowerName === "Cargo.toml" || lowerName === "Cargo.lock") {
    return {
      iconName: "cargo",
      color: ICON_COLORS.cargo,
    };
  }

  if (lowerName === "go.mod" || lowerName === "go.sum") {
    return {
      iconName: "go-mod",
      color: ICON_COLORS.golang,
    };
  }

  if (
    lowerName.startsWith(".prettierrc") ||
    lowerName === "prettier.config.js" ||
    lowerName === "prettier.config.ts" ||
    lowerName.startsWith("prettier.config.")
  ) {
    return {
      iconName: "prettier",
      color: ICON_COLORS.env,
    };
  }

  if (
    lowerName.startsWith(".eslintrc") ||
    lowerName === "eslint.config.js" ||
    lowerName === "eslint.config.mjs" ||
    lowerName === "eslint.config.ts"
  ) {
    return {
      iconName: "eslint",
      color: ICON_COLORS.env,
    };
  }

  if (lowerName.startsWith(".vscode") || lowerName === "settings.json") {
    return {
      iconName: "vscode",
      color: ICON_COLORS.env,
    };
  }

  if (lowerName.endsWith(".md")) {
    return {
      iconName: "markdown",
      color: ICON_COLORS.env,
    };
  }

  if (
    lowerName === "requirements.txt" ||
    lowerName === "pipfile" ||
    lowerName === "pyproject.toml"
  ) {
    return {
      iconName: "python",
      color: ICON_COLORS.python,
    };
  }

  if (lowerName === "composer.json") {
    return {
      iconName: "composer",
      color: ICON_COLORS.composer,
    };
  }

  if (lowerName === "Gemfile" || lowerName === "gemfile.lock") {
    return {
      iconName: "ruby",
      color: ICON_COLORS.ruby,
    };
  }

  if (lowerName === "pom.xml" || lowerName === "build.gradle" || lowerName === "build.gradle.kts") {
    return {
      iconName: "java",
      color: ICON_COLORS.java,
    };
  }

  if (lowerName === "dockerfile" || lowerName.startsWith("dockerfile.")) {
    return {
      iconName: "docker",
      color: ICON_COLORS.dockerfile,
    };
  }

  if (lowerName === ".env" || lowerName === ".env.example" || lowerName === ".env.local") {
    return {
      iconName: "tune",
      color: ICON_COLORS.env,
    };
  }

  return null;
}
