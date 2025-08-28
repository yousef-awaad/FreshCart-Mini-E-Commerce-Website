const passwordInput = document.getElementById("formSignPassword");
const toggleIcon = document.getElementById("passwordToggle");

if (toggleIcon && passwordInput) {
  toggleIcon.addEventListener("click", function () {
    const isPassword = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPassword ? "text" : "password");

    this.classList.toggle("bi-eye");
    this.classList.toggle("bi-eye-slash");
  });
}

const form = document.querySelector("form");
const formType = form ? form.dataset.form : null;

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    let isValid = true;

    if (formType === "signup") {
      const firstNameInput = document.getElementById("formSignFirstName");
      const lastNameInput = document.getElementById("formSignLastName");
      const emailInput = document.getElementById("formSignEmail");
      const passwordInput = document.getElementById("formSignPassword");

      [firstNameInput, lastNameInput, emailInput, passwordInput].forEach(
        (input) => {
          if (input && input.value.trim() === "") {
            input.classList.add("is-invalid");
            isValid = false;
          } else if (input) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
          }
        }
      );

      if (isValid) {
        const account = {
          firstName: firstNameInput.value.trim(),
          lastName: lastNameInput.value.trim(),
          email: emailInput.value.trim(),
          password: passwordInput.value.trim(),
          isLoggedIn: false,
        };
        localStorage.setItem("userAccount", JSON.stringify(account));

        Swal.fire({
          icon: "success",
          title: "Account Created",
          text: "Your account has been successfully created!",
          confirmButtonText: "Proceed to Sign In",
        }).then(() => {
          window.location.href = "sign-in.html";
        });
      }
    } else if (formType === "signin") {
      const emailInput = document.getElementById("formSignEmail");
      const passwordInput = document.getElementById("formSignPassword");

      [emailInput, passwordInput].forEach((input) => {
        if (input && input.value.trim() === "") {
          input.classList.add("is-invalid");
          isValid = false;
        } else if (input) {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
        }
      });

      if (isValid) {
        const storedAccount = JSON.parse(localStorage.getItem("userAccount"));
        if (
          storedAccount &&
          emailInput.value.trim() === storedAccount.email &&
          passwordInput.value.trim() === storedAccount.password
        ) {
          storedAccount.isLoggedIn = true;
          localStorage.setItem("userAccount", JSON.stringify(storedAccount));

          Swal.fire({
            icon: "success",
            title: "Welcome Back!",
            text: "You have successfully signed in!",
          }).then(() => {
            window.location.href = "../index.html";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid Credentials",
            text: "Email or password is incorrect. Please try again.",
          });
        }
      }
    }
  });
}
