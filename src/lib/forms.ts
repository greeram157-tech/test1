/**
 * Lightweight form submission helper.
 *
 * Forms are wired to a real backend only when `VITE_CONTACT_ENDPOINT` is set
 * (e.g. a Supabase Edge Function or any HTTPS endpoint accepting JSON POST).
 * When it is not configured we never report a false success — callers surface
 * the `not-configured` state and offer a direct contact fallback instead.
 */
const endpoint: string | undefined = import.meta.env.VITE_CONTACT_ENDPOINT;

export const isFormBackendConfigured = Boolean(endpoint);

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'error' };

export async function submitForm(
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  if (!endpoint) return { ok: false, reason: 'not-configured' };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.ok ? { ok: true } : { ok: false, reason: 'error' };
  } catch {
    return { ok: false, reason: 'error' };
  }
}
