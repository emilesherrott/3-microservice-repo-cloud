document.addEventListener("DOMContentLoaded", renderLogout)

function renderLogout() {
  if (localStorage.getItem("token")) {
    const navbar = document.querySelector(".nav-items")

    const logoutButton = document.createElement("li")
    logoutButton.textContent = "Logout"

    navbar.appendChild(logoutButton)

    logoutButton.addEventListener("click", logout)
  }
}

function logout(e) {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  e.target.remove()

  window.location.assign("./index.html")
}
