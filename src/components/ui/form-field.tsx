"use client";

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

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
        <Alert
          id={errorId ?? `${id}-error`}
          variant="error"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          id={successId ?? `${id}-success`}
          variant="success"
          className="flex items-center gap-1.5"
        >
          {success}
        </Alert>
      )}
    </div>
  );
}
