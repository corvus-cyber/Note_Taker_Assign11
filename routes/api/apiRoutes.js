const router = require("express").Router();
const path = require("path");
const fs= require('fs');

//Routes
// =============================================================

//used a variable to build the route that the JSON will follow
const jsonRoute = path.join(__dirname, "../../db/db.json");

//Used fs to read the file and place app.get within to port the notes into notes.html
router.get("/notes", (req, res) => {
    //Reads the db.json
  fs.readFile(jsonRoute, "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  });
});

//use router.post to take the users input and place them inside the db.json
router.post("/notes", (req, res) => {
    //Reads the db.json
  fs.readFile(jsonRoute, "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }
    //This gives each note a unique ID so that we can later delete by that id
    let parsedData = JSON.parse(data);
    if (parsedData.length > 0) {
      var newID = parsedData[parsedData.length - 1].id + 1;
    } else {
      newID = 1;
    }
    //Creates the format for the new note
    let newNote = {
      id: newID,
      title: req.body.title,
      text: req.body.text,
    };
    parsedData.push(newNote);
    let stringedData = JSON.stringify(parsedData);
    //Writes changes to the db.json
    fs.writeFileSync(jsonRoute, stringedData, (error) => {
      if (error) {
        return console.log(error);
      }
      res.json(stringedData);
    });
  });
});

//Deletes the note that the user desires to be rid of
router.delete("/notes/:id", (req, res) => {
  const uniqueID = parseInt(req.params.id);
  console.log(uniqueID);
  //Reads the db.json
  fs.readFile(jsonRoute, "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }
    let parsedData = JSON.parse(data);
    //Creates a filter to check and see which of the notes id's matches with the one we wish to get rid of
    parsedData = parsedData.filter((notes) => notes.id !== uniqueID);
    let stringedID = JSON.stringify(parsedData);
    //Writes changes to the db.json
    fs.writeFileSync(jsonRoute, stringedID, (error) => {
      if (error) {
        return console.log(error);
      }
      res.json(stringedID);
    });
  });
});


//Export to server.js
module.exports = router;
