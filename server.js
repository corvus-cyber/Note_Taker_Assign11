// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs= require('fs')
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
// =============================================================
//Route for JSON
//used a function to build the route that the JSON will follow
const jsonRoute = path.join(__dirname, './db/db.json');

//Used fs to read the file and place app.get within to port the notes into notes.html
fs.readFile(jsonRoute, "utf8", function(error, data) {
  if (error) {
    throw error;
  }
  console.log("------------")
  console.log(data);
  console.log("------------")
 

  app.get("/api/notes", function(req, res) {
    res.json(JSON.parse(data));
  });
});


//Routes for HTML
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./notes.html"));
});

//The app.get for index is placed at the end because * is a wildcard, so it matches and stops the other GET routes from being run.
//If you place it first, the others do not work because it matches everything. If it’s last, it’ll only run if no other route matches.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});




//==============================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});