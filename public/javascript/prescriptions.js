document.addEventListener("DOMContentLoaded", async () => {
  // Log Out Button
  const logOff = document.getElementById("logOut");
  // User Details Button
  const userDetails = document.getElementById("userDetails");

  logOff.addEventListener("click", () => {
    fetch("/")
      .then((response) => (window.location.href = "/"))
      .catch((e) => console.log(`Error occurred while logging off. ${e}`));
  });
  userDetails.addEventListener("click", () => {
    fetch("/details")
      .then((response) => (window.location.href = "details"))
      .catch((e) =>
        console.log(`Error occurred while going to User Details section. ${e}`)
      );
  });
});
