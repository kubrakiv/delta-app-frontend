import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
    envCompatible(),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
  },
});
