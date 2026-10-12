import SectionView from "../../components/SectionView";
import { getPostsForSection } from "../../lib/posts";
import { pageMeta, SECTIONS } from "../../lib/site";

const section = SECTIONS.find((item) => item.slug === "franchise-rebuilds");

export const metadata = pageMeta({
  title: section.title,
  description: section.description,
  path: section.href,
});

export default function FranchiseRebuildsPage() {
  return (
    <SectionView
      kicker="Section"
      title={section.title}
      description={section.description}
      posts={getPostsForSection(section.slug)}
      empty={section.empty}
    />
  );
}
