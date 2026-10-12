import Link from "next/link";
import BigBoardList from "../../../components/BigBoardList";
import ComingSoon from "../../../components/ComingSoon";
import { getBigBoard } from "../../../lib/board";
import { getPostsForSection } from "../../../lib/posts";
import { pageMeta } from "../../../lib/site";

export const metadata = pageMeta({
  title: "Big Board",
  description: "Henry Eakes' NFL Draft big board.",
  path: "/draft/big-board",
});

export default function BigBoardPage() {
  const rows = getBigBoard();
  const latestMock = getPostsForSection("draft")[0];

  return (
    <main className="page">
      <header className="page-header">
        <p className="kicker">NFL Draft</p>
        <h1>Big Board</h1>
        <p className="lede">A running ranking of draft prospects.</p>
      </header>

      {rows.length > 0 ? (
        <div className="board">
          <div className="board-head" aria-hidden="true">
            <span>Rank</span>
            <span>Prospect</span>
            <span>Note</span>
          </div>
          <BigBoardList rows={rows} />
        </div>
      ) : (
        <ComingSoon message="No prospects are ranked yet." />
      )}

      {latestMock ? (
        <p className="section-note">
          <Link className="text-link" href={`/articles/${latestMock.slug}`}>
            Read the latest mock draft
          </Link>
        </p>
      ) : null}
    </main>
  );
}
