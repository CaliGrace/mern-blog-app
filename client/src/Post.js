import React from "react";
import { Link } from "react-router-dom";

const Post = ({_id, title, summary, cover, author, createdAt }) => {
  return (
    <section className="posts-container">
      <div className="image-container">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt="post-image" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <div>
          <p>
            <span>Author: {author.username}</span>
          </p>
          <p>{createdAt}</p>
        </div>
        <p>{summary}</p>
      </div>
      {console.log(cover)}
    </section>
  );
};

export default Post;
