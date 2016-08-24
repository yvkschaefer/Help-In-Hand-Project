var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');
var Scroll = require('react-scroll');



var ScrollLink = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;

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

            
            // When signed out, the user is redirected to the homepage
            that.props.router.push('/');
        });
    },
    _menuClose: function(e) {
        $("#sidebar-wrapper").toggleClass("active");
    },
    _menuToggle: function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    },
    scrollToTop: function() {
        scroll.scrollToTop();
    },
    scrollTo: function() {
        scroll.scrollTo(100);
    },
    componentWillUnmount: function() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    },
    componentDidMount: function() {

        Events.scrollEvent.register('begin', function(to, element) {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function(to, element) {
            console.log("end", arguments);
        });

        scrollSpy.update();

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

        var loginBelow;
        var speakToCounselorButton;
        
        if (!this.state.loggedIn) {
            seeCounselors = (
                <p className="textInHomepage"> A full list of our talented volunteers can be found once you've logged in.</p>
            );
            showLoginLogoutButton = (
                <div className="loginButtons">
                    <ul className="loginLogoutButtonList">
                        <li> <input type="image" src="files/images/facebook_logo_reformatted.jpg" onClick={this._handleLogin} value="facebookButtonClicked"  className="facebookImage" /> </li>
                        <li> <input type="image" src="files/images/twitter_logo_reformatted.png" onClick={this._handleLogin} value="twitterButtonClicked"  className="twitterImage" /> </li>
                        <li> <input type="image" src="files/images/google_logo_reformatted.png" onClick={this._handleLogin} value="googleAccountButtonClicked" className="googleImage" /> </li>
                    </ul>
                </div>
            );
            
            loginBelow = 'Login Below';
            speakToCounselorButton = <a href="#services" className="btn btn-dark btn-lg">Speak to a Counselor</a>;
        }

        else {
            showLoginLogoutButton = (
                <div className="loginButtons">
                    <ul className="loginLogoutButtonList">
                        <li> <button className="btn btn-dark" onClick={this._handleLogout} value="Logout"> Logout </button> </li>
                    </ul>
                </div>
            );
            speakToCounselorButton = <a href="/triage" className="btn btn-dark btn-lg">Speak to a Counselor</a>;
            
        }

        return (
            <div>
            
            <Element name="home" className="element">
                
                {/*<!-- Navigation -->*/}
                <a onClick={this._menuToggle} id="menu-toggle" className="btn btn-dark btn-lg toggle"><i className="fa fa-bars"></i></a>
                <nav id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <a id="menu-close" onClick={this._menuClose} className="btn btn-light btn-lg pull-right toggle"><i className="fa fa-times"></i></a>
                        <li className="sidebar-brand">
                            <ScrollLink activeClass="active" className="test1" to="home" spy={true} smooth={true} duration={500} onClick={this._menuClose}>Help In Hand</ScrollLink>
                        </li>
                        <li>
                            <ScrollLink activeClass="active" className="test1" to="aboutUs" spy={true} smooth={true} duration={500} onClick={this._menuClose}>About Us</ScrollLink>
                        </li>
                        <li>
                            <ScrollLink activeClass="active" className="test1" to="services" spy={true} smooth={true} duration={500} onClick={this._menuClose}>Services</ScrollLink>
                        </li>
                        <li>
                            <ScrollLink activeClass="active" className="test1" to="instructions" spy={true} smooth={true} duration={500} onClick={this._menuClose}>Instructions</ScrollLink>
                        </li>
                        <li>
                            <ScrollLink activeClass="active" className="test1" to="ourCounselors" spy={true} smooth={true} duration={500} onClick={this._menuClose}>Counselors</ScrollLink>
                        </li>
                    </ul>
                </nav>
            
                {/*<!-- Header -->*/}
                <header id="top" className="header">
                    <div className="text-vertical-center">
                        <h1>Help In Hand</h1>
                        <br/>
                        {speakToCounselorButton}
                        <p className="loginBelow">{loginBelow} </p>
                        {showLoginLogoutButton}
                    </div>
                </header>
            
            
                {/*<!-- About -->*/}
                <Element name="aboutUs" className="element" >
                    <section id="about" className="about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2>About us</h2>
                                    <p className="lead">Our trained group of volunteers are ready to help you, no matter what the problem. Every volunteer has been thoroughly vetted and trained and are prepared to meet any mental health needs you may have. Follow the link to view a list of our present roster of counselors and see for yourself.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Element>
    
                {/*<!-- Services -->*/}
                <Element name="services" className="element" >
                    <section id="services" className="services bg-primary">
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-lg-10 col-lg-offset-1">
                                    <h2>Our Services</h2>
                                    <hr className="small" />
                                    <div className="row">
                                        <div className="col-md-3 col-sm-6">
                                            <div className="service-item">
                                                <span className="fa-stack fa-4x">
                                                <i className="fa fa-circle fa-stack-2x"></i>
                                                <i className="fa fa-cloud fa-stack-1x text-primary"></i>
                                            </span>
                                                <h4>
                                                    <strong>Please fill out the form</strong>
                                                </h4>
                                                <p>This will help us better help you.</p>
                                                <a href="/forms" className="btn btn-light">Fill out</a>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="service-item">
                                                <span className="fa-stack fa-4x">
                                                <i className="fa fa-circle fa-stack-2x"></i>
                                                <i className="fa fa-compass fa-stack-1x text-primary"></i>
                                            </span>
                                                <h4>
                                                    <strong>Talk to a Counselor</strong>
                                                </h4>
                                                <p>Please login to speak to a counselor.</p>
                                                <a href="/triage" className="btn btn-light">Talk</a>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="service-item">
                                                <span className="fa-stack fa-4x">
                                                <i className="fa fa-circle fa-stack-2x"></i>
                                                <i className="fa fa-flask fa-stack-1x text-primary"></i>
                                            </span>
                                                <h4>
                                                    <strong>Become a Counselor</strong>
                                                </h4>
                                                <p>You can fill out the form, and we will contact you shortly.</p>
                                                <a href="#" className="btn btn-light">Fill out</a>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="service-item">
                                                <span className="fa-stack fa-4x">
                                                <i className="fa fa-circle fa-stack-2x"></i>
                                                <i className="fa fa-shield fa-stack-1x text-primary"></i>
                                            </span>
                                                <h4>
                                                    <strong>Counselors</strong>
                                                </h4>
                                                <p>See the profiles of all of our counselors.</p>
                                                <a href="/counselorsProfile" className="btn btn-light">Show more</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Element>
                
                
                {/*<!-- Instructions -->*/}
                <Element name="instructions" className="element" >
                    <section id="about" className="about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2>Instructions</h2>
                                    <p className="lead">In order to take advantage of this service, you must login using your id for one of the three social networking sites above: Facebook, Twitter, or Google. Once you're logged in, we ask that you please fill out a quick questionnaire to give our volunteers a better idea of how to help. While this is recommended, it is not necessary and if you feel like you are presently in crisis you'll be able to speak to someone immediately by the click of a button.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Element>
                
            </Element>
                
                
            
            {/*<!-- Callout -->*/}
            <aside className="callout">
                <div className="text-vertical-center">
                    <h1>We are ready to help you no matter what the problem</h1>
                </div>
            </aside>
                    
     
                    

                   
                    
            {/*<!-- Our Counselors -->*/}
            <Element name="ourCounselors" className="element" >
                <section id="portfolio" className="portfolio">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1 text-center">
                                <h2> Our Counselors </h2>
                                <hr className="small" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="portfolio-item">
                                            <div>
                                                <img className="img-portfolio img-responsive counselorsPictureOnHomepage" src="/files/images/homepageCounselor1.jpg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="portfolio-item">
                                            <div>
                                                <img className="img-portfolio img-responsive counselorsPictureOnHomepage"  src="/files/images/homepageCounselor2.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="portfolio-item">
                                            <div>
                                                <img className="img-portfolio img-responsive counselorsPictureOnHomepage" src="/files/images/homepageCounselor3.jpg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="portfolio-item">
                                            <div>
                                                <img className="img-portfolio img-responsive" src="/files/images/homepageCounselor4.jpg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </Element>

                    
            </div>
        );
    }

});

// Surrounding Homepage with Router - wrap up Homepage into a higher-order component 
var HomepageWithRouter = withRouter(Homepage);

module.exports = HomepageWithRouter;
