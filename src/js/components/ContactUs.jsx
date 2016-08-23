var React = require('react');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');

var ContactUs = React.createClass({
	getInitialState: function () {
		return {
			username: "",
			emailAddress: "",
			title: "",
			message: ""
		};	
	},
	
	submitEmailInfo: function () {
		this.setState({
			username: this.refs.contactUsUsername.value,
			emailAddress: this.refs.contactUsEmailEntry.value,
			title: this.refs.contactUsUserTitleEntry.value,
			message: this.refs.contactUsMessageEntry.value
		});
	},
    render: function() {
        return (
            <div>
                <div className="contactUsTopBar">
	                <p id="appName"> Help In Hand </p>
	                <div className="homepageButtonLinkOnContactUs">
	                	<Link to="/"><button className='homepageButtonOnContactUs'>Homepage</button></Link>
	                </div>
	            </div>
	            <div className="contactUsMainPage">
	            	<div className="contactUsFormInput">
	            		<p className="contactUsText">Please enter your name or pseudonym</p>
	            		<input type="text" className="contactUsUsername" ref="contactUsUsernameEntry" />
	            		<br />
	            		<br />
	            		<p className="contactUsText">Email Address</p>
	            		<input type="text" className ="contactUsEmailAddress" ref="contactUsEmailEntry" />
	            		<br />
	            		<br />
	            		<p className="contactUsText">Please write a relevant email title so that our counselors can adequately place you</p>
	            		<input type="text" className="contactUsTitle" ref="contactUsUserTitleEntry" />
	            		<br />
	            		<br />
	            		<p className="contactUsText">Leave your message here:</p>
	            		<textarea className ="contactUsMessage" ref="contactUsMessageEntry" rows="5"></textarea>
	            		<br />
	            		<button onClick={this.submitEmailInfo}>Submit your info</button>
	            	</div>
	            </div>
            </div>
        );
    }
    
});

var ContactUsWithRoute = withRouter(ContactUs);

module.exports = ContactUsWithRoute;