import EpisodeCard from "../../components/EpisodeCard";
import { getAllEpisodes } from "../../lib/episodes";
import { pageMeta } from "../../lib/site";

const description = "Audio from Henry Eakes.";

const meta = pageMeta({
  title: "Listen",
  description,
  path: "/listen",
});

export const metadata = {
  ...meta,
  alternates: {
    ...meta.alternates,
    types: {
      "application/rss+xml": "/listen/feed.xml",
    },
  },
};

export default function ListenPage() {
  const episodes = getAllEpisodes();

  return (
    <main className="page">
      <header className="page-header">
        <p className="kicker">Audio</p>
        <h1>Listen</h1>
        <p className="lede">{description}</p>
      </header>
      <p className="section-note">
        <a className="text-link" href="/listen/feed.xml">
          RSS feed
        </a>
      </p>
      {episodes.length > 0 ? (
        <div className="post-list">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.slug} episode={episode} />
          ))}
        </div>
      ) : (
        <div className="coming">
          <p className="kicker">Coming soon</p>
          <p>Episodes coming soon.</p>
        </div>
      )}
    </main>
  );
}
