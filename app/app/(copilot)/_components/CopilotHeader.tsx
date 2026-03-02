"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Settings, Wifi, WifiOff, ChevronDown, Search, Cpu } from "lucide-react";

type CopilotMode = "repository" | "global" | "ci" | "monitoring";
type ModelId = "gpt-4" | "claude-3" | "gemini-pro" | "local";

interface CopilotHeaderProps {
  mode?: CopilotMode;
  onModeChange?: (mode: CopilotMode) => void;
  isOnline?: boolean;
  selectedModel?: ModelId;
  onModelChange?: (model: ModelId) => void;
}

const modes: { value: CopilotMode; label: string; description: string }[] = [
  { value: "repository", label: "Repository", description: "Current repo context" },
  { value: "global", label: "Global", description: "All repositories" },
  { value: "ci", label: "CI/CD", description: "Pipeline assistance" },
  { value: "monitoring", label: "Monitoring", description: "System metrics" },
];

const models: { id: ModelId; name: string; description: string }[] = [
  { id: "gpt-4", name: "GPT-4", description: "Best overall performance" },
  { id: "claude-3", name: "Claude 3", description: "Excellent reasoning" },
  { id: "gemini-pro", name: "Gemini Pro", description: "Fast & efficient" },
  { id: "local", name: "Local", description: "Offline & private" },
];

export function CopilotHeader({
  mode = "repository",
  onModeChange,
  isOnline = true,
  selectedModel: externalSelectedModel,
  onModelChange,
}: CopilotHeaderProps) {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = React.useState(false);
  const [internalModel, setInternalModel] = React.useState<ModelId>("gpt-4");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const modelDropdownRef = React.useRef<HTMLDivElement>(null);
  const currentMode = modes.find((m) => m.value === mode);
  const selectedModel = externalSelectedModel ?? internalModel;
  const currentModel = models.find((m) => m.id === selectedModel) || models[0];

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node)) {
        setModelDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleModelChange = (modelId: ModelId) => {
    setInternalModel(modelId);
    onModelChange?.(modelId);
    setModelDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-5xl mx-auto gap-4">
        <div className="flex items-center gap-3">
          <Link href="/copilot" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-foreground text-sm leading-tight">
                Giteria Copilot
              </h1>
              <p className="text-xs text-muted-foreground">{currentMode?.label} mode</p>
            </div>
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs font-medium">{currentMode?.label}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 pt-1"
                >
                  <div className="bg-card border border-border rounded-lg shadow-xl w-56 p-1.5">
                    {modes.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => {
                          onModeChange?.(m.value);
                          setOpenDropdown(false);
                        }}
                        className={`w-full flex flex-col items-start gap-0.5 px-3 py-2 rounded-md transition-colors ${
                          mode === m.value
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <span className="text-sm font-medium">{m.label}</span>
                        <span className="text-xs opacity-70">{m.description}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-background border border-border rounded-md px-2 py-1.5 w-48">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>

          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-4 h-4" />
          </button>

          <div className="relative" ref={modelDropdownRef}>
            <button
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-xs text-foreground transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium hidden sm:inline">{currentModel.name}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>

            <AnimatePresence>
              {modelDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
                >
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                    Select Model
                  </div>
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelChange(model.id)}
                      className={`w-full flex flex-col items-start gap-0.5 px-3 py-2 text-sm transition-colors ${
                        selectedModel === model.id
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="font-medium">{model.name}</span>
                      <span className="text-xs opacity-70">{model.description}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              isOnline ? "bg-green-500/10 text-green-500" : "bg-secondary text-muted-foreground"
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3" />
                <span>Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3" />
                <span>Local</span>
              </>
            )}
          </div>

          <Link
            href="/copilot/settings"
            className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
