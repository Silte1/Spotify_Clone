// toDo:
// - login button eine ID geben (line 11)
// - input feldern eine ID geben(line 9 und 10 )
// - change path of next page(see lin 31)

//::::::::: Variables for login

// login Button and input
const userNameInput = document.getElementById("userName");
const passwordInput = document.getElementById("userPassword");
const loginBtn = document.getElementById("login");

// Array of Users
const users = [
  { userName: "eti", password: "1234root" },
  { userName: "ammar", password: "1337admin" },
  { userName: "ali", password: "superuser" },
  { userName: "micha", password: "ismirega-a-al" },
];

loginBtn.onclick = (e) => {
  e.preventDefault();
  let user = userNameInput.value.toLowerCase().trim();
  let password = passwordInput.value.toLowerCase().trim();

  let loginSuccess = users.filter(
    (person) => person.userName === user && person.password === password
  );
  if (loginSuccess.length === 1) {
    // proceed to next page
    window.location.href = "../home-page/home.html";
  } else {
    alert("login failed");
  }
};
