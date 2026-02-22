"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  icon?: ReactNode;
  message: string;
  onRetry?: () => void;
  retryLabel: string;
  className?: string;
}

export function ErrorState({
  icon,
  message,
  onRetry,
  retryLabel,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center ${className}`}
      role="alert"
    >
      {icon && (
        <div className="text-destructive [&_svg]:size-8">{icon}</div>
      )}
      <p className="font-medium text-destructive">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
