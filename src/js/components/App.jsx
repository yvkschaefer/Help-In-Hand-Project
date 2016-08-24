var React = require('react');
var Link = require('react-router').Link;


var App = React.createClass({
    render: function() {
        return (
            <div className="mainPage">
                <main className="mainContent">
                    {this.props.children}
                </main>
                
                
                {/*<!-- Footer -->*/}
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1 text-center">
                                <h4><strong><a href="/">Help In Hand</a></strong>
                                </h4>
                                <p>4th floor, 3 Place Vill Marie
                                    <br />Montreal, QC</p>
                                <ul className="list-unstyled">
                                    <li><i className="fa fa-phone fa-fw"></i> (123) 456-7890</li>
                                    <li><i className="fa fa-envelope-o fa-fw"></i> <a href="/ContactUs">Contact Us</a>
                                    </li>
                                </ul>
                                <br />
                                <ul className="list-inline">
                                    <li>
                                        <a href="https://www.facebook.com"><i className="fa fa-facebook fa-fw fa-3x"></i></a>
                                    </li>
                                    <li>
                                        <a href="https://www.twitter.com"><i className="fa fa-twitter fa-fw fa-3x"></i></a>
                                    </li>
                                    <li>
                                        <a href="https://dribble.com"><i className="fa fa-dribbble fa-fw fa-3x"></i></a>
                                    </li>
                                </ul>
                                <hr className="small" />
                                <p className="text-muted">Copyright &copy; Help in Hand 2016</p>
                            </div>
                        </div>
                    </div>
                    <a id="to-top" href="#top" className="btn btn-dark btn-lg"><i className="fa fa-chevron-up fa-fw fa-1x"></i></a>
                </footer>
                
               
            </div>
        );
    }
});

module.exports = App;


//  <footer className="footer">
            
//                     <div className="mainPage">
                                
//                         <div className="mainPageLinkButtons">
                            
//                             <div className="googleSearch">
//                                 <form method="get" action="http://www.google.com/search">
//                                     <div>
//                                         <div> <input type="text" name="q" size="25" /> </div>
//                                         <div> <input type="submit" value="Google Search" /> </div>
//                                     </div>
//                                 </form>
//                                 Copyright 2016 Help-In-Hand
//                             </div>
                            
//                             <div className="linksToOtherPages">
//                                 <div>
//                                     <a href="https://www.cmha.ca"> Canadian Mental Health Association </a>
//                                 </div>
                            
//                                 <div>
//                                     <a href="http://www.schizophrenia.on.ca/Research/Canadian-Institute-for-Social-Innovation-in-Mental"> Canadian Institute for Social Innovation in Mental Illness </a>
//                                 </div>
//                             </div>
                            
//                             <div className="homepageFooterContact">
//                                 <Link to="/contactUs" className="contactUs"> <p className="contactUs"> Contact Us </p> </Link>
//                             </div>

//                         </div>
//                     </div>
            
                
//                 </footer>