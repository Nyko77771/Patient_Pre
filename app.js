const mongoose = require("mongoose");
const express = require("express");
const Detail = require("./models/form");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

const dbURI = "mongodb+srv://.kgezqtw.mongodb.net/PatientDetails?retryWrites=true&w=majority&appName=Wad";

mongoose.connect(dbURI)
    .then(() => app.listen(3000, () => console.log("Server started on port 3000")))
    .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/details", (req, res) => {
    res.render("details");
});

app.post("/details", (req, res) => {
    console.log('Received data:', req.body); // Log received data for debugging

    const detail = new Detail(req.body);
    detail.save()
        .then(result => res.json({ success: true, data: result }))
        .catch((error) => {
            console.error('Error saving data:', error);
            res.json({ success: false, error: error.message });
        });
});

app.get("/user-details", (req, res) => {
    Detail.findOne()
        .then((result) => res.json(result))
        .catch((error) => console.log(error));
});

app.put("/user-details", (req, res) => {
    Detail.findOneAndUpdate({}, req.body, { new: true })
        .then((result) => res.json(result))
        .catch((error) => console.log(error));
});

app.delete("/user-details", (req, res) => {
    Detail.findOneAndDelete()
        .then(() => res.json({ message: "Details deleted successfully." }))
        .catch((error) => console.log(error));
});

app.use((req, res) => {
    res.status(404).render("404");
});
