import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giteria Copilot - AI Developer Assistant",
  description: "Your AI-powered developer assistant for code analysis, debugging, and more.",
};

export default function CopilotLayoutRoot({ children }: { children: React.ReactNode }) {
  return children;
}
