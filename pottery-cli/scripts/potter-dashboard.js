const addPotterySection = document.querySelector("#add-pottery-item");
const potterySection = document.querySelector("#pottery-section");
const addPotteryForm = document.querySelector("#add-pottery-form");
const visualiseH2 = document.querySelector("#visualise-h2");
const visualiseDiv = document.querySelector("#visualise-div");
const styleButton = document.querySelector("#visualise-h2-button");
const renderPieSection = document.querySelector("#render-img");
const closeButton = document.querySelector("#close-render");
const clearButton = document.querySelector("#remove-data");

const createPotteryItem = async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorisation: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        pieceName: capitaliseWords(form.get("pieceName")),
        clay: capitaliseWords(form.get("clay")),
        style: capitaliseWords(form.get("style")),
        price: form.get("price"),
        size: `${form.get("size")}cm`,
      }),
    };

    const response = await fetch("http://localhost:3000/ceramics/create", options);
    const responseData = await response.json();

    if (responseData.success) {
      loadPotteryInventory();
      addPotteryForm.reset();
    }
  } catch (err) {
    console.log(err);
  }
};

const renderVisualisation = async (id) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorisation: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: id,
      }),
    };
    const response = await fetch("http://localhost:3000/sales/salesInfo", options);
    const responseData = await response.json();
    if (responseData.success) {
      visualiseH2.textContent = "Purchase History";
      visualiseDiv.innerHTML = responseData.visualisatinon.visualisation_html;

      clearButton.classList.remove("hidden");

      clearButton.addEventListener(
        "click",
        () => {
          visualiseDiv.innerHTML = "";
          clearButton.classList.add("hidden");
          visualiseH2.textContent = "";
        },
        { once: true } 
      );

      const scripts = visualiseDiv.querySelectorAll("div > script");

      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const visualiseStyleInfo = async () => {
  try {
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorisation: localStorage.getItem("token"),
      },
    };
    const response = await fetch("http://localhost:3000/sales/styleInfo", options);
    const responseData = await response.json();
    if (responseData.success) {
      renderPieSection.innerHTML = responseData.visualisatinon.visualisation_html;

      closeButton.classList.remove("hidden");

      closeButton.addEventListener("click", () => {
        renderPieSection.innerHTML = "";
        closeButton.classList.add("hidden"); 
      });
    }
  } catch (err) {
    console.log(err);
  }
};

addPotteryForm.addEventListener("submit", createPotteryItem);
styleButton.addEventListener("click", visualiseStyleInfo);

const loadPotteryInventory = async () => {
  try {
    potterySection.innerHTML = "";
    const options = {
      headers: {
        authorisation: localStorage.getItem("token"),
      },
    };
    const response = await fetch("http://localhost:3000/ceramics/inventory", options);
    const data = await response.json();
    console.log(data);

    data.map((i) => {
      const article = document.createElement("article");

      const subHeader = document.createElement("p");
      subHeader.classList.add("subheader");

      const clayUsed = document.createElement("p");
      const size = document.createElement("p");
      const style = document.createElement("p");
      const price = document.createElement("p");
      const visualiseButton = document.createElement("button");
      visualiseButton.classList.add("visualise-button");

      visualiseButton.addEventListener("click", () => {
        renderVisualisation(i.id);
      });

      subHeader.textContent = i.piece;
      clayUsed.textContent = `Clay: ${i.clay_used}`;
      size.textContent = `Size: ${i.size}`;
      style.textContent = `Style: ${i.style}`;
      price.textContent = `Price: £${i.price}`;
      visualiseButton.textContent = `Visualise Sales History`;

      article.appendChild(subHeader);
      article.appendChild(clayUsed);
      article.appendChild(size);
      article.appendChild(style);
      article.appendChild(price);
      article.appendChild(visualiseButton);

      potterySection.appendChild(article);
    });
  } catch (error) {
    console.log(error.message);
  }
};

loadPotteryInventory();

function capitaliseWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
