/* =========================================
   NEROLI SOAP
   PRODUCTS + CART + WHATSAPP
========================================= */

const WHATSAPP_NUMBER = "971566724259";


/* PRODUCTS */

const products = [

  {
    id: 1,
    name: "Olive & Neroli",
    category: "صابونة طبيعية",
    description: "زيت الزيتون مع رائحة زهر البرتقال الناعمة.",
    price: 35,
    badge: "الأكثر مبيعًا"
  },

  {
    id: 2,
    name: "Neroli Blossom",
    category: "صابونة طبيعية",
    description: "تركيبة عطرية هادئة مستوحاة من حدائق النيرولي.",
    price: 38,
    badge: "جديد"
  },

  {
    id: 3,
    name: "Green Ritual",
    category: "صابونة نباتية",
    description: "مزيج نباتي منعش للاستخدام اليومي.",
    price: 32,
    badge: ""
  },

  {
    id: 4,
    name: "Pure Olive",
    category: "صابونة زيت الزيتون",
    description: "تركيبة بسيطة تعتمد على زيت الزيتون.",
    price: 30,
    badge: ""
  },

  {
    id: 5,
    name: "Neroli Luxury",
    category: "إصدار فاخر",
    description: "تجربة أكثر فخامة مع رائحة النيرولي.",
    price: 45,
    badge: "Premium"
  },

  {
    id: 6,
    name: "Daily Ritual Set",
    category: "مجموعة",
    description: "مجموعة مختارة من 3 قطع للعناية اليومية.",
    price: 95,
    badge: "وفر 15%"
  }

];


let cart = [];


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts() {

  const grid = document.getElementById("product-grid");

  grid.innerHTML = "";

  products.forEach(product => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

      <div class="product-image">

        ${
          product.badge
          ? `<span class="product-badge">${product.badge}</span>`
          : ""
        }

        <span class="product-letter">N</span>

      </div>


      <div class="product-info">

        <div class="product-category">
          ${product.category}
        </div>

        <h3>
          ${product.name}
        </h3>

        <p class="product-description">
          ${product.description}
        </p>


        <div class="product-bottom">

          <strong class="product-price">
            ${product.price} د.إ
          </strong>

          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
          >
            أضف للسلة
          </button>

        </div>

      </div>

    `;

    grid.appendChild(card);

  });

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

  const product = products.find(
    item => item.id === productId
  );

  if (!product) return;

  const existing = cart.find(
    item => item.id === productId
  );

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  updateCart();

  toggleCart(true);

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  cartCount.textContent = totalQuantity;

  cartTotal.textContent = totalPrice.toFixed(2);


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="cart-empty">

        <div>🛒</div>

        <p>
          السلة فارغة حاليًا
        </p>

        <a href="#shop" onclick="toggleCart()">
          اكتشف المنتجات
        </a>

      </div>

    `;

    return;

  }


  cartItems.innerHTML = "";


  cart.forEach(item => {

    const element = document.createElement("div");

    element.className = "cart-item";

    element.innerHTML = `

      <div class="cart-item-image">
        N
      </div>


      <div>

        <h4>
          ${item.name}
        </h4>

        <p>
          ${item.price} د.إ
        </p>


        <div class="quantity-controls">

          <button onclick="changeQuantity(${item.id}, -1)">
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button onclick="changeQuantity(${item.id}, 1)">
            +
          </button>

        </div>

      </div>


      <button
        class="remove-item"
        onclick="removeFromCart(${item.id})"
      >
        حذف
      </button>

    `;

    cartItems.appendChild(element);

  });

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(productId, amount) {

  const item = cart.find(
    item => item.id === productId
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    cart = cart.filter(
      item => item.id !== productId
    );

  }

  updateCart();

}


/* =========================================
   REMOVE
========================================= */

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  updateCart();

}


/* =========================================
   TOGGLE CART
========================================= */

function toggleCart(forceOpen = null) {

  const modal = document.getElementById("cartModal");
  const backdrop = document.getElementById("cartBackdrop");

  const shouldOpen =
    forceOpen !== null
      ? forceOpen
      : !modal.classList.contains("active");


  if (shouldOpen) {

    modal.classList.add("active");
    backdrop.classList.add("active");

    document.body.style.overflow = "hidden";

  } else {

    modal.classList.remove("active");
    backdrop.classList.remove("active");

    document.body.style.overflow = "";

  }

}


/* =========================================
   WHATSAPP CHECKOUT
========================================= */

function checkoutWhatsApp() {

  if (cart.length === 0) {

    alert("السلة فارغة. أضف منتجًا أولاً.");

    return;

  }


  let message =
    "مرحباً Neroli Soap 🌿%0A%0A" +
    "أرغب في طلب المنتجات التالية:%0A%0A";


  cart.forEach(item => {

    message +=
      `• ${item.name} × ${item.quantity} = ${item.price * item.quantity} د.إ%0A`;

  });


  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  message +=
    `%0Aالمجموع: ${total.toFixed(2)} د.إ%0A%0A` +
    "يرجى التواصل معي لتأكيد الطلب والتوصيل.";


  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


  window.open(url, "_blank");

}


/* =========================================
   ORDER FORM
========================================= */

function populateProductSelect() {

  const select =
    document.getElementById("product");


  products.forEach(product => {

    const option =
      document.createElement("option");

    option.value = product.id;

    option.textContent =
      `${product.name} — ${product.price} د.إ`;

    select.appendChild(option);

  });

}


document
  .getElementById("order-form")
  .addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
      document.getElementById("name").value;

    const phone =
      document.getElementById("phone").value;

    const productId =
      Number(document.getElementById("product").value);

    const quantity =
      Number(document.getElementById("quantity").value);

    const note =
      document.getElementById("message").value;


    const product =
      products.find(
        item => item.id === productId
      );


    if (!product) {

      alert("يرجى اختيار المنتج.");

      return;

    }


    const total =
      product.price * quantity;


    let message =
      "مرحباً Neroli Soap 🌿%0A%0A" +

      "طلب جديد:%0A%0A" +

      `الاسم: ${encodeURIComponent(name)}%0A` +

      `الهاتف: ${encodeURIComponent(phone)}%0A` +

      `المنتج: ${encodeURIComponent(product.name)}%0A` +

      `الكمية: ${quantity}%0A` +

      `السعر: ${total} د.إ%0A`;


    if (note.trim() !== "") {

      message +=
        `الملاحظة: ${encodeURIComponent(note)}%0A`;

    }


    message +=
      "%0Aأرغب بتأكيد الطلب والتوصيل.";


    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    );

  });


/* =========================================
   3D MOUSE EFFECT
========================================= */

function enable3DEffect() {

  const cards =
    document.querySelectorAll(".product-card");


  cards.forEach(card => {

    card.addEventListener("mousemove", event => {

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;


      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;


      const rotateX =
        ((y - centerY) / centerY) * -4;

      const rotateY =
        ((x - centerX) / centerX) * 4;


      card.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });

}


/* =========================================
   YEAR
========================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================================
   START
========================================= */

displayProducts();

populateProductSelect();

updateCart();

enable3DEffect();
