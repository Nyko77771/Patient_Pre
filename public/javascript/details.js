document.addEventListener("DOMContentLoaded", () => {
  //Getting different Elements
  //Getting view button
  const viewDetailsButton = document.getElementById("viewDetailsButton");
  //Getting Delete Button
  const deleteDetailsButton = document.getElementById("deleteDetailsButton");
  //Getting Empty Div
  const personalDetailsContainer = document.getElementById(
    "personalDetailsContainer"
  );

  // Log Out Button
  const logOff = document.getElementById("logOut");

  //Checking if Details Button is present. Adding event to it when it is clicked
  if (viewDetailsButton) {
    viewDetailsButton.addEventListener("click", () => {
      //Fetching User Details
      fetch("/user-details")
        .then((response) => response.json())
        .then((details) => {
          personalDetailsContainer.innerHTML = "";

          //Checking if there are any details present
          //Then populate our details box with information
          if (details) {
            const detailsBox = document.createElement("div");
            detailsBox.classList.add("details-box");

            //Creating two objects keys and labels
            const keys = [
              "PatientName",
              "Email",
              "Password",
              "dateofBirth",
              "phoneNumber",
              "bloodGroup",
              "height",
              "weight",
              "eireCode",
              "Address",
            ];
            const labels = [
              "Name",
              "Email",
              "Password",
              "Date of Birth",
              "Phone Number",
              "Blood Group",
              "Height",
              "Weight",
              "Eire Code",
              "Address",
            ];

            //looping through each item in keys object
            keys.forEach((key, index) => {
              //For each item creating a p tag. Then we add text to each tag. We add label text based on index position and details information based on specific key value
              const p = document.createElement("p");
              p.textContent = `${labels[index]}: ${details[key]}`;
              //We append p tags into detailsBox div
              detailsBox.appendChild(p);
            });

            //Append detailsBox div into our empty div
            personalDetailsContainer.appendChild(detailsBox);
          } else {
            //else we just add p tag with 'No details available.' text into details Box and then append that into our empty div
            const detailsBox = document.createElement("div");
            detailsBox.classList.add("details-box");

            const p = document.createElement("p");
            p.textContent = "No details available.";
            detailsBox.appendChild(p);

            personalDetailsContainer.appendChild(detailsBox);
          }
        }) //error handling
        .catch((error) => console.error("Error:", error));
    });
  }

  //Checking if deleteDetail Button exists then we add click event
  if (deleteDetailsButton) {
    deleteDetailsButton.addEventListener("click", () => {
      //Getting ID from dataset value of a delete button
      const id = deleteDetailsButton.dataset.id;

      //Checking if value is found
      console.log("Patient ID: " + id);

      //Creating a backend URL with id constanr
      const backendURL = `/user-details/${id}`;

      //sending a delete fetch method to our created backend method
      fetch(backendURL, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          //Checking response from server after deletion.
          //If it was successfull and we receive correct message then we send a message from server to our makeMessage function
          console.log(data);
          if (data.message === "Details deleted successfully.") {
            makeMessage(data.message);
          } else {
            //If not then we send a custom message
            makeMessage("Details Not Found and Not Deleted");
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  }

  //Log Off Function on Click
  logOff.addEventListener("click", () => {
    fetch("/")
      .then((response) => (window.location.href = "/"))
      .catch((e) => console.log(`Error occurred while logging off. ${e}`));
  });
});

//Function to populate our empty div with a message
function makeMessage(message) {
  personalDetailsContainer.innerHTML = "";

  const detailsBox = document.createElement("div");
  detailsBox.classList.add("details-box");

  const p = document.createElement("p");
  p.textContent = message;
  detailsBox.appendChild(p);

  personalDetailsContainer.appendChild(detailsBox);
}
