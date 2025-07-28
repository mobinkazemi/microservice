const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const data = req.body;

  try {
    axios.post("http://localhost:4000/events", data);
    axios.post("http://localhost:4001/events", data);
  } catch (error) {
    console.log(error);

    return res.status(500).send({ status: "NOK" });
  }

  return res.status(200).send({ status: "OK" });
});

app.listen(4005, () => console.log("Server is running on 4005"));
