import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const latestPost = posts[0];

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <h1>Henry Eakes</h1>
      <p>College & NFL Football</p>

      <h2>Latest Article</h2>

      {latestPost ? (
        <article style={{ marginBottom: 40 }}>
          <h3>
            <Link href={`/articles/${latestPost.slug}`}>{latestPost.title}</Link>
          </h3>
          <p>{latestPost.date}</p>
          <p>{latestPost.excerpt}</p>
        </article>
      ) : (
        <p>No articles yet.</p>
      )}

      <h2>All Articles</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: 12 }}>
            <Link href={`/articles/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
