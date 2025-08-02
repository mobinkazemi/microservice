const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

async function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

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

  let retryCounter = 0;
  let resolved = false;
  let events;
  while (resolved === false && retryCounter < 5) {
    try {
      events = await axios.get("http://eventbus-srv-cluster-ip:4005/events");
      resolved = true;
    } catch (error) {
      console.error("Error fetching events:", error.message);
      retryCounter++;
      await sleep(2);
    }
  }

  if (!resolved) {
    console.error("Failed to fetch events after multiple attempts.");
    process.exit(1);
  }

  for (let ev of events.data) {
    eventHandler(ev.type, ev.data);
  }
});
