const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const postId = req.params.id;

  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];

  const thisComment = { id, content, status: "pending" };

  comments.push(thisComment);

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      ...thisComment,
      postId,
    },
  });

  return res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { status, id, postId } = data;

    let thisComment = commentsByPostId[postId].find((el) => el.id === id);

    if (thisComment) {
      thisComment.status = status;
      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          ...thisComment,
          postId,
        },
      });
    }
  }
  res.send({});
});

app.listen(4001, () => console.log("Comment is running on 4001"));
