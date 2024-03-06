document.addEventListener("DOMContentLoaded", function () {
  const selectBtn = document.querySelector(".select-btn");
  const item = document.querySelectorAll(".item");
  console.log(selectBtn, item);

  selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
  });

  item.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("checked");

      let checked = document.querySelectorAll(".checked");
      let btnText = document.querySelector(".btn-text");

      if (checked && checked.length > 0) {
        btnText.innerText = `${checked.length} Selected`;
      } else {
        btnText.innerText = "Select Cuisine";
      }
    });
  });

function productCardGenerator(product) {
  return `<div class="flex column center product-card">
            <img src="${product.image}" alt="Product 1" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="primary-button buy-now" product-id= ${product.id}>Buy now</button>
          </div>`;
}
});