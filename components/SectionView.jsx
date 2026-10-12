import ComingSoon from "./ComingSoon";
import PostList from "./PostList";

export default function SectionView({ kicker, title, description, posts, empty, children }) {
  return (
    <main className="page">
      <header className="page-header">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="lede">{description}</p> : null}
      </header>
      {children}
      {posts.length > 0 ? <PostList posts={posts} /> : <ComingSoon message={empty} />}
    </main>
  );
}
