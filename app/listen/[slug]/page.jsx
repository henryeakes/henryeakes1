import Link from "next/link";
import { notFound } from "next/navigation";
import AudioPlayer from "../../../components/AudioPlayer";
import { formatDate } from "../../../lib/format";
import { renderMarkdown } from "../../../lib/markdown";
import { getAllEpisodeSlugs, getEpisodeBySlug } from "../../../lib/episodes";
import { SITE, pageMeta } from "../../../lib/site";

export function generateStaticParams() {
  return getAllEpisodeSlugs().map((slug) => ({ slug }));
}

function tagLabel(tag) {
  if (tag.toLowerCase() === "nfl") return "NFL";
  return tag.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) return { title: "Episode" };

  const description = episode.description || `Listen to ${episode.title}.`;
  return pageMeta({
    title: episode.title,
    description,
    path: `/listen/${episode.slug}`,
  });
}

export default async function EpisodePage({ params }) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  const notes = episode.content.trim() ? await renderMarkdown(episode.content) : "";

  return (
    <main className="page article-page">
      <article className="article-wrap">
        <header className="article-header">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/listen">Listen</Link>
          </nav>
          <p className="kicker">
            <Link href="/listen">Listen</Link>
          </p>
          <h1>{episode.title}</h1>
          <p className="byline">
            {episode.date ? <time dateTime={episode.date}>{formatDate(episode.date)}</time> : null}
            {episode.tags.length ? (
              <>
                {episode.date ? <span aria-hidden="true"> · </span> : null}
                {episode.tags.map(tagLabel).join(" · ")}
              </>
            ) : null}
            {!episode.date && !episode.tags.length ? SITE.name : null}
          </p>
        </header>
        {episode.description ? <p className="lede">{episode.description}</p> : null}
        <AudioPlayer src={episode.audioSrc} title={episode.title} />
        {notes ? (
          <>
            <h2 className="notes-heading">Show notes</h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: notes }} />
          </>
        ) : null}
      </article>
    </main>
  );
}
