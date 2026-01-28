import { getAllSlugs, getPostBySlug } from "../../../lib/posts";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function pretty(tag) {
  if (tag === "college") return "College";
  if (tag === "nfl") return "NFL";
  return "Draft";
}

export default async function ArticlePage({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <main>
      <article className="article">
        <h1>{post.title}</h1>
        <div className="meta" style={{ marginTop: 10 }}>
          <span>{post.date}</span>
          <span>•</span>
          <a className="badge" href={`/tag/${post.tag}`}>{pretty(post.tag)}</a>
        </div>

        <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  );
}
