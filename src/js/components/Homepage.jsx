var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');

//console.log("local storage:", localStorage.getItem('user'))

var Homepage = React.createClass({
    getInitialState: function() {
        return {}
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
            
            alert("You have successfully logged in!")

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
            
            alert("You have successfully signed out!")
            // When signed out, the user is redirected to the homepage
            that.props.router.push('/');
        })
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
                    <button onClick={this._handleLogin} value="facebookButtonClicked"> Login with Facebook! </button>
                    <button onClick={this._handleLogin} value="twitterButtonClicked"> Login with Twitter! </button> 
                    <button onClick={this._handleLogin} value="googleAccountButtonClicked"> Login with your Google Account! </button>
                </div>
            );
        }
        else {
            showLogoutButton = (
                <div>
                    <button onClick={this._handleLogout}> Logout! </button> <br/><br/>
                </div>
            );
        }   
        
        return (
            <div className="homepage">
                
                {showLoginButton}
                {showLogoutButton}

                <section> 
                    <h2> Fill out the form! </h2>
                    <Link to="/forms"> Fill out the form! </Link>
                </section>
                
            
                <section>
                    <h2> About us </h2>
                    <p> We are a team of volunteer who's gonna help you! </p>
                </section>                

                
                <section>
                    <h2> Services </h2>
                    <p> We provide bunch of services </p>
                </section>
                
                
            </div>
        );
    }

});

// Surrounding Homepage with Router - wrap up Homepage into a higher-order component 
var HomepageWithRouter = withRouter(Homepage);

module.exports = HomepageWithRouter;