import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "apple-touch-icon.png",
        "android-chrome-192x192.png",
        "android-chrome-512x512.png",
        "maskable_icon.png",
      ],
      workbox: {
        maximumFileSizeToCacheInBytes: 5700000,
      },
      manifest: {
        name: "Archipel",
        short_name: "Archipel",
        description: "Citoyens des micronations & nations virtuelles",
        categories: [
          "social",
          "lifestyle",
          "community",
          "game",
          "entertainment",
        ],
        lang: "fr",
        icons: [
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/maskable_icon.png",
            sizes: "347x347",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#fff",
        background_color: "#081825",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
    }),
  ],
});
