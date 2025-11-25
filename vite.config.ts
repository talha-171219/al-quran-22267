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
      injectRegister: false, // Manual registration in main.tsx
      strategies: "injectManifest",
      srcDir: "public",
      filename: "service-worker.js",
      includeAssets: ["icon-192.jpg", "icon-512.jpg", "icon-192.png", "icon-512.png", "azan1.mp3", "alarm-clock-short-6402.mp3", "robots.txt"],
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff,woff2}", "*.mp3"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      manifest: {
        name: "DeenSphereX - সম্পূর্ণ ইসলামিক অ্যাপ",
        short_name: "DeenSphereX",
        description: "সম্পূর্ণ অফলাইন সক্ষম ইসলামিক অ্যাপ - কুরআন, হাদিস, প্রার্থনা সময়, দুআ এবং আরও অনেক কিছু",
        theme_color: "#0f766e",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait-primary",
        id: "deenspherex-islamic-app",
        prefer_related_applications: false,
        display_override: ["standalone", "fullscreen"],
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
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
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
