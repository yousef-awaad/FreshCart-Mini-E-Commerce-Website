(function () {
  const storedAccount = JSON.parse(localStorage.getItem("userAccount"));

  if (!storedAccount) {
    window.location.replace("../pages/sign-up.html");
  } else if (!storedAccount.isLoggedIn) {
    window.location.replace("../pages/sign-in.html");
  } else {
    document.body.classList.remove("hidden-until-check");
  }
})();
