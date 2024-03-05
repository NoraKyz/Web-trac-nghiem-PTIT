var login_button = document.getElementById("login-button");

login_button.addEventListener("click", function () {
    var email_field = document.getElementById("email-field");
    var password_field = document.getElementById("password-field");
    var email = email_field.value;
    var password = password_field.value;
    if (email === "admin" && password === "admin") {
        window.location.replace("../../admin/dashboard/index.html");
    } else {
        alert("Invalid credentials");
    }
});
