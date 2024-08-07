//Importing mongoose dependancy
const mongoose = require("mongoose");
//importing database model
const prescription = require("./../models/prescriptions");
//importing custom data information
const dataDB = require("./dataInformation");

//URL to Nykytas MongoDB database
const dbURI =
  "mongodb+srv://root:password1234@cluster0.nydfu3f.mongodb.net/PrescriptionApp?retryWrites=true&w=majority&appName=Cluster0";

//Using mongoose dependancy to connect to mongoDB
mongoose
  .connect(dbURI)
  .then((result) => console.log(`Connected Successfully to MongoDB`))
  .catch((error) =>
    console.log(`Error occured while connecting to MongoDB. ${error}`)
  );

//Inserting custom data if patients and prescription collection are empty/has no documents
async function insertData() {
  try {
    //Checking if patients collection has 0 documents
    if ((await prescription.Patient.countDocuments({})) === 0) {
      //if yes we insert our custom database patient information
      prescription.Patient.insertMany(dataDB.patients);
      //Tracking Changes
      console.log(`Successfully inserted Patient Data`);
    } else {
      console.log(`Patients Data is not updated`);
    }
    //Checking if prescription collection has  0 documents
    if ((await prescription.Prescription.countDocuments({})) === 0) {
      //if yes we insert our custom database prescription information
      prescription.Prescription.insertMany(dataDB.prescriptions);
      console.log(`Successfully inserted Patient Data`);
    } else {
      console.log(`Patients Data is not updated`);
    }
  } catch (error) {
    console.log(`Error caught while inserting data into mongoDB. ${error}`);
  }
}
//Call the insert function
insertData();
