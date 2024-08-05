document.addEventListener("DOMContentLoaded", async () => {
  // Log Out Button
  const logOff = document.getElementById("logOut");
  // User Details Button
  const userDetails = document.getElementById("userDetails");

  //Get Close Hidden Div Button
  const closeBtn = document.getElementById("closeHiddenBtn");

  //Delete Button
  const deleteBtn = document.querySelectorAll(".deleteBtn");

  //Show Details Button
  const moreBtn = document.querySelector(".preBtn");

  //Extra Details Box
  var extraDetails = document.querySelector(".preDetail");

  //Log Off Function on Click
  logOff.addEventListener("click", () => {
    fetch("/")
      .then((response) => (window.location.href = "/"))
      .catch((e) => console.log(`Error occurred while logging off. ${e}`));
  });

  //User Details Button Function on Click
  userDetails.addEventListener("click", () => {
    fetch("/details")
      .then((response) => (window.location.href = "details"))
      .catch((e) =>
        console.log(`Error occurred while going to User Details section. ${e}`)
      );
  });

  //Close Hidden Div
  closeBtn.addEventListener("click", () => {
    extraDetails.style.display = "none";
  });

  //delete Prescription
  deleteBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const deleteConfirm = confirm(
        "Are you sure you want to delete this prescription?"
      );

      if (deleteConfirm) {
        const prescriptionId = button.getAttribute("data-id");

        const backEndPoint = `/${prescriptionId}`;
        console.log("Backend Endpoint:" + backEndPoint);

        fetch(backEndPoint, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              console.log(`Successfully Deleted Prescription`);
              window.location.href = "prescriptions";
            }
          })
          .catch((error) =>
            console.log(`Error occurred while deleting Prescription. ${error}`)
          );
      } else {
        console.log("Deletion Cancelled");
      }
    });
  });

  //Show Details Function on Click
  moreBtn.addEventListener("click", () => {
    extraDetails.style.display = "block";
  });
});
