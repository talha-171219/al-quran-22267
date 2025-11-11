import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon-192.jpg", "icon-512.jpg", "icon-192.png", "icon-512.png", "azan1.mp3", "alarm-clock-short-6402.mp3"],
      manifest: {
        name: "Al-Quran - Islamic Companion",
        short_name: "Al-Quran",
        description: "Complete Islamic companion app with Quran reader, audio recitations, duas, Zakat calculator, and more",
        theme_color: "#0f766e",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "any",
        prefer_related_applications: false,
        icons: [
          {
            src: "/icon-192.jpg",
            sizes: "192x192",
            type: "image/jpeg",
            purpose: "any maskable"
          },
          {
            src: "/icon-512.jpg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "any maskable"
          }
        ],
        categories: ["lifestyle", "education", "books"],
        lang: "bn"
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB limit
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff,woff2,mp3}"],
        // Ensure offline support for navigation requests
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/api/, /^\/auth/],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.alquran\.cloud\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "quran-api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            urlPattern: /^https:\/\/api\.aladhan\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "prayer-times-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 5
            }
          },
          {
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*hadith-api.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "hadith-api-cache",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 90 // 90 days - hadiths never change
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "location-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 5
            }
          },
          {
            urlPattern: /\.mp3$/,
            handler: "CacheFirst",
            options: {
              cacheName: "audio-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 90 // 90 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.pdf$/,
            handler: "CacheFirst",
            options: {
              cacheName: "books-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year - books never change
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: "module"
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
