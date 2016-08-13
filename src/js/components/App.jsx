var React = require('react');
var Link = require('react-router').Link;


var App = React.createClass({
    render: function() {
        return (
            <div className="main-app">
                <header className="main-header">
                    <h1><Link to="/"> NAVIGATION STUFFS? </Link></h1>
                </header>
                <main className="main-content">
                    {this.props.children}
                </main>
            </div>
        );
    }
});

module.exports = App;