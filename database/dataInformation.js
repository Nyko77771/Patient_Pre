// Static Information

const patients = [
  {
    PatientName: "Alice Cooper",
    UserName: "alice.coop",
    Password: "password123",
    Address: "123 Elm Street, Dublin 1, D01 XY23, Ireland",
  },
  {
    PatientName: "Bob Dylan",
    UserName: "bobD",
    Password: "securepass456",
    Address: "202 Birch Boulevard, Waterford, X91 XY12, Ireland",
  },
  {
    PatientName: "Carole King",
    UserName: "AfriendCW",
    Password: "mypassword000",
    Address: "789 Pine Road, Galway, H91 XY67, Ireland",
  },
  {
    PatientName: "David Bowie",
    UserName: "ziggyS",
    Password: "bpass111",
    Address: "101 Maple Lane, Limerick, V94 XY89, Ireland",
  },
  {
    PatientName: "Nina Simone",
    UserName: "feelBlue1",
    Password: "pass202word",
    Address: "456 Oak Avenue, Cork, T12 XY45, Ireland",
  },
  {
    PatientName: "Frank Sinatra",
    UserName: "blueMoon",
    Password: "sin12345",
    Address: "303 Cedar Court, Sligo, F91 XY34, Ireland",
  },
];

const prescriptions = [
  {
    MedicationName: "Amoxicillin",
    Dosage: "500 mg",
    Route: "Oral",
    Frequency: "Three times a day",
    DoctorName: "Dr. John Smith",
    PatientName: "Alice Cooper",
    PrescriptionDate: "2024-08-03",
  },
  {
    MedicationName: "Ibuprofen",
    Dosage: "200 mg",
    Route: "Oral",
    Frequency: "Every 4-6 hours as needed",
    DoctorName: "Dr. Emily White",
    PatientName: "Bob Dylan",
    PrescriptionDate: "2024-08-02",
  },
  {
    MedicationName: "Metformin",
    Dosage: "1000 mg",
    Route: "Oral",
    Frequency: "Twice a day",
    DoctorName: "Dr. Robert Brown",
    PatientName: "Carol King",
    PrescriptionDate: "2024-08-01",
  },
  {
    MedicationName: "Lisinopril",
    Dosage: "10 mg",
    Route: "Oral",
    Frequency: "Once a day",
    DoctorName: "Dr. Linda Green",
    PatientName: "David Bowie",
    PrescriptionDate: "2024-07-30",
  },
  {
    MedicationName: "Atorvastatin",
    Dosage: "20 mg",
    Route: "Oral",
    Frequency: "Once a day",
    DoctorName: "Dr. Michael Clark",
    PatientName: "David Bowie",
    PrescriptionDate: "2024-07-29",
  },
  {
    MedicationName: "Amlodipine",
    Dosage: "5 mg",
    Route: "Oral",
    Frequency: "Once a day",
    DoctorName: "Dr. Jennifer Lewis",
    PatientName: "Frank Sinatra",
    PrescriptionDate: "2024-07-28",
  },
  {
    MedicationName: "Hydrochlorothiazide",
    Dosage: "25 mg",
    Route: "Oral",
    Frequency: "Once a day",
    DoctorName: "Dr. Emily White",
    PatientName: "Bob Dylan",
    PrescriptionDate: "2024-07-26",
  },
  {
    MedicationName: "Gabapentin",
    Dosage: "300 mg",
    Route: "Oral",
    Frequency: "Three times a day",
    DoctorName: "Dr. Linda Green",
    PatientName: "Hamilton Niculescu",
    PrescriptionDate: "2024-07-24",
  },
];

module.exports = {
  prescriptions,
  patients,
};
