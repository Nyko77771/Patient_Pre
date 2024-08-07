document.addEventListener("DOMContentLoaded", () => {
  //Get details form id first and assign it to form constant variable
  const form = document.getElementById("detailsForm");

  //If form is present we add submit event listener
  if (form) {
    form.addEventListener("submit", (e) => {
      //Prevent default submission of form
      e.preventDefault();

      //Get all the values from all our input fields in the form and add them to formData object
      const formData = {
        patientName: document.getElementById("patientName").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        dateOfBirth: document.getElementById("dateOfBirth").value.trim(),
        phoneNumber: document.getElementById("phoneNumber").value.trim(),
        bloodGroup: document.getElementById("bloodGroup").value.trim(),
        height: document.getElementById("height").value.trim(),
        weight: document.getElementById("weight").value.trim(),
        eireCode: document.getElementById("eircode").value.trim(),
        address: document.getElementById("address").value.trim(),
      };

      // Validate form inputs
      let isValid = true;

      //Create an Array with keys from formData object
      //then we loop through each key
      Object.keys(formData).forEach((key) => {
        //Then we check if each formData variable in the object has a false value, by using key position if yes then we use our showError function to display an error
        if (!formData[key]) {
          showError(document.getElementById(key), "This field is required.");
          isValid = false;
        }
        //We also check if phonenumber, height, and weight are not provided in numeric value. If yes then we generate an error message
        if (
          (key === "phoneNumber" || key === "height" || key === "weight") &&
          isNaN(formData[key])
        ) {
          showError(document.getElementById(key), `${key} must be a number.`);
          isValid = false;
        }
        //We also check date of birth. If it has a correct layout
        if (key === "dateOfBirth" && !/^[\d-]+$/.test(formData[key])) {
          showError(
            document.getElementById(key),
            "Date of Birth must contain only numbers and hyphens."
          );
          isValid = false;
        }
      });

      //If the form is valid then we send our form using urlEncoded middleware
      if (isValid) {
        //we create a url query object with our formData and then convert into string for key value pair representation
        const urlEncodedData = new URLSearchParams(formData).toString();

        //then we post this urlencoded value to backend
        fetch("/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncodedData,
        })
          .then((response) => response.json())
          .then((data) => {
            //If data was successfully saved on the backend then we respond with an alert and we re-direct the user to details page
            if (data.success) {
              alert("Details saved successfully!");
              window.location.href = "details";
            } else {
              //if not then we give a failure alert message
              alert("Failed to save details. Error: " + data.error);
            }
          })
          .catch((error) => {
            //Error handling
            console.error("Error:", error);
            alert("Failed to save details. Error: " + error.message);
          });
      }
    });
  }
});

//Used for constructing error messages
const showError = (input, message) => {
  const error = document.createElement("div");
  error.className = "error";
  error.style.color = "red";
  error.textContent = message;
  input.parentElement.insertBefore(error, input.nextSibling);
};
