export interface LicenseOption {
  value: string;
  label: string;
}

export interface GitignoreOption {
  value: string;
  label: string;
}

export interface LanguageOption {
  value: string;
  label: string;
}

const LICENSE_LABELS: Record<string, string> = {
  "": "No license",
  MIT: "MIT License",
  "Apache-2.0": "Apache License 2.0",
  "GPL-3.0": "GNU General Public License v3.0",
  "GPL-2.0": "GNU General Public License v2.0",
  "BSD-3-Clause": "BSD 3-Clause License",
  "BSD-2-Clause": "BSD 2-Clause License",
  ISC: "ISC License",
  "CC0-1.0": "Creative Commons Zero v1.0",
  "CC-BY-4.0": "Creative Commons Attribution 4.0",
  "CC-BY-SA-4.0": "Creative Commons Attribution Share Alike 4.0",
  "EPL-2.0": "Eclipse Public License 2.0",
  "MPL-2.0": "Mozilla Public License 2.0",
  "AGPL-3.0": "GNU Affero General Public License v3.0",
  "LGPL-3.0": "GNU Lesser General Public License v3.0",
  Unlicense: "The Unlicense",
  WTFPL: "Do What The F*ck You Want To Public License",
  "BSL-1.0": "Business Source License 1.0",
  "MulanPSL-2.0": "Mulan Permissive Software License v2.0",
  "OFL-1.1": "SIL Open Font License 1.1",
  Zlib: "zlib License",
  "EUPL-1.2": "European Union Public License 1.2",
  "UPL-1.0": "Unicode License Agreement - Data Files and Software",
  "EPL-1.0": "Eclipse Public License 1.0",
  "0BSD": "BSD Zero-Clause License",
  "LGPL-2.1": "GNU Lesser General Public License v2.1",
  "OSL-3.0": "Open Software License 3.0",
};

export const LICENSE_OPTIONS: LicenseOption[] = Object.entries(LICENSE_LABELS).map(
  ([value, label]) => ({ value, label })
);

export function getLicenseLabel(value: string): string {
  return LICENSE_LABELS[value] || value;
}

export const LANGUAGE_LABELS: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  go: "Go",
  rust: "Rust",
  java: "Java",
  csharp: "C#",
  cpp: "C++",
  ruby: "Ruby",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
};

export const LANGUAGE_OPTIONS: LanguageOption[] = Object.entries(LANGUAGE_LABELS).map(
  ([value, label]) => ({ value, label })
);

export function getLanguageLabel(value: string): string {
  return LANGUAGE_LABELS[value] || value;
}

export const DEFAULT_GITIGNORE: GitignoreOption[] = [
  { value: "", label: "None" },
  { value: "Go", label: "Go" },
  { value: "Node", label: "Node" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C", label: "C" },
  { value: "C++", label: "C++" },
  { value: "Ruby", label: "Ruby" },
  { value: "Rust", label: "Rust" },
  { value: "Swift", label: "Swift" },
  { value: "Kotlin", label: "Kotlin" },
  { value: ".NET", label: ".NET" },
  { value: "Vue", label: "Vue" },
  { value: "React", label: "React" },
  { value: "Angular", label: "Angular" },
  { value: "Android", label: "Android" },
  { value: "Django", label: "Django" },
  { value: "Laravel", label: "Laravel" },
  { value: "Terraform", label: "Terraform" },
  { value: "Unity", label: "Unity" },
  { value: "UnrealEngine", label: "Unreal Engine" },
  { value: "JetBrains", label: "JetBrains" },
  { value: "VisualStudioCode", label: "Visual Studio Code" },
  { value: "Git", label: "Git" },
  { value: "Maven", label: "Maven" },
  { value: "Gradle", label: "Gradle" },
];

export const GITIGNORE_OPTIONS = DEFAULT_GITIGNORE;
