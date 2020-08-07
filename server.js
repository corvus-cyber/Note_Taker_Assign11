// Dependencies
// =============================================================
const express = require("express");
const app = express();
const path = require("path");
const api = require("./routes/api/apiRoutes");
const html = require("./routes/html/htmlRoutes");



//Establishes which port we want to use
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
//Routes
// =============================================================

//Route for the apis
app.use("/api", api);

//Route for the html
app.use("/", html);

//The app.get for index is placed at the end because * is a wildcard, so it matches and stops the other GET routes from being run.
//If you place it first, the others do not work because it matches everything. If it’s last, it’ll only run if no other route matches.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//==============================================================
//This will listen to the server
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});