const userDataUrl = 'data/users/userData.json';

class UserDataManager {
    static getUserData() {
        fetch(userDataUrl)
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error fetching questions:', error)
                return null;
            });
    }

    static getUserByUsername(username) {
        this.userData = this.getUserData();
        for (let i = 0; i < this.userData.length; i++) {
            if (username == this.userData[i].username) {
                return this.userData[i];
            }
        }
    }
}