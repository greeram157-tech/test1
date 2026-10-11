import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Base44 sandbox overrides.
 *
 * When BASE44_PREVIEW_MODE === '1' the app is served through the preview proxy
 * (public HTTPS origin -> internal sandbox host). Two adjustments are needed and
 * they only apply in that mode, so local development keeps Vite's defaults:
 *   1. HMR websocket must target the proxy's public port (443, wss) instead of
 *      the internal dev-server port.
 *   2. The dev server must accept the proxied Host header. The platform injects
 *      `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (Vite >= 6.1 appends it to
 *      `server.allowedHosts`); we additionally allow the sandbox host wildcard
 *      from `BASE44_SANDBOX_HOST_DOMAIN` when it is available.
 * With the flag unset, none of this is applied.
 */
const isPreview = process.env.BASE44_PREVIEW_MODE === '1';
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    ...(isPreview
      ? {
          hmr: { protocol: 'wss' as const, clientPort: 443 },
          ...(sandboxHostDomain
            ? { allowedHosts: ['.' + sandboxHostDomain] }
            : {}),
        }
      : {}),
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
});
