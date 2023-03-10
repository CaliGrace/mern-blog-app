import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContextProvider";

const SinglePost = () => {
  const {userInfo} = useContext(UserContext);
  const [postInfo, setpostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => res.json())
      .then((postInfo) => {
        console.log(postInfo);
        setpostInfo(postInfo);
      });
      console.log(userInfo);
  }, []);

  if (!postInfo) return "";
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="post-info">
        <time>{format(new Date(postInfo.createdAt), "mm-dd-yyy | HH:mm")}</time>
        <p>Author: {postInfo.author.username}</p>
      </div>
      { userInfo.username === postInfo.author.username && (
          <Link className="edit-button-container" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
Edit</Link>
      )
      }
      <div className="post-page__image">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
        />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default SinglePost;
