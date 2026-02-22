import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AlertCircle, Briefcase, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { JobCard } from "@/components/JobCard";
import { getJobsList } from "@/api/jobs";
import type { Candidate, Job, AsyncStatus } from "@/types";

interface JobsStepProps {
  candidate: Candidate;
  onBack: () => void;
}

export function JobsStep({ candidate, onBack }: JobsStepProps) {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<AsyncStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return jobs;
    return jobs.filter((job) => job.title.toLowerCase().includes(query));
  }, [jobs, searchQuery]);

  useEffect(() => {
    getJobsList()
      .then((list) => {
        setJobs(list);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : t("jobsStep.loadError")
        );
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
  }, []);

  const retry = () => {
    setStatus("loading");
    setErrorMessage("");
    getJobsList()
      .then((list) => {
        setJobs(list);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : t("jobsStep.loadError")
        );
      });
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 md:py-12">
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
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
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

      <main className="flex flex-col gap-4">
        {status === "loading" && (
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-xl border p-6"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="size-8 rounded-md" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <Skeleton className="h-9 w-36" />
              </div>
            ))}
          </>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <AlertCircle className="size-8 text-destructive" />
            <p className="font-medium text-destructive">
              {errorMessage || t("jobsStep.loadError")}
            </p>
            <Button variant="outline" size="sm" onClick={retry}>
              {t("jobsStep.retry")}
            </Button>
          </div>
        )}

        {status === "idle" && jobs.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-xl border p-8 text-center">
            <Briefcase className="size-8 text-muted-foreground" />
            <p className="font-medium text-muted-foreground">
              {t("jobsStep.noPositions")}
            </p>
          </div>
        )}

        {status === "idle" && jobs.length > 0 && (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="job-search" className="flex items-center gap-1.5">
                <Search className="size-4" />
                {t("jobsStep.searchLabel")}
              </Label>
              <Input
                id="job-search"
                type="search"
                placeholder={t("jobsStep.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredJobs.length === 0 ? (
              <p className="text-sm text-muted-foreground" role="status">
                {searchQuery.trim() ? t("jobsStep.noResults") : null}
              </p>
            ) : (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} candidate={candidate} />
              ))
            )}
          </>
        )}
      </main>
    </div>
  );
}
