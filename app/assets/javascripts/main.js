$(function() {
  // Here we instantiate a new WebSocketRails instance
  dispatcher = new WebSocketRails($('#echo').data('uri'), true)
  // We send the message when we push the 'send' button
  document.querySelector('button#fire').onclick = function() {
    send(document.querySelector('#send').value);
    document.querySelector('#send').value = '';
  };
  // We bind the incoming message event
  dispatcher.bind('new_message',
    function(message) {
      document.querySelector('#messages').innerHTML += '<li>' + message + '</li>';
    });
    
  //~ dispatcher.bind('posts',
    //~ function(message) {
      //~ document.querySelector('#posts').innerHTML += '<li>' + message.title + '</li>';
    //~ });
    
  // Channel 
  channel = dispatcher.subscribe('posts');
  channel.bind('posts', function(post) {
	console.log(post);
	console.log('a new post about '+post.title+' arrived!');
	document.querySelector('#posts').innerHTML += '<h3>' + post.title + '</h3>';
  });
 
});
// Here we send the message in the websocket
function send(message) {
  dispatcher.trigger('new_message', message);
  //~ channel.trigger('posts', message);
  //~ dispatcher.trigger('posts', message);
}

var success = function(response) {
  console.log("Wow it worked: "+response.message);
}

var failure = function(response) {
  console.log("That just totally failed: "+response.message);
}