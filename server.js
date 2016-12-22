// server.js
// where your node app starts

var rest = require('unirest');
/*require(['unirest'], function (unirest) {
    //foo is now loaded.
});*/

function getHTML(url, next) {
  var unirest = require('unirest');
  unirest.get(url)
    .end(function(response) {
      var body = response.body;
      if (next) next(body);
    });
}


function getAnswer (query, callback) {
  var qnamakerUriBase = "https://westus.api.cognitive.microsoft.com/qnamaker/v1.0";
  var knowledgebaseId = "b693c8be-313c-434d-b3a7-dad2d4656039";
  var builder = qnamakerUriBase + "/knowledgebases/" + knowledgebaseId + "/generateAnswer";
  
  var qnamakerSubscriptionKey = "a6fbd18b9b2e45b59f2ce4f73a56e1e4";
  var headers = {
      "ocp-apim-subscription-key": qnamakerSubscriptionKey,
      "content-type": "application/json",
      "cache-control": "no-cache",
  };
  
  //var payload = "{\"question\":\"Why bother with hashing?\"}";
  //var payload = {"question": "What is hashing?"};
  var payload = {"question": query};

  rest.post(builder)
    .headers(headers)
    .send(payload)
    .end(function (response) {
      if (callback) 
        callback(response);
      else 
        console.log(response.body);
    });
  
}

//getHTML('http://purple.com/', function(html) {
//  console.log(html);
//});


// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  //dreams.push(request.query.dream);
  console.log (response); 
  var entry;
  getAnswer(request.query.dream, function (resp) {
    console.log(resp.request.path, resp.request.body); 
    console.log(resp.body.answer);
    console.log("confidence: " + resp.body.score);
    request.query.dream += ":("+ resp.body.score +"%) " + resp.body.answer
    dreams.push(request.query.dream);
    console.log(dreams);
  });
  //response.send(request.query.dream + ":("+ resp.body.score +")" + resp.body.answer);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
  ];


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

