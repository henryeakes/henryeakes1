import { absoluteAudioUrl } from "./episodes";
import { SITE } from "./site";

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(value) {
  if (!value) return "";
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toUTCString();
}

export function buildPodcastFeed(episodes) {
  const link = `${SITE.url}/listen`;
  const self = `${SITE.url}/listen/feed.xml`;
  const image = `${SITE.url}/icon.png`;
  const description =
    "Audio from Henry Eakes on college football and the NFL.";

  const items = episodes
    .map((episode) => {
      const page = `${SITE.url}/listen/${episode.slug}`;
      const published = rfc822(episode.date);
      const summary = episode.description || episode.title;
      const audio = absoluteAudioUrl(episode.audio);
      const enclosure = audio
        ? `<enclosure url="${xmlEscape(audio)}" length="${Number(episode.bytes) || 0}" type="${xmlEscape(episode.mime || "audio/mpeg")}"/>`
        : "";

      return `<item>
      <title>${xmlEscape(episode.title)}</title>
      <link>${xmlEscape(page)}</link>
      <guid isPermaLink="true">${xmlEscape(page)}</guid>
      <description>${xmlEscape(summary)}</description>
      <itunes:summary>${xmlEscape(summary)}</itunes:summary>
      <itunes:author>${xmlEscape(SITE.name)}</itunes:author>
      ${published ? `<pubDate>${xmlEscape(published)}</pubDate>` : ""}
      ${enclosure}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE.name)}</title>
    <link>${xmlEscape(link)}</link>
    <description>${xmlEscape(description)}</description>
    <language>en-us</language>
    <atom:link href="${xmlEscape(self)}" rel="self" type="application/rss+xml"/>
    <itunes:author>${xmlEscape(SITE.name)}</itunes:author>
    <itunes:summary>${xmlEscape(description)}</itunes:summary>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:owner>
      <itunes:name>${xmlEscape(SITE.name)}</itunes:name>
      <itunes:email>${xmlEscape(SITE.email)}</itunes:email>
    </itunes:owner>
    <itunes:image href="${xmlEscape(image)}"/>
    <itunes:category text="Sports"/>
    <image>
      <url>${xmlEscape(image)}</url>
      <title>${xmlEscape(SITE.name)}</title>
      <link>${xmlEscape(link)}</link>
    </image>
    ${items}
  </channel>
</rss>
`;
}
