document.addEventListener('DOMContentLoaded', function () {
    const username = document.getElementById('email-field');
    const password = document.getElementById('password-field');
    const loginButton = document.getElementById('login-button');

    username.addEventListener('input', toggleButtonState);
    password.addEventListener('input', toggleButtonState);

    function toggleButtonState() {
        // Check if both inputs have non-blank values
        if (username.value.trim() !== '' && password.value.trim() !== '') {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }
}
);

async function onClickLogin() {
    const username = document.getElementById('email-field').value;
    const password = document.getElementById('password-field').value;

    if (validateInput(username, password)) {
        let user = await getUserByUsername(username);

        if (user === null) {
            alert("User not found!");
        } else if (password != user.password) {
            alert("Incorrect password!");
        } else {
            alert("Login successful!");
        }
    }
}

function validateInput(username, password) {
    return validateUsername(username) && validatePassword(password);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z]+$/;
    const check = username.match(usernameRegex);
    if (!check) alert("User not found!");
    return check;
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const check = password.match(passwordRegex);
    if (!check) alert("Incorrect password!");
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