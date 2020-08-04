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

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./notes.html"));
  });

//The app.get for index is placed at the end because * is a wildcard, so it matches and stops the other GET routes from being run.
//If you place it first, the others do not work because it matches everything. If it’s last, it’ll only run if no other route matches.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get('/assets/db/db.json', (req, res) => {
  console.log(res);
})
app.get("/api/tables:table", function(req, res) {
  var selected = req.params.table;

  console.log(selected)

  for (var i = 0; i < tables.length; i++) {
      if (selected === tables[i].routeName) {
          return res.json(tables[i]);
      }
  }
  return res.json(false)
});

app.get("/api/waitlist", function(req, res) {
   res.json(waitList);
});

// Create New Table - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  console.log(tables.length)
  //verification that tables.length is no greater than five, if so, push to waitlist
 
  var newRes = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newRes.routeName = newRes.name.replace(/\s+/g, "").toLowerCase();

  console.log(newRes);
  if (tables.length > 4) {
      // alert ("Reservations are full")
      waitList.push(newRes)
      res.json(newRes)
  } else {
  tables.push(newRes);

  res.json(newRes);
  }
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});