import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PermissionsProvider } from "./contexts/PermissionsContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// VitePWA auto-registers service worker - no manual registration needed
// The service worker handles offline caching automatically

createRoot(rootElement).render(
  <PermissionsProvider>
    <App />
  </PermissionsProvider>
);
