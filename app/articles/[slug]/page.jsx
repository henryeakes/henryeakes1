import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "../../../lib/posts";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function formatContent(content) {
  const blocks = content.split("\n\n").filter(Boolean);

  return blocks.map((block, index) => {
    if (block.startsWith("## ")) {
      return <h2 key={index}>{block.replace("## ", "")}</h2>;
    }

    if (block.startsWith("- ")) {
      const items = block.split("\n").map((item) => item.replace("- ", ""));
      return (
        <ul key={index}>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    return <p key={index}>{block.replace(/\n/g, " ")}</p>;
  });
}

export default async function ArticlePage({ params }) {
  const post = getPostBySlug(params.slug);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <p>
        <Link href="/">Home</Link> / <Link href="/articles">Articles</Link>
      </p>

      <h1>{post.title}</h1>
      <p>{post.date}</p>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          style={{ width: "100%", maxWidth: 900, margin: "20px 0" }}
        />
      )}

      <article>{formatContent(post.content)}</article>
    </main>
  );
}
