var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');


// var listOfCounselors = [
// 	{
// 	key: 1,
// 	name: 'Kara Schaefer',
// 	photo: 'https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAllAAAAJDczMzQ3ZmNiLWY3NzctNDk5OC05MjgzLTM1YTUwY2YwZDNmMA.jpg',
// 	patientComments: "Kara really helped me through a tough time and I couldn't have asked for a better therapist.",
// 	credentials: "LCP - Licensed Clinical Psychologist",
// 	status: ""
// }, {
// 	key: 2,
// 	name: 'Mr. Smith',
// 	photo: 'http://www.golfian.com/wp-content/uploads/2016/07/Nice-BrownChihuahua-Dog-Face-Picture.jpg',
// 	patientComments: "Mr. Smith was able to talk me through a family crisis that I wouldn't have been able to get through on my own.",
// 	credentials: "LCPC - Licensed Clinical Professional Counselor",
// 	status: ""
// }, {
// 	key: 3,
// 	name: 'Dylan Pelletier',
// 	photo: 'http://www.onsemiro.org/html/pages/eteacher/10.png',
// 	patientComments: "Talking to Dylan helped save my marriage. He really helped us get over a rough patch.",
// 	credentials: "LCMFT - Licensed Clinical Marriage and Family Therapist",
// 	status: ""
// }, {
// 	key: 4,
// 	name: 'Emma Park',
// 	photo: 'http://www.golftripz.com/wp-content/uploads/Cambodia/Angkor-Wat-at-Sunset-Siem-Reap-Cambodia-350.jpg',
// 	patientComments: "Despite her young age, I felt like she really helped me get through the passing of my father.",
// 	credentials: "LCMHC - Licensed Clinical Mental Health Counselor",
// 	status: ""
// }, {
// 	key: 5,
// 	name: 'Sandra Valley',
// 	photo: 'https://scontent-lga3-1.xx.fbcdn.net/t31.0-8/13122907_890915234368586_343329922733601398_o.jpg',
// 	patientComments: "Sandra's 30 years of experience in mental health certainly helped her to help me quickly and efficiently. Thanks!",
// 	credentials: "LCP - Licensed Clinical Psychologist",
// 	status: ""
// }, {
// 	key: 6,
// 	name: 'Marc Lehoux',
// 	photo: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/563191_10150680246381378_658638029_n.jpg?oh=b438043acebe22f784e89771e8e5af71&oe=5811058C',
// 	patientComments: "Marc was very professional and helpful and is largely responsible for me now being able to live my life again!",
// 	credentials: "LCPC - Licensed Clinical Professional Counselor",
// 	status: ""
// }, {
// 	key: 7,
// 	name: 'Christine Lee',
// 	photo: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10470238_1006373092723375_6470945268279924007_n.jpg?oh=cf8a7293c908f81d6b3b1da149155aad&oe=5816FF65',
// 	patientComments: "Christine's calm, easy-going approach really helped me to let out some things I'd been keeping bottled up for years. Thanks!",
// 	credentials: "LCMFT - Licensed Clinical Marriage and Family Therapist",
// 	status: ""
// }, {
// 	key: 8,
// 	name: 'Hye-Jin Bae',
// 	photo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrkIAm51m1Q55ekqeCj4qCj_addBnO1yVuQeCbSN8tNyh-pNGOeQ',
// 	patientComments: "Hye-Jin was instrumental in helping me get through my anxiety issues. Thanks so much!",
// 	credentials: "LCMHC - Licensed Clinical Mental Health Counselor",
// 	status: ""
// }];

