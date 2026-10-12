import SectionView from "../../components/SectionView";
import { getPostsForSection } from "../../lib/posts";
import { pageMeta, SECTIONS } from "../../lib/site";

const section = SECTIONS.find((item) => item.slug === "college-football");

export const metadata = pageMeta({
  title: section.title,
  description: section.description,
  path: section.href,
});

export default function CollegeFootballPage() {
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
