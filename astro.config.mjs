import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const excludedSitemapPaths = ["/cv/", "/publications/", "/selected-work/", "/artifacts/", "/students/", "/talks/"];

// https://astro.build/config
export default defineConfig({
  site: "https://yannistevissen.fr",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !excludedSitemapPaths.some((path) => page.includes(path)),
    }),
  ],
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
