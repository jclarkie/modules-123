const checkbox = document.getElementById("showPassword");
const users = JSON.parse(localStorage.getItem("sp_users"));

checkbox.addEventListener("change", function () {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  if (this.checked) {
    password.type = "text";
    confirmPassword.type = "text";
  } else {
    password.type = "password";
    confirmPassword.type = "password";
  }
});

function signupUser() {
  const username = signup.username.value;
  const password = signup.password.value;
  const confirmPassword = signup.confirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
  }

  for (const user of users) {
    if (user.username === username) {
      alert("Username already exists!");
      return;
    }
  }

  const roleType = signup.roleType.value;
  const roleName = signup.roleName.value;

  users[users.length] = {
    username: username,
    password: password,
    role: roleType,
    roleName: roleName,
  };

  localStorage.setItem("sp_users", JSON.stringify(users));

  alert("User created successfully!");

  document.location.href = "../dashboard.html";
}
