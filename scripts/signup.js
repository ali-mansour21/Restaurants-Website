const signUp = (event) => {
    event.preventDefault();
  let fullname = document.getElementById("name").value;
  let emailaddress = document.getElementById("email").value;
  let userName = document.getElementById("username").value;
  let pwd = document.getElementById("password").value;

  var user = {
    name: fullname,
    email: emailaddress,
    userName: userName,
    password: pwd,
  };

  debugger

  var json = JSON.stringify(user);

  localStorage.setItem("auth", 1);
  console.log("user added")
};
