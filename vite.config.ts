import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/mdb-casa-mare/" : "/",
  plugins: [react()],
  server: { port: 5177, strictPort: true },
  preview: { port: 5177, strictPort: true },
});
