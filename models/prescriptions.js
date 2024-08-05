const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema(
  {
    MedicationName: { type: String, required: true, maxlength: 50 },
    Dosage: { type: String, required: true },
    Route: { type: String, required: true, maxlength: 50 },
    Frequency: { type: String, required: true, maxlength: 50 },
    DoctorName: { type: String, required: true, maxlength: 50 },
    PatientName: { type: String, required: true, maxlength: 50 },
    PrescriptionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const patientSchema = new Schema(
  {
    PatientName: { type: String, required: true, maxlength: 50 },
    UserName: { type: String, required: true, maxlength: 50 },
    Email: { type: String, required: true, maxlength: 50 },
    Password: { type: String, required: true, maxlength: 50 },
    Address: { type: String, required: true, maxlength: 100 },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("prescription", prescriptionSchema);

const Patient = mongoose.model("patient", patientSchema);

module.exports = {
  Prescription,
  Patient,
};
