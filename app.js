//Importing different node.js packages
const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "ejs");

//Add Database Methods
const mongoDB = require("./database/mongoDB");
//Importing MongoDB model
const prescriptions = require("./models/prescriptions");
//Added by Visual Studio
const { default: mongoose } = require("mongoose");
const { sign } = require("crypto");
const { userInfo } = require("os");

//Assigning Port and localhost variables
const port = 8080;
const localhost = "127.0.0.1";

//Stating direct path to public folder
app.use(express.static(path.join(__dirname, "public")));
//Using urlencoded middleware
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

//Get method for home or main page
app.get("/", (req, res) => {
  try {
    //Test if connecting to this get method
    console.log("Established connection");

    //clearing user variable of values
    user = "";
    //Logged in boolean is false
    loggedIn = false;
    //rendering index with message blank
    res.render("index", { message: "" });
  } catch (error) {
    console.log(`An ${error} has occured`);
  }
});

//Get method for prescriptions
app.get("/prescriptions", async (req, res) => {
  //Using error checking
  try {
    //Checking if connected to this get method
    console.log("Opened Prescriptions");
    //checking if loggedIn
    if (loggedIn) {
      //Getting Prescription details from MongoDB
      const userPrescription = await prescriptions.Prescription.find({
        PatientName: user,
      });
      //Rendering prescription page with users prescriptions
      res.render("prescriptions", { prescriptions: userPrescription });
    }
  } catch (error) {
    //Error checking
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
//getting details method
app.get("/details", async (req, res) => {
  try {
    //Keeping track of variable information
    var message1;
    var message2;
    var boole;
    var UserDetails;

    //checking if user is logged in and has a user name saved
    if (loggedIn && user) {
      boole = true;

      //getting user information from name
      UserDetails = await prescriptions.Patient.findOne({
        PatientName: user,
      });

      //checking if this user exists or is found
      if (UserDetails) {
        message1 = "User Details";
        message2 = "";
        boole;
        //else if he does not then provide another data
      } else {
        message1 = "User Not Found";
        message2 = "";
        boole = false;
        UserDetails = {};
      }
      //If not a logedIn user method
    } else if (!loggedIn) {
      boole = false;
      //If a signed-up user get his signed up details from sign-up page
      UserDetails = await prescriptions.Patient.findOne({
        PatientName: signUp.PatientName,
      });

      //If UserDetails are not empty add this information to variables
      if (UserDetails) {
        message1 = "If You Are a First Time Patient, Please fill out the ";
        message2 = "Personal Details Form Here.";
        boole = false;
        //If not add Error message to page
      } else {
        message1 = "";
        message2 = "";
        boole = false;
        UserDetails = {};
      }
    }

    //UserDetails check if they are not empty
    console.log(UserDetails);

    //rendering response with variables
    res.render("details", {
      message1: message1,
      message2: message2,
      attribute: boole,
      UserDetails: UserDetails,
    });
  } catch (error) {
    //Error checking
    console.log(`An ${error} has occured`);
  }
});

//Getting update page
app.get("/update", (req, res) => {
  //rendering update page
  res.render("update");
});

//getting user details information
app.get("/user-details", (req, res) => {
  //Checking if logged in and user name is present
  if (loggedIn && user) {
    //getting patient information
    prescriptions.Patient.findOne({ PatientName: user })
      .then((result) => res.json(result))
      .catch((error) => console.log(error));
    //If not logged in but has signed-up sending info from sign-up page. Rest is 'not found'
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
//Updating user information
app.post("/update", async (req, res) => {
  const userData = req.body;
  console.log("Received data:", userData); // Log received data for debugging

  //Creating fileds to be updated
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

  //Checking if loggeIn and user name is present then we update the patients information and send response in json back
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

  //If not loggedIn then we create a new patient and save them
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
        //Error handling. Sending false for success message back to frontend
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
//Deleting prescription based on id
app.delete("/:id", async (req, res) => {
  try {
    //Getting id parameter property of id thats at the end of our passed url. Assigning it to id variable
    const id = req.params.id;
    //Checking what it looks like
    console.log("Prescription ID:" + id);

    //checking if the id received is in valid mongoose format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID format");
    }

    //Deleting Prescription by ID and saving it to results
    const result = await prescriptions.Prescription.findByIdAndDelete(id);

    //If have a result
    if (result) {
      //getting other prescriptions after deletion
      const updatedPrescription = await prescriptions.Prescription.find({
        PatientName: user,
      });

      //rendering prescription page with updatred list of prescriptions
      res.render("prescriptions", { prescriptions: updatedPrescription });
    } else {
      //Messageto check if there were no prescriptions with provided id
      console.log("No Prescriptions found with this id");
    }
  } catch (error) {
    //Error handling
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
//Deleting Patient based on ID
app.delete("/user-details/:id", (req, res) => {
  //Getting ID parameters from passed URL
  const id = req.params.id;

  //Checking what we received
  console.log("ID is:" + id);

  //trying to delete patient based on id
  //then sending res.json message if successful
  try {
    prescriptions.Patient.findByIdAndDelete(id)
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
});

/*************************

 * Hasan
 * End of Delete Methods
 *

***************************/

//404 page, app.use(), must be added to the last as it will only execute if no other  conditions are met before that.
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
