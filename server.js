var util = require('util');
var twitter = require('twitter');

var security = require('./security.js');
var twit = new twitter({
  consumer_key        : security.consumer_key,
  consumer_secret     : security.consumer_secret,
  access_token_key    : security.access_token_key,
  access_token_secret : security.access_token_secret
});

var option = {'track': ''};

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var  serveIndex = require('serve-index');
var stream;

app.get('/search/:key', function(req, res) {
  if(stream) {
    stream.destroy();
  }
  option.track = req.params.key;
  search(option);
  res.sendStatus(200);

});

var search = function(option) {
  console.log('search:', option.track);
  twit.stream('statuses/filter', option, function(twitterStream) {
    stream = twitterStream;
    stream.on('data', function (data) {
      if(data.user.name) {
        io.sockets.emit('msg', {name: data.user.name, tweet: data.text, image: data.user.profile_image_url});
      }
      // console.log(data);
    });
    stream.on('error', function(error) {
      console.log('######', error);
    });
  });
};

app.use(express.static(__dirname + '/public'));
app.use(serveIndex(__dirname + '/public'));

server.listen(3000);
io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
  });
});


