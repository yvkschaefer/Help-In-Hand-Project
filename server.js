// npm run dev
// node server.js

// https://final-project-decode-takanarisasaki.c9users.io/
// https://console.firebase.google.com/project/decodemtl-final-project/database/data

// We are using firebase rather than mySQL to store and retrieve information
// Firebase can take care of user authentication, which is much simpler to use!

var express = require('express');
var app = express();

app.use('/files', express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});



app.listen(process.env.PORT);