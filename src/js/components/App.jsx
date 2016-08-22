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
                            </div>
                            
                            <div className="linksToOtherPages">
                                <div className="homepageFooterLinks">
                                    <a href="https://www.cmha.ca"> Canadian Mental Health Association </a>
                                </div>
                            
                                <div className="homepageFooterLinksOne">
                                    <a href="http://www.schizophrenia.on.ca/Research/Canadian-Institute-for-Social-Innovation-in-Mental"> Canadian Institute for Social Innovation in Mental Illness </a>
                                </div>
                            </div>
                            
                            <div className="homepageFooterLinksTwo">
                                <a href="" className="contactUs"> <p> Contact Us </p> </a>
                            </div>

                        </div>
                    </div>
            
                    Copyright 2016 Help-In-Hand
                
                </footer>
            </div>
        );
    }
});

module.exports = App;