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
var loggedIn;
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
    loggedIn = false;
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

app.post("/:sign", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (name) {
      const mongoName = await prescriptions.Patient.find({ PatientName: name });

      if (mongoName.length > 0 && mongoName[0].Password === password) {
        console.log(mongoName[0].Password, password);
        console.log("Passwords match");

        res.render("index", { message: "User Exists. Please Login" });
      } else {
        signUp = [{ PatienName: name }, { Password: password }];
        console.log(signUp);
        // res.render("details");
      }
    } else {
      const mongoUser = await prescriptions.Patient.findOne({
        Email: email,
        Password: password,
      });

      if (mongoUser) {
        console.log("Password and Email found");
        loggedIn = true;
        res.render("prescriptions");
      } else {
        console.log("Password or Email not found");
        res.render("index", { message: "Email or Password are incorrect" });
      }
    }
  } catch (error) {
    console.log(`Error occured in /:sign. ${error}`);
    res.render("index", { message: "Server Error. Please try again" });
  }
});

app.use((req, res) => {
  res.status(404).render("404");
});
