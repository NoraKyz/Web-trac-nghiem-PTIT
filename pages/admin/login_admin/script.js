function toggleSpecificTime(selectElement) {
    var specificTimeInput = document.getElementById("specificTimeInput");
    if (selectElement.value === "specificTime") {
        specificTimeModal.show();
    } else {
        specificTimeInput.style.display = "none";
    }
}

var email_field = document.getElementById("email-field");
var password_field = document.getElementById("password-field");
var login_button = document.getElementById("login-button");

login_button.addEventListener("click", function () {
    var email = email_field.value;
    var password = password_field.value;
    if (email == "alexcao194@gmail.com" && password == "admin") {
        window.location.href = "../dashboard/index.html";
    } else {
        alert("Invalid credentials");
    }
});
