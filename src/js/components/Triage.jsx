/* global io*/
/* global navigator*/
var React = require('react');
var SimplePeer = require('simple-peer');
var StopCall = require('./StopCall');
var GotHungUpOn = require('./GotHungUpOn');
var fr = require('../../firebase/firebase.js');

/*global localStorage*/

var userId = localStorage.getItem('user');

var Triage = React.createClass({
    getInitialState: function() {
        return {
            connected: false
        };
    },
    componentDidMount: function() {
        console.log('does I get userId ', userId);
        var socket = this.socket = io();
        var that = this;
        socket.emit('triage patient', {userId: userId});
        socket.on('start stream', function() {
            that.setState({
                connected: true
            });

            navigator.webkitGetUserMedia({
                video: true,
                audio: false
            }, function(stream) {

                var peer = new SimplePeer({
                    initiator: false,
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

                peer.on('stream', function(stream) {
                    console.log('peer data');
                    var video = that.refs.videoPlayer;
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                });

                function onQueued(data) {
                    that.setState({
                        connected: false,
                        queued: true
                    });
                    peer.destroy();
                    var tracks = stream.getTracks();
                    tracks.forEach(function(track) {
                        track.stop();
                    });
                    socket.removeListener('connect peer', onConnectPeer);
                    socket.removeListener('queued', onQueued);
                }
                socket.on('queued', onQueued);

                function onStopped() {
                    console.log('onStopped was called');
                    that.setState({
                        connected: false
                    });
                    peer.destroy();
                    var tracks = stream.getTracks();
                    tracks.forEach(function(track) {
                        track.stop();
                    });
                    socket.removeListener('connect peer', onConnectPeer);
                    socket.removeListener('call stopped', onStopped);
                }
                socket.on('call stopped', onStopped);

                function gotHungUpOn() {
                    console.log('triage heard they were hung up on');
                    that.setState({
                        hungUpOn: true
                    });
                    peer.destroy();
                    var tracks = stream.getTracks();
                    tracks.forEach(function(track) {
                        track.stop();
                    });
                    socket.removeListener('connect peer', onConnectPeer);
                    socket.removeListener('call stopped', onStopped);
                }
                socket.on('got hung up on', gotHungUpOn);

            }, function(err) {
                console.error(err);
            });
        });

    },
    _stopCall: function() {
        this.socket.emit('patient ended conversation');
        this.setState({
            stopCall: true
        });
    },
    _endCallUi: function() {
        return (
            <div>
                <button className='stopCallButton' ref='endCall' onClick={this._stopCall}>stop call</button>
            </div>
        );
    },
    _connected: function() {
        return (
            <div className="triageTalking">
                <div className="triageTalkingText">
                    <p>You are now talking to someone</p>
                    <video ref="videoPlayer"/>
                    {this._endCallUi()}
                </div>
            </div>
        );
    },
    _disconnected: function() {
        return (
            <div>
                {
                    this.state.stopCall ?
                        <StopCall/> 
                        :
                        this.state.queued ?
                            <div className="triage">
                                <div className="triageText">
                                    <p>You are in a queue to talk to a counselor.</p>
                                    <p>Please wait :) </p>
                                </div>
                            </div>
                            :
                            this.state.hungUpOn ?
                                <GotHungUpOn/>
                                :
                                <div className="triage">
                                    <div className='triageText'>
                                        <p>You are in a queue for triage</p>
                                        <p>
                                            Thanks for your patience
                                            <span className="dots"> 
                                                ...
                                            </span>
                                        </p>
                                    </div>
                                </div>
                }
            </div>
        );
    },
    render: function() {
        return (
            <div>
                {
                    this.state.connected ? this._connected() : this._disconnected()
                }
            </div>
        );
    }
});

module.exports = Triage;