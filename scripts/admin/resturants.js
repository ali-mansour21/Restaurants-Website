const createResturant = document.getElementById("add-resturant");
const popUp = document.getElementById("pop-up");
const closePopUp = document.getElementById("close");
const resturantCreateForm = document.getElementById("restaurantForm");
const restaurantCards = document.getElementById("resturants");
const nameValue = document.getElementById("name");
const descriptionValue = document.getElementById("description");
const fileValue = document.getElementById("file");
const categoryValue = document.getElementById("category");
const deleteButtons = document.querySelectorAll(".remove");
let resturantId = 0;
let resturants = [];
function showPopup() {
  popUp.classList.add("show");
}
function close() {
  popUp.classList.remove("show");
}
function addToLocalStorage() {
  localStorage.setItem("restaurants", JSON.stringify(resturants));
}
function createResturantAction() {
  const resturantObject = {
    id: resturantId,
    name: nameValue.value,
    description: descriptionValue.value,
    image: fileValue.files.length > 0 ? fileValue.files[0].name : "",
    category: categoryValue.value,
    favirote: 0,
  };
  resetValues(nameValue, descriptionValue, fileValue, categoryValue);
  resturants.push(resturantObject);
  addToLocalStorage();
  restaurantCards.innerHTML = "";
  getRestaurantsFromLocalStorage();
}
function resetValues(name, description, image, category) {
  name.value = "";
  description.value = "";
  image.value = "";
  category.value = "";
}
function getRestaurantsFromLocalStorage() {
  const restaurantsString = localStorage.getItem("restaurants");
  if (restaurantsString) {
    resturants = JSON.parse(restaurantsString);
    resturantId = resturants.length;
    resturants.forEach((restaurant) => {
      generateRestaurantCard(restaurant);
    });
  }
}
// function restaurantLoader() {
//   restaurantCards.innerHTML = "";

//   if (resturants.length > 0) {
//     for (let index = 0; index < resturants.length; index++) {
//       const restaurant = resturants[index];
//       generateRestaurantCard(restaurant);
//     }
//   }
// }
function generateRestaurantCard(restaurant) {
  const card = document.createElement("div");
  const { id, name, image, description, favirote } = restaurant;

  card.classList.add("card", "bg-white", "rad-6", "p-relative");

  card.innerHTML = `<img class="cover" src="../../assets/${image}" alt="" />
            <div class="p-20 content">
              <h4 class="m-0">${name}</h4>
              <p class="description c-gray mt-15 fs-14">
                ${description}
              </p>
            </div>
            <div class="info p-15 p-relative between-flex">
              <button  data-set-id="${id}" class="title bg-red c-white b-none btn-shape remove">Remove</button>
              <span class="c-gray"> Favirotes: ${favirote} </span>
            </div>`;
  restaurantCards.appendChild(card);
}
function deleteRestaurant(e) {
  const deleteButton = e.target;
  const selectedRestaurantId = deleteButton.dataset.setId;
  resturants = resturants.filter(
    (restaurant) => restaurant.id !== parseInt(selectedRestaurantId)
  );
  restaurantCards.innerHTML = "";
  addToLocalStorage();
  getRestaurantsFromLocalStorage();
}
deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteRestaurant);
});
restaurantCards.addEventListener("click", deleteRestaurant);

resturantCreateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createResturantAction();
  close();
});

createResturant.addEventListener("click", showPopup);
closePopUp.addEventListener("click", close);

window.addEventListener("load", () => {
  getRestaurantsFromLocalStorage();
});
