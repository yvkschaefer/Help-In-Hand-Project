//This jsx file is only to make Counselor's profile quickly and store the information inside Firebase database

var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');

var counselors = {
    counselor1: {
        id: 1,
        name: 'Kara Schaefer',
        photo: 'https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAllAAAAJDczMzQ3ZmNiLWY3NzctNDk5OC05MjgzLTM1YTUwY2YwZDNmMA.jpg',
        patientComments: "Kara really helped me through a tough time and I couldn't have asked for a better therapist.",
        credentials: "LCP - Licensed Clinical Psychologist",
        status: "",
    },
    counselor2: {
        id: 2,
        name: 'Mr. Smith',
        photo: 'http://www.golfian.com/wp-content/uploads/2016/07/Nice-BrownChihuahua-Dog-Face-Picture.jpg',
        patientComments: "Mr. Smith was able to talk me through a family crisis that I wouldn't have been able to get through on my own.",
        credentials: "LCPC - Licensed Clinical Professional Counselor",
        status: "",
    },
    counselor3: {
        id: 3,
        name: 'Dylan Pelletier',
        photo: 'http://www.onsemiro.org/html/pages/eteacher/10.png',
        patientComments: "Talking to Dylan helped save my marriage. He really helped us get over a rough patch.",
        credentials: "LCMFT - Licensed Clinical Marriage and Family Therapist",
        status: "",
    },
    counselor4: {
        id: 4,
        name: 'Emma Park',
        photo: 'http://www.golftripz.com/wp-content/uploads/Cambodia/Angkor-Wat-at-Sunset-Siem-Reap-Cambodia-350.jpg',
        patientComments: "Despite her young age, I felt like she really helped me get through the passing of my father.",
        credentials: "LCMHC - Licensed Clinical Mental Health Counselor",
        status: "",
    },
    counselor5: {
        id: 5,
        name: 'Sandra Valley',
        photo: 'https://scontent-lga3-1.xx.fbcdn.net/t31.0-8/13122907_890915234368586_343329922733601398_o.jpg',
        patientComments: "Sandra's 30 years of experience in mental health certainly helped her to help me quickly and efficiently. Thanks!",
        credentials: "LCP - Licensed Clinical Psychologist",
        status: "",
    },
    counselor6: {
        id: 6,
        name: 'Marc Lehoux',
        photo: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/563191_10150680246381378_658638029_n.jpg?oh=b438043acebe22f784e89771e8e5af71&oe=5811058C',
        patientComments: "Marc was very professional and helpful and is largely responsible for me now being able to live my life again!",
        credentials: "LCPC - Licensed Clinical Professional Counselor",
        status: "",
    },
    counselor7: {
        id: 7,
        name: 'Christine Lee',
        photo: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10470238_1006373092723375_6470945268279924007_n.jpg?oh=cf8a7293c908f81d6b3b1da149155aad&oe=5816FF65',
        patientComments: "Christine's calm, easy-going approach really helped me to let out some things I'd been keeping bottled up for years. Thanks!",
        credentials: "LCMFT - Licensed Clinical Marriage and Family Therapist",
        status: "",
    },
    counselor8: {
        id: 8,
        name: 'Hye-Jin Bae',
        photo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrkIAm51m1Q55ekqeCj4qCj_addBnO1yVuQeCbSN8tNyh-pNGOeQ',
        patientComments: "Hye-Jin was instrumental in helping me get through my anxiety issues. Thanks so much!",
        credentials: "LCMHC - Licensed Clinical Mental Health Counselor",
        status: "",
    }
}

var MakeCounselorsProfile = React.createClass({
    _handleSubmit: function(e) {
        e.preventDefault();
        
        console.log('NAME:', this.refs.name.value);
        
        var id = this.refs.id.value;
        
        fr.firebase.database().ref('counselors/' + id).set({
            Name: this.refs.name.value,
            Photo: this.refs.photo.value,
            'Patient Comments': this.refs.patientComments.value,
            Credentials: this.refs.credentials.value,
            Status: this.refs.status.value
        });
        
        alert('Counselor\'s profile successfully made!');
  
    },
    render: function() {
        return (
            <div>
            
                <h2> Make Counselor's Profile </h2>
                
                id: <input type="text" ref="id" /> <br/>
                Name: <input type="text" ref="name" /> <br/>
                Photo: <input type="text" ref="photo" /> <br/>
                Patient's Comments: <input type="text" ref="patientComments" /> <br/>
                Credentials: <input type="text" ref="credentials" /> <br/>
                Status: <input type="text" ref="status" /> <br/><br/>
                
                <button onClick={this._handleSubmit}> Submit! </button>
            </div>
        );
    }
});

var MakeCounselorsProfileWithRoute = withRouter(MakeCounselorsProfile);

module.exports = MakeCounselorsProfileWithRoute;