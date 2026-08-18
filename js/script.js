/* ==========================================================
   إعدادات لازم تغيّريها
   ========================================================== */
const WHATSAPP_NUMBER = "9627XXXXXXXX";

/* ========================================================== */

const grid = document.getElementById("product-grid");
const productSelect = document.getElementById("product");

function waLink(productName){
  const msg = encodeURIComponent(`مرحبا، بدي اطلب: ${productName}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

// الدالة الجديدة لجلب المنتجات من ملف JSON الخاص بلوحة التحكم
async function fetchAndRenderProducts() {
  try {
    const response = await fetch('data/products.json');
    const data = await response.json();
    const productsArray = data.products || [];

    productsArray.forEach((p) => {
      const card = document.createElement("article");
      card.className = "soap-card";

      const thumb = document.createElement("div");
      thumb.className = "soap-thumb";
      thumb.style.setProperty("--card-color", p.color || "#5C6B3F");

      if (p.image) {
        const img = document.createElement("img");
        // معالجة المسار عشان لوحة التحكم
        img.src = p.image.startsWith('images/') ? p.image : `images/${p.image.split('/').pop()}`;
        img.alt = p.name;
        thumb.appendChild(img);
      } else {
        const stamp = document.createElement("span");
        stamp.className = "thumb-stamp";
        stamp.textContent = "ج";
        thumb.appendChild(stamp);
      }

      card.innerHTML = `
        <h3></h3>
        <p class="soap-desc"></p>
        <div class="soap-meta">
          <span class="soap-price"></span>
        </div>
      `;
      card.querySelector("h3").textContent = p.name;
      card.querySelector(".soap-desc").textContent = p.desc;
      card.querySelector(".soap-price").textContent = p.price;
      card.insertBefore(thumb, card.firstChild);

      const orderBtn = document.createElement("a");
      orderBtn.className = "soap-order-btn";
      orderBtn.href = waLink(p.name);
      orderBtn.target = "_blank";
      orderBtn.rel = "noopener";
      orderBtn.textContent = "اطلب عبر واتساب";
      card.appendChild(orderBtn);

      grid.appendChild(card);

      const opt = document.createElement("option");
      opt.value = p.name;
      opt.textContent = p.name;
      productSelect.appendChild(opt);
    });
  } catch (error) {
    console.error("خطأ في جلب المنتجات:", error);
  }
}

// تشغيل الدالة
fetchAndRenderProducts();

/* رابط واتساب في الفوتر */
document.getElementById("footer-whatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}`;

/* السنة في الفوتر */
document.getElementById("year").textContent = new Date().getFullYear();

/* ==========================================================
   نموذج الطلب - يرسل عبر Formspree ويوصلك إشعار بالإيميل
   ========================================================== */
const form = document.getElementById("order-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "جاري إرسال الطلب...";

  const data = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });
    if (res.ok) {
      status.textContent = "تم إرسال طلبك بنجاح! رح نتواصل معك قريبًا.";
      form.reset();
    } else {
      status.textContent = "صار في مشكلة، جربي تطلبي عبر واتساب بدل هيك.";
    }
  } catch (err) {
    status.textContent = "صار في مشكلة بالاتصال، جربي تطلبي عبر واتساب بدل هيك.";
  }
});
