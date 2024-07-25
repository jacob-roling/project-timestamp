// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  const date = parseDate(req.params.date);
  const unix = date.getTime();
  const utc = date.toUTCString();
  if (!unix) {
    return res.json({ error: "Invalid Date" });
  }
  return res.json({ unix, utc });
});

app.get("/api", function (req, res) {
  const date = new Date();
  const unix = date.getTime();
  const utc = date.toUTCString();
  return res.json({ unix, utc });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

function parseDate(str) {
  if (typeof str != "string") return null;
  if (!isNaN(str) && !isNaN(parseFloat(str))) {
    return new Date(parseFloat(str));
  }
  return new Date(str);
}
