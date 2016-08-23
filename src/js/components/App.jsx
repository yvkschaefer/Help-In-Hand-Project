var React = require('react');
var Link = require('react-router').Link;


var App = React.createClass({
    render: function() {
        return (
            <div className="mainPage">
                <main className="mainContent">
                    {this.props.children}
                </main>
                
                <footer className="footer">
            
                    <div className="mainPage">
                                
                        <div className="mainPageLinkButtons">
                            
                            <div className="googleSearch">
                                <form method="get" action="http://www.google.com/search">
                                    <div>
                                        <div> <input type="text" name="q" size="25" /> </div>
                                        <div> <input type="submit" value="Google Search" /> </div>
                                    </div>
                                </form>
                                Copyright 2016 Help-In-Hand
                            </div>
                            
                            <div className="linksToOtherPages">
                                <div>
                                    <a href="https://www.cmha.ca"> Canadian Mental Health Association </a>
                                </div>
                            
                                <div>
                                    <a href="http://www.schizophrenia.on.ca/Research/Canadian-Institute-for-Social-Innovation-in-Mental"> Canadian Institute for Social Innovation in Mental Illness </a>
                                </div>
                            </div>
                            
                            <div className="homepageFooterContact">
                                <Link to="/contactUs" className="contactUs"> <p className="contactUs"> Contact Us </p> </Link>
                            </div>

                        </div>
                    </div>
            
                
                </footer>
            </div>
        );
    }
});

module.exports = App;