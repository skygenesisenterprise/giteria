"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Theme {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
  };
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    foreground: '#111827',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // Charger le thème depuis localStorage au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem('giteria-theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setThemeState(parsedTheme);
      } catch (error) {
        console.error('Error parsing theme from localStorage:', error);
      }
    }
  }, []);

  // Sauvegarder le thème dans localStorage quand il change
  useEffect(() => {
    localStorage.setItem('giteria-theme', JSON.stringify(theme));
    
    // Appliquer les classes CSS au document
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.mode);
    
    // Appliquer les couleurs CSS
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-foreground', theme.colors.foreground);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prevTheme => ({
      ...prevTheme,
      mode: prevTheme.mode === 'light' ? 'dark' : 'light',
    }));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}