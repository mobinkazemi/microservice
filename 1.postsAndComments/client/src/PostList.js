import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [postList, setPostList] = useState([]);

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPostList(Object.values(res.data));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // console.log(postList, Array.isArray(postList));
  const posts = postList.map((p) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={p.id}
      >
        <div className="card-body">
          <h3>{p.title}</h3>
          <CommentList comments={p.comments}></CommentList>
          <CommentCreate postId={p.id}></CommentCreate>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {posts}
    </div>
  );
};

export default PostList;
