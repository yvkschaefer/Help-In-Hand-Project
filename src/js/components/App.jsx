var React = require('react');
var Link = require('react-router').Link;


var App = React.createClass({
    render: function() {
        return (
            <div className="mainPage">
                <header className="mainHeader">
                    <h1><Link to="/">Help In Hand</Link></h1>
                </header>
                <main className="mainContent">
                    {this.props.children}
                </main>
            </div>
        );
    }
});

module.exports = App;