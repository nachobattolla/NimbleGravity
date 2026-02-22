"use client";

import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface JobSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobSearchInput({ value, onChange }: JobSearchInputProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="job-search" className="flex items-center gap-1.5">
        <Search className="size-4" />
        {t("jobsStep.searchLabel")}
      </Label>
      <Input
        id="job-search"
        type="search"
        placeholder={t("jobsStep.searchPlaceholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
