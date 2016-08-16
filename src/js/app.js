var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var $ = require('jquery');

var App = require('./components/App');
var Homepage = require('./components/Homepage');
var Forms = require('./components/Forms');

var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Homepage} />
            <Route path="forms" component={Forms} />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('app'));