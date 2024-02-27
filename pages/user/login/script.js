function onClickLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validateInput(username, password)) {
        let userData = UserDataManager.getUserData();
        let user = UserDataManager.getUserByUsername(username);

        if(user === null) {
            alert("User not found!");
        } else if(password != user.password) {
            alert("Incorrect password!");
        }
    }
}

function validateInput(username, password) {
    return validateUsername(username) && validatePassword(password);
}

function validateUsername(username) {

}

function validatePassword(password) {

}