import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Azure Static Web Apps serves the app at the domain root, so assets
  // resolve relative to "/". (Previously "/CxEEMEAStepTracker/" for GH Pages.)
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep Firebase off the critical path so first paint of the
          // dashboard doesn't wait on ~200 KB of SDK code.
          firebase: [
            "firebase/app",
            "firebase/auth",
            "firebase/firestore",
          ],
          // React vendor chunk benefits from long-term caching across
          // app updates that don't change the framework version.
          react: ["react", "react-dom"],
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
  },
});
