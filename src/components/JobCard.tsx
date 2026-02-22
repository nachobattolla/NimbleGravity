import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, CheckCircle2, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { applyToJob } from "@/api/apply";
import type { Job, Candidate, AsyncStatus } from "@/types";

interface JobCardProps {
  job: Job;
  candidate: Candidate;
}

export function JobCard({ job, candidate }: JobCardProps) {
  const { t } = useTranslation();
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!repoUrl.trim()) {
      setStatus("error");
      setErrorMessage(t("jobCard.errorRequired"));
      return;
    }

    if (!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+/.test(repoUrl.trim())) {
      setStatus("error");
      setErrorMessage(t("jobCard.errorInvalidUrl"));
      return;
    }

    setStatus("loading");

    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl.trim(),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : t("jobCard.errorSend")
      );
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isDisabled = isLoading || isSuccess;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            NG
          </span>
          {job.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`repo-${job.id}`}>
              <LinkIcon className="size-3.5" />
              {t("jobCard.repoLabel")}
            </Label>
            <Input
              id={`repo-${job.id}`}
              type="url"
              placeholder={t("jobCard.repoPlaceholder")}
              value={repoUrl}
              onChange={(e) => {
                setRepoUrl(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              disabled={isDisabled}
              aria-invalid={status === "error"}
              aria-describedby={
                status === "error"
                  ? `repo-error-${job.id}`
                  : status === "success"
                    ? `repo-success-${job.id}`
                    : undefined
              }
            />
            {status === "error" && errorMessage && (
              <p
                id={`repo-error-${job.id}`}
                className="text-sm text-destructive"
                role="alert"
              >
                {errorMessage}
              </p>
            )}
            {isSuccess && (
              <p
                id={`repo-success-${job.id}`}
                className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                role="status"
              >
                <CheckCircle2 className="size-4" />
                {t("jobCard.successMessage")}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isDisabled}
            size="default"
            className="self-start"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("jobCard.sending")}
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="size-4" />
                {t("jobCard.sent")}
              </>
            ) : (
              t("jobCard.submit")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
