const https = require("https");
const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  res.send("Yo boz!");
});

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(3000, () => {
    console.log("listening");
  });
