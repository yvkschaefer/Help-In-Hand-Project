var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');
var $ = require('jquery');


var ContactUs = React.createClass({
	submitEmailInfo: function (e) {
	  e.preventDefault();
	  
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
        	<div className="contactUsForm">
          
            <legend className="legend"><div className="legendText">Contact Us</div>
                  <div><Link to="/"><button className="btn btn-primary" id="contactFormHomepageButton">Homepage</button></Link></div>
            </legend>
          
  					<form className="form-horizontal" onSubmit={this.submitEmailInfo}>
              <fieldset className="well well-lg">
            
                <div className="form-group" id="contactFormUsernameInput">
                  <label className="col-md-4 control-label">Username: </label>
                  <div className="col-md-4">
                  <input id="textinput" ref="contactUsUsernameEntry" type="text" placeholder="username" className="form-control input-md" />

                  </div>
                </div>
                
                
                <div className="form-group" id="contactFormInputAreas">
                  <label className="col-md-4 control-label">Email: </label>  
                  <div className="col-md-4">
                  <input id="textinput" ref="contactUsEmailEntry"  type="text" placeholder="email address" className="form-control input-md"/>
                  </div>
                </div>
                
                <div className="form-group" id="contactFormInputAreas">
                  <label className="col-md-4 control-label">Title: </label>  
                  <div className="col-md-4">
                  <input id="textinput" ref="contactUsUserTitleEntry" type="text" placeholder="title" className="form-control input-md"/>
                  </div>
                </div>                
                
                <div className="form-group" id="contactFormInputAreas">
                  <label className="col-md-4 control-label">Message: </label>
                  <div className="col-md-4">                     
                    <textarea className="form-control" ref="contactUsMessageEntry" id="textarea" name="textarea" placeholder="message"></textarea>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="singlebutton"></label>
                  <div className="col-md-4">

                    <button id="contactFormSubmitButton" className="btn btn-primary" type="submit">Submit</button>

                  </div>
                </div>
            </fieldset>
          </form>
        
	</div>
	);
	}
});



var ContactUsWithRoute = withRouter(ContactUs);

module.exports = ContactUsWithRoute;
