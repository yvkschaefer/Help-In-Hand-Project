var firebase = require("firebase");

try {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAE9MaqkQh4Crtnad3tKLEBBV7OrfExoGs",
        authDomain: "decodemtl-final-project.firebaseapp.com",
        databaseURL: "https://decodemtl-final-project.firebaseio.com",
        storageBucket: "decodemtl-final-project.appspot.com",
    };
    firebase.initializeApp(config);
} catch(e) {
    console.log(e);
}

module.exports = {
    firebase: firebase,
    firebaseRef: firebase.database().ref(),
    facebookProvider: new firebase.auth.FacebookAuthProvider()
};