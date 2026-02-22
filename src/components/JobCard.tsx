"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, CheckCircle2, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
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

/** Client view: card with real data (title, repo input, submit). Shown when jobs have loaded; JobCardSkeleton is used while loading. */
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
        applicationId: candidate.applicationId,
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

  const fieldId = `repo-${job.id}`;
  const successContent = isSuccess ? (
    <>
      <CheckCircle2 className="size-4" />
      {t("jobCard.successMessage")}
    </>
  ) : undefined;

  return (
    <Card className="min-w-0">
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
          <FormField
            id={fieldId}
            label={
              <>
                <LinkIcon className="size-3.5" />
                {t("jobCard.repoLabel")}
              </>
            }
            error={status === "error" ? errorMessage : undefined}
            success={successContent}
            errorId={`repo-error-${job.id}`}
            successId={`repo-success-${job.id}`}
          >
            <Input
              id={fieldId}
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
          </FormField>
          <Button
            type="submit"
            disabled={isDisabled}
            size="default"
            className="w-full sm:w-auto sm:self-start"
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
