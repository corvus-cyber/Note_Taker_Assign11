const router = require("express").Router();
const path = require("path");
const fs= require('fs');

//Routes
// =============================================================
//Route for JSON
//used a variableto build the route that the JSON will follow
const jsonRoute = path.join(__dirname, "../../db/db.json");

//Used fs to read the file and place app.get within to port the notes into notes.html
router.get("/notes", (req, res) => {
  fs.readFile(jsonRoute, "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  });
});

router.post("/notes", (req, res) => {
  fs.readFile(jsonRoute, "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }
    let parsedData = JSON.parse(data);
    if (parsedData.length > 0) {
      var newID = parsedData[parsedData.length - 1].id + 1;
    } else {
      newID = 1;
    }

    let newNote = {
      id: newID,
      title: req.body.title,
      text: req.body.text,
    };
    parsedData.push(newNote);
    let stringedData = JSON.stringify(parsedData);
    fs.writeFileSync(jsonRoute, stringedData, (error) => {
      if (error) {
        return console.log(error);
      }
      res.json(stringedData);
    });
  });
});

router.delete("/notes/:id", (req, res) => {
  const uniqueID = parseInt(req.params.id);
  console.log(uniqueID);
  fs.readFile(jsonRoute, "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }
    let parsedData = JSON.parse(data);
    parsedData = parsedData.filter((notes) => notes.id !== uniqueID);
    let stringedID = JSON.stringify(parsedData);
    fs.writeFileSync(jsonRoute, stringedID, (error) => {
      if (error) {
        return console.log(error);
      }
      res.json(stringedID);
    });
  });
});



module.exports = router;
