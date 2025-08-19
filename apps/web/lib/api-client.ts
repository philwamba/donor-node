/**
 * Simple helper to fetch JSON responses from an API.
 *
 * Throws an error if the response status is not ok.
 */
export async function fetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}