var CounselorsProfile = React.createClass({

	componentWillMount: function() {
		// console.log("COMES IN HERE FIRST");
		var that = this;
		
		fr.firebase.database().ref('counselors/').on('value', function(snapshot) {
			//console.log("HEYHEY",snapshot.val());
			// console.log("COMES IN HERE THIRD BECAUSE OF CALLBACK; render happens before setState beneath");
			that.setState({
				listOfCounselors: snapshot.val()
			})
		});
	},
	_renderContent: function() {
		if(this.state.listOfCounselors.length > 0) {
			
			
			
			return (
				
					this.state.listOfCounselors.map(function(counselor){
						return (
								<div className="container">
					        <div className="row">
					            <div className="team">
					                <div className="teamimg"></div>
					                <h4 className="profileHeaderStyling">Alex Morrison</h4>
					                <p className="profilePStylingOne">GRAPHIC DESIGNER / CO-FOUNDER</p>
					                <p className="profilePStylingTwo">Maecenas non elit egestas, interdum elit eget, ornare massa. Vestibulum imperdiet urna at rutrum interdum. Nullam luctus lorem non magna commodo mattis. Curabitur pharetra pulvinar quam et viverra. Duis interdum et nunc sed laoreet. Cras
					                    ultrices dolor id ipsum malesuada congue.Quisque luctus.</p>
					                <div className="teamsocial">
					                    <ul>
					                        <li className="liStyling">
					                            <a href="#" title="Facebook">
					                                <div className="facebook-team">
					                                	<i className="fa fa-facebook"></i>
					                                </div>
					                            </a>
					                        </li>
					                        <li className="liStyling">
					                            <a href="#" title="Twitter">
					                                <div className="twitter-team"><i className="fa fa-twitter"></i></div>
					                            </a>
					                        </li>
					                        <li className="liStyling">
					                            <a href="#" title="Google">
					                                <div className="google-team">
					                                	<i className="fa fa-google-plus"></i>
					                                </div>
					                            </a>
					                        </li>
					                        <li className="liStyling">
					                            <a href="#" title="Pinterest">
					                                <div className="pinterest-team">
					                                	<i className="fa fa-pinterest"></i>
					                                </div>
					                            </a>
					                        </li>
					                    </ul>
					                </div>
					            </div>
					            <div className="team">
					                 <div className="teamimg"></div>
					                <h4 className="profileHeaderStyling">Bryan Jones</h4>
					                <p className="profilePStylingOne">UI / UX DESIGNER</p>
					                <p className="profilePStylingTwo">Quisque dapibus tincidunt luctus. Nulla consequat lorem vel turpis porta pharetra. Aliquam faucibus magna erat, a gravida dui bibendum eu. Curabitur elementum nibh vel diam luctus varius. Curabitur sem lectus, viverra ultricies quam iaculis,
					                    elementum dapibus dui. Phasellus viverra fringilla nunc varius dictum.</p>
					                <div className="teamsocial">
					                    <ul>
					                        <li className="liStyling">
					                            <a href="#" title="Facebook">
					                                <div className="facebook-team">
					                                	<i className="fa fa-facebook"></i>
					                                </div>
					                            </a>
					                        </li>
					                        <li className="liStyling">
					                            <a href="#" title="Twitter">
					                                <div className="twitter-team"><i className="fa fa-twitter"></i></div>
					                            </a>
					                        </li>
					                        <li className="liStyling">
					                            <a href="#" title="Google">
					                                <div className="google-team">
					                                	<i className="fa fa-google-plus"></i>
					                                </div>
					                            </a>
					                        </li>
					                        <li className="liStyling">
					                            <a href="#" title="Pinterest">
					                                <div className="pinterest-team">
					                                	<i className="fa fa-pinterest"></i>
					                                </div>
					                            </a>
					                        </li>
					                    </ul>
					                </div>
					            </div>
					            <div className="team">
					               <div className="teamimg"></div>
					                <h4 className="profileHeaderStyling">Gabrielle Vasques</h4>
					                <p className="profilePStylingOne">ILLUSTRATOR / CO-FOUNDER</p>
					                <p className="profilePStylingTwo">Ut tincidunt sollicitudin arcu, non bibendum mi adipiscing sit amet. Nulla et facilisis orci. Fusce bibendum leo sodales, sollicitudin turpis eu, scelerisque nulla. Aliquam et urna ac felis ornare consectetur at vitae libero. Donec nec
					                    quam ut odio suscipit aliquam. Nulla sit amet tortor molestie, blandit justo non, imperdiet velit.</p>
					                <div className="teamsocial">
					                    <ul>
					                        <li className="liStyling">
					                            <a href="#" title="Facebook">
					                                <div className="facebook-team">
					                                	<i className="fa fa-facebook"></i>
					                                </div>
					                            </a>
					                        </li>
					                        <li className="liStyling">
					                            <a href="#" title="Twitter">
					                                <div className="twitter-team"><i className="fa fa-twitter"></i></div>
					                            </a>
					                        </li>
					                        <li className="liStyling">
					                            <a href="#" title="Google">
					                                <div className="google-team">
					                                	<i className="fa fa-google-plus"></i>
					                                </div>
					                            </a>
					                        </li>
					                        <li className="liStyling">
					                            <a href="#" title="Pinterest">
					                                <div className="pinterest-team">
					                                	<i className="fa fa-pinterest"></i>
					                                </div>
					                            </a>
					                        </li>
					                    </ul>
					                </div>
					            </div>
					        </div>
    				</div>
							
							);
					
					})
				);
		}
	},
	render: function() {
		// console.log("COMES IN HERE SECOND");
		var showAllCounselors;
		// console.log(this.state);
		if (this.state.listOfCounselors.length > 0) {

			<div>
				<div className="counselorsHeaderText"> <h1>Our Counselors</h1> </div>
				<div className="counselorsProfilePage">
					{this.state.listOfCounselors.map(function(counselor){
					return ('dd')
					
					})}
				</div>
			
					
		}
		
		return (
			<div classNameName="counselorsBackground">
				{showAllCounselors}
			</div>
		);
	}
	
});


var CounselorsProfileWithRoute = withRouter(CounselorsProfile);

module.exports = CounselorsProfileWithRoute;
