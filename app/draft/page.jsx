import Link from "next/link";
import SectionView from "../../components/SectionView";
import { getPostsForSection } from "../../lib/posts";
import { pageMeta, SECTIONS } from "../../lib/site";

const section = SECTIONS.find((item) => item.slug === "draft");

export const metadata = pageMeta({
  title: section.title,
  description: section.description,
  path: section.href,
});

export default function DraftPage() {
  const posts = getPostsForSection(section.slug);

  return (
    <SectionView
      kicker="NFL Draft"
      title="Mock Drafts"
      description={section.description}
      posts={posts}
      empty={section.empty}
    >
      <p className="section-note">
        <Link className="text-link" href="/draft/big-board">
          Big Board
        </Link>
      </p>
    </SectionView>
  );
}
