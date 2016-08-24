var React = require('react');
var Link = require('react-router').Link;

var StopCall = React.createClass({
    render: function(){
        return(
            <div className='patientDisconnectedByButton'>
                <p>You stopped the call</p>
            </div>
        );
    }
});

module.exports = StopCall;