import SearchClient from "../../components/SearchClient";
import { getSearchIndex } from "../../lib/posts";
import { pageMeta } from "../../lib/site";

export const metadata = {
  ...pageMeta({
    title: "Search",
    description: "Search stories on henryeakes.com.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const initialQuery = typeof params?.q === "string" ? params.q : "";

  return <SearchClient posts={getSearchIndex()} initialQuery={initialQuery} />;
}
