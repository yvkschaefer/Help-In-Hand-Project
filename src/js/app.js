/* global localStorage */

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var browserHistory = require("react-router").browserHistory;

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var $ = require('jquery');
// require the firebase.js file in order to use firebase, firebaseRef, and facebookProvider
var fr = require('../firebase/firebase.js');


var App = require('./components/App');
var Homepage = require('./components/Homepage');
var Forms = require('./components/Forms');
var MakeCounselorsProfile = require('./components/MakeCounselorsProfile');
var CounselorsProfile = require('./components/CounselorsProfile');
var RetrieveInfoFromDatabase = require('./components/RetrieveInfoFromDatabase');
var Triage = require('./components/Triage');
var TriageCounselor = require('./components/TriageCounselor');
var Counselor = require('./components/Counselor');

// When the user clicks the hyperlink to complete the form, it will check if the user is logged in.
// If the user is not logged in, redirect to homepage. If logged in, redirect to the link to complete the form



fr.firebase.auth().onAuthStateChanged(function(user){
    if (user) {
        localStorage.setItem('user', user.uid);
        console.log("User " + user.uid + " is logged in");
    } else {
        localStorage.removeItem('user');
        // browserHistory.push('/');
        console.log("User is logged out");
    }
});


function checkLogin(nextState, replace, next) {
    if(!localStorage.getItem('user')) {
        alert('You must be logged in!');
        replace('/');
    }
    next();
}

var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Homepage} />
            <Route path="forms" component={Forms} onEnter={checkLogin} />
            <Route path="counselorsProfile" component={CounselorsProfile}/>
            <Route path="makeCounselorsProfile" component={MakeCounselorsProfile}/>
            <Route path="retrieveInfoFromDatabase" component={RetrieveInfoFromDatabase}/>
            <Route path="triage" component={Triage} />
            <Route path="triage-counselor" component={TriageCounselor} />
            <Route path="counselor" component={Counselor} />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('app'));