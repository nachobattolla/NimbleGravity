"use client";

import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function JobsPagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: JobsPaginationProps) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 pt-2"
      aria-label="Pagination"
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="size-4" />
        {t("jobsStep.prev")}
      </Button>
      <span className="text-sm text-muted-foreground">
        {t("jobsStep.pageOf", { current: currentPage, total: totalPages })}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        {t("jobsStep.next")}
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
