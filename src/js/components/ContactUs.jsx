var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');
var $ = require('jquery');


var ContactUs = React.createClass({
	submitEmailInfo: function () {
		$.post('/contactUs', {
			username: this.refs.contactUsUsernameEntry.value,
			emailAddress: this.refs.contactUsEmailEntry.value,
			title: this.refs.contactUsUserTitleEntry.value,
			message: this.refs.contactUsMessageEntry.value
		})
		.then(
			function(response){
				console.log(response);
				if (response.ok){
					browserHistory.push('/');
				}
				else {
					alert('there was an error');
				}
			}
		);
	},
    render: function() {
        return (
            <div className="contactUs">
                <div className="contactUsTopBar">
	                <p id="appName"> Help In Hand </p>
	                <div className="homepageButtonLinkOnContactUs">
	                	<Link to="/"><button className='homepageButtonOnContactUs'>Homepage</button></Link>
	                </div>
	            </div>
					<div id="contact-form">
						<div>
							<h1>Nice to Meet You!</h1> 
							<h4>Have a question or just want to get in touch? Let's chat.</h4> 
						</div>
							<p id="failure">Oopsie...message not sent.</p>  
							<p id="success">Your message was sent successfully. Thank you!</p>
					
						<form method="post" action="/">
							<div>
								<label for="name">
							      	<span class="required">Please enter your name or pseudonym *</span> 
							      	<input type="text" id="name" ref="contactUsUsernameEntry" name="name" value="" placeholder="Your Name" required="required" tabindex="1" autofocus="autofocus" />
							      </label> 
								</div>
								<div>
							      <label for="email">
							      	<span class="required">Email: *</span>
							      	<input type="email" id="email" ref="contactUsEmailEntry" name="email" value="" placeholder="Your Email" tabindex="2" required="required" />
							      </label>  
								</div>
								<div>		          
							      <label for="subject">
							    	<span class="required">Title *</span>
							      	<input type="email" id="title" ref="contactUsUserTitleEntry" name="title" value="" placeholder="Title" tabindex="2" required="required" />
							      </label>
								</div>
								<div>		          
							      <label for="message">
							      	<span class="required">Message: *</span> 
							      	<textarea id="message" name="message" placeholder="Please write your message here." tabindex="5" required="required"></textarea> 
							      </label>  
								</div>
								<div>		           
							      <button name="submit" type="submit" id="submit"  onClick={this.submitEmailInfo}>SEND</button> 
								</div>
						</form>
				</div>
		</div>
	);
	}
});



var ContactUsWithRoute = withRouter(ContactUs);

module.exports = ContactUsWithRoute;
