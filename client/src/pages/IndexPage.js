import React, { useEffect, useState } from "react";
import Post from "../Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/post", {credentials: 'include'});
      const posts = await response.json();

      setPosts(posts);
      // setLoggedInUser(posts.author.username);
      console.log(posts);
    };
    fetchData();
  }, []);
  return (
    <>
      <header className="hero-section">
        <div className="hero-section__content">
          <h1>My Blog App</h1>
          <h2>Share your thoughts with the world</h2>
          {loggedInUser && <h4>Dear {loggedInUser}, Welcome to your blog</h4>}
          {!loggedInUser && <button>Get Started</button>}
        </div>
      </header>
      <div>
        <h2 className="header">Blogs by other authors</h2>
      </div>
      <div className="posts-section">
        {posts.map((post) => {
          return <Post {...post} />;
        })}
      </div>
    </>
  );
};

export default IndexPage;
