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
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      updateViaCache: 'none'
    })
      .then((reg) => {
        console.log('✅ Service Worker registered successfully:', reg.scope);
        
        // Check for updates periodically
        setInterval(() => {
          reg.update();
        }, 60000); // Check every minute
      })
      .catch((err) => {
        console.error('❌ Service Worker registration failed:', err);
      });
  });
}

createRoot(rootElement).render(
  <PermissionsProvider>
    <App />
  </PermissionsProvider>
);
