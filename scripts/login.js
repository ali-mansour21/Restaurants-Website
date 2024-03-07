document.addEventListener("DOMContentLoaded", () => {
  let loginForm = document.getElementById("loginForm");
  const profile = document.getElementById("profile");
  const unauth = document.getElementById("unauth");
  let allUsers = [];

  function getRestaurantsFromLocalStorage() {
    const usersString = localStorage.getItem("allUsers");
    if (usersString) {
      allUsers = JSON.parse(usersString);
    } else {
      allUsers = [];
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
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    for (let user of allUsers) {
      console.log(user);
      if (user.username === userName && user.password === password) {
        window.location.href = "../index.html";
      }
    }
  });

  window.addEventListener("load", getRestaurantsFromLocalStorage);
});
