document.addEventListener("DOMContentLoaded", function () {
  const selectBtn = document.querySelector(".select-btn");
  const item = document.querySelectorAll(".item");
  const restaurantContainer = document.getElementById("products-container");
  let restaurants = [];
  const searchValue = document.getElementById("search");
  const allCategories = document.querySelector(".list-items");

  function getRestaurantsFromLocalStorage() {
    const restaurantsString = localStorage.getItem("restaurants");
    if (restaurantsString) {
      restaurants = JSON.parse(restaurantsString);
      resturantId = restaurants.length;
      restaurantContainer.innerHTML = "";
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += restaurantHtmlGenerator(restaurant);
      });
    }
  }
  function restaurantHtmlGenerator(resturant) {
    const { name, image, description, favirote } = resturant;
    return ` <div class="product-card">
            <img class="w-320" src="./assets/${image}" alt="Product 1" />
            <div class="content h-140">
              <h3>${name}</h3>
              <p class="w-390">
               ${description}
              </p>
            </div>
            <div class="review">
              <button data-set="${resturantId}" class="show"><a href="#">View More</a></button>
              <p>Review:${favirote}</p>
            </div>
          </div>`;
  }
  function getSearchedResturants() {
    const value = searchValue.value;
    const filteredResturants = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(value)
    );
    if (filteredResturants.length) {
      restaurantContainer.innerHTML = "";
      filteredResturants.forEach((restaurant) => {
        restaurantContainer.innerHTML += restaurantHtmlGenerator(restaurant);
      });
    }
    if (!value) {
      getRestaurantsFromLocalStorage();
    }
  }
  function filterByCategory() {
    let btnText = document.querySelector(".btn-text");
    const checkedItems = document.querySelectorAll(".item.checked");

    if (checkedItems.length === 0) {
      getRestaurantsFromLocalStorage();
      btnText.innerHTML = "Select Cuisine";
    } else {
      const selectedCategories = Array.from(checkedItems).map((item) =>
        item.textContent.trim().toLowerCase()
      );
      const filteredRestaurants = restaurants.filter((restaurant) =>
        selectedCategories.includes(restaurant.category.toLowerCase())
      );

      if (filteredRestaurants.length > 0) {
        restaurantContainer.innerHTML = "";
        filteredRestaurants.forEach((restaurant) => {
          restaurantContainer.innerHTML += restaurantHtmlGenerator(restaurant);
        });
      } else {
        restaurantContainer.innerHTML =
          "<p>No restaurants found for the selected categories.</p>";
      }
    }
  }
  getRestaurantsFromLocalStorage();
  selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
  });
  allCategories.addEventListener("click", function (event) {
    if (event.target.classList.contains("item-text")) {
      const categoryValue = event.target.textContent.trim().toLowerCase();
      filterByCategory(categoryValue);

      // Update the button text
      const btnText = document.querySelector(".btn-text");
      btnText.innerText = `${
        categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1)
      } Selected`;
    }
  });
  item.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("checked");

      let checked = document.querySelectorAll(".checked");
      let btnText = document.querySelector(".btn-text");

      if (checked && checked.length > 0) {
        const selectedNames = [];
        // Iterate over each checked item and push its name to the array
        checked.forEach(function (checkedItem) {
          selectedNames.push(checkedItem.textContent);
        });
        // Join the names into a single string and set it as the button text
        btnText.innerHTML = `${selectedNames} Selected`;
      } else {
        btnText.innerText = "Select Cuisine";
        getRestaurantsFromLocalStorage();
      }
    });
  });
  searchValue.addEventListener("change", getSearchedResturants);
});
