document.addEventListener("DOMContentLoaded", () => {
  // Variables For Fields
  var uName = document.getElementById("uName");
  var uMail = document.getElementById("uMail");
  var uPass = document.getElementById("uPass");

  // Variables For Buttons
  var signIn = document.getElementById("signInBtn");
  var signUp = document.getElementById("signUpBtn");

  //Variables for Title
  var title = document.getElementById("title");

  //Variable for Form
  var indexForm = document.querySelector("form");

  //Sign Up function
  signUp.addEventListener("click", async () => {
    if (isSignUp()) {
      if (!checkDetails()) {
        indexForm.submit();
      }
    } else {
      title.textContent = "Sign Up";
      uName.style.display = "block";
    }
  });

  //Sign In function
  signIn.addEventListener("click", async () => {
    if (!isSignUp()) {
      if (!checkDetails()) {
        //const response = await fetch();
        alert("all details present");
      }
    } else {
      title.textContent = "Sign In";
      uName.style.display = "none";
    }
  });

  //Check if its on Sign Up section
  function isSignUp() {
    if (title.textContent === "Sign Up") {
      return true;
    } else {
      return false;
    }
  }

  //Checking Fields
  function checkDetails() {
    if (isSignUp()) {
      if (uName.value === "") {
        console.log(uName.textContent);
        alert("Please Enter Name");
        return true;
      }
    }

    if (uMail.value === "") {
      alert("Please Enter Email");
      return true;
    }

    if (uPass.value === "") {
      alert("Please Enter Password");
      return true;
    }

    return false;
  }
});

/*
signUp.onclick = function () {
  title.textContent = "Sign Up";
  uName.style.display = "block";
};

signIn.onclick = function () {
  title.textContent = "Sign In";
  uName.style.display = "none";
};
*/
