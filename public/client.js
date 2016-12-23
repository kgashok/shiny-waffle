// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html



$(function() {

  $.get('/questions', function(questions) {
    questions.forEach(function(question) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });
  });

  $('form').submit(function(event) {

    event.preventDefault();
    question = $('input').val();
    $.post('/questions?' + $.param({question: question}), function() {
      $('<li></li>').text(question).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

});
