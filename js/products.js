const productGrid = document.getElementById("productGrid");
const addProductForm = document.getElementById("addProductForm");
const productModalEl = document.getElementById("addProductModal");
const productCount = document.getElementById("product-count");
const sortButton = document.getElementById("sortDropdown");
const dropdownItems = document.querySelectorAll("[data-sort]");

let productModal;
if (productModalEl) {
  productModal =
    bootstrap.Modal.getInstance(productModalEl) ||
    new bootstrap.Modal(productModalEl);
}

function initTooltips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
}

function renderProducts(list = products) {
  if (!productGrid) return;

  productGrid.innerHTML = "";

  if (!Array.isArray(list) || list.length === 0) {
    productGrid.innerHTML =
      '<p class="text-center text-muted">No products available</p>';
    if (productCount) productCount.textContent = 0;
    return;
  }

  list.forEach((product) => {
    const cardHTML = `
      <div class="col">
        <div class="card h-100 product-card">
          <div class="card-body p-3 position-relative text-start">
            <div class="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1">
              ${
                product.sale
                  ? `<span class="badge bg-danger">${product.sale}</span>`
                  : ""
              }
              ${
                product.discount
                  ? `<span class="badge bg-success">${product.discount}</span>`
                  : ""
              }
            </div>

            <!-- Image wrapper with background image -->
            <div class="product-image-wrapper" style="background-image: url('${
              product.image
            }')"></div>

            <div class="product-actions d-flex justify-content-center gap-2 position-absolute w-100">
              <a href="#" class="btn btn-sm product-action" data-bs-toggle="tooltip" data-bs-placement="top" title="Quick View">
                <i class="bi bi-eye"></i>
              </a>
              <a href="#" class="btn btn-sm product-action" data-bs-toggle="tooltip" data-bs-placement="top" title="Wishlist">
                <i class="bi bi-heart"></i>
              </a>
              <a href="#" class="btn btn-sm product-action" data-bs-toggle="tooltip" data-bs-placement="top" title="Compare">
                <i class="bi bi-arrow-left-right"></i>
              </a>
            </div>

            <div class="text-secondary small mb-1">${product.category}</div>
            <h6 class="fw-semibold mb-2">
              <a href="${
                product.link || "#"
              }" class="text-decoration-none text-dark">${product.name}</a>
            </h6>

            <div class="d-inline-flex align-items-center gap-1 mb-2">
              <small class="text-warning">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
              </small>
              <span class="text-muted small">4.3 (4)</span>
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="fw-semibold text-dark">$${product.price}</span>
                ${
                  product.oldPrice
                    ? `<span class="text-decoration-line-through text-muted">$${product.oldPrice}</span>`
                    : ""
                }
              </div>
              <a href="#" class="btn btn-primary btn-sm"><i class="bi bi-plus-lg"></i> Add</a>
            </div>
          </div>
        </div>
      </div>
    `;
    productGrid.insertAdjacentHTML("beforeend", cardHTML);
  });

  if (productCount) productCount.textContent = list.length;

  initTooltips();
}

function sortProducts(type) {
  let sortedList = [...products];
  if (type === "low") sortedList.sort((a, b) => a.price - b.price);
  else if (type === "high") sortedList.sort((a, b) => b.price - a.price);
  renderProducts(sortedList);
}

renderProducts();

dropdownItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const sortType = item.getAttribute("data-sort");
    sortButton.textContent = `Sort by: ${item.textContent}`;
    sortProducts(sortType);
  });
});

if (addProductForm) {
  addProductForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value.trim();
    const price = parseFloat(document.getElementById("productPrice").value);
    const oldPrice = parseFloat(
      document.getElementById("productOldPrice").value
    );
    const discount = document.getElementById("productDiscount").value.trim();
    const sale = document.getElementById("productSale").value.trim();
    const image = document.getElementById("productImageLink").value.trim();
    const link = "#";

    if (!name || !category || isNaN(price) || !image) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    const newProduct = {
      name,
      category,
      price,
      oldPrice: isNaN(oldPrice) ? null : oldPrice,
      discount: discount || null,
      sale: sale || null,
      image,
      link,
    };

    products.push(newProduct);

    renderProducts();

    addProductForm.reset();

    Swal.fire({
      icon: "success",
      title: "Product Added!",
      text: `${name} has been added successfully.`,
      confirmButtonColor: "#3085d6",
    });

    productModal.hide();
  });
}
