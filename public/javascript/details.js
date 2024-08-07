document.addEventListener("DOMContentLoaded", () => {
  const viewDetailsButton = document.getElementById("viewDetailsButton");
  const deleteDetailsButton = document.getElementById("deleteDetailsButton");
  const personalDetailsContainer = document.getElementById(
    "personalDetailsContainer"
  );

  if (viewDetailsButton) {
    viewDetailsButton.addEventListener("click", () => {
      fetch("/user-details")
        .then((response) => response.json())
        .then((details) => {
          personalDetailsContainer.innerHTML = "";

          if (details) {
            const detailsBox = document.createElement("div");
            detailsBox.classList.add("details-box");

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

            keys.forEach((key, index) => {
              const p = document.createElement("p");
              p.textContent = `${labels[index]}: ${details[key]}`;
              detailsBox.appendChild(p);
            });

            personalDetailsContainer.appendChild(detailsBox);
          } else {
            const detailsBox = document.createElement("div");
            detailsBox.classList.add("details-box");

            const p = document.createElement("p");
            p.textContent = "No details available.";
            detailsBox.appendChild(p);

            personalDetailsContainer.appendChild(detailsBox);
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  }

  if (deleteDetailsButton) {
    deleteDetailsButton.addEventListener("click", () => {
      const id = deleteDetailsButton.dataset.id;

      console.log("Patient ID: " + id);

      const backendURL = `/user-details/${id}`;

      /*
      const urlencodedData = new URLSearchParams({ name, email, id });
      */

      fetch(backendURL, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Details deleted successfully.") {
            makeMessage(data.message);
          } else {
            makeMessage("Details Not Found and Not Deleted");
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  }
});

function makeMessage(message) {
  personalDetailsContainer.innerHTML = "";

  const detailsBox = document.createElement("div");
  detailsBox.classList.add("details-box");

  const p = document.createElement("p");
  p.textContent = message;
  detailsBox.appendChild(p);

  personalDetailsContainer.appendChild(detailsBox);
}
