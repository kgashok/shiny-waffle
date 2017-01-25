// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {

  // This is invoked to refresh previously asked 
  // questions, if any? 
  $.get('/questions', function funcInvokedAfterGET(questions) {
    // for e.g. https://roomy-plate.gomix.me/questions
    // refresh and update the DOM with 
    // previous Q and As from the same session
    // along with any valid ones post the POST request
    questions.forEach(function(question) {
      $('<li></li>').text(question).appendTo('ul#questions');
    });
  });

  // This is invoked when the question has been entered 
  // and the "Get Answer!" button is clicked
  $('form').submit(function(event) {
    console.log ("Inside submit");
    event.preventDefault();
    
    // We need to figure out two arguments to make 
    // the POST call 
    // Step 1 - prepare the knowledge URL to send query 
    var kid = $("#kid").val();
    // Step 2 - get the Question for which we want to find answers
    var question = $("#query").val();
    if (question.length === 0)
      return;
    var args = {"question": question, "kid": kid};
    var fullRoute = "/questions?" + $.param(args); 
    // console.log (fullRoute);
    // for e.g.
    //   https://roomy-plate.gomix.me/questions?questions=algorithm&kid=cse
    
    // prepare the POST request to the server
    $.post(fullRoute, function funcInvokedAfterPOST() {
      // this is the callback function which gets
      // called after the server is done serving the request
      // Before we can "refresh" to get the results,
      // we invoke a setTimeOut with a callback function
      window.setTimeout(function afterTimeOut(){
        // reloads and displays answer + previous answers
        // there must be a more efficient way of doing this
        location = location;
        //location.reload(true);
        //$('input').val('');
        $("#query").val('');  // clear out the query text dialog
        $("#query").focus();
      },1500);  // some arbitrary value - may not be sufficient
      
    }); // end of post call
  }); // end of submit call

});
