/* global io*/
/* global navigator*/
var React = require('react');
var SimplePeer = require('simple-peer');

var LogoutPage = require('./LogoutPage');

var TriageCounselor = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var socket = this.socket = io();
        var that = this;

        socket.emit('triage counselor');

        socket.on('start stream', function() {

            that.setState({
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
                    console.log('hi I am a peer and I just heard a signal ', peer);
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
                    console.log('peer after peer.destroy() ', peer);
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
    _stopCall: function(){
        this.socket.emit('triage counselor ended conversation');
    },
    _endCallUi: function() {
        return (
            <div>
                <button className='tCounselorStopCallButton' ref='endCall' onClick={this._stopCall}><h4>stop call</h4></button>
            </div>
        );
    },
    _triageFirebaseId: function(){
        this.socket.patientFirebaseId;
        console.log('looking for the patient firebase id inside of tCouns ', this.socket.patientFirebaseId);
    },
    _connected: function() {
        return (
            <div className='triageCounselorTalking'>
                <p>You are talking to a patient in triage</p>
                <video ref="videoPlayer"/>
                <div className='tCounselorButtonsContainer'>
                    {this._priorityUi()}{this._endCallUi()}
                </div>
                <div>
                    counselor has the patient's firebase Id: {this._triageFirebaseId()}
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