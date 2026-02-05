const cartBtn = document.getElementById("cart_button");
const floatingNav = document.querySelector(".floating_nav");
const cartCount = document.querySelector(".cart_number");
const cartBox = document.getElementById("addedCart_items");

const productRow = document.getElementById("productRow");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageNumber = document.getElementById("pageNumber");

let count = 0;

// PRODUCTS DATA
const products = [
  { name: "Person 1", img: "images/person_1.jpg" },
  { name: "Person 2", img: "images/person_2.jpg" },
  { name: "Person 3", img: "images/person_3.jpg" },
  { name: "Person 4", img: "images/person_4.jpg" },
  { name: "Person 5", img: "images/person_5.jpg" },
  { name: "Person 6", img: "images/person_6.jpg" },
];

const itemsPerPage = 3;
let currentPage = 1;

// CART TOGGLE
cartBtn.addEventListener("click", () => {
  floatingNav.classList.toggle("floating_active");
});

// DISPLAY PRODUCTS
function displayProducts() {
  productRow.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = products.slice(start, end);

  pageItems.forEach((product) => {
    const div = document.createElement("div");
    div.className = "col";

    div.innerHTML = `
      <img src="${product.img}">
      <h3>${product.name}</h3>
      <button class="buy_now">Buy Now</button>
    `;

    productRow.appendChild(div);

    // BUY NOW
    div.querySelector(".buy_now").addEventListener("click", () => {
      count++;
      cartCount.innerText = count;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      cartItem.innerHTML = `
        <img src="${product.img}">
        <span>${product.name}</span>
        <button class="remove">X</button>
      `;

      cartBox.appendChild(cartItem);

      // REMOVE
      cartItem.querySelector(".remove").addEventListener("click", () => {
        cartItem.remove();
        count--;
        cartCount.innerText = count;
      });
    });
  });

  pageNumber.innerText = currentPage;
}

// PAGINATION
nextBtn.addEventListener("click", () => {
  if (currentPage < Math.ceil(products.length / itemsPerPage)) {
    currentPage++;
    displayProducts();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
});

// INIT
displayProducts();
