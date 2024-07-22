const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "ejs");

const port = 8080;
const localhost = "127.0.0.1";

app.use(express.static(path.join(__dirname, "views")));

app.listen(port, localhost, (error) => {
  if (error) {
    console.log(`An error ${error} has occured`);
  } else {
    console.log("Server is listening");
  }
});

app.get("/", (req, res) => {
  try {
    console.log("Established connection");
    res.render("index");
  } catch (error) {
    console.log(`An ${error} has occured`);
  }
});

app.get("/search", (req, res) => {
  try {
    console.log("Established connection");
    res.render("search");
  } catch (error) {
    console.log(`An ${error} has occured`);
  }
});

app.use((req, res) => {
  res.status(404).render("404");
});
