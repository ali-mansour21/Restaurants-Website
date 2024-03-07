const loginBtn = document.getElementById("loginBtn");
const profile = document.getElementById("profile");
const unauth = document.getElementById("unauth");
let allUsers = [];
let auth;
function getRestaurantsFromLocalStorage() {
  const usersString = localStorage.getItem("allUsers");
  if (usersString) {
    allUsers = JSON.parse(usersString);
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
  if (checkUser()) {
    window.location.href = "../index.html";
  }
}
if (profile && unauth) {
  const auth = localStorage.getItem("auth");
  if (auth) {
    profile.style.display = "block";
    unauth.style.display = "none";
  } else {
    unauth.style.display = "block";
    profile.style.display = "none";
  }
}
loginBtn.addEventListener("click", main);
window.addEventListener("load", getRestaurantsFromLocalStorage);
