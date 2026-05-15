import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatAtomDate(date: Date): string {
  return `${date.toISOString().slice(0, 19)}Z`;
}

export async function GET(_context: APIContext): Promise<Response> {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const updated = posts.length > 0 ? formatAtomDate(posts[0]!.data.pubDate) : formatAtomDate(new Date());

  const entries = posts
    .map((post) => {
      const slug = post.data.customSlug ?? post.id;
      const url = `${SITE.url}/blog/${slug}/`;
      const title = post.data.headline ?? post.data.title;
      return `  <entry>
    <title>${escapeXml(title)}</title>
    <link href="${url}" />
    <id>${url}</id>
    <updated>${formatAtomDate(post.data.updatedDate ?? post.data.pubDate)}</updated>
    <summary>${escapeXml(post.data.description)}</summary>
  </entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE.title)}</title>
  <link href="${SITE.url}/atom.xml" rel="self" />
  <link href="${SITE.url}/" />
  <id>${SITE.url}/</id>
  <updated>${updated}</updated>
  <author>
    <name>${escapeXml(SITE.author)}</name>
    <uri>${SITE.url}/</uri>
  </author>
${entries}
</feed>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
