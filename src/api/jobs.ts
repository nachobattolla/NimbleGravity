import { apiGet } from "./client";
import type { Job } from "../types";

export function getJobsList(): Promise<Job[]> {
  return apiGet<Job[]>("/api/jobs/get-list");
}
