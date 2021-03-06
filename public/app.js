document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();

    const db = firebase.database();

    const auth = firebase.auth();

});

var welcomeMessage = document.getElementById("welcome-message");
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var userNameElement = document.getElementById('user-name');
var appElement = document.getElementById('app');
var loginWarn = document.getElementById('login-warning');

//Allow user to sign in
function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

    .then(result => {
        const user = result.user;
        welcomeMessage.innerHTML = '';
    })
    .catch(console.log);
}

function signOut() {
    firebase.auth().signOut();
    console.log("signed out");
    welcomeMessage.innerHTML = "You are signed out.";
}

function initFirebaseAuth() {

    firebase.auth().onAuthStateChanged(function(user) {
        //console.log('user', user);

        if (user) { // User is signed in!
            // Get the signed-in user's name.
            var userName = getUserName();

            // Set the user's name.
            userNameElement.textContent = "Logged in as " + userName;

            // Show user's profile and sign-out button.
            userNameElement.removeAttribute('hidden');
            signOutButtonElement.removeAttribute('hidden');
            userNameElement.setAttribute('style', 'display: inline');
            appElement.removeAttribute('hidden');
            loginWarn.setAttribute('hidden', 'true');

            // Hide sign-in button.
            signInButtonElement.setAttribute('hidden', 'true');

        } else { // User is signed out!
            // Hide user's profile and sign-out button.
            userNameElement.setAttribute('hidden', 'true');
            userNameElement.setAttribute('style', '');
            signOutButtonElement.setAttribute('hidden', 'true');
            appElement.setAttribute('hidden', 'true');

            // Show sign-in button.
            signInButtonElement.removeAttribute('hidden');
        }
    })
}

//Check if user is signed in
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

//I feel like this is self-explanatory, but this gets the username
function getUserName() {
    return firebase.auth().currentUser.displayName;
}

function getUserEmail() {
    return firebase.auth().currentUser.email;
}

/* Started working to save favorites in firebase db, but realized I was running out of time.
function saveFavorites() {

    var namesList = [];
    var descriptionList = [];
    var urlList = [];

    //Get favorites list element
    const myFavorites = document.getElementById('favorites');

    //Get userId
    var userEmail = getUserEmail();
    var userId = userEmail.substring(0, userEmail.lastIndexOf("@"));

    //Create database reference
    const dbRefObject = firebase.database().ref('favorites/' + userId);

    //Synchronize object changes
    dbRefObject.on('value', snap => {
        console.log(snap.val());
        //myFavorites.innerText = JSON.stringify(snap.val(), null, 3);

        const li = document.createElement('li');
        li.innerText = snap.val();
        myFavorites.appendChild(li);
    });

}
*/
