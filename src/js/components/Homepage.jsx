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

        var showLoginLogoutButton;
        var seeCounselors;
        
        if(!this.state.loggedIn) {
            seeCounselors = (
                <p className="textInHomepage"> A full list of our talented volunteers can be found once you've logged in.</p>
            );
            showLoginLogoutButton = (
                <div className="loginButtons">
                    <li> <input type="image" src="files/images/facebook_logo.jpg" onClick={this._handleLogin} value="facebookButtonClicked"  className="facebookImage" /> </li>
                    <li> <input type="image" src="files/images/twitter_logo.png" onClick={this._handleLogin} value="twitterButtonClicked"  className="twitterImage" /> </li>
                    <li> <input type="image" src="files/images/google_logo.png" onClick={this._handleLogin} value="googleAccountButtonClicked" className="googleImage" /> </li>
                </div>
            );
        }
        
        else {
            showLoginLogoutButton = (
                <div className="loginButtons">
                    <li> <input type="button" className="logoutButton" onClick={this._handleLogout} value="Logout" /> </li>
                </div>
            );
        }

        return (
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
                                    <li><a href="#instructions"> Instructions </a></li>
                                    <li><a href="#ourCounselors"> Our Counselors </a></li>
                                    {showLoginLogoutButton}
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </nav>
                
                
                
                <div className="homepageImages">
                    <br/>
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                            <li data-target="#myCarousel" data-slide-to="3"></li>
                        </ol>
                
                        <div className="carousel-inner" role="listbox">
                            <div className="item active">
                                <img src="https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg" alt="Chania"/>
                            </div>
                
                            <div className="item">
                                <img src="http://s3.amazonaws.com/assets.prod.vetstreet.com/2a/cd/ee484be546418f40cc3cbc194b52/kitten-in-arms-thinkstockphotos-106397271-335lc070915jpg.jpg" alt="Chania"/>
                            </div>
                    
                            <div className="item">
                                <img src="http://ajaxnorthpethospital.ca/clients/17476/images/kit.jpg" alt="Flower"/>
                            </div>
                        
                            <div className="item">
                                <img src="http://upshout.net/wp-content/uploads/2015/06/dwarf-kitten-01.jpg" alt="Flower"/>
                            </div>
                        </div>
                
                        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        
                        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
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
                            {seeCounselors}
                        </div>
                    </div>
                
                </div>
                
            </div>
        );
    }

});

// Surrounding Homepage with Router - wrap up Homepage into a higher-order component 
var HomepageWithRouter = withRouter(Homepage);

module.exports = HomepageWithRouter;