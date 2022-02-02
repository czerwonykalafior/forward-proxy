var https = require("https"),
  http = require("http"),
  util = require("util"),
  path = require("path"),
  fs = require("fs"),
  colors = require("colors"),
  httpProxy = require("http-proxy");

//
// Create the target HTTP server
//
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

//
// Create the HTTPS proxy server listening on port 8000
//
httpProxy
  .createServer({
    target: {
      host: "localhost",
      port: 3000,
    },
    ssl: {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
  })
  .listen(8009);

console.log(
  "https proxy server".blue +
    " started ".green.bold +
    "on port ".blue +
    "8009".yellow
);
console.log(
  "http server ".blue + "started ".green.bold + "on port ".blue + "9009 ".yellow
);
