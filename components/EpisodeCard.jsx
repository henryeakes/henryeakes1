import Link from "next/link";
import { formatDate } from "../lib/format";

function kickerFor(episode) {
  const tag = episode.tags?.[0];
  if (!tag) return "Episode";
  if (tag.toLowerCase() === "nfl") return "NFL";
  return tag.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function EpisodeCard({ episode }) {
  return (
    <article className="card">
      <p className="kicker">{kickerFor(episode)}</p>
      <h2>
        <Link href={`/listen/${episode.slug}`} className="card-link">
          {episode.title}
        </Link>
      </h2>
      {episode.description ? <p className="excerpt">{episode.description}</p> : null}
      <p className="meta">
        {episode.date ? <time dateTime={episode.date}>{formatDate(episode.date)}</time> : "Episode"}
      </p>
    </article>
  );
}
