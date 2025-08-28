const logoutBtn = document.getElementById("logoutBtn");
const account = JSON.parse(localStorage.getItem("userAccount"));

function getRedirectPath(page) {
  const isIndex = location.pathname.endsWith("index.html") || location.pathname === "/" ;
  return isIndex ? `pages/${page}` : `../pages/${page}`;
}

if (logoutBtn) {
  function setButton(label, redirectPage, isDanger) {
    logoutBtn.textContent = label;

    if (isDanger) {
      logoutBtn.classList.replace("btn-primary", "btn-danger");
    } else {
      logoutBtn.classList.replace("btn-danger", "btn-primary");
    }

    logoutBtn.onclick = () => {
      if (label.toLowerCase() === "logout" && account) {
        account.isLoggedIn = false;
        localStorage.setItem("userAccount", JSON.stringify(account));
      }
      window.location.href = getRedirectPath(redirectPage);
    };
  }

  if (!account) {
    setButton("Register", "sign-up.html", false);
  } else if (!account.isLoggedIn) {
    setButton("Sign In", "sign-in.html", false);
  } else {
    setButton("Logout", "sign-in.html", true);
  }
}
