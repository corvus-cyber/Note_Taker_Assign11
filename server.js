// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs= require('fs')
var app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
// =============================================================
//Route for JSON
//used a function to build the route that the JSON will follow
const jsonRoute = path.join(__dirname, './db/db.json');
let notesArray = [];

//Used fs to read the file and place app.get within to port the notes into notes.html
app.get("/api/notes", function(req, res) {
  notesArray=fs.readFile(jsonRoute, "utf8", function(error, data) {
    if (error) {
      throw error;
    }
    console.log("------------");
    console.log(data);
    console.log("------------");
    
    parsedArray = JSON.parse(notesArray);
    console.log(parsedArray);
    res.json(parsedArray);
  });
});



//=============================================================
//Routes for JS
app.get('/assets/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, "./assets/js/index.js"))
});

app.get('/assets/js/notepush.js', (req, res) =>{
  res.sendFile(path.join(__dirname, "./assets/js/notepush.js"))
});


//Route for CSS 
app.get('/assets/css/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, "./assets/css/styles.css"))
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
//This will listen to the server
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});