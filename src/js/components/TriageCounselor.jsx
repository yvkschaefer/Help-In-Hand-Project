/* global io*/
/* global navigator*/
var React = require('react');
var SimplePeer = require('simple-peer');

var LogoutPage = require('./LogoutPage');

/*global localStorage*/
var userId = localStorage.getItem('user');

var TriageCounselor = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        console.log('TRIAGE COUNSELOR user id ', userId);
        var socket = this.socket = io();
        var that = this;

        socket.emit('triage counselor');

        socket.on('start stream', function(data) {

            // console.log('is this the triage form');
            that.setState({
                data: data,
                connected: true
            });
            navigator.webkitGetUserMedia({
                video: true,
                audio: false
            }, function(stream) {

                console.log('got media stream');
                var peer = new SimplePeer({
                    initiator: true,
                    trickle: false,
                    stream: stream,
                    config: {
                        iceServers: [{
                            url: 'stun:stun3.l.google.com:19302'
                        }]
                    }
                });

                peer.on('signal', function(data) {
                    console.log('received signal');
                    socket.emit('stream id', data);
                });

                function onConnectPeer(data) {
                    console.log('received connect');
                    peer.signal(data);
                }
                socket.on('connect peer', onConnectPeer);

                function onStopCall() {
                    socket.removeListener('connect peer', onConnectPeer);
                    socket.removeListener('stop call', onStopCall);
                    peer.destroy();
                    var tracks = stream.getTracks();
                    tracks.forEach(function(track) {
                        track.stop();
                    });
                    that.setState({
                        connected: false
                    });
                }

                socket.on('stop call', onStopCall);

                peer.on('stream', function(stream) {
                    console.log('peer data');
                    console.log('connected, looking for triage form ', socket);
                    var video = that.refs.videoPlayer;

                    video.src = window.URL.createObjectURL(stream);
                    video.play();

                });

                socket.on('logged out', function() {
                    socket.removeListener('connect peer', onConnectPeer);
                    peer.destroy();
                    var tracks = stream.getTracks();
                    tracks.forEach(function(track) {
                        track.stop();
                    });
                });
            }, function(err) {
                console.error(err);
            });
        });


    },
    _handleAssign: function() {
        var priority = this.refs.priorityInput.value;

        this.socket.emit('queue', {
            priority: priority
        });
    },
    _priorityUi: function() {
        return (
            <div>
                <input type="text" className='priorityTextInput' ref="priorityInput"/>
                <button className='priorityButton' onClick={this._handleAssign}><h4>assign priority</h4></button>
            </div>
        );
    },
    _stopCall: function() {
        this.socket.emit('triage counselor ended conversation');
    },
    _endCallUi: function() {
        return (
            <div>
                <button className='tCounselorStopCallButton' ref='endCall' onClick={this._stopCall}><h4>stop call</h4></button>
            </div>
        );
    },
    _connected: function() {
        var userInfo = this.state.data;
        var userInfoToShow;

        if (userInfo) {
            userInfoToShow = Object.keys(userInfo).map(function(infoKey) {

                if (Object.prototype.toString.call(userInfo[infoKey]) === '[object Object]') {
                    var illnessAndSymptoms = userInfo['Illnesses & Symptoms'];
                    console.log('illnessAndSymptoms', illnessAndSymptoms);

                    var illnessToShow = Object.keys(illnessAndSymptoms).map(function(illnessKey) {
                        return (
                            <div> ***{illnessKey}:*** {illnessAndSymptoms[illnessKey].map(function(eachSymptom) {
                            return (
                                <div> <ul> <li> {eachSymptom} </li></ul> </div>
                            );
                        })} </div>
                        );
                    });
                    return illnessToShow;
                }
                else {
                    return (
                        <div> {infoKey}: {userInfo[infoKey]} </div>
                    );
                }
            });
        }
        else {
            userInfoToShow = <div>this patient did not fill out a form</div>;
        }
        return (
            <div className='triageCounselorTalking'>
                    <p>You are talking to a patient in triage</p>
                    <video ref="videoPlayer"/>
                    <div className='tCounselorButtonsContainer'>
                        {this._priorityUi()}{this._endCallUi()}
                    </div>
                    <div>
                        Patient Intake Form:
                        {userInfoToShow}
                        
                    </div>
                </div>
        );
    },
    _disconnected: function() {
        return (
            <div className='tCounselorWaiting'>
                <p>There are no patients in the queue. Time to browse Reddit!</p>
                <button className='tCounselorLogoutButton' onClick={this._logout}>logout</button>
            </div>
        );
    },
    _logout: function() {
        console.log('logout button was clicked');
        // this.socket.isFree = false;
        this.socket.emit('triageCounselor logged out');
        this.setState({
            logoutButtonClicked: true
        });
    },
    render: function() {
        return (
            <div>
                {this.state.logoutButtonClicked ? <LogoutPage /> : this.state.connected ? this._connected() : this._disconnected()}
            </div>
        );
    }
});

module.exports = TriageCounselor;

//  {userInfoToShow}