import Link from "next/link";
import { notFound } from "next/navigation";
import PostList from "../../../components/PostList";
import { formatDate, publicSrc } from "../../../lib/format";
import { renderMarkdown } from "../../../lib/markdown";
import { getAllPosts, getAllSlugs, getPostBySlug } from "../../../lib/posts";
import { SITE, sectionForPost } from "../../../lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article" };

  const description = post.excerpt || SITE.description;
  const path = `/articles/${post.slug}`;
  const socialTitle = `${post.title} · ${SITE.name}`;

  return {
    title: post.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      type: "article",
      siteName: SITE.name,
      locale: "en_US",
      publishedTime: post.date || undefined,
      authors: [post.author],
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.xHandle,
      title: socialTitle,
      description,
      images: [SITE.ogImage],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const section = sectionForPost(post);
  const more = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="page article-page">
      <article className="article-wrap">
        <header className="article-header">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/articles">Articles</Link>
          </nav>
          <p className="kicker">
            {section ? <Link href={section.href}>{post.category}</Link> : post.category}
          </p>
          <h1>{post.title}</h1>
          <p className="byline">
            By <Link href="/about">{post.author}</Link>
            {post.date ? (
              <>
                <span aria-hidden="true"> · </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </>
            ) : null}
            <span aria-hidden="true"> · </span>
            {post.readingTime}
          </p>
          {post.coverImage ? (
            <figure className="cover">
              <img src={publicSrc(post.coverImage)} alt="" />
            </figure>
          ) : null}
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      {more.length > 0 ? (
        <section className="block more-stories" aria-labelledby="more-stories">
          <div className="block-heading">
            <h2 id="more-stories">More stories</h2>
          </div>
          <PostList posts={more} heading="h3" />
        </section>
      ) : null}
    </main>
  );
}
