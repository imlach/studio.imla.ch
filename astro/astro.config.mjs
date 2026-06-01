// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Custom domain (CNAME → studio.imla.ch). Its own root domain, not a
// /studio subpath under imla.ch, so base stays "/".
export default defineConfig({
  site: "https://studio.imla.ch",
  integrations: [mdx(), sitemap()],
});
