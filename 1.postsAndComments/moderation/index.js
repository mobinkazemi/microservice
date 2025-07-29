const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  const { type, data } = event;

  if (type === "CommentCreated") {
    const { content, status } = data;

    let moderatedStatus = status;

    if (content.toLowerCase().includes("orange")) {
      moderatedStatus = "rejected";
    } else {
      moderatedStatus = "approved";
    }

    await axios.post("http://localhost:4001/events", {
      type: "CommentModerated",
      data: {
        ...data,
        status: moderatedStatus,
      },
    });
  }

  return res.send({});
});

app.listen(4003, () => console.log("Moderation is running on 4003"));
