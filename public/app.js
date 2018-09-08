document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app);

})

var welcomeMessage = document.getElementById("welcome-message");

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

            .then(result => {
                const user = result.user;
                welcomeMessage.innerHTML = `Hello ${user.displayName}`;
                console.log(user)
            })
            .catch(console.log)
}
