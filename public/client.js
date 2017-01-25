// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html


$(function() {
  $.get('/questions', function(questions) {
    questions.forEach(function(question) {
      $('<li></li>').text(question).appendTo('ul#questions');
    });
  });

  $('form').submit(function(event) {

    console.log ("Inside submit");
    event.preventDefault();
    var question = $("#query").val();
    if (question.length === 0) return;
    var kid = $("#kid").val();
    var args = {"question": question, "kid": kid}; 

    $.post('/questions?' + $.param(args),  function() {
      window.setTimeout(function(){
        location = location; 
        //location.reload(true);
        //$('input').val('');
        $("#query").val('');
        $("#query").focus();
      },1500);
      
    }); // end of post call

  }); // end of submit call
  
});
