/* global io*/
/* global navigator*/
var React = require('react');
var SimplePeer = require('simple-peer');

var Counselor = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var socket = this.socket = io();
        var that = this;

        socket.emit('counselor');

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
                            url: 'stun:stun.l.google.com:19302'
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

                    var video = that.refs.videoPlayer;

                    video.src = window.URL.createObjectURL(stream);
                    video.play();

                });
            }, function(err) {
                console.error(err);
            });
        });
    },
    _stopCall: function(){
        //GOALS. (problem area for Kara to work on)
        console.log('hey you clicked the stop call button, sup');
        console.log('do I has a socket, this.socket is: ', this.socket);
    },
    _connected: function() {
        return (
            <div>
                <p>You are talking to a patient in triage</p>
                <video ref="videoPlayer"/>
                <button onClick={this._stopCall}>STOP CALL</button>
            </div>
        );
    },
    _disconnected: function() {
        return (
            <div>
                There are no patients in the queue. Time to browse Reddit!
            </div>
        );
    },
    render: function() {
        return (
            <div>
                {this.state.connected ? this._connected() : this._disconnected()}
            </div>
        );
    }
});

module.exports = Counselor;