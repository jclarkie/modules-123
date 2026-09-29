if (!localStorage.getItem("sp_users")) {
  localStorage.setItem("sp_users", JSON.stringify([
    {
      username: "admin",
      password: "password123",
      role: "admin",
      roleName: "Admin 1"
    },
    {
      username: "staff",
      password: "password123",
      role: "staff",
      roleName: "Staff 1"
    }
  ]));
}