const fullname = document.getElementById("name");
const emailaddress = document.getElementById("email");
const userName = document.getElementById("username");
const password = document.getElementById("password");
const createUser = document.getElementById("createUser");
let allUsers = [];
let userId;
function getRestaurantsFromLocalStorage() {
  const users = localStorage.getItem("allUsers");
  if (users) {
    allUsers = JSON.parse(users);
    userId = allUsers.length;
  }
}
function createUserAction() {
  const user = {
    id: userId,
    name: fullname.value,
    email: emailaddress.value,
    userName: userName.value,
    password: password.value,
  };
  userId++;
  allUsers.push(user);
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  window.location.href = "../index.html";
  localStorage.setItem("auth", 1);
}

createUser.addEventListener("submit", (e) => {
  e.preventDefault();
  createUserAction();
});
window.addEventListener("load", getRestaurantsFromLocalStorage);
