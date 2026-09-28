import React from "react";
import "./PostCard.css";

function PostCard({ post }) {
  const formatDate = (date) => {
    if (!date) return "Just now";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className="post-card">
      {post.image && (
        <div className="post-image-container">
          <img
            src={post.image}
            alt={post.caption}
            className="post-image"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}
      <div className="post-content">
        <p className="post-caption">{post.caption}</p>
        {post.createdAt && (
          <time className="post-date">{formatDate(post.createdAt)}</time>
        )}
      </div>
    </article>
  );
}

export default PostCard;
