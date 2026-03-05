// src/components/PostCard.tsx
import React from "react";
import "../design/PostCard.css";

export interface PostCardProps {
  title: string;
  body: string;
  user_id: string;
  createdAt: string; // sau Date in functie de ce primesti
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  body,
  user_id,
  createdAt,
}) => {
  const date = new Date(createdAt);

  return (
    <article className="post-card">
      <header className="post-card-header">
        <h2 className="post-card-title">{title}</h2>
      </header>

      <p className="post-card-body">{body}</p>

      <footer className="post-card-footer">
        <span className="post-card-username">@{user_id}</span>
        <span className="post-card-date">
          {date.toLocaleString("ro-RO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </footer>
    </article>
  );
};

export default PostCard;
