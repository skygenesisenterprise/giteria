"use client";

import * as React from "react";
import { CopilotLayout } from "../_components/CopilotLayout";
import { CopilotHeader } from "../_components/CopilotHeader";
import { CopilotMessageList } from "../_components/CopilotMessageList";
import { CopilotInput } from "../_components/CopilotInput";
import type { CopilotSession } from "../_components/CopilotSidebar";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  isLoading?: boolean;
  error?: string;
}

const initialSessions: CopilotSession[] = [
  {
    id: "new",
    title: "New conversation",
    preview: "Start a new conversation",
    date: "Now",
    messages: [],
  },
  {
    id: "1",
    title: "Analyze repository structure",
    preview: "Help me understand the codebase...",
    date: "2h ago",
    messages: [
      {
        id: "1-1",
        role: "user",
        content: "Analyze the codebase structure and provide insights",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: "1-2",
        role: "assistant",
        content: `Here's a comprehensive analysis of the repository structure:

**Key Findings:**
- **Main technologies**: TypeScript, React, Next.js
- **Architecture**: Monorepo with clear separation of concerns
- **Code quality**: Good test coverage (~75%), ESLint configured

**Recommendations:**
1. Consider splitting the API layer into separate microservices
2. Add more integration tests for critical paths
3. Implement error boundaries for better error handling`,
        timestamp: new Date(Date.now() - 7200000),
      },
    ],
  },
  {
    id: "2",
    title: "Debug authentication issue",
    preview: "Getting 401 errors on...",
    date: "1d ago",
    messages: [
      {
        id: "2-1",
        role: "user",
        content: "Help me debug authentication issue",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "2-2",
        role: "assistant",
        content: `I found 3 potential issues in the codebase:

1. **Memory leak in WebSocket handler** (high priority)
   - Location: \`src/lib/websocket.ts:45\`
   - Missing cleanup of event listeners

2. **Race condition in auth** (medium priority)
   - Location: \`src/middleware/auth.ts:78\`
   - Token refresh not properly synchronized

3. **Missing null check** (low priority)
   - Location: \`src/components/UserProfile.tsx:23\`
   - Potential undefined access on user object`,
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
  },
  {
    id: "3",
    title: "Generate API documentation",
    preview: "Create OpenAPI spec for...",
    date: "3d ago",
    messages: [],
  },
];

const simulatedResponses: Record<string, string> = {
  analyze: `Here's a comprehensive analysis of the repository structure:

**Key Findings:**
- **Main technologies**: TypeScript, React, Next.js
- **Architecture**: Monorepo with clear separation of concerns
- **Code quality**: Good test coverage (~75%), ESLint configured

**Recommendations:**
1. Consider splitting the API layer into separate microservices
2. Add more integration tests for critical paths
3. Implement error boundaries for better error handling

Would you like me to dive deeper into any specific area?`,

  bugs: `I found 3 potential issues in the codebase:

1. **Memory leak in WebSocket handler** (high priority)
   - Location: \`src/lib/websocket.ts:45\`
   - Missing cleanup of event listeners

2. **Race condition in auth** (medium priority)
   - Location: \`src/middleware/auth.ts:78\`
   - Token refresh not properly synchronized

3. **Missing null check** (low priority)
   - Location: \`src/components/UserProfile.tsx:23\`
   - Potential undefined access on user object

Would you like me to provide more details on any of these?`,

  "generate unit tests": `Here's a test suite I generated for your code:

\`\`\`typescript
import { describe, it, expect, vi } from 'vitest';

describe('UserService', () => {
  it('should create a user', async () => {
    const mockUser = { id: '1', name: 'Test User' };
    // Test implementation
    expect(mockUser.id).toBe('1');
  });

  it('should fetch user by id', async () => {
    // Test implementation
    expect(true).toBe(true);
  });
});
\`\`\`

Would you like me to generate tests for a specific file?`,

  "suggest improvements": `Here are some refactoring suggestions:

**1. Extract repeated logic into hooks**
\`\`\`typescript
// Before
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);

// After - custom hook
const { loading, data, fetchData } = useFetch();
\`\`\`

**2. Use composition over inheritance**
- Prefer functional composition over class inheritance

**3. Memoize expensive computations**
\`\`\`typescript
const expensiveValue = useMemo(() => 
  computeExpensiveValue(a, b), 
  [a, b]
);
\`\`\`

Would you like me to refactor a specific file?`,
};

export default function CopilotPage() {
  const [sessions, setSessions] = React.useState<CopilotSession[]>(initialSessions);
  const [activeSessionId, setActiveSessionId] = React.useState<string | null>("new");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [mode, setMode] = React.useState<"repository" | "global" | "ci" | "monitoring">(
    "repository"
  );
  const [selectedModel, setSelectedModel] = React.useState<
    "gpt-4" | "claude-3" | "gemini-pro" | "local"
  >("gpt-4");

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  React.useEffect(() => {
    if (activeSession?.messages) {
      setMessages(activeSession.messages);
    } else {
      setMessages([]);
    }
  }, [activeSessionId]);

  const handleSessionSelect = (sessionId: string) => {
    if (sessionId === "new") {
      setMessages([]);
    }
    setActiveSessionId(sessionId);
  };

  const handleSessionDelete = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId("new");
      setMessages([]);
    }
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleNewConversation = () => {
    setActiveSessionId("new");
    setMessages([]);
    setIsLoading(false);
  };

  const handleSendMessage = async (content: string, files?: File[]) => {
    let fileInfo = "";
    if (files && files.length > 0) {
      fileInfo = `\n\n📎 Attached files:\n${files.map((f) => `- ${f.name} (${f.type || "unknown type"})`).join("\n")}`;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content + fileInfo,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    let responseContent =
      simulatedResponses[content.toLowerCase().split(" ")[0]] ||
      `I understand you're asking about "${content}". 

As your AI developer assistant, I can help you with:

• **Code analysis** - Understand structure and identify patterns
• **Bug detection** - Find potential issues in your code
• **Code generation** - Write tests, components, or utilities
• **Documentation** - Generate docs from code
• **Refactoring** - Suggest improvements

What would you like me to help you with?`;

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    if (activeSessionId && activeSessionId !== "new") {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...(s.messages || []), userMessage, assistantMessage] }
            : s
        )
      );
    } else if (activeSessionId === "new" && messages.length > 0) {
      const newSession: CopilotSession = {
        id: Date.now().toString(),
        title: userMessage.content.slice(0, 30) + (userMessage.content.length > 30 ? "..." : ""),
        preview: userMessage.content,
        date: "Just now",
        messages: [userMessage, assistantMessage],
      };
      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
    }

    setIsLoading(false);
  };

  return (
    <CopilotLayout
      onNewConversation={handleNewConversation}
      sessions={sessions}
      activeSessionId={activeSessionId}
      onSessionSelect={handleSessionSelect}
    >
      <CopilotHeader
        mode={mode}
        onModeChange={(newMode) => setMode(newMode)}
        isOnline={true}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
      <CopilotMessageList
        messages={messages}
        isLoading={isLoading}
        onQuickAction={handleQuickAction}
      />
      <CopilotInput onSend={handleSendMessage} isLoading={isLoading} />
    </CopilotLayout>
  );
}
