"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopilotSidebar, type CopilotSession } from "./CopilotSidebar";

interface CopilotLayoutProps {
  children: React.ReactNode;
  onNewConversation?: () => void;
  sessions?: CopilotSession[];
  activeSessionId?: string | null;
  onSessionSelect?: (sessionId: string) => void;
  onSessionDelete?: (sessionId: string) => void;
}

export function CopilotLayout({
  children,
  onNewConversation,
  sessions,
  activeSessionId,
  onSessionSelect,
  onSessionDelete,
}: CopilotLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <CopilotSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewConversation={onNewConversation}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSessionSelect={onSessionSelect}
        onSessionDelete={onSessionDelete}
      />
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
