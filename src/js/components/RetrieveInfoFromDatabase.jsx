var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var fr = require('../../firebase/firebase.js');

var RetrieveInfoFromDatabase = React.createClass({
    getInitialState: function() {
        return {
            userInfo: {},
            counselorInfo: {}
        };
    },
    _handleUserSearch: function() {
        var that = this;
        var userId = this.refs.userId.value;
        //console.log("userId:", userId);
        
        fr.firebase.database().ref('users/' + userId).on('value', function(snapshot) {
            console.log(snapshot.val());
            that.setState({
                userInfo: snapshot.val()
            });
        });
        
    },
    _handleCounselorSearch: function() {
        var that = this;
        var counselorId = this.refs.counselorId.value;
        
        fr.firebase.database().ref('counselors/' + counselorId).on('value', function(snapshot) {
            console.log(snapshot.val());
            that.setState({
                counselorInfo: snapshot.val()
            });
        });
    },
    render: function() {
        
        var that = this;
        var userInfo = this.state.userInfo;

        var userInfoToShow =  Object.keys(this.state.userInfo).map(function(infoKey) {
           
            // We can only return as a <div></div> a string but not Object, so for all object, we gotta do something with it, for example, convert the whole object into a string as well
            // console.log(Object.prototype.toString.call(that.state.userInfo[eachKey]) === '[object Object]') returns true if object; false if not
            if (Object.prototype.toString.call(that.state.userInfo[infoKey]) === '[object Object]') {
                var illnessAndSymptoms = userInfo['Illnesses & Symptoms'];
                console.log('illnessAndSymptoms', illnessAndSymptoms);
                
                var illnessToShow = Object.keys(illnessAndSymptoms).map(function(illnessKey) {
                    return <div> ***{illnessKey}:*** {illnessAndSymptoms[illnessKey].map(function(eachSymptom) {
                        return <div> <ul> <li> {eachSymptom} </li></ul> </div>
                    })} </div>
                });
                return illnessToShow;
            }
           
            else {
                return <div> {infoKey}: {that.state.userInfo[infoKey]} </div>
            }
            //console.log(Object.prototype.toString.call(that.state.userInfo[eachKey]) === '[object Object]')
        });
        
        //------------------------
        
        var counselorInfoToShow;
        var counselorInfo = this.state.counselorInfo;
        
        var counselorInfoToShow =  Object.keys(this.state.counselorInfo).map(function(eachKey) {
            if (Object.prototype.toString.call(that.state.counselorInfo[eachKey]) === '[object Object]') {
                console.log('need to handle object');
            }
            else {
                return <div> {eachKey}: {that.state.counselorInfo[eachKey]} </div>
            }
        });
        
        //------------------------
        
        return (
            <div>
                Get user's info: <br/>
                <input type="text" ref="userId" />
                <button onClick={this._handleUserSearch} > Search! </button> <br/><br/>
                
                <div> {userInfoToShow} </div> <br/><br/>
                
                Get counselor's info: <br/>
                <input type="text" ref="counselorId" />
                <button onClick={this._handleCounselorSearch} > Search! </button> <br/><br/>
                
                <div> {counselorInfoToShow} </div> <br/><br/>
            </div>
        );
    }
    
});

var RetrieveInfoFromDatabaseWithRoute = withRouter(RetrieveInfoFromDatabase);

module.exports = RetrieveInfoFromDatabaseWithRoute;