const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const data = req.body;

  axios
    .post("http://localhost:4000/events", data)
    .catch((el) => console.log(el));
  axios
    .post("http://localhost:4001/events", data)
    .catch((el) => console.log(el));
  axios
    .post("http://localhost:4002/events", data)
    .catch((el) => console.log(el));
  axios
    .post("http://localhost:4003/events", data)
    .catch((el) => console.log(el));

  console.log("Broadcasting a new event:", data.type);

  return res.status(200).send({ status: "OK" });
});

app.listen(4005, () => console.log("Event-Bus is running on 4005"));
