
// Show login status
function checkLogin() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
    }
}

// Logout
function logout() {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "login.html";
}

// Register
async function registerUser() {
    const user = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    alert("Registered successfully!");
}

// Login
async function loginUser() {
    const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: loginEmail.value,
            password: loginPassword.value
        })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login success!");
        window.location.href = "add-product.html";
    } else {
        alert("Invalid credentials!");
    }
}

// Add Product
async function addProduct() {
    checkLogin();

    const token = localStorage.getItem("token");
    const imageFile = document.getElementById("image").files[0];

    const formData = new FormData();
    formData.append("name", document.getElementById("productName").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("type", document.getElementById("type").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("image", imageFile);

    const response = await fetch(`${BASE_URL}/products/add`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: formData
    });

    if (response.ok) {
        alert("Product added with image successfully!");
        window.location.href = "products.html";
    } else {
        alert("Failed to add product!");
    }
}

// Load Products
   async function loadProducts() {
    const res = await fetch(`${BASE_URL}/products/all`);
    const products = await res.json();

    const container = document.getElementById("productList");
    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
    <div class="product-card">
        ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}">` : ""}
        <h3>${p.name}</h3>
        <p><strong>Category:</strong> ${p.category}</p>
        <p><strong>Type:</strong> ${p.type}</p>
        <p><strong>Price:</strong> ₹${p.price}</p>
        <p>${p.description}</p>

        <div class="btn-group">
            <button class="buy-btn" onclick="buyProduct('${p.name}', '${p.sellerEmail}')">Buy</button>
        </div>
    </div>
        `;
    });
}


// Delete Product
async function deleteProduct(id) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first!");
        return;
    }

    const response = await fetch(`${BASE_URL}/products/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const result = await response.text();
    alert(result);

    loadProducts();
}
  // My Product
    async function loadMyProducts() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(`${BASE_URL}/products/my-products`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const products = await response.json();

    const container = document.getElementById("productList");
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<h3 style='text-align:center;'>No products uploaded yet.</h3>";
        return;
    }

    products.forEach(p => {
       container.innerHTML += `
    <div class="product-card">
        ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}">` : ""}
        <h3>${p.name}</h3>
        <p><strong>Category:</strong> ${p.category}</p>
        <p><strong>Type:</strong> ${p.type}</p>
        <p><strong>Price:</strong> ₹${p.price}</p>
        <p>${p.description}</p>

        <div class="btn-group">
            <button class="edit-btn" onclick="editProduct(${p.id})">Edit</button>
            <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
        </div>
    </div>
    `;
    });
}

    //edit
    function editProduct(id) {
    localStorage.setItem("editProductId", id);
    window.location.href = "edit-product.html";
}

    //load product data
    async function loadEditProduct() {
    const id = localStorage.getItem("editProductId");

    const res = await fetch(`${BASE_URL}/products/${id}`);
    const p = await res.json();

    document.getElementById("name").value = p.name;
    document.getElementById("category").value = p.category;
    document.getElementById("type").value = p.type;
    document.getElementById("price").value = p.price;
    document.getElementById("description").value = p.description;
}

    //update product
    async function updateProduct() {
    const id = localStorage.getItem("editProductId");
    const token = localStorage.getItem("token");

    const updatedProduct = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        type: document.getElementById("type").value,
        price: parseFloat(document.getElementById("price").value),
        description: document.getElementById("description").value
    };

    const response = await fetch(`${BASE_URL}/products/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(updatedProduct)
    });

    if (response.ok) {
        alert("Product updated successfully!");
        window.location.href = "my-products.html";
    } else {
        alert("Update failed!");
    }
}

 // Search bar
 function searchProducts() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        if (text.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

    //Buy Function
    function buyProduct(productName, sellerEmail){
        alert(
            "🛒 Product: " + productName + "\n\n" +
            "Seller Contact: " + sellerEmail + "\n\n" +
            "You can contact seller to buy this item."
        );
    }