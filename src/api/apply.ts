import { apiPost } from "./client";
import type { ApplyToJobPayload } from "../types";

interface ApplyResponse {
  ok: boolean;
}

export function applyToJob(payload: ApplyToJobPayload): Promise<ApplyResponse> {
  return apiPost<ApplyResponse>("/api/candidate/apply-to-job", payload);
}
