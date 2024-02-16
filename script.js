// Function to create a product object
function createProduct(name, description, price) {
    return {
        name: name,
        description: description,
        price: price
    };
}

// Function to add product
function addProduct() {
    // Get input values
    var productName = document.getElementById("productName").value;
    var productDescription = document.getElementById("productDescription").value;
    var productPrice = parseFloat(document.getElementById("productPrice").value);

    // Create product object
    var product = createProduct(productName, productDescription, productPrice);

    // Get existing products from local storage or initialize an empty array
    var products = JSON.parse(localStorage.getItem("products")) || [];

    // Add new product to the array
    products.push(product);

    // Save updated products array to local storage
    localStorage.setItem("products", JSON.stringify(products));

    // Refresh the product list
    displayProducts();
}

// Function to display products
function displayProducts() {
    // Get product list element
    var productList = document.getElementById("productList");

    // Clear existing list items
    productList.innerHTML = "";

    // Get products from local storage
    var products = JSON.parse(localStorage.getItem("products")) || [];

    // Add each product to the list
    products.forEach(function(product, index) {
        var li = document.createElement("li");
        li.innerHTML = "<strong>" + product.name + "</strong>: " + product.description + " - Rs" + product.price.toFixed(2);
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteProduct(index);
        };
        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = function() {
            openUpdateForm(index, product);
        };
        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        productList.appendChild(li);
    });
}

// Function to delete product
function deleteProduct(index) {
    // Get products from local storage
    var products = JSON.parse(localStorage.getItem("products")) || [];
    // Remove product at specified index
    products.splice(index, 1);
    // Save updated products array to local storage
    localStorage.setItem("products", JSON.stringify(products));
    // Refresh the product list
    displayProducts();
}

// Function to open update form
function openUpdateForm(index, product) {
    // Create a form with pre-filled values
    var formHTML = `
        <form id="updateForm">
            <label for="updateProductName">Product Name:</label>
            <input type="text" id="updateProductName" value="${product.name}">
            <label for="updateProductDescription">Product Description:</label>
            <input type="text" id="updateProductDescription" value="${product.description}">
            <label for="updateProductPrice">Product Price:</label>
            <input type="number" id="updateProductPrice" step="0.01" value="${product.price}">
            <button type="button" onclick="updateProduct(${index})">Update</button>
        </form>
    `;
    // Display the form
    document.getElementById("container").innerHTML += formHTML;
}

// Function to update product
function updateProduct(index) {
    // Get input values from the update form
    var updatedProductName = document.getElementById("updateProductName").value;
    var updatedProductDescription = document.getElementById("updateProductDescription").value;
    var updatedProductPrice = parseFloat(document.getElementById("updateProductPrice").value);

    // Get existing products from local storage
    var products = JSON.parse(localStorage.getItem("products")) || [];

    // Update the product at the specified index
    products[index].name = updatedProductName;
    products[index].description = updatedProductDescription;
    products[index].price = updatedProductPrice;

    // Save updated products array to local storage
    localStorage.setItem("products", JSON.stringify(products));

    // Refresh the product list
    displayProducts();

    // Remove the update form from the DOM
    document.getElementById("updateForm").remove();
}

// Display existing products when the page loads
displayProducts();
