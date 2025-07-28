import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ comments }) => {
  const dataArray = comments.map((el) => {
    return <li key={el.id}>{el.content}</li>;
  });

  return <ul>{dataArray}</ul>;
};

export default CommentList;
