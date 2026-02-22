"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const LANGUAGES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div
      className="fixed right-3 top-3 z-10 flex gap-1 rounded-md border bg-card p-1 shadow-sm sm:right-6 sm:top-6"
      role="group"
      aria-label="Idioma / Language"
    >
      {LANGUAGES.map(({ code, label }) => (
        <Button
          key={code}
          type="button"
          variant={i18n.language === code ? "default" : "ghost"}
          size="sm"
          className="min-w-9"
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
