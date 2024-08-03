const mongoose = require("mongoose");
const Schema = new mongoose.Schema();

const prescriptionScema = new Schema(
  {
    MedicationName: { type: String, required: true, maxlength: 50 },
    Dosage: { type: Number, required: required },
    Route: { type: String, required: required, maxlength: 50 },
    Frequency: { type: String, maxlength: 50 },
    DoctorName: { type: String, required: required, maxlength: 50 },
    PrescriptionDate: { type: Date },
  },
  { timestamps: true }
);

const patientSchema = new Schema(
  {
    PatientName: { type: String, required: required, maxlength: 50 },
    UserName: { type: String, required: required, maxlength: 50 },
    Password: { type: String, required: required, maxlength: 50 },
    Address: { type: String, required: required, maxlength: 100 },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("prescription", prescriptionScema);

const Patient = mongoose.model("patient", patientScema);

module.exports = {
  Prescription,
  Patient,
};
