const potterySection = document.querySelector("#pottery-section");

const loadPottryIndex = async () => {
  try {
    const response = await fetch("http://localhost:3000/ceramics/");
    const data = await response.json();
    console.log(data);

    data.map((i) => {
      // Create article elements
      const article = document.createElement("article");
      article.setAttribute("data-item-id", i.id); // Store the id in a data attribute

      const subHeader = document.createElement("p");
      subHeader.classList.add("subheader");
      const creator = document.createElement("p"); // Creator name element
      const clayUsed = document.createElement("p");
      const size = document.createElement("p");
      const style = document.createElement("p");
      const price = document.createElement("p"); // New price element

      subHeader.textContent = i.piece;
      creator.textContent = `Creator: ${i.creator}`; // Add creator text
      clayUsed.textContent = i.clay;
      size.textContent = i.size;
      style.textContent = i.style;
      price.textContent = `Price: £${i.price}`; // Display the price

      // Create div for quantity input and purchase button
      const purchaseDiv = document.createElement("div");
      purchaseDiv.classList.add("purchase-piece"); // Add class to the div

      // Create input field for quantity
      const quantityInput = document.createElement("input");
      quantityInput.classList.add("purchase-quantity");
      quantityInput.type = "number";
      quantityInput.min = 1; // Minimum value of 1
      quantityInput.placeholder = "Enter quantity";

      // Create purchase button
      const purchaseButton = document.createElement("button");
      purchaseButton.classList.add("purchase-button");
      purchaseButton.textContent = "Purchase";

      // Append input and button to the purchase div
      purchaseDiv.appendChild(quantityInput);
      purchaseDiv.appendChild(purchaseButton);

      // Add event listener to the purchase button
      purchaseButton.addEventListener("click", () => {
        const itemId = article.getAttribute("data-item-id"); // Retrieve the id from the data attribute
        handlePurchase(itemId, quantityInput.value, purchaseButton); // Pass id to handlePurchase
      });

      // Append elements to article
      article.appendChild(subHeader);
      article.appendChild(creator); // Append creator
      article.appendChild(clayUsed);
      article.appendChild(size);
      article.appendChild(style);
      article.appendChild(price); // Append the price
      article.appendChild(purchaseDiv); // Append the purchase div

      // Append article to potterySection
      potterySection.appendChild(article);
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Handle the purchase action using async/await
async function handlePurchase(itemId, quantity, purchaseButton) {
  const purchaseData = {
    saleTime: getCurrentDate(),
    saleNumber: quantity,
    ceramicItem: itemId,
  };

  try {
    // Sending purchase data via fetch (or any other method for server interaction)
    const response = await fetch("http://localhost:3000/sales/makeSale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorisation": localStorage.getItem("token"), // Added proper 'Authorization' header
      },
      body: JSON.stringify(purchaseData),
    });

    const responseData = await response.json();
    if (responseData.success) {
      // Change button style and text to "Success"
      purchaseButton.textContent = "Success";
      purchaseButton.style.backgroundColor = "#90EE90";
      
      // Reset button after 3 seconds
      setTimeout(() => {
        purchaseButton.textContent = "Purchase";
        purchaseButton.style.backgroundColor = "#FFEAD5"; // Reset to original background color
      }, 3000); // 3000ms = 3 seconds
    }
  } catch (error) {
    console.error("Error processing purchase:", error);
  }
}

loadPottryIndex();

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so +1)
  const day = String(today.getDate()).padStart(2, '0'); // Ensure two digits for day

  return `${year}-${month}-${day}`;
}
