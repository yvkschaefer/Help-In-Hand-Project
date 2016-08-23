var React = require('react');
var SimplePeer = require('simple-peer');

/* global io*/
/* global navigator*/

var Counselor = React.createClass({
    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        var socket = this.socket = io();
        var that = this;

        socket.emit('counselor');

        socket.on('start stream', function(data) {

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

                    var video = that.refs.videoPlayer;

                    video.src = window.URL.createObjectURL(stream);
                    video.play();

                });
            }, function(err) {
                console.error(err);
            });
        });
    },

    _stopCall: function() {
        this.socket.emit('counselor conversation over');
    },

    _endCallUi: function() {
        return (
            <div>
                <button ref="endCall" onClick={this._stopCall}>stop call</button>
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

                    var illnessToShow = (
                        <div key={infoKey}>
                            <p>Illnesses:</p>
                            <ul>
                            {
                                Object.keys(illnessAndSymptoms).map(function(illnessKey) {
                                return (
                                    <li key={illnessKey}>
                                        ***{illnessKey}:***
                                        <ul>
                                        {
                                            illnessAndSymptoms[illnessKey].map(function(eachSymptom) {
                                                return (
                                                    <li key={eachSymptom}>
                                                        {eachSymptom}
                                                    </li>
                                                );
                                            })
                                        }
                                        </ul>
                                    </li>
                                );
                            })
                            }
                            </ul>
                        </div>
                    );
                    return illnessToShow;
                }
                else {
                    return (
                        <div key={infoKey}>
                            {infoKey}: {userInfo[infoKey]}
                        </div>
                    );
                }
            });
        }
        else {
            userInfoToShow = <div>
                                this patient did not fill out a form
                            </div>;
        }
        return (
            <div className='counselorTalking'>
                <p>You are talking to a patient</p>
                <div className='counselorConnectedMainContents'>
                    <div>
                        <video ref="videoPlayer"/>
                        {this._endCallUi()}
                    </div>
                    <div>
                        Patient Intake Form:
                        {userInfoToShow}
                    </div>
                </div>
            </div>
        );
    },

    _disconnected: function() {
        return (
            <div className='counselorWaiting'>
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