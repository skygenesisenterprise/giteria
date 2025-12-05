"use client";

import React from "react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = ({ type, message, dismissible = false, onDismiss }: AlertProps) => {
  const baseClasses = "p-4 rounded-md border flex items-center justify-between";
  
  const typeClasses = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div className={cn(baseClasses, typeClasses[type])}>
      <div className="flex items-center">
        <span className="mr-2 text-lg">{icons[type]}</span>
        <span className="text-sm font-medium">{message}</span>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="ml-4 text-sm font-medium hover:opacity-70"
        >
          ✕
        </button>
      )}
    </div>
  );
};

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export { Alert };