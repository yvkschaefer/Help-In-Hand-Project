var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');


var Homepage = React.createClass({
    setInitialState: function() {
        return {};
    },
    // handles login for all facebook, twitter, and google account
    _handleLogin: function(e) {
        e.preventDefault();
        
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
            
            // var authData = result.user;
            // // console.log(authData);
            // // this stores name and provider into Firebase database
            // fr.firebaseRef.child("users").child(authData.uid).set({
            //     provider: authData.providerData[0].providerId,
            //     name: authData.displayName
            // });
            
            alert("You have successfully logged in!")

        }).catch(function(err) {
            console.log(err);
        });
    },
    _handleLogout: function(e) {
        var that = this;
        e.preventDefault();
        fr.firebase.auth().signOut().then(function() {
            alert("You have successfully signed out!")
            // When signed out, the user is redirected to the homepage
            that.props.router.push('/');
        })
    },
    // this function fetches data from Firebase database
    _getUsers: function() {
        fr.firebaseRef.child('users').on("value", function(snapshot) {
            console.log(snapshot.val());
            }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    },
    render: function() {
        return (
            <div className="homepage">
                
                <button onClick={this._handleLogin} value="facebookButtonClicked"> Login with Facebook! </button>
                <button onClick={this._handleLogin} value="twitterButtonClicked"> Login with Twitter! </button> 
                <button onClick={this._handleLogin} value="googleAccountButtonClicked"> Login with your Google Account! </button>
                
                <button onClick={this._handleLogout}> Logout! </button> <br/><br/>
                
                <button onClick={this._getUsers}> Get user </button>

                
                <section> 
                    <h2> Fill out the form! </h2>
                    <a href='/forms'> Fill out the form! </a>
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