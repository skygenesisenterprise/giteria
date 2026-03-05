export interface ReadmeFile {
  content: string;
  repoName: string;
  isPrivate: boolean;
}

const mockReadmes: Record<string, { public?: string; private?: string }> = {
  ".giteria": {
    public: `# Welcome to SkyGenesis Enterprise

We are building the future of developer infrastructure.

## Our Mission

To empower developers with cutting-edge tools and platforms that make software development more efficient and enjoyable.

## What We Do

- Build developer tools and platforms
- Open source contributions
- Cloud infrastructure solutions
- Developer education and advocacy

## Get Involved

Join our community and start contributing!

- Check out our repositories
- Join our discussions
- Attend our events

## Contact

- Website: https://skygenesisenterprise.com
- Twitter: @SkyGEnterprise
- Email: github@skygenesisenterprise.com
`,
  },
  ".github-private": {
    private: `# Internal Documentation

This is the private README for organization members only.

## Internal Projects

- Project Alpha
- Project Beta  
- Internal Tools

## Team Guidelines

Please refer to the internal wiki for team guidelines and best practices.

## Support

For internal support, please contact the IT team.
`,
  },
};

export async function fetchOrganizationReadme(
  orgSlug: string,
  isMember: boolean = true
): Promise<ReadmeFile | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const publicReadme = mockReadmes[".giteria"];
  const privateReadme = mockReadmes[".github-private"];

  if (publicReadme?.public) {
    return {
      content: publicReadme.public,
      repoName: ".giteria",
      isPrivate: false,
    };
  }

  if (isMember && privateReadme?.private) {
    return {
      content: privateReadme.private,
      repoName: ".github-private",
      isPrivate: true,
    };
  }

  return null;
}

export function parseMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#2f81f7] hover:underline">$1</a>')
    .replace(/`(.+?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(.+)$/gm, '<p class="mb-2">$1</p>');
}
