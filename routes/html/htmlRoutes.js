const router = require("express").Router();
const path = require("path");

// //Route for JS
// router.get("../../assets/js/index.js", (req, res) => {
//     res.sendFile(path.join(__dirname, "../../assets/js/index.js"));
// });

// //Route for CSS
// router.get("/assets/css/styles.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../assets/css/styles.css"));
// });

//Routes for HTML
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

//The app.get for index is placed at the end because * is a wildcard, so it matches and stops the other GET routes from being run.
//If you place it first, the others do not work because it matches everything. If it’s last, it’ll only run if no other route matches.


module.exports = router;
