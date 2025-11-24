import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PermissionsProvider } from "./contexts/PermissionsContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Register Service Worker manually for PWABuilder compatibility
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // Unregister all old service workers
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      
      // Clear all caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      
      console.log('🧹 Cleared old service workers and caches');
      
      // Register new service worker
      const reg = await navigator.serviceWorker.register('/service-worker.js', {
        updateViaCache: 'none'
      });
      
      console.log('✅ Service Worker registered successfully:', reg.scope);
      
      // Check for updates periodically
      setInterval(() => {
        reg.update();
      }, 60000); // Check every minute
      
      // Handle updates
      if (reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
      
    } catch (err) {
      console.error('❌ Service Worker registration failed:', err);
    }
  });
}

createRoot(rootElement).render(
  <PermissionsProvider>
    <App />
  </PermissionsProvider>
);
