const mongoose = require("mongoose");
const prescriptionApp = require("./../models/prescriptions");

const dbURI =
  "mongodb+srv://root:password1234@cluster0.nydfu3f.mongodb.net/PrescriptionApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI)
  .then((result) => console.log(`Connected Successfully`))
  .catch((error) =>
    console.log(`Error occured while connecting to MongoDB. ${error}`)
  );
