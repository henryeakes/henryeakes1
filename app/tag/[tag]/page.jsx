import SectionView from "../../../components/SectionView";
import { getPostsForSection } from "../../../lib/posts";
import { findSection, formatTag, pageMeta } from "../../../lib/site";

export function generateStaticParams() {
  return ["draft", "nfl", "college", "college-football", "franchise", "franchise-rebuilds", "mock-draft"].map(
    (tag) => ({ tag })
  );
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const section = findSection(tag);
  const title = formatTag(tag);
  const description = section?.description || `Stories filed under ${title}.`;

  return pageMeta({
    title,
    description,
    path: section?.href || `/tag/${tag}`,
  });
}

export default async function TagPage({ params }) {
  const { tag } = await params;
  const section = findSection(tag);
  const title = formatTag(tag);
  const posts = getPostsForSection(tag);

  return (
    <SectionView
      kicker="Section"
      title={title}
      description={section?.description || `Stories filed under ${title}.`}
      posts={posts}
      empty={section?.empty || "No stories filed under this topic yet."}
    />
  );
}
