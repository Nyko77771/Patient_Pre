const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "ejs");

//Add Database Methods
const mongoDB = require("./database/mongoDB");
const prescriptions = require("./models/prescriptions");
const { default: mongoose } = require("mongoose");
const { sign } = require("crypto");
const { userInfo } = require("os");

const port = 8080;
const localhost = "127.0.0.1";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//keeping Track of Login user
var loggedIn;
var user;
var signUp;

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
    user = "";
    userPrescription = "";
    //Logged in boolean is false
    loggedIn = false;
    res.render("index", { message: "" });
  } catch (error) {
    console.log(`An ${error} has occured`);
  }
});

app.get("/prescriptions", async (req, res) => {
  try {
    console.log("Opened Prescriptions");
    if (loggedIn) {
      const userPrescription = await prescriptions.Prescription.find({
        PatientName: user,
      });
      res.render("prescriptions", { prescriptions: userPrescription });
    }
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

 * Hasan
 * Start of Get Methods
 *

***************************/
//route and response
app.get("/details", async (req, res) => {
  try {
    var message1;
    var message2;
    var boole;
    var UserDetails;

    if (loggedIn && user) {
      boole = true;

      UserDetails = await prescriptions.Patient.findOne({
        PatientName: user,
      });

      if (UserDetails) {
        message1 = "User Details";
        message2 = "";
        boole;
      } else if (!UserDetails) {
        message1 = "User Not Found";
        message2 = "";
        boole = false;
        UserDetails = {};
      }
    } else if (!loggedIn) {
      boole = false;
      UserDetails = await prescriptions.Patient.findOne({
        PatientName: signUp.PatientName,
      });

      if (UserDetails) {
        message1 = "If You Are a First Time Patient, Please fill out the ";
        message2 = "Personal Details Form Here.";
        boole = false;
      } else {
        message1 = "Error";
        message2 = "";
        boole = false;
        UserDetails = {};
      }
    }

    console.log(UserDetails);

    res.render("details", {
      message1: message1,
      message2: message2,
      attribute: boole,
      UserDetails: UserDetails,
    });
  } catch (error) {
    console.log(`An ${error} has occured`);
  }
});

app.get("/update", (req, res) => {
  res.render("update"); //root: __dirname is our specific relative path to our file
});

app.get("/user-details", (req, res) => {
  if (loggedIn && user) {
    prescriptions.Patient.findOne({ PatientName: user })
      .then((result) => res.json(result))
      .catch((error) => console.log(error));
  } else if (!loggedIn && signUp) {
    const message = {
      PatientName: signUp.PatientName,
      Email: signUp.Email,
      Password: signUp.Password,
      dateofBirth: "Not Found",
      phoneNumber: "Not Found",
      bloodGroup: "Not Found",
      height: "Not Found",
      weight: "Not Found",
      eireCode: "Not Found",
      Address: "Not Found",
    };
    res.json(message);
  }
});

/*************************

 * Hasan
 * End of Get Methods
 *

***************************/

/*************************

 * Nykyta
 * Start of Post Methods
 *

***************************/

app.post("/sign-in", async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  try {
    const mongoUser = await prescriptions.Patient.findOne({
      Email: email,
      Password: password,
    });

    if (mongoUser) {
      console.log("Password and Email found");
      //Saving some logged in details for prescription page
      loggedIn = true;
      user = mongoUser.PatientName;
      res.redirect("prescriptions");
    } else {
      console.log("Password or Email not found");
      res.render("index", { message: "Email or Password are incorrect" });
    }
  } catch (error) {
    console.log(`Error occured in /:sign. ${error}`);
    res.render("index", { message: "Server Error. Please try again" });
  }
});

app.post("/sign-up", async (req, res) => {
  try {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    console.log(name);

    if (name) {
      const mongoName = await prescriptions.Patient.find({ PatientName: name });

      if (mongoName.length > 0 && mongoName[0].Password === password) {
        console.log(mongoName[0].Password, password);
        console.log("Passwords match");
        res.render("index", { message: "User Exists. Please Login" });
      } else {
        signUp = {
          PatientName: name,
          Password: password,
          Email: email,
        };
        loggedIn = false;
        console.log(signUp);
        res.render("details", {
          message1: "If You Are a First Time Patient, Please fill out the",
          message2: "Personal Details Form Here",
          attribute: false,
          UserDetails: signUp,
        });
      }
    }
  } catch (error) {
    console.log(`Error occured in sign-up. ${error}`);
  }
});

/*************************

 * Nykyta
 * End of Post Methods
 *

***************************/

/*************************

 * Hasan
 * Start of Post Methods
 *

***************************/

app.post("/update", async (req, res) => {
  const userData = req.body;
  console.log("Received data:", userData); // Log received data for debugging

  const updatedFields = {
    PatientName: userData.patientName,
    Email: userData.email,
    Password: userData.password,
    dateOfBirth: userData.dateOfBirth,
    phoneNumber: userData.phoneNumber,
    bloodGroup: userData.bloodGroup,
    height: userData.height,
    weight: userData.weight,
    eireCode: userData.eireCode,
    Address: userData.address,
  };

  if (loggedIn && user) {
    await prescriptions.Patient.updateOne(
      { PatientName: user },
      { $set: updatedFields }
    )
      .then((result) => res.json({ success: true, data: result }))
      .catch((error) => {
        console.error("Error saving data:", error);
        res.json({ success: false, error: error.message });
      });
  }

  if (!loggedIn) {
    const newPatient = new prescriptions.Patient(updatedFields);
    newPatient
      .save()
      .then((result) => {
        loggedIn = true;
        user = newPatient.PatientName;
        console.log(`New Patient name is:` + user);
        res.json({ success: true, data: result });
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        res.json({ success: false, error: error.message });
      });
  }
});

/*************************

 * Hasan
 * End of Post Methods
 *

***************************/

/*************************

 * Nykyta
 * Start of Delete Methods
 *

***************************/
app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Prescription ID:" + id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID format");
    }

    const result = await prescriptions.Prescription.findByIdAndDelete(id);

    if (result) {
      const updatedPrescription = await prescriptions.Prescription.find({
        PatientName: user,
      });

      res.render("prescriptions", { prescriptions: updatedPrescription });
    } else {
      console.log("No Prescriptions found with this id");
    }
  } catch (error) {
    console.log(`Error occured while deleting prescription. Error: ${error}`);
  }
});

