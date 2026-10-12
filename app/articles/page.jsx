import SectionView from "../../components/SectionView";
import { getAllPosts } from "../../lib/posts";
import { pageMeta } from "../../lib/site";

export const metadata = pageMeta({
  title: "Articles",
  description: "All stories published by Henry Eakes.",
  path: "/articles",
});

export default function ArticlesPage() {
  const posts = getAllPosts();

  return (
    <SectionView
      kicker="Archive"
      title="Articles"
      description="All stories published on the site."
      posts={posts}
      empty="No stories published yet."
    />
  );
}
