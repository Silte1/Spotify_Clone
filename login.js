// toDo:
// - login button eine ID geben (siehe unten)
// - input feldern eine ID geben(siehe unten)

//::::::::: Variables for login

// login Button and input
const userNameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login");

// Array of Users
const users = [
  { userName: "eti", password: "1234root" },
  { userName: "ammar", password: "1337admin" },
  { userName: "ali", password: "superuser" },
  { userName: "micha", password: "ismirega-a-al" },
];

loginBtn.onclick = (e) => {
  let user = userNameInput.value.toLowerCase().trim();
  let password = passwordInput.value.toLowerCase().trim();

  let loginSuccess = users.filter(
    (person) => person.userName === user && person.password === password
  );
  if (loginSuccess.length === 1) {
    console.log(`willkommen ${user}`);
    // proceed to next page
    window.location.href = "./artist.html";
  } else {
    alert("login failed");
  }
};
