const createUser = document.getElementById("user-create");
const popUp = document.getElementById("pop-up-user");
const closePopUp = document.getElementById("close-user");
const nameValue = document.getElementById("name");
const emailValue = document.getElementById("email");
const userNameValue = document.getElementById("username");
const passwordValue = document.getElementById("password");
const userCards = document.getElementById("users-page");
const userForm = document.getElementById("userForm");
const removeUser = document.getElementById("removeUser");
let allUsers = [];
let userId = 0;
function showPopup() {
  popUp.classList.add("show");
}
function close() {
  popUp.classList.remove("show");
}
function addToLocalStorage() {
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
}
function createUserAction() {
  const userObject = {
    id: userId,
    name: nameValue.value,
    email: emailValue.value,
    username: userNameValue.value,
    paswword: passwordValue.value,
  };
  allUsers.push(userObject);
  userId++;
  addToLocalStorage();
}
function getUsersFromLocalStorage() {
  const usersString = localStorage.getItem("allUsers");
  if (usersString) {
    allUsers = JSON.parse(usersString);
    userId = allUsers.length;
  }
  console.log(allUsers);
}
function userLoader() {
  userCards.innerHTML = "";
  if (allUsers.length > 0) {
    for (let index = 0; index < allUsers.length; index++) {
      const user = allUsers[index];
      generateUserCard(user);
    }
  } else {
    console.log("no");
  }
}
function generateUserCard(user) {
  console.log(user.id);
  const card = document.createElement("div");
  const userId = user.id;
  card.classList.add("user");
  card.classList.add("bg-white");
  card.classList.add("p-20");
  card.classList.add("rad-6");
  card.classList.add("p-relative");
  card.innerHTML = `
                <div class="txt-c">
              <h4 class="m-0">${user.name}</h4>
              <p class="c-gray fs-13 mt-5 mb-0">${user.email}</p>
            </div>
            <div class="icons center-flex column fs-14 p-relative">
              <div class="mb-10">
                <span>99 Freind</span>
              </div>
              <div class="mb-10">
                <span>15 Projects</span>
              </div>
              <div class="mb-10">
                <span>25 Articles</span>
              </div>
            </div>
            <div class="info center-flex fs-13">
              <button  data-user-id=${userId} class="bg-red c-white btn-shape b-none remove">
                Remove
              </button>
            </div>`;
  userCards.appendChild(card);
}
function deleteUser(e) {
  const deleteButton = e.target.closest(".remove");
  if (deleteButton) {
    const selectedUserId = deleteButton.dataset.userId;
    console.log(selectedUserId);
    console.log("Before deletion:", allUsers); // Log the array before deletion

    allUsers = allUsers.filter((user) => user.id !== parseInt(selectedUserId));
    addToLocalStorage();
    userLoader();
    console.log("After deletion:", allUsers); // Log the array before deletion
  }
}
userForm.addEventListener("submit", createUserAction);
createUser.addEventListener("click", showPopup);
closePopUp.addEventListener("click", close);
window.addEventListener("load", function () {
  userLoader();
});
userCards.addEventListener("click", deleteUser);
getUsersFromLocalStorage();
