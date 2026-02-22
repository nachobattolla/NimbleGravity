"use client";

import { useTranslation } from "react-i18next";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Candidate } from "@/types";

interface JobsStepHeaderProps {
  candidate: Candidate;
  onBack: () => void;
}

export function JobsStepHeader({ candidate, onBack }: JobsStepHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="mb-8 flex flex-col gap-1">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 self-start text-muted-foreground"
        onClick={onBack}
      >
        <ArrowLeft className="size-4" />
        {t("jobsStep.back")}
      </Button>
      <p className="text-sm font-medium text-muted-foreground">
        {t("common.brand")}
      </p>
      <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
        {t("jobsStep.greeting", {
          name: `${candidate.firstName} ${candidate.lastName}`,
        })}
      </h1>
      <div className="mt-1 flex items-center gap-2">
        <Briefcase className="size-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-muted-foreground">
          {t("jobsStep.openPositions")}
        </h2>
      </div>
    </header>
  );
}
