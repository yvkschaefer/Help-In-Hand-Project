var React = require('react');
var Link = require('react-router').Link;

var GotHungUpOn = React.createClass({
    render: function(){
        return(
            <div>
                <p>The call has ended. Thanks for visiting!</p>
                <Link to='/'>homepage</Link>
            </div>
        );
    }
});

module.exports = GotHungUpOn;