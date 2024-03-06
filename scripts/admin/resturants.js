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
  resturants.push(resturantObject);
  resturantId++;
  addToLocalStorage();
}
function getRestaurantsFromLocalStorage() {
  const restaurantsString = localStorage.getItem("restaurants");
  if (restaurantsString) {
    resturants = JSON.parse(restaurantsString);
    resturantId = resturants.length;
  }
}
function restaurantLoader() {
  restaurantCards.innerHTML = "";
  if (resturants.length > 0) {
    for (let index = 0; index < resturants.length; index++) {
      const restaurant = resturants[index];
      generateRestaurantCard(restaurant);
    }
  }
}
function generateRestaurantCard(restaurant) {
  const card = document.createElement("div");
  const restaurantId = restaurant.id;

  card.classList.add("card");
  card.classList.add("bg-white");
  card.classList.add("rad-6");
  card.classList.add("p-relative");
  card.innerHTML = `<img class="cover" src="../../assets/${restaurant.image}" alt="" />
            <div class="p-20 content">
              <h4 class="m-0">${restaurant.name}</h4>
              <p class="description c-gray mt-15 fs-14">
                ${restaurant.description}
              </p>
            </div>
            <div class="info p-15 p-relative between-flex">
              <button  data-set-id="${restaurantId}" class="title bg-red c-white b-none btn-shape remove">Remove</button>
              <span class="c-gray"> Favirotes: ${restaurant.favirote} </span>
              <span class="c-gray"> 120 </span>
            </div>`;

  restaurantCards.appendChild(card);
}
function deleteRestaurant(e) {
  const deleteButton = e.target;
  const selectedRestaurantId = deleteButton.dataset.restaurantId;
  resturants = resturants.filter(
    (restaurant) => restaurant.id !== parseInt(selectedRestaurantId)
  );
  addToLocalStorage();
  restaurantLoader();
}
deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteRestaurant);
});
restaurantCards.addEventListener("click", deleteRestaurant);
resturantCreateForm.addEventListener("submit", createResturantAction);
createResturant.addEventListener("click", showPopup);
closePopUp.addEventListener("click", close);
getRestaurantsFromLocalStorage();
window.addEventListener("load", () => {
  restaurantLoader();
});
