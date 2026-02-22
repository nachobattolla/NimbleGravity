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
      if (typeof val === "string") return val;
    }
  }
  return `Error ${status}`;
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
