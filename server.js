// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs= require('fs')


const app = express();




const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
// =============================================================
//Route for JSON
//used a variableto build the route that the JSON will follow
const jsonRoute = path.join(__dirname, './db/db.json');

//Used fs to read the file and place app.get within to port the notes into notes.html
app.get("/api/notes", (req, res) => {
  fs.readFile(jsonRoute, "utf8", (error,data) =>{
    if (error){
      return console.log(error);
    }
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  });
});

app.post("/api/notes", (req, res) =>{
  fs.readFile(jsonRoute, "utf8", (error,data) =>{
    if (error){
      return console.log(error);
    }
    let parsedData = JSON.parse(data);
    parsedData.push(req.body);
    let stringedData = JSON.stringify(parsedData)
    
    fs.writeFileSync(jsonRoute, stringedData, (error) => {
      if (error){
        return console.log(error);
      } 
      res.json(stringedData);
    }); 
  });  
})

app.delete("/api/notes/:id", (req, res) => {
  const uniqueID = req.params.id;
  console.log(uniqueID);
  fs.readFile(jsonRoute, "utf8", (error,data) =>{
    if (error){
      return console.log(error);
    };
    let parsedData = JSON.parse(data);
    parsedData = parsedData.filter(notes => notes.id !== id);
    let stringedID=JSON.stringify(idBody);
    fs.writeFileSync(jsonRoute, stringedID, (error) => {
      if (error){
        return console.log(error);
      }
      res.json(stringedID);
    })
  });
})
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