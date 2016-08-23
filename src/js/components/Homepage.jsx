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
        var ourListOfCounselors;
        
        if(!this.state.loggedIn) {
            ourListOfCounselors = (
                <div>
                    <div className="ourCounselorsHomepage">
                        <div className="ourCounselor1">
                            <img src="files/images/counselor1.png" className="counselorsProfilePictureHomepage"/>
                            <p className="counselorNameOnHomepage"> Dylan Pelletier </p>
                            <p className="counselorDescriptionOnHomepage"> '"Talking to Dylan helped save my marriage. He really helped us get over a rough patch." - Linda'</p>
                        </div>
                        <div className="ourCounselor2">
                            <img src="files/images/counselor2.jpg" className="counselorsProfilePictureHomepage"/>
                            <p className="counselorNameOnHomepage"> Christine Lee </p>
                            <p className="counselorDescriptionOnHomepage"> '"Christine's calm, easy-going approach really helped me to let out some things I'd been keeping bottled up for years. Thanks!" - Gustav' </p>
                        </div>
                    </div>
                    <p className="textInHomepage"> A full list of our talented volunteers can be found once you've logged in.</p>
                </div>
            );
        }
        else {
            ourListOfCounselors = (
                <div>
                    <div className="ourCounselorsHomepage">        
                        <div className="ourCounselor1">
                            <img src="files/images/counselor1.png" className="counselorsProfilePictureHomepage"/>
                            <p className="counselorNameOnHomepage"> Dylan Pelletier </p>
                            <p className="counselorDescriptionOnHomepage"> "Talking to Dylan helped save my marriage. He really helped us get over a rough patch." - Linda</p>
                        </div>
                        <div className="ourCounselor2">
                            <img src="files/images/counselor2.jpg" className="counselorsProfilePictureHomepage"/>
                            <p className="counselorNameOnHomepage"> Christine Lee </p>
                            <p className="counselorDescriptionOnHomepage"> "Christine's calm, easy-going approach really helped me to let out some things I'd been keeping bottled up for years. Thanks!" - Gustav </p>
                        </div>
                    </div>
                </div>
            );
        }

        if (!this.state.loggedIn) {
            showLoginButton = (
                <div>
                
                    <nav className="navbar navbar-inverse navbar-fixed-top">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#"> Help In Hand </a>
                            </div>
                            <div>
                                <div className="collapse navbar-collapse" id="myNavbar">
                                    <ul className="nav navbar-nav">
                                        <li><a href="#aboutUs"> About us </a></li>
                                        <li><a href="#services"> Services </a></li>
                                        <li><a href="#ourCounselors"> Our Counselors </a></li>
                                        <div className="loginButtons">
                                            <li> <input type="image" src="files/images/facebook_logo.jpg" onClick={this._handleLogin} value="facebookButtonClicked"  className="facebookImage" /> </li>
                                            <li> <input type="image" src="files/images/twitter_logo.png" onClick={this._handleLogin} value="twitterButtonClicked"  className="twitterImage" /> </li>
                                            <li> <input type="image" src="files/images/google_logo.png" onClick={this._handleLogin} value="googleAccountButtonClicked" className="googleImage" /> </li>
                                        </div>
                                    </ul>
                                </div>
                                
                            

                            
                            
                            </div>
                        </div>
                    </nav>

                

                    
                    <div className="mainBodyDiv">
                        {showLoginButton}
                        {showLogoutButton}
                        <div className="messageNotLoggedIn">
                            <h1 className="homepageMessage1"> We're here to help! </h1>
                            <p className="homepageMessage2"> Login to begin the process of getting the help you need. </p>
                        </div>
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
                            <div className="logoutButtonHomepage"> <input type="button" className="logoutButton" onClick={this._handleLogout} value="Logout" /> </div>
                    </div>
                    <div className="mainBodyDiv">
                        <div className="choicesText">
                            <div className='homepageBodyLinks'>
                                <h2><Link to="/forms">Intake Questionnaire</Link></h2>
                                <p>Please answer this brief questionnaire <br/> so that our volunteers may better help you.</p>
                                <h2><Link to='/counselorsprofile'>Counselors</Link></h2>
                                <p>Click <Link to='/triage'>here</Link> if you are in crisis and <br /> need immediate assistance</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div>
                    {showLoginButton}
                    {showLogoutButton}
                </div>

                <div className="moreInfo">
                    <div id="aboutUs" className="container-fluid">
                        <h1> About us </h1>
                        <p className="textInHomepage">Our trained group of volunteers are ready to help you, no matter what the problem. Every volunteer has been thoroughly vetted and trained and are prepared to meet any mental health needs you may have. Follow the link to view a list of our present roster of counselors and see for yourself.</p>
                    </div>
                    
                    <div className="lineSeparator"></div>
                    
                    <div id="services" className="container-fluid">
                        <h1> Services </h1>
                        <p className="textInHomepage"> We provide our clients with the easiest and simplest way to reach out and get help. No matter what is the matter, our volunteers are available 24 hours a day if a client needs help. For extreme cases, we offer the ability to chat live with a volunteer from your very own home through a sleek, simple-to-use, videochat messaging system.</p> 
                    </div>
                    
                    <div className="lineSeparator"></div>
                    
                    <div id="instructions" className="container-fluid">
                        <h1> Instructions </h1>
                        <p className="textInHomepage">In order to take advantage of this service, you must login using your id for one of the three social networking sites above: Facebook, Twitter, or Google. Once you're logged in, we ask that you please fill out a quick questionnaire to give our volunteers a better idea of how to help. While this is recommended, it is not necessary and if you feel like you are presently in crisis you'll be able to speak to someone immediately by the click of a button.</p> 
                    </div>
                    
                    <div className="lineSeparator"></div>
                    
                    <div id="ourCounselors" className="container-fluid ourCounselorsHomepageHeaderText">
                        <h1> <Link to="/counselorsprofile"> Our Counselors </Link> </h1>
                    </div>
                    <div>
                        {ourListOfCounselors}
                    </div>
                </div>
            </div>
        );
    }

});

// Surrounding Homepage with Router - wrap up Homepage into a higher-order component 
var HomepageWithRouter = withRouter(Homepage);

module.exports = HomepageWithRouter;