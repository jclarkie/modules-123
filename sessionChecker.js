if (!localStorage.getItem("sp_current_user")) {

  if (document.location.href === "dashboard.html") {
    document.location.href = "login.html";
  } else {
    document.location.href = "../module_1/login.html";
  }
}
