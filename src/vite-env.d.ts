/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional endpoint for contact / inquiry form submission. */
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Optional Supabase project URL when a backend is configured. */
  readonly VITE_SUPABASE_URL?: string;
  /** Optional Supabase anon key when a backend is configured. */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
