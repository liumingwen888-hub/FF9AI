import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { entrySlug } from '../lib/content';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const items = posts
    .map((post) => {
      const url = new URL(`/blog/${entrySlug(post.id)}/`, site.url).toString();
      return `<item>
        <title>${escapeXml(post.data.title)}</title>
        <description>${escapeXml(post.data.description)}</description>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${post.data.date.toUTCString()}</pubDate>
      </item>`;
    })
    .join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(site.name)}</title>
        <description>${escapeXml(site.description)}</description>
        <link>${site.url}</link>
        ${items}
      </channel>
    </rss>`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
