"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AlertCircle, Briefcase } from "lucide-react";
import { JobCard } from "@/components/JobCard";
import { JobCardSkeleton } from "@/components/JobCardSkeleton";
import { JobsStepHeader } from "@/components/jobs/JobsStepHeader";
import { JobSearchInput } from "@/components/jobs/JobSearchInput";
import { JobsPagination } from "@/components/jobs/JobsPagination";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { getJobsList } from "@/api/jobs";
import type { Candidate, Job, AsyncStatus } from "@/types";

interface JobsStepProps {
  candidate: Candidate;
  onBack: () => void;
}

const PAGE_SIZE = 6;

export function JobsStep({ candidate, onBack }: JobsStepProps) {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<AsyncStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return jobs;
    return jobs.filter((job) => job.title.toLowerCase().includes(query));
  }, [jobs, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredJobs.slice(start, start + PAGE_SIZE);
  }, [filteredJobs, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const fetchJobs = () => {
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

  useEffect(() => {
    fetchJobs();
    // Intentionally run only on mount; fetchJobs captures t() for error fallback
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only fetch
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleRetry = () => {
    setStatus("loading");
    setErrorMessage("");
    fetchJobs();
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-5xl lg:px-8 lg:py-10">
      <JobsStepHeader candidate={candidate} onBack={onBack} />

      <main className="flex flex-col gap-4">
        {status === "loading" && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        )}

        {status === "error" && (
          <ErrorState
            icon={<AlertCircle />}
            message={errorMessage || t("jobsStep.loadError")}
            onRetry={handleRetry}
            retryLabel={t("jobsStep.retry")}
          />
        )}

        {status === "idle" && jobs.length === 0 && (
          <EmptyState
            icon={<Briefcase />}
            message={t("jobsStep.noPositions")}
          />
        )}

        {status === "idle" && jobs.length > 0 && (
          <>
            <JobSearchInput value={searchQuery} onChange={handleSearchChange} />

            {filteredJobs.length === 0 ? (
              <p className="text-sm text-muted-foreground" role="status">
                {searchQuery.trim() ? t("jobsStep.noResults") : null}
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} candidate={candidate} />
                  ))}
                </div>
                <JobsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
