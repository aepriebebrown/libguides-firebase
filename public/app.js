document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app);
    const db = firebase.database();

    const auth = firebase.auth();

    const myFavorites = document.getElementById('favorites');

    const dbRefObject = firebase.database().ref().child('favorites');

    /*dbRefObject.on('value', snap => {
        console.log(snap.val());
        myFavorites.innerText = JSON.stringify(snap.val(), null, 3);*/
    });

//});

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

function initFirebaseAuth() {
  firebase.auth().onAuthStateChanged(authStateObserver);
}

function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

function getUserName() {
  return firebase.auth().currentUser.displayName;
}
