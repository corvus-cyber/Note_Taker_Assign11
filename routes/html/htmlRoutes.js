const router = require("express").Router();
const path = require("path");



//Routes for HTML
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});



//Export to server.js
module.exports = router;
