// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const site =
  (process.env.PUBLIC_SITE_URL && process.env.PUBLIC_SITE_URL.trim()) ||
  "https://paiz.dev";
let base =
  (process.env.PUBLIC_BASE_PATH && process.env.PUBLIC_BASE_PATH.trim()) || "/";
if (!base.endsWith("/")) base += "/";
if (!base.startsWith("/")) base = `/${base}`;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
