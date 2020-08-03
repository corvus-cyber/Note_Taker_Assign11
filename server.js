// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
// =============================================================
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
  });

app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});