document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("detailsForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

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

      Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          showError(document.getElementById(key), "This field is required.");
          isValid = false;
        }
        if (
          (key === "phoneNumber" || key === "height" || key === "weight") &&
          isNaN(formData[key])
        ) {
          showError(document.getElementById(key), `${key} must be a number.`);
          isValid = false;
        }
        if (key === "dateOfBirth" && !/^[\d-]+$/.test(formData[key])) {
          showError(
            document.getElementById(key),
            "Date of Birth must contain only numbers and hyphens."
          );
          isValid = false;
        }
      });

      alert("triggered");
      if (isValid) {
        const urlEncodedData = new URLSearchParams(formData).toString();

        fetch("/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncodedData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert("Details saved successfully!");
              window.location.href = "details";
            } else {
              alert("Failed to save details. Error: " + data.error);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Failed to save details. Error: " + error.message);
          });
      }
    });
  }
});

const showError = (input, message) => {
  const error = document.createElement("div");
  error.className = "error";
  error.style.color = "red";
  error.textContent = message;
  input.parentElement.insertBefore(error, input.nextSibling);
};
