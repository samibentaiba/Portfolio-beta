// src/contexts/language-context.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the available languages
type Language = "en" | "fr" | "ar";

// Define the shape of the context data
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component to wrap the app
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Check if a language is saved in localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Update language in both state and localStorage
  const setLanguage = (language: Language) => {
    localStorage.setItem("language", language);
    setLanguageState(language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to access the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
