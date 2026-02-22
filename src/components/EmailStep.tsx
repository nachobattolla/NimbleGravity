import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCandidateByEmail } from "@/api/candidate";
import type { Candidate } from "@/types";
import type { AsyncStatus } from "@/types";

interface EmailStepProps {
  onSubmit: (candidate: Candidate) => void;
}

export function EmailStep({ onSubmit }: EmailStepProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setStatus("error");
      setErrorMessage(t("emailStep.errorRequired"));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage(t("emailStep.errorInvalid"));
      return;
    }

    setStatus("loading");

    try {
      const candidate = await getCandidateByEmail(email.trim());
      onSubmit(candidate);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : t("emailStep.errorFetch")
      );
    }
  };

  const isLoading = status === "loading";

  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary">
            <Mail className="size-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-balance">
            {t("emailStep.title")}
          </CardTitle>
          <CardDescription className="text-pretty">
            {t("emailStep.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("emailStep.emailLabel")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("emailStep.placeholder")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorMessage("");
                  }
                }}
                disabled={isLoading}
                aria-invalid={status === "error"}
                aria-describedby={
                  status === "error" ? "email-error" : undefined
                }
              />
              {status === "error" && errorMessage && (
                <p
                  id="email-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t("emailStep.loading")}
                </>
              ) : (
                t("emailStep.continue")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
