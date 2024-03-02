document.addEventListener('DOMContentLoaded', function () {
    const username = document.getElementById('username-field');
    const email = document.getElementById('email-field');
    const password = document.getElementById('password-field');
    const confirmPassword = document.getElementById('confirm-password-field');
    const registerButton = document.getElementById('register-button');

    username.addEventListener('input', toggleButtonState);
    email.addEventListener('input', toggleButtonState);
    password.addEventListener('input', toggleButtonState);
    confirmPassword.addEventListener('input', toggleButtonState);

    function toggleButtonState() {
        if (username.value.trim() !== ''
            && email.value.trim() !== ''
            && password.value.trim() !== ''
            && confirmPassword.value.trim() !== '') {
            registerButton.disabled = false;
        } else {
            registerButton.disabled = true;
        }
    }
});

function onClickLogin() {
    window.history.back();
}

async function onClickRegister() {
    const username = document.getElementById('username-field').value;
    const email = document.getElementById('email-field').value;
    const password = document.getElementById('password-field').value;
    const confirmPassword = document.getElementById('confirm-password-field').value;

    if (validateInput(username, email, password)) {
        if (password !== confirmPassword) {
            alert("Password and confirm password do not match!");
            return;
        }

        let user = await getUserByUsername(username);

        if (user === null) {
            let user = {
                username: username,
                email: email,
                password: password
            };

            // TODO: Add user to database

            alert("User created successfully!");
        } else {
            alert("User already exists!");
        }
    }
}

function validateInput(username, email, password) {
    
    return validateUsername(username)
        && validateEmail(email)
        && validatePassword(password);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const check = username.match(usernameRegex);
    if (!check) alert("Username only allows letters and numbers!");
    return check;
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const check = password.match(passwordRegex);
    if (!check) alert("Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!");
    return check;
}

function validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check = email.match(emailRegex);
    if (!check) alert("Invalid email!");
    return check;
}

async function getUserByUsername(username) {
    let userData = await getUserData();
    for (let i = 0; i < userData.length; i++) {
        if (username == userData[i].username) {
            return userData[i];
        }
    }

    return null;
}

async function getUserData() {
    const userDataUrl = '../../../data/data.json';

    try {
        const response = await fetch(userDataUrl);
        let data = await response.json();
        return data.users;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}
