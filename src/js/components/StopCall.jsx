var React = require('react');
var Link = require('react-router').Link;

var StopCall = React.createClass({
    render: function(){
        return(
            <div>
                <p>You stopped the call</p>
                <p>HELLO HELLO</p>
                <Link to='/'>homepage</Link>
            </div>
        );
    }
});

module.exports = StopCall;