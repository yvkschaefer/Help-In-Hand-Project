var React = require('react');
var Link = require('react-router').Link;

var LogoutPage = React.createClass({
    render: function(){
        return(
            <div className='loggedOutPage'>
                <p>Thanks for your work today. See you soon!</p>
                <Link to='/'>homepage</Link>
            </div>
        );
    }
});

module.exports = LogoutPage;