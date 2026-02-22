const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = getErrorMessage(data, res.status);
    throw new Error(message);
  }
  return data as T;
}

function getErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["message", "error", "detail"]) {
      const val = obj[key];
      if (typeof val === "string") {
        const base = val;
        const details = getFieldErrorsMessage(obj.details);
        return details ? `${base}: ${details}` : base;
      }
    }
    const details = getFieldErrorsMessage(obj.details);
    if (details) return details;
  }
  return `Error ${status}`;
}

function getFieldErrorsMessage(details: unknown): string | null {
  if (!details || typeof details !== "object") return null;
  const fieldErrors = (details as Record<string, unknown>).fieldErrors;
  if (!fieldErrors || typeof fieldErrors !== "object") return null;
  const parts: string[] = [];
  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (Array.isArray(messages) && messages.length > 0 && typeof messages[0] === "string") {
      parts.push(`${field}: ${messages[0]}`);
    }
  }
  return parts.length > 0 ? parts.join("; ") : null;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = getErrorMessage(data, res.status);
    throw new Error(message);
  }
  return data as T;
}
