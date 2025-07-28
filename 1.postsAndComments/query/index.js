const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    posts[data.id] = {
      id: data.id,
      title: data.title,
      comments: [],
    };
  } else if (type === "CommentCreated") {
    const { id, content, postId } = data;

    posts[postId].comments.push({ id, content });
  }

  console.dir(posts, { depth: null });
  return res.send({});
});

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.listen(4002, () => console.log("Server is running on 4002"));
