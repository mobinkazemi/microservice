import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    const res = await axios.get(
      "http://localhost:4001/posts/" + postId + "/comments"
    );

    setComments(res.data);
  }, []);

  const dataArray = comments.map((el) => {
    return <li>{el.content}</li>;
  });

  return <ul>{dataArray}</ul>;
};

export default CommentList;
