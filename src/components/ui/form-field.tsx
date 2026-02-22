"use client";

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: ReactNode;
  error?: string;
  success?: ReactNode;
  errorId?: string;
  successId?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  error,
  success,
  errorId,
  successId,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p
          id={errorId ?? `${id}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
      {success && (
        <p
          id={successId ?? `${id}-success`}
          className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
          role="status"
        >
          {success}
        </p>
      )}
    </div>
  );
}
