/*
 * Primary file for API
 *
 */

// Dependencies
var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {

  var parsedUrl = url.parse(req.url, true);

  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  var method = req.method.toLowerCase();

  var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;


  chosenHandler(method, function (statusCode, payload) {
    statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
    payload = typeof (payload) == 'object' ? payload : {};
    var payloadString = JSON.stringify(payload);

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    res.end(payloadString);

  });

});

server.listen(3000, function () {
  console.log('The server is up and running now');
});

var handlers = {};

handlers.welcome = function (method, callback) {
  if (method === 'post') {
    callback(200, { 'message': 'Welcome to the API son!' });
  }
  else {
    callback(404, { 'error': 'Not found' });

  }
};
handlers.notFound = function (data, callback) {
  callback(407);
};
var router = {
  'welcome': handlers.welcome
};