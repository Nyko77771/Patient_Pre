const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "ejs");

//Add Database Methods
const mongoDB = require("./database/mongoDB");
const prescriptions = require("./models/prescriptions");

const port = 8080;
const localhost = "127.0.0.1";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//keeping Track of Login user
var loginUser;
var signUp = [];

//Local
app.listen(port, localhost, (error) => {
  if (error) {
    console.log(`An error ${error} has occured`);
  } else {
    console.log("Server is listening");
  }
});

/*************************

 * Nykyta
 * Start of Get Methods
 *

***************************/

app.get("/", (req, res) => {
  try {
    console.log("Established connection");
    res.render("index", { message: "" });
  } catch (error) {
    console.log(`An ${error} has occured`);
  }
});

//Depreciated Search Function
/*
app.get("/search", (req, res) => {
  try {
    console.log("Established connection");
    res.render("search");
  } catch (error) {
    console.log(`An ${error} has occured`);
  }
});
*/

app.get("/prescriptions", (req, res) => {
  try {
    console.log("Established connection");
    res.render("prescriptions");
  } catch (error) {
    console.log(`An ${error} has occured`);
  }
});

/*************************

 * Nykyta
 * End of Get Methods
 *

***************************/

/*************************

 * Nykyta
 * Start of Post Methods
 *

***************************/

app.post("/:signup", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  const mongoName = await prescriptions.Patient.find({ PatientName: name });

  if (!mongoName && mongoName[0].Password === password) {
    console.log(mongoName[0].Password, password);
    console.log("Passwords match");

    res.render("index", { message: "User Exists. Please Login" });
  } else {
    signUp = [{ PatienName: name }, { Password: password }];
    console.log(signUp);
    // res.render("details");
  }
});

app.use((req, res) => {
  res.status(404).render("404");
});
