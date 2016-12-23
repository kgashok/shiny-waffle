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

    event.preventDefault();
    question = $('input').val();
    if (question.length === 0) return;
    $.post('/questions?' + $.param({question: question}), function() {
      //$('<li></li>').text(question).prependTo('ul#questions');
      
      window.setTimeout(function(){
        location = location; 
        //location.reload(true);
        $('input').val('');
        $('input').focus();
      },1500);
    }); // end of post call
  }); // end of submit call
  
});
