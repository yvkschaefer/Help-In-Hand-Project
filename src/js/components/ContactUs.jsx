var React = require('react');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');

var ContactUs = React.createClass({ 
    render: function() {
        return (
            <div className="contactUsMainPage">
                <div className="contactUsTopBar">
	                <p id="appName"> Help In Hand </p>
	                <div>  
	                    <div>
	                        <div className="homepageButtonLinkOnContactUs">
	                            <Link to="/"><button className="homepageButtonOnContactUs">Homepage</button></Link>
	                        </div>
	                    </div>
	                </div>
	            </div>
            </div>
        );
    }
    
});

var ContactUsWithRoute = withRouter(ContactUs);

module.exports = ContactUsWithRoute;