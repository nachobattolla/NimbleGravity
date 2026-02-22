"use client";

import type { HTMLAttributes } from "react";

type AlertVariant = "error" | "success";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export function Alert({
  variant = "error",
  className = "",
  children,
  ...props
}: AlertProps) {
  const styles =
    variant === "error"
      ? "text-destructive"
      : "text-emerald-600 dark:text-emerald-400";
  return (
    <div
      className={`text-sm font-medium ${styles} ${className}`}
      role={variant === "error" ? "alert" : "status"}
      {...props}
    >
      {children}
    </div>
  );
}

interface AlertWithIconProps extends AlertProps {
  icon: React.ReactNode;
}

export function AlertWithIcon({
  variant = "error",
  icon,
  className = "",
  children,
  ...props
}: AlertWithIconProps) {
  const styles =
    variant === "error"
      ? "text-destructive"
      : "text-emerald-600 dark:text-emerald-400";
  return (
    <div
      className={`flex items-center gap-1.5 ${styles} ${className}`}
      role={variant === "error" ? "alert" : "status"}
      {...props}
    >
      {icon}
      {children}
    </div>
  );
}
