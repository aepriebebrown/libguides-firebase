document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();

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
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var userNameElement = document.getElementById('user-name');

function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

            .then(result => {
                const user = result.user;
                welcomeMessage.innerHTML = `Hello ${user.displayName}`;
                console.log("1", user)
            })
            .catch(console.log);
            initFirebaseAuth();
}

function signOut() {
  firebase.auth().signOut();
  console.log("signed out");
  welcomeMessage.innerHTML = "You are signed out.";
}

/*function initFirebaseAuth() {
  firebase.auth().onAuthStateChanged(authStateObserver);
}*/

function initFirebaseAuth() {

    firebase.auth().onAuthStateChanged(function(user) {
    console.log('user', user);

    if (user) { // User is signed in!
      // Get the signed-in user's profile pic and name.
      var userName = getUserName();

      // Set the user's name.
      userNameElement.textContent = userName;

      // Show user's profile and sign-out button.
      userNameElement.removeAttribute('hidden');
      signOutButtonElement.removeAttribute('hidden');

      // Hide sign-in button.
      signInButtonElement.setAttribute('hidden', 'true');

    } else { // User is signed out!
      // Hide user's profile and sign-out button.
      userNameElement.setAttribute('hidden', 'true');
      signOutButtonElement.setAttribute('hidden', 'true');

      // Show sign-in button.
      signInButtonElement.removeAttribute('hidden');
    }
})
}

function isUserSignedIn() {
  return !!firebase.auth().currentUser;
  console.log('user', user);
}

function getUserName() {
  return firebase.auth().currentUser.displayName;
}
