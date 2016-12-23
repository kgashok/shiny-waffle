// server.js
// where your node app starts

var rest = require('unirest');
/*require(['unirest'], function (unirest) {
    //foo is now loaded.
});*/

/*
 * STEP 1 : Setup the URL to point at the Microsoft Q&A service
 * STEP 2 : Build the query 
 * STEP 3 : Make the Unirest POST call
 * 
 */
function getAnswer (query, callback) {
  // STEP 1 
  var qnamakerUriBase = "https://westus.api.cognitive.microsoft.com/qnamaker/v1.0";
  var knowledgebaseId = "b693c8be-313c-434d-b3a7-dad2d4656039";
  var builder = qnamakerUriBase + "/knowledgebases/" + knowledgebaseId + "/generateAnswer";
  
  var qnamakerSubscriptionKey = "a6fbd18b9b2e45b59f2ce4f73a56e1e4";
  var headers = {
      "ocp-apim-subscription-key": qnamakerSubscriptionKey,
      "content-type": "application/json",
      "cache-control": "no-cache",
  };
  
  // STEP 2
  //var payload = "{\"question\":\"Why bother with hashing?\"}";
  //var payload = {"question": "What is hashing?"};
  var payload = {"question": query};

  // STEP 3
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

app.get("/questions", function (request, response) {
  response.send(questions);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/questions", function (request, response) {
  //dreams.push(request.query.dream);
  getAnswer(request.query.question, function (resp) {
    console.log(resp.request.path, resp.request.body); 
    console.log(resp.body.answer);
    console.log("confidence: " + resp.body.score);
    request.query.question += ":("+ resp.body.score +"%) " + resp.body.answer
    questions.unshift(request.query.question);
    console.log(questions);
  });
  //response.send(request.query.dream + ":("+ resp.body.score +")" + resp.body.answer);
  response.sendStatus(200);
});

// Simple in-memory store for now
var questions = [
  "What is a data structure?",
  "What is a linked list?",
  "Is linked list non-linear?"
  ];


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/*
function getHTML(url, next) {
  var unirest = require('unirest');
  unirest.get(url)
    .end(function(response) {
      var body = response.body;
      if (next) next(body);
    });
}

getHTML('http://purple.com/', function(html) {
  console.log(html);
});
*/
