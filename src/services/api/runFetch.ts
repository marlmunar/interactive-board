export class FetchError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function runFetch<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  try {
    const res = await fetch(url, options);

    let body;
    try {
      body = await res.json();
    } catch (_) {
      body = await res.text().catch(() => null);
    }

    if (!res.ok) {
      throw new FetchError(
        res.status,
        typeof body === "string" ? body : body?.message || res.statusText
      );
    }

    return body as T;
  } catch (err) {
    throw err;
  }
}
