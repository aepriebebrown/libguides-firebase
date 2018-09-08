document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app);

})

var welcomeMessage = document.getElementById("welcome-message");

function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

            .then(result => {
                const user = result.user;
                welcomeMessage.innerHTML = `Hello ${user.displayName}`;
                console.log(user)
            })
            .catch(console.log)
}

function signOut() {
  firebase.auth().signOut();
  console.log("signed out");
  welcomeMessage.innerHTML = "You are signed out.";
}
