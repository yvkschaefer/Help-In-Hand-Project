var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');

//console.log("local storage:", localStorage.getItem('user'))

/*global localStorage*/

var Homepage = React.createClass({
    getInitialState: function() {
        return {};
    },
    // handles login for all facebook, twitter, and google account
    _handleLogin: function(e) {
        e.preventDefault();
        var that = this;
        // We access the value of the button and store it in whatButtonClicked. 
        // Then we use that value to decide which provider to be used
        var whatButtonClicked = e.target.value;
        var whichProvider;

        if (whatButtonClicked === 'facebookButtonClicked') {
            whichProvider = fr.facebookProvider;
        }
        if (whatButtonClicked === 'twitterButtonClicked') {
            whichProvider = fr.twitterProvider;
        }
        if (whatButtonClicked === 'googleAccountButtonClicked') {
            whichProvider = fr.googleProvider;
        }

        fr.firebase.auth().signInWithPopup(whichProvider).then(function(result) {

            that.setState({
                loggedIn: true
            });

            alert("You have successfully logged in!");

        }).catch(function(err) {
            console.log(err);
        });
    },
    _handleLogout: function(e) {
        var that = this;
        e.preventDefault();
        fr.firebase.auth().signOut().then(function() {

            that.setState({
                loggedIn: false
            });

            alert("You have successfully signed out!");
            // When signed out, the user is redirected to the homepage
            that.props.router.push('/');
        });
    },
    componentDidMount: function() {

        // check if there is a local user, i.e. someone is logged in. Store that user and assign true to loggedIn state if logged in, false otherwise
        var user = localStorage.getItem('user');
        console.log(user);
        this.setState({
            loggedIn: user ? true : false
        });

    },
    render: function() {

        var showLoginButton;
        var showLogoutButton;


        if (!this.state.loggedIn) {
            showLoginButton = (
                <div>
                    <div className="homepageTopBar">
                        <p id="appName">Help In Hand</p>
                        <div className="login">  
                            <div className="loginText">
                                <p>Login:</p>
                            </div>
                            <div className="loginIcons">
                                <input type="image" src="http://www.firstbaptistashland.com/wp-content/uploads/2015/09/facebook-logo-png-transparent-background.png" onClick={this._handleLogin} value="facebookButtonClicked"  className="facebookImage" />
                                <input type="image" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRX3AKo2r3hd5qH-rqmpzzN8PChRhK-MAWDcbWdzW89PV0TXHeP" onClick={this._handleLogin} value="twitterButtonClicked"  className="twitterImage" />
                                <input type="image" src="https://i.kinja-img.com/gawker-media/image/upload/s--pEKSmwzm--/c_scale,fl_progressive,q_80,w_800/1414228815325188681.jpg" onClick={this._handleLogin} value="googleAccountButtonClicked" className="googleImage" />
                            </div>
                        </div>            
                    </div>
                    <div className="mainBodyDiv">
                        {showLoginButton}
                        {showLogoutButton}
                                    
                        <h1>We're here to help.</h1>
                        <p>Login to begin the process of getting the help you need.</p>
                        <Link to="/counselorsProfile"> See Counselors' Profile! </Link>
                    </div>
                    <br />
                </div>
            );
        }
        else {
            showLogoutButton = (
                <div>
                    <div className="homepageTopBar">
                            <p id="appName">Help In Hand</p>
                            <input type="button" className="logoutButton" onClick={this._handleLogout} value="Logout" />
                    </div>
                    <div className="mainBodyDiv">
                        <h2> Fill out the form! </h2>
                        <Link to="/forms"> Fill out the form! </Link>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="nav">
                    {showLoginButton}
                    {showLogoutButton}
                </div>
                <br />
                <div className="moreInfo">
                    <div className="aboutUs">
                        <Link to="/counselorsprofile"><h1> About us </h1> </Link>
                        <p className="textInHomepage"> We are a group of volunteers to u know like make you feel less depressed and stuffs, so come chitchat with us anytime bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
                    </div>
                    <div className="services">
                        <h1> Services </h1>
                        <p className="textInHomepage"> We provide this and that and this and that and this and that and this and that and this and that and this and that and this and that and this and that and this and that and this and that and this and that and this and that and this.</p> 
                    </div>
                </div>
            </div>

        );
    }

});

// Surrounding Homepage with Router - wrap up Homepage into a higher-order component 
var HomepageWithRouter = withRouter(Homepage);

module.exports = HomepageWithRouter;