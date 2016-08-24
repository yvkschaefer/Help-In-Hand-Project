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
        	<div className="contactUsForm">

					<form className="form-horizontal">
            <fieldset>
            
            
              <legend className="legend">Contact Us</legend>


<div className="form-group">
  <label className="col-md-4 control-label" for="textinput">Text Input</label>  
  <div className="col-md-4">
  <input id="textinput" name="textinput" type="text" placeholder="placeholder" className="form-control input-md" />
  <span className="help-block">help</span>  
  </div>
</div>


<div className="form-group">
  <label className="col-md-4 control-label" for="textinput">Text Input</label>  
  <div className="col-md-4">
  <input id="textinput" name="textinput" type="text" placeholder="placeholder" className="form-control input-md"/>
  <span className="help-block">help</span>  
  </div>
</div>


<div className="form-group">
  <label className="col-md-4 control-label" for="textarea">Text Area</label>
  <div className="col-md-4">                     
    <textarea className="form-control" id="textarea" name="textarea">default text</textarea>
  </div>
</div>


<div className="form-group">
  <label className="col-md-4 control-label" for="textinput">Text Input</label>  
  <div className="col-md-4">
  <input id="textinput" name="textinput" type="text" placeholder="placeholder" className="form-control input-md"/>
  <span className="help-block">help</span>  
  </div>
</div>


<div className="form-group">
  <label className="col-md-4 control-label" for="singlebutton">Single Button</label>
  <div className="col-md-4">
    <button id="singlebutton" name="singlebutton" className="btn btn-primary">Button</button>
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
