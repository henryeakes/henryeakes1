import PostCard from "./PostCard";

export default function PostList({ posts, heading = "h2" }) {
  if (!posts?.length) return null;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} heading={heading} />
      ))}
    </div>
  );
}
