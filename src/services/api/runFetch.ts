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
      throw {
        status: res.status,
        message:
          typeof body === "string" ? body : body?.message || res.statusText,
        details: body ?? null,
      };
    }

    return body as T;
  } catch (err) {
    throw err;
  }
}
