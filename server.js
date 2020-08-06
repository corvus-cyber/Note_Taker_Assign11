// Dependencies
// =============================================================
const express = require("express");
const app = express();
const path = require("path");
const api = require("./routes/api/apiRoutes");
const html = require("./routes/html/htmlRoutes");




const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
//Routes
// =============================================================

app.use("/api", api);

app.use("/", html);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//==============================================================
//This will listen to the server
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});