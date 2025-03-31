document.addEventListener("DOMContentLoaded", renderPage)

function renderPage() {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("user")
  if (token && role) {
    if (role === "potter") {
      const navbar = document.querySelector(".nav-items")
      const potterButton = document.createElement("li")
      potterButton.textContent = "Potter Dashboard"
      potterButton.addEventListener("click", () => {
        window.location.href = "potter-dashboard.html"
      })
      navbar.appendChild(potterButton)
    } else if (role === "customer") {
      const navbar = document.querySelector(".nav-items")
      const customerButton = document.createElement("li")
      customerButton.textContent = "Customer Dashboard"
      customerButton.addEventListener("click", () => {
        window.location.href = "customer-dashboard.html"
      })
      navbar.appendChild(customerButton)
    }
  }
}
