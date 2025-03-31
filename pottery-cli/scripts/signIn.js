const roleTypeForm = document.querySelector("#role-type-form");
const signInSection = document.querySelector("#sign-in-section");

let role;
let responseData;

const roleFromLocalStorage = localStorage.getItem('user')
if(roleFromLocalStorage) {
  role = roleFromLocalStorage;
  selectRoleInForm(role);
  renderSignInForm()
}

roleTypeForm.addEventListener("change", renderSignInForm);

function renderSignInForm() {
  const selectedRole = document.querySelector('input[name="role"]:checked');
  role = selectedRole.value;
  createSignInForm();
}

function selectRoleInForm(role) {
  const selectedRadioButton = document.querySelector(`input[name="role"][value="${role}"]`);
  if (selectedRadioButton) {
    selectedRadioButton.checked = true;
  }
}

function createSignInForm() {
  localStorage.removeItem('user')
  signInSection.innerHTML = ""; 
  const form = document.createElement("form");
  form.addEventListener("submit", submitDetails);
  form.id = "sign-in-form";
  signInSection.append(form);

  form.append(
    createFormField("Username:", "username", "username", "text"),
    createFormField("Password:", "password", "password", "password"),
    createSubmitButton()
  );
}

function createFormField(labelText, inputId, inputName, inputType) {
  const fieldDiv = document.createElement("div");
  fieldDiv.classList.add("form-section");

  const label = document.createElement("label");
  label.setAttribute("for", inputId);
  label.textContent = labelText;

  const input = document.createElement("input");
  input.id = inputId;
  input.name = inputName;
  input.type = inputType;
  input.required = true;

  fieldDiv.append(label, input);
  return fieldDiv;
}

function createSubmitButton() {
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Sign In";
  submitButton.id = "submit-button";
  return submitButton;
}

async function submitDetails(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  let loginUrl;
  if (role === "potter") {
    loginUrl = "http://localhost:3000/users/potter/login";
  } else if (role === "customer") {
    loginUrl = "http://localhost:3000/users/owner/login";
  }

  try {
    console.log(data)
    console.log(loginUrl)
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    responseData = await response.json()

    if (responseData.success) {
      localStorage.setItem("token", responseData.token)
      localStorage.setItem('user', role)
      if(role === "potter") {
        window.location.assign("potter-dashboard.html")
      } else if(role === "customer") {
        window.location.assign("customer-dashboard.html")
      }

    } else {
      const failedSection = document.querySelector("#failed-signin")
      failedSection.textContent = "Invalid Credentails"
      setTimeout(() => {
        failedSection.textContent = ""
      }, 5000)
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
