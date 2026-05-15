import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    /** Headline shown on the post page (often longer than the listing title). */
    headline: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Section value used for `article:section` OpenGraph tag. */
    section: z.string().optional(),
    /** Image used for the listing thumbnail (square). */
    listingImage: z.string().optional(),
    listingImageAlt: z.string().optional(),
    /** Image used for OpenGraph / Twitter card. Defaults to listingImage if not set. */
    ogImage: z.string().optional(),
    /** Custom blurb on the listing page; defaults to description. */
    listingBlurb: z.string().optional(),
    /** Optional custom URL slug; otherwise the file path is used. */
    customSlug: z.string().optional(),
    keywords: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
