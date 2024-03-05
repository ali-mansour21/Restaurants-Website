const createResturant = document.getElementById("add-resturant");
const popUp = document.getElementById("pop-up");
const closePopUp = document.getElementById("close");
function showPopup() {
  popUp.classList.add("show");
}
function close() {
  popUp.classList.remove("show");
}
createResturant.addEventListener("click", showPopup);
closePopUp.addEventListener("click", close);
