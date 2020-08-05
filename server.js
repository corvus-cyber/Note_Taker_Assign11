// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs= require('fs')
var app = express();
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
// =============================================================
//Route for JSON
//used a function to build the route that the JSON will follow
const jsonRoute = path.join(__dirname, './db/db.json');

//Used fs to read the file and place app.get within to port the notes into notes.html
app.get("/api/notes", (req, res) => {
  res.json(returnData());
});

async function returnData(){
  const notes = await readFileAsync(jsonRoute, "utf8")
    
    let parsedArray = JSON.parse(notes);
    return(parsedArray);
};

app.post("/api/notes", async (req, res) => {  
  let notes = await returnData();

  console.log(req.body);
  notes.push(req.body);
  stringedArray = JSON.stringify(notes);

  const post = await writeFileAsync(jsonRoute, stringedArray, "utf8"); 
  res.json(stringedArray);
});
//app.delete


//=============================================================
//Route for JS
app.get('/assets/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, "./assets/js/index.js"))
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