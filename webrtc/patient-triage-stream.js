 /*global io*/
 /*global navigator*/
 /*global SimplePeer*/


 var socket = io();

 socket.emit('triage patient');
 socket.on('start stream', function() {


  navigator.webkitGetUserMedia({
   video: true,
   audio: false
  }, function(stream) {

   var peer = new SimplePeer({
    initiator: false,
    trickle: false,
    stream: stream
   });
   
   peer.on('signal', function(data) {
    console.log('received signal');
    socket.emit('stream id', data);
   });
   
   socket.on('connect peer', function(data) {
    console.log('received connect');
    peer.signal(data);
   });

   peer.on('stream', function(stream) {
    console.log('peer data');
    var video = document.createElement('video');
    document.body.appendChild(video);

    video.src = window.URL.createObjectURL(stream);
    video.play();
   });
   
   socket.on('queued', function(data){
    console.log('I am a patient and I heard that I was queued');
    alert('you have been put in a queue. thank you for your patience');
    socket.emit('patient');
   });
   
  }, function(err) {
   console.error(err);
  });
 });
 