var React = require('react');

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