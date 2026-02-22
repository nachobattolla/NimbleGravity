import { apiGet } from "./client";
import type { Candidate } from "../types";

export function getCandidateByEmail(email: string): Promise<Candidate> {
  const params = new URLSearchParams({ email });
  return apiGet<Candidate>(`/api/candidate/get-by-email?${params}`);
}
