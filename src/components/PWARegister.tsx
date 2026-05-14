import { useEffect } from "react";

/**
 * Registers the PWA service worker.
 * - Disabled in dev (Vite HMR conflicts).
 * - Disabled inside iframes (Lovable preview).
 * - Disabled on Lovable preview hosts.
 * Active only on the production / published deployment.
 */
export function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const isDev = import.meta.env.DEV;
    const inIframe = (() => {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    })();
    const host = window.location.hostname;
    const isPreviewHost =
      host.includes("id-preview--") ||
      host.includes("lovableproject.com") ||
      host.includes("-dev.lovable.app");

    if (isDev || inIframe || isPreviewHost) {
      // Cleanup any previously registered SW in non-prod contexts
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
      return;
    }

    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        /* no-op */
      });
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
  }, []);

  return null;
}
