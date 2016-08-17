var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var $ = require('jquery');
// require the firebase.js file in order to use firebase, firebaseRef, and facebookProvider
var fr = require('../firebase/firebase.js');

var App = require('./components/App');
var Homepage = require('./components/Homepage');
var Forms = require('./components/Forms');

// When the user clicks the hyperlink to complete the form, it will check if the user is logged in.
// If the user is not logged in, redirect to homepage. If logged in, redirect to the link to complete the form
function checkLogin(nextState, replace, next) {
    if (!fr.firebase.auth().currentUser) {
        replace('/')
    } else {
        next();
    }
}

var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Homepage} />
            <Route path="forms" component={Forms} onEnter={checkLogin} />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('app'));