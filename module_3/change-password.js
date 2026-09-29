const passwordInputs = [
  document.getElementById('newPassword'),
  document.getElementById('confirmPassword')
];

const showPasswordToggle = document.getElementById('showPassword');
const changePasswordForm = document.getElementById('changePasswordForm');

if (showPasswordToggle) {
    showPasswordToggle.addEventListener('change', function () {
        const passwordType = this.checked ? 'text' : 'password';

        for (let i = 0; i < passwordInputs.length; i++) {
            passwordInputs[i].type = passwordType;
        }
    });
}

function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please re-enter them.');
        document.getElementById('confirmPassword').focus();
    } else {
        // update password

        const users = JSON.parse(localStorage.getItem("sp_users"));
        // current username
        const current = localStorage.getItem("sp_current_user");

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === current) {
                users[i].password = newPassword;
                alert("Password updated!");
                document.location.href = "../dashboard.html";
            }
        }

        localStorage.setItem("sp_users", JSON.stringify(users));
    }
}

