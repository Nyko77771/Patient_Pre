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
    //Checking if its signUp
    if (isSignUp()) {
      if (!checkDetails()) {
        //Sending form input values to backend (sign-up)
        indexForm.action = "/sign-up";
        indexForm.submit();
      }
    } else {
      //If it is not Sign-up then we change title and show uName box
      title.textContent = "Sign Up";
      uName.style.display = "block";
    }
  });

  //Sign In function
  signIn.addEventListener("click", async () => {
    //Checking if its not signUp
    if (!isSignUp()) {
      //Checking if there are details in inputs
      if (!checkDetails()) {
        //removing uName input from sent values
        if (uName) {
          uName.remove();
        }
        //Sending form input values to backend (sign-in)
        indexForm.action = "/sign-in";
        indexForm.submit();
      }
    } else {
      //If it is Sign-up then we change title and hide uName box
      title.textContent = "Sign In";
      uName.style.display = "none";
    }
  });

  //Check if its on Sign Up section
  function isSignUp() {
    //checking text content of title to see if its sign-up or not
    if (title.textContent === "Sign Up") {
      return true;
    } else {
      return false;
    }
  }

  //Checking Fields
  function checkDetails() {
    //Checking three input fields for if they are empty
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
