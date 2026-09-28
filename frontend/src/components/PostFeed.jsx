import React from "react";
import "./PostFeed.css";
import PostCard from "./PostCard";

function PostFeed({ posts, loading }) {
  if (posts.length === 0 && !loading) {
    return (
      <div className="empty-state">
        <div className="empty-icon">∘</div>
        <h3>No posts yet</h3>
        <p>Create your first post to get started</p>
      </div>
    );
  }

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostFeed;
