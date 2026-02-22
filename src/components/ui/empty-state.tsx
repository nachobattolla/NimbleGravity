"use client";

import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  message: string;
  className?: string;
}

export function EmptyState({ icon, message, className = "" }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-xl border p-8 text-center ${className}`}
      role="status"
    >
      <div className="text-muted-foreground [&_svg]:size-8">{icon}</div>
      <p className="font-medium text-muted-foreground">{message}</p>
    </div>
  );
}
