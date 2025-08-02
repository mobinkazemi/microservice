import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import { DOMAIN_URL } from "./shared/constants/domain";

const PostList = () => {
  const [postList, setPostList] = useState([]);

  const fetchPost = async () => {
    const res = await axios.get(DOMAIN_URL + "/posts");
    setPostList(Object.values(res.data));
  };

  useEffect(() => {
    fetchPost();
  }, []);

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
