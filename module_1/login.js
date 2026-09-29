function login() {
  const users = JSON.parse(localStorage.getItem("sp_users") ?? "[]");

  const username = loginForm.username.value;
  const password = loginForm.password.value;

  for (const user of users) {
    if (user.username === username && user.password === password) {
      localStorage.setItem("sp_current_user", username);
      alert("Login successful! Redirecting...");
      setTimeout(() => {
        document.location.href = "../dashboard.html";
      }, 500);
      return;
    }
  }

  alert("Invalid username or password.");
}

const checkbox = document.getElementById("showPassword");

checkbox.addEventListener("change", function () {
  const password = document.getElementById("password");

  if (this.checked) {
    password.type = "text";
  } else {
    password.type = "password";
  }
});