/*************************

 * Nykyta
 * End of Delete Methods
 *

***************************/

/*************************

 * Hasan
 * Start of Delete Methods
 *

***************************/

app.delete("/user-details/:id", (req, res) => {
  const userName = req.body.PatientName;
  const userEmail = req.body.Email;

  console.log("Name is:" + userName + " Email is:" + userEmail);

  try {
    prescriptions.Patient.findOneAndDelete({
      PatientName: userName,
      Email: userEmail,
    })
      .then((result) => {
        if (result) {
          res.json({ message: "Details deleted successfully." });
        } else {
          res.json({ message: "Patient not found" });
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(`Error occured while attempting to delete. ${error}`);
  }

  /*
  if (loggedIn && user) {
    prescriptions.Patient.findOneAndDelete({ PatientName: user.PatienName })
      .then(() => res.json({ message: "Details deleted successfully." }))
      .catch((error) => console.log(error));
  } else if (!loggedIn) {
    res
      .json({ message: "User doesnt exist" })
      .catch((error) => console.log(error));

  }
*/
  /*
  prescriptions.Patient.findOneAndDelete()
    .then(() => res.json({ message: "Details deleted successfully." }))
    .catch((error) => console.log(error));
*/
  /*
  Detail.findOneAndDelete()
    .then(() => res.json({ message: "Details deleted successfully." }))
    .catch((error) => console.log(error));
    */
});

/*************************

 * Hasan
 * End of Delete Methods
 *

***************************/

//404 page, app.use(), must be added to the last as it will only execute if no other  conditions are met before that.
app.use((req, res) => {
  res.status(404).render("404");
});
