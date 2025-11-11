import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PermissionsProvider } from "./contexts/PermissionsContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Register service worker for offline capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('✅ Service Worker registered successfully:', registration.scope);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 1000 * 60 * 60); // Check every hour
      })
      .catch(error => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
}

createRoot(rootElement).render(
  <PermissionsProvider>
    <App />
  </PermissionsProvider>
);
