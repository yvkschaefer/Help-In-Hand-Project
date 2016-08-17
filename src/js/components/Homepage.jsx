var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');


var Homepage = React.createClass({
    setInitialState: function() {
        return {};
    },
    _handleLogin: function(e) {
        e.preventDefault();

        fr.firebase.auth().signInWithPopup(fr.facebookProvider).then(function(result) {
            
            var authData = result.user
            console.log(authData)
            // use them in Security and Firebase Rules, and show profiles
            fr.firebaseRef.child("users").child(authData.uid).set({
                provider: authData.providerData[0].providerId,
                name: authData.displayName,
                
            });

        }).catch(function(err) {
            console.log(err);
        });
    },
    _handleLogout: function(e) {
        var that = this;
        e.preventDefault();
        fr.firebase.auth().signOut().then(function() {
            alert("Yo ass is out!")
            that.props.router.push('/')
        })
    },
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
                
                <button onClick={this._handleLogin}>Log your ass in with facebook</button>
                <button onClick={this._handleLogout}>Log your ass out of facebook</button>
                
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

var HomepageWithRouter = withRouter(Homepage);

module.exports = HomepageWithRouter;