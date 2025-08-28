const swiper = new Swiper(".hero-slider", {
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".hero-pagination",
    clickable: true,
  },
  speed: 500,
});

const categories = [
  {
    name: "Cleaning Essentials",
    img: "images/category-slider/cleaning-essentials.jpg",
    link: "#",
  },
  { name: "Pet Care", img: "images/category-slider/pet-care.jpg", link: "#" },
  {
    name: "Fruits & Vegetables",
    img: "images/category-slider/Vegetables-Fruits.jpg",
    link: "#",
  },
  {
    name: "Beverages",
    img: "images/category-slider/beverages.jpg",
    link: "#",
  },
  {
    name: "Dairy & Bakery",
    img: "images/category-slider/dairy-bakery.jpg",
    link: "#",
  },
  {
    name: "Snack & Munchies",
    img: "images/category-slider/snack-munchies.jpg",
    link: "#",
  },
  {
    name: "Backery & Biscuites",
    img: "images/category-slider/backery-biscuites.jpg",
    link: "#",
  },
  {
    name: "Instant Food",
    img: "images/category-slider/instant-food.jpg",
    link: "#",
  },
  {
    name: "Tea & Coffee",
    img: "images/category-slider/tea-coffee.jpg",
    link: "#",
  },
  {
    name: "Grains & Pulses",
    img: "images/category-slider/grains-pulses.jpg",
    link: "#",
  },
  {
    name: "Baby Care",
    img: "images/category-slider/baby-care.jpg",
    link: "#",
  },
  {
    name: "Meat & Seafood",
    img: "images/category-slider/meat-seafood.jpg",
    link: "#",
  },
];

const categoryWrapper = document.getElementById("categoryWrapper");

categories.forEach((cat) => {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide");
  slide.innerHTML = `
    <a href="${cat.link}" class="text-decoration-none text-inherit card-link">
      <div class="card mb-4">
        <div class="card-body text-center py-4">
          <img src="${cat.img}" alt="${cat.name}" class="img-fluid mb-2"/>
          <div class="text-truncate">${cat.name}</div>
        </div>
      </div>
    </a>
  `;
  categoryWrapper.appendChild(slide);
});

const categorySwiper = new Swiper(".category-slider", {
  loop: true,
  slidesPerView: 6,
  slidesPerGroup: 2,
  spaceBetween: 20,
  speed: 800,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
  breakpoints: {
    320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
    768: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 15 },
    992: { slidesPerView: 4, slidesPerGroup: 2, spaceBetween: 18 },
    1200: { slidesPerView: 6, slidesPerGroup: 2, spaceBetween: 20 },
  },
});

const popularProducts = [...products]
  .sort((a, b) => b.salesQuantity - a.salesQuantity)
  .slice(0, 10);

const popularProductGrid = document.getElementById("popularProductGrid");

popularProducts.forEach((product) => {
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

          <a href="${product.link}">
            <div class="product-image-wrapper" style="background-image: url('${
              product.image.slice(3)
            }')"></div>
          </a>

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
            <a href="${product.link}" class="text-decoration-none text-dark">${
    product.name
  }</a>
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

  popularProductGrid.insertAdjacentHTML("beforeend", cardHTML);
});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
tooltipTriggerList.forEach((tooltipTriggerEl) => {
  new bootstrap.Tooltip(tooltipTriggerEl);
});
