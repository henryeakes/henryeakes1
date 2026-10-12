import Link from "next/link";
import { formatDate } from "../lib/format";

export default function PostCard({ post, heading = "h2" }) {
  const Heading = heading;

  return (
    <article className="card">
      <p className="kicker">{post.category}</p>
      <Heading>
        <Link href={`/articles/${post.slug}`} className="card-link">
          {post.title}
        </Link>
      </Heading>
      {post.excerpt ? <p className="excerpt">{post.excerpt}</p> : null}
      <p className="meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
    </article>
  );
}
