var https = require("https"),
  http = require("http"),
  util = require("util"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  colors = require("colors"),
  httpProxy = require("http-proxy");

//
// Create a HTTP Proxy server with a HTTPS target
//

const proxy = httpProxy.createProxyServer({
  agent: https.globalAgent,
  ca: fs.readFileSync("server.cert"),
});

http
  .createServer(function (req, res) {
    var urlObj = url.parse(req.url);
    var target = "https://" + urlObj.host;
    console.log(target);
    proxy.web(req, res, { target });
  })
  .listen(8008);
