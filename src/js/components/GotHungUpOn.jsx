var React = require('react');
var Link = require('react-router').Link;

var GotHungUpOn = React.createClass({
    render: function(){
        return(
            <div>
                <p>You were hung up on</p>
                <Link to='/'>homepage</Link>
            </div>
        );
    }
});

module.exports = GotHungUpOn;