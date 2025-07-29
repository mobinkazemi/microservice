const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

function eventHandler(type, data) {
  if (type === "PostCreated") {
    posts[data.id] = {
      id: data.id,
      title: data.title,
      comments: [],
    };
  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    posts[postId].comments.push({ id, content, status });
  } else if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    posts[postId].comments.forEach((el) => {
      if (el.id === id) {
        el.status = status;
        el.content = content;
      }
    });
  }
}

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  eventHandler(type, data);

  return res.send({});
});

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.listen(4002, async () => {
  console.log("Query is running on 4002");

  const events = await axios.get("http://localhost:4005/events");

  for (let ev of events.data) {
    console.log(ev);
    eventHandler(ev.type, ev.data);
  }
});
