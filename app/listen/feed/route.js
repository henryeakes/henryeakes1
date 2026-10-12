import { getAllEpisodes } from "../../../lib/episodes";
import { buildPodcastFeed } from "../../../lib/feed";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET() {
  const xml = buildPodcastFeed(getAllEpisodes());
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
