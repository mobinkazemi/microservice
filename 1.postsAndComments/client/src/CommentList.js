import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ comments }) => {
  const dataArray = comments.map((el) => {
    let content;

    if (el.status === "approved") {
      content = el.content;
    } else if (el.status === "pending") {
      content = "This comment is waiting for moderation check";
    } else if (el.status === "rejected") {
      content = "This comment is rejected";
    }

    return <li key={el.id}>{content}</li>;
  });

  return <ul>{dataArray}</ul>;
};

export default CommentList;
