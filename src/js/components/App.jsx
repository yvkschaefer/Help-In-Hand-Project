var React = require('react');
var Link = require('react-router').Link;


var App = React.createClass({
    render: function() {
        return (
            <div className="mainPage">
                <main className="mainContent">
                    {this.props.children}
                </main>
            </div>
        );
    }
});

module.exports = App;