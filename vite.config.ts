import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Served from the domain root, so assets resolve relative to "/".
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) only accepts manualChunks as a function.
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          // Keep Firebase off the critical path so first paint of the
          // dashboard doesn't wait on ~200 KB of SDK code.
          if (/[\\/]node_modules[\\/]@?firebase[\\/]/.test(id)) return "firebase";
          // React vendor chunk benefits from long-term caching across
          // app updates that don't change the framework version.
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react";
          return undefined;
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
