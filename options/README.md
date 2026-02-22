<div align="center">

# 🚀 Giteria Options

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://github.com/skygenesisenterprise/giteria/blob/main/LICENSE) [![Go](https://img.shields.io/badge/Go-1.21+-blue?style=for-the-badge&logo=go)](https://golang.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/) [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19.2.1-blue?style=for-the-badge&logo=react)](https://react.dev/)

**Comprehensive Collection of Configurable Options for Giteria - Locales, Licenses, Labels, and Gitignore Templates**

Giteria Options is a comprehensive collection of **localization files**, **open-source licenses**, **issue labels**, and **gitignore templates** designed to enhance the Giteria self-hosted Git platform experience.

[🚀 Quick Start](#-quick-start) • [📋 What's New](#-whats-new) • [📁 Structure](#-structure) • [🗂️ Available Options](#-available-options) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 What is Giteria Options?

**Giteria Options** provides a complete set of configurable options that can be used with Giteria or any similar Git hosting platform. This collection includes:

- **🌍 Localization Files** - Translations for multiple languages
- **📜 License Templates** - Popular open-source licenses
- **🏷️ Label Templates** - Pre-configured issue labels
- **🚫 Gitignore Templates** - Language and framework-specific gitignore files

### 🎯 Our Vision

- **🌍 Multi-Language Support** - 30+ languages and regional variants
- **📜 Comprehensive License Coverage** - 25+ open-source licenses
- **🏷️ Organized Labels** - Default and advanced label configurations
- **🚫 Extensive Gitignore Templates** - 100+ templates for various ecosystems
- **🔄 Easy Integration** - Drop-in ready for Giteria and similar platforms

---

## 🆕 What's New

### 🎯 **Recent Additions**

#### 🌍 **Localization Expansion** (NEW)

- ✅ **30+ Languages** - Complete coverage including English, Chinese, Japanese, Korean, Spanish, French, German, Russian, and many more
- ✅ **Regional Variants** - Support for Chinese (Simplified/Traditional), Portuguese (Brazil/Portugal), and other regional differences
- ✅ **Continuous Updates** - Regular additions based on community contributions

#### 📜 **License Templates** (NEW)

- ✅ **25+ Open-Source Licenses** - MIT, Apache 2.0, GPL, BSD, and more
- ✅ **FOSS Approved** - Includes OSI-approved licenses
- ✅ **Creative Commons** - CC-BY, CC-BY-SA, CC0 for documentation

#### 🏷️ **Label Templates** (NEW)

- ✅ **Default Labels** - Standard issue labels for bug tracking
- ✅ **Advanced Labels** - Comprehensive labeling system for larger projects
- ✅ **Customizable** - Easy to modify for team needs

#### 🚫 **Gitignore Templates** (NEW)

- ✅ **100+ Templates** - Covering 100+ programming languages and frameworks
- ✅ **Language-Specific** - Go, JavaScript, TypeScript, Python, Java, C++, Rust, and more
- ✅ **Framework Support** - React, Vue, Angular, Next.js, Django, Spring, and more
- ✅ **Tool Support** - VS Code, Vim, Emacs, JetBrains, and other IDEs

---

## 📋 Quick Start

### 📂 Using Options in Your Project

1. **Clone the repository**

   ```bash
   git clone https://github.com/skygenesisenterprise/giteria.git
   cd giteria/options
   ```

2. **Choose your options**

   ```bash
   # Copy a locale file
   cp locale/locale_en-US.ini /path/to/your/giteria/locale/

   # Copy a license
   cp license/MIT /path/to/your/project/LICENSE

   # Copy gitignore template
   cp gitignore/Go /path/to/your/project/.gitignore

   # Copy labels
   cp label/Default.yaml /path/to/your/giteria/label/
   ```

3. **Customize as needed**

   ```bash
   # Edit locale for your language
   vim locale/locale_fr-FR.ini

   # Modify labels for your workflow
   vim label/Advanced.yaml
   ```

---

## 🗂️ Available Options

### 🌍 Localization Files (`locale/`)

Complete translation files for **30+ languages**:

| Language              | Code               | Status      |
| --------------------- | ------------------ | ----------- |
| English (US)          | `locale_en-US.ini` | ✅ Complete |
| Chinese (Simplified)  | `locale_zh-CN.ini` | ✅ Complete |
| Chinese (Traditional) | `locale_zh-TW.ini` | ✅ Complete |
| Chinese (Hong Kong)   | `locale_zh-HK.ini` | ✅ Complete |
| Japanese              | `locale_ja-JP.ini` | ✅ Complete |
| Korean                | `locale_ko-KR.ini` | ✅ Complete |
| Spanish               | `locale_es-ES.ini` | ✅ Complete |
| French                | `locale_fr-FR.ini` | ✅ Complete |
| German                | `locale_de-DE.ini` | ✅ Complete |
| Russian               | `locale_ru-RU.ini` | ✅ Complete |
| Portuguese (Brazil)   | `locale_pt-BR.ini` | ✅ Complete |
| Portuguese (Portugal) | `locale_pt-PT.ini` | ✅ Complete |
| Italian               | `locale_it-IT.ini` | ✅ Complete |
| Dutch                 | `locale_nl-NL.ini` | ✅ Complete |
| Polish                | `locale_pl-PL.ini` | ✅ Complete |
| Ukrainian             | `locale_uk-UA.ini` | ✅ Complete |
| Turkish               | `locale_tr-TR.ini` | ✅ Complete |
| Swedish               | `locale_sv-SE.ini` | ✅ Complete |
| Finnish               | `locale_fi-FI.ini` | ✅ Complete |
| Czech                 | `locale_cs-CZ.ini` | ✅ Complete |
| Slovak                | `locale_sk-SK.ini` | ✅ Complete |
| Hungarian             | `locale_hu-HU.ini` | ✅ Complete |
| Greek                 | `locale_el-GR.ini` | ✅ Complete |
| Indonesian            | `locale_id-ID.ini` | ✅ Complete |
| Persian               | `locale_fa-IR.ini` | ✅ Complete |
| Irish                 | `locale_ga-IE.ini` | ✅ Complete |
| Icelandic             | `locale_is-IS.ini` | ✅ Complete |
| Latvian               | `locale_lv-LV.ini` | ✅ Complete |
| Sinhala               | `locale_si-LK.ini` | ✅ Complete |

**Usage:**

```bash
# List all available locales
ls locale/

# Copy specific locale
cp locale/locale_de-DE.ini /path/to/giteria/locale/
```

### 📜 License Templates (`license/`)

Open-source licenses for your projects:

| License            | File                 | Description                             |
| ------------------ | -------------------- | --------------------------------------- |
| MIT                | `MIT`                | Simple and permissive                   |
| MIT No Attribution | `MIT-0`              | MIT without attribution requirement     |
| Apache 2.0         | `Apache-2.0`         | Permissive with patent rights           |
| BSD 2-Clause       | `BSD-2-Clause`       | Simplified BSD license                  |
| BSD 3-Clause       | `BSD-3-Clause`       | BSD with attribution                    |
| BSD 3-Clause Clear | `BSD-3-Clause-Clear` | Clear BSD license                       |
| GPL 2.0            | `GPL-2.0`            | GNU General Public License v2           |
| GPL 3.0            | `GPL-3.0`            | GNU General Public License v3           |
| LGPL 2.1           | `LGPL-2.1`           | Lesser GPL v2.1                         |
| LGPL 3.0           | `LGPL-3.0`           | Lesser GPL v3                           |
| AGPL 3.0           | `AGPL-3.0`           | Affero GPL v3                           |
| MPL 2.0            | `MPL-2.0`            | Mozilla Public License                  |
| EPL 1.0            | `EPL-1.0`            | Eclipse Public License                  |
| EPL 2.0            | `EPL-2.0`            | Eclipse Public License v2               |
| ISC                | `ISC`                | ISC License                             |
| Unlicense          | `Unlicense`          | Public Domain                           |
| Zlib               | `Zlib`               | Zlib License                            |
| BSL 1.0            | `BSL-1.0`            | Boost Software License                  |
| CC0 1.0            | `CC0-1.0`            | Creative Commons Zero                   |
| CC BY 4.0          | `CC-BY-4.0`          | Creative Commons Attribution            |
| CC BY-SA 4.0       | `CC-BY-SA-4.0`       | Creative Commons Attribution-ShareAlike |
| OFL 1.1            | `OFL-1.1`            | SIL Open Font License                   |
| WTFPL              | `WTFPL`              | Do What The F\*ck You Want To           |
| EUPL 1.2           | `EUPL-1.2`           | European Union Public License           |
| MulanPSL 2.0       | `MulanPSL-2.0`       | Mulan Permissive Software License       |
| UPL 1.0            | `UPL-1.0`            | Universal Permissive License            |
| OSL 3.0            | `OSL-3.0`            | Open Software License                   |
| 0BSD               | `0BSD`               | BSD Zero-Clause License                 |

**Usage:**

```bash
# List all available licenses
ls license/

# Copy a license to your project
cp license/MIT /path/to/project/LICENSE
cp license/Apache-2.0 /path/to/project/LICENSE
```

### 🏷️ Label Templates (`label/`)

Pre-configured issue labels:

| File            | Description          | Use Case       |
| --------------- | -------------------- | -------------- |
| `Default`       | Basic issue labels   | Small projects |
| `Advanced.yaml` | Comprehensive labels | Large projects |

**Default Labels:**

- ✅ `bug` - Something isn't working
- ✅ `enhancement` - New feature or request
- ✅ `documentation` - Improvements to docs
- ✅ `help wanted` - Extra attention needed
- ✅ `question` - Further information requested
- ✅ `good first issue` - Good for newcomers
- ✅ `priority high` - High priority items
- ✅ `priority low` - Low priority items
- ✅ `wontfix` - This will not be worked on

**Usage:**

```bash
# List all available labels
ls label/

# Copy label configuration
cp label/Default /path/to/giteria/label/
cp label/Advanced.yaml /path/to/giteria/label/
```

### 🚫 Gitignore Templates (`gitignore/`)

Language and framework-specific `.gitignore` templates:

| Category       | Examples                                                                          |
| -------------- | --------------------------------------------------------------------------------- |
| **Languages**  | Go, JavaScript, TypeScript, Python, Java, C++, Rust, C#, Ruby, PHP, Swift, Kotlin |
| **Frameworks** | React, Vue, Angular, Next.js, Django, Spring, Express, Laravel, Rails             |
| **Tools**      | VS Code, Vim, Emacs, JetBrains, Sublime Text, Atom                                |
| **Platforms**  | Node.js, npm, Yarn, pnpm, Maven, Gradle, Cargo                                    |
| **OS**         | macOS, Windows, Linux, Android, iOS                                               |
| **Others**     | Terraform, Docker, Kubernetes, Unity, Unreal                                      |

**Popular Templates:**

```
gitignore/
├── Go                      # Go workspace
├── JavaScript              # Node.js projects
├── TypeScript              # TypeScript projects
├── Python                  # Python projects
├── Java                    # Java projects
├── React                   # React projects
├── Vue                     # Vue.js projects
├── Next.js                 # Next.js projects
├── Django                  # Django projects
├── Flutter                 # Flutter projects
├── macOS                   # macOS system files
├── Windows                 # Windows system files
├── Linux                   # Linux system files
├── VSCode                  # VS Code settings
├── JetBrains               # JetBrains IDEs
└── ...
```

**Usage:**

```bash
# List all available gitignore templates
ls gitignore/

# Copy a gitignore template
cp gitignore/Go /path/to/project/.gitignore
cp gitignore/React /path/to/project/.gitignore
cp gitignore/macOS /path/to/project/.gitignore

# Combine multiple templates
cat gitignore/Go gitignore/macOS > /path/to/project/.gitignore
```

---

## 📁 Structure

```
options/
├── locale/                     # Localization files
│   ├── locale_en-US.ini       # English (US)
│   ├── locale_zh-CN.ini       # Chinese (Simplified)
│   ├── locale_ja-JP.ini       # Japanese
│   ├── locale_fr-FR.ini       # French
│   └── ...                    # 30+ languages
├── license/                   # License templates
│   ├── MIT                    # MIT License
│   ├── Apache-2.0            # Apache 2.0
│   ├── GPL-3.0               # GPL v3
│   └── ...                    # 25+ licenses
├── label/                      # Issue label templates
│   ├── Default                # Default labels
│   └── Advanced.yaml         # Advanced labels
├── gitignore/                  # Gitignore templates
│   ├── Go                     # Go
│   ├── JavaScript             # JavaScript
│   ├── Python                 # Python
│   └── ...                    # 100+ templates
├── TRANSLATORS                # Translation credits
└── README.md                  # This file
```

---

## 🛠️ Tech Stack

This project uses a simple structure with:

```
Plain Text + YAML + INI
├── 📝 INI Files (Localization)
├── 📄 Plain Text (Licenses)
├── 🏷️ YAML (Labels)
└── 🚫 Gitignore Patterns
```

---

## 💻 Development

### 🎯 Adding New Options

#### Adding a New Locale

1. Copy an existing locale file:

   ```bash
   cp locale/locale_en-US.ini locale/locale_NEW_LANG.ini
   ```

2. Translate the strings:

   ```bash
   vim locale/locale_NEW_LANG.ini
   ```

3. Add your name to TRANSLATORS:

   ```bash
   echo "Your Name <email@example.com>" >> TRANSLATORS
   ```

#### Adding a New License

1. Create the license file:

   ```bash
   vim license/LICENSE_NAME
   ```

2. Add the license text (use official sources)

3. Ensure proper formatting

#### Adding a New Gitignore Template

1. Create the template:

   ```bash
   vim gitignore/TEMPLATE_NAME
   ```

2. Add gitignore patterns

3. Follow existing conventions

---

## 🤝 Contributing

We're looking for contributors to help expand and improve Giteria Options!

### 🎯 How to Get Started

1. **Fork the repository** and create a feature branch
2. **Check existing issues** for tasks that need help
3. **Add new translations** for unsupported languages
4. **Submit pull requests** with your additions

### 🏗️ Areas Needing Help

- **Translation Contributors** - Add new languages or improve existing translations
- **License Experts** - Add additional open-source licenses
- **Gitignore Maintainers** - Add templates for new languages/frameworks
- **Documentation** - Improve guides and examples

---

## 📞 Support & Community

### 💬 Get Help

- 📖 **[Documentation](docs/)** - Comprehensive guides
- 🐛 **[GitHub Issues](https://github.com/skygenesisenterprise/giteria/issues)** - Bug reports
- 💡 **[GitHub Discussions](https://github.com/skygenesisenterprise/giteria/discussions)** - General questions

### 🐛 Reporting Issues

When reporting issues with options, please include:

- Clear description of the problem
- File(s) affected
- Expected vs actual behavior
- Steps to reproduce

---

## 📊 Project Status

| Category      | Status      | Count | Notes                       |
| ------------- | ----------- | ----- | --------------------------- |
| **Locales**   | ✅ Complete | 30+   | Continuous updates          |
| **Licenses**  | ✅ Complete | 25+   | FOSS approved               |
| **Labels**    | ✅ Complete | 2     | Default + Advanced          |
| **Gitignore** | ✅ Complete | 100+  | Language/framework specific |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Sky Genesis Enterprise

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Sky Genesis Enterprise** - Project leadership
- **Gitea Project** - Foundation and inspiration
- **Go Community** - Programming language and ecosystem
- **xorm Team** - Excellent Go ORM library
- **The Linux Foundation** - Open source foundation
- **Open Source Community** - Tools, libraries, and inspiration

---

<div align="center">

### 🚀 **Join Us in Building the Future of Self-Hosted Git Services!**

[⭐ Star This Repo](https://github.com/skygenesisenterprise/giteria) • [🐛 Report Issues](https://github.com/skygenesisenterprise/giteria/issues) • [💡 Start a Discussion](https://github.com/skygenesisenterprise/giteria/discussions)

---

**🔧 Comprehensive Model Layer for Modern Git Hosting!**

**Made with ❤️ by the [Sky Genesis Enterprise](https://skygenesisenterprise.com) team**

_Building a powerful self-hosted Git service with comprehensive database models_

</div>