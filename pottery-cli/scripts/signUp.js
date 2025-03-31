const roleTypeForm = document.querySelector("#role-type-form")
const signUpSection = document.querySelector("#sign-up-section")

let role

roleTypeForm.addEventListener("change", renderSignUpForm)

function renderSignUpForm() {
  const selectedRole = document.querySelector('input[name="role"]:checked')
  role = selectedRole.value
  createForm()
}

function createForm() {
  signUpSection.innerHTML = ""
  const form = document.createElement("form")
  form.addEventListener("submit", submitDetails)
  form.id = "sign-up-form"
  signUpSection.append(form)

  function createFormField(labelText, inputId, inputName, inputType) {
    const fieldDiv = document.createElement("div")
    fieldDiv.classList.add("form-section")

    const label = document.createElement("label")
    label.setAttribute("for", inputId)
    label.textContent = labelText

    const input = document.createElement("input")
    input.id = inputId
    input.name = inputName
    input.type = inputType
    input.required = true

    fieldDiv.append(label, input)
    return fieldDiv
  }

  if (role === "potter") {
    form.append(
      createFormField("Username:", "username", "username", "text"),
      createFormField("First Name:", "firstname", "firstname", "text"),
      createFormField("Last Name:", "lastname", "lastname", "text"),
      createFormField("Password:", "password", "password", "password"),
      createFormField("Studio Postcode:", "studio_postcode", "studio_postcode", "text"),
      createSubmitButton()
    )
  }

  if (role === "customer") {
    form.append(
      createFormField("Username:", "username", "username", "text"),
      createFormField("First Name:", "firstname", "firstname", "text"),
      createFormField("Last Name:", "lastname", "lastname", "text"),
      createFormField("Password:", "password", "password", "password"),
      createFormField("Postcode:", "postcode", "postcode", "text"),
      createSubmitButton()
    )
  }
}

function createSubmitButton() {
  const submitButton = document.createElement("button")
  submitButton.type = "submit"
  submitButton.textContent = "Submit"
  submitButton.id = "submit-button"
  return submitButton
}

async function submitDetails(e) {
  e.preventDefault()

  const formData = new FormData(e.target)

  const data = {
    username: formData.get("username"),
    firstname: capitaliseWords(formData.get("firstname")),
    lastname: capitaliseWords(formData.get("lastname")),
    password: formData.get("password"),
  }

  if (role === "potter") {
    data.studioPostcode = formData.get("studio_postcode")
  } else if (role === "customer") {
    data.postcode = formData.get("postcode")
  }

  try {
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.status === 201) {
      localStorage.setItem('user', role)
      window.location = "sign-in.html"
    }
  } catch (error) {
    console.error("Error:", error)
  }
}

function capitaliseWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}
