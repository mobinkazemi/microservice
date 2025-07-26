import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default () => (
  <div className="container">
    <h1>Create Post</h1>
    <PostCreate></PostCreate>
    <hr></hr>

    <h1>List of Posts</h1>
    <PostList />
  </div>
);
