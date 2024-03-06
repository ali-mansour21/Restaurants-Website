const loginForm = document.getElementById("login");
let allUsers = [];

function getRestaurantsFromLocalStorage() {
  const usersString = localStorage.getItem("allUsers");
  if (usersString) {
    allUsers = JSON.parse(usersString);
    userId = allUsers.length;
  } else {
    allUsers = []; // Initialize allUsers as an empty array if data is missing
  }
}
const checkUser = () => {
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  for (let user of allUsers) {
    if (user.username === userName && user.password === password) {
      return true;
    }
  }
  return false;
};

function main(e) {
  e.preventDefault();
  if (checkUser) {
    window.location.href = "../index.html";
  }
}
loginForm.addEventListener("submit", main);
window.addEventListener("load", getRestaurantsFromLocalStorage);
