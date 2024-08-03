const mongoose = require("mongoose");
const prescription = require("./../models/prescriptions");
const dataDB = require("./dataInformation");

const dbURI =
  "mongodb+srv://root:password1234@cluster0.nydfu3f.mongodb.net/PrescriptionApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI)
  .then((result) => console.log(`Connected Successfully to MongoDB`))
  .catch((error) =>
    console.log(`Error occured while connecting to MongoDB. ${error}`)
  );

async function insertData() {
  try {
    if ((await prescription.Patient.countDocuments({})) === 0) {
      prescription.Patient.insertMany(dataDB.patients);
      console.log(`Successfully inserted Patient Data`);
    } else {
      console.log(`Patients Data is not updated`);
    }

    if ((await prescription.Prescription.countDocuments({})) === 0) {
      prescription.Prescription.insertMany(dataDB.prescriptions);
      console.log(`Successfully inserted Patient Data`);
    } else {
      console.log(`Patients Data is not updated`);
    }
  } catch (error) {
    console.log(`Error caught while inserting data into mongoDB. ${error}`);
  }
}

insertData();
