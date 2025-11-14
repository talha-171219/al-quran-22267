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
      injectRegister: "auto",
      includeAssets: ["icon-192.jpg", "icon-512.jpg", "icon-192.png", "icon-512.png", "azan1.mp3", "alarm-clock-short-6402.mp3", "robots.txt"],
      devOptions: {
        enabled: false
      },
      manifest: {
        name: "DeenSphereX - সম্পূর্ণ ইসলামিক অ্যাপ",
        short_name: "DeenSphereX",
        description: "সম্পূর্ণ অফলাইন সক্ষম ইসলামিক অ্যাপ - কুরআন, হাদিস, প্রার্থনা সময়, দুআ এবং আরও অনেক কিছু",
        theme_color: "#0f766e",
        background_color: "#0f766e",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait-primary",
        prefer_related_applications: false,
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icon-192.jpg",
            sizes: "192x192",
            type: "image/jpeg",
            purpose: "any"
          },
          {
            src: "/icon-512.jpg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "any"
          }
        ],
        categories: ["lifestyle", "education", "books", "religion"],
        lang: "bn-BD",
        dir: "ltr",
        shortcuts: [
          {
            name: "কুরআন পড়ুন",
            short_name: "কুরআন",
            description: "কুরআন শরীফ পড়ুন",
            url: "/surahs",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }]
          },
          {
            name: "হাদিস পড়ুন",
            short_name: "হাদিস",
            description: "হাদিস শরীফ পড়ুন",
            url: "/hadith",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }]
          },
          {
            name: "নামাজের সময়",
            short_name: "নামাজ",
            description: "নামাজের সময়সূচী দেখুন",
            url: "/calendar",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }]
          },
          {
            name: "তাসবীহ",
            short_name: "তাসবীহ",
            description: "ডিজিটাল তাসবীহ কাউন্টার",
            url: "/tasbih",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }]
          }
        ]
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
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
