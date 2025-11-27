import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PermissionsProvider } from "./contexts/PermissionsContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Handle chunk load errors by reloading the page
const handleChunkLoadError = () => {
  const reload = () => window.location.reload();
  
  // Clear all caches and reload
  if (typeof caches !== 'undefined') {
    caches.keys()
      .then((names) => Promise.all(names.map(name => caches.delete(name))))
      .finally(reload);
  } else {
    reload();
  }
};

// Listen for chunk load failures from service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CHUNK_LOAD_FAILED') {
      console.warn('⚠️ Chunk load failed, reloading app...');
      handleChunkLoadError();
    }
  });
}

// Handle dynamic import errors (when lazy loading fails)
window.addEventListener('error', (event) => {
  // Check if it's a chunk/module loading error
  if (event.message && (
    event.message.includes('Loading chunk') ||
    event.message.includes('Loading module') ||
    event.message.includes('Failed to fetch dynamically imported module') ||
    event.message.includes('MIME type')
  )) {
    console.warn('⚠️ Module load error detected, reloading...');
    event.preventDefault();
    handleChunkLoadError();
  }
});

// Handle unhandled promise rejections for dynamic imports
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  if (reason && (
    (reason.message && reason.message.includes('Failed to fetch dynamically imported module')) ||
    (reason.message && reason.message.includes('Loading chunk')) ||
    (reason.name === 'ChunkLoadError')
  )) {
    console.warn('⚠️ Dynamic import failed, reloading...');
    event.preventDefault();
    handleChunkLoadError();
  }
});

// Register Service Worker for full offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    })
      .then((reg) => {
        console.log('✅ Service Worker registered successfully:', reg.scope);
        
        // Check for updates every 5 minutes
        setInterval(() => {
          reg.update().catch(() => {
            // Silently handle update check failures
          });
        }, 300000);
        
        // Install update when available
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 New version available');
              }
            });
          }
        });
      })
      .catch((err) => {
        // Only log critical registration errors, not state errors
        if (err.name !== 'InvalidStateError') {
          console.error('❌ Service Worker registration failed:', err);
        }
      });
  });
}

createRoot(rootElement).render(
  <PermissionsProvider>
    <App />
  </PermissionsProvider>
);
