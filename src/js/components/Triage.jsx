/* global io*/
/* global navigator*/
var React = require('react');
var SimplePeer = require('simple-peer');

var Triage = React.createClass({
    getInitialState: function() {
        return {connected: false};
    },
    componentDidMount: function() {
        var socket = io();
        var that = this;
        socket.emit('triage patient');
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

            }, function(err) {
                console.error(err);
            });
        });

    },
    _connected: function() {
        return (
            <div>
                <p>You are now talking to someone</p>
                <video ref="videoPlayer"/>
            </div>
        );
    },
    _disconnected: function() {
        return (
            <div>
                {
                    this.state.queued ?
                    'You are in a queue to talk to a counselor. Please wait :)'
                    :
                    'You are in a queue for triage'
                }
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

module.exports = Triage;