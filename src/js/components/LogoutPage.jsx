var React = require('react');

var LogoutPage = React.createClass({
    render: function(){
        return(
            <div className='loggedOutPage'>
                <p>Thanks for your work today. See you soon!</p>
            </div>
        );
    }
});

module.exports = LogoutPage;