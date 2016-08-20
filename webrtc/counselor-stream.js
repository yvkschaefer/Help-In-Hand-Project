 // /*global io*/
 // /*global navigator*/
 // /*global SimplePeer*/


 // var socket = io();


 // socket.emit('counselor');
 // socket.on('start stream', function() {


 //  navigator.webkitGetUserMedia({
 //   video: true,
 //   audio: false
 //  }, function(stream) {

 //   console.log('got media stream');
 //   var peer = new SimplePeer({
 //    initiator: true,
 //    trickle: false,
 //    stream: stream
 //   });

 //   peer.on('signal', function(data) {
 //    console.log('received signal');
 //    socket.emit('stream id', data);
 //   });

 //   socket.on('connect peer', function(data) {
 //    console.log('received connect');
 //    peer.signal(data);
 //   });

 //   peer.on('stream', function(stream) {
 //    console.log('peer data');
 //    var video = document.createElement('video');
 //    document.body.appendChild(video);

 //    video.src = window.URL.createObjectURL(stream);
 //    video.play();

 //   });
 //  }, function(err) {
 //   console.error(err);
 //  });
 // });