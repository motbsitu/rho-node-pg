$(function(){
  getBooks()

  //register submit form listner
  $('#book-form').on('submit', addBook);
});

function getBooks(){
  $.ajax({
    type: 'GET',
    url: '/books',
    success: displayBooks
  });
}

function displayBooks(response){
  console.log(response);
  var $list = $('#book-list');
  $list.empty();
  response.forEach(function(book){
    var $li = $('<li></li>');
    $li.append('<p><strong>' + book.title + '</strong></p>');
    $li.append('<p><em>' + book.author + '</em></p>');
    var date = new Date (book.published);
    $li.append('<p><time>' + date.toDateString() + '</time></p>');
    $list.append($li);

  });
}

function addBook(event){
  event.preventDefault();

  var bookData = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookData,
    success: getBooks
  });
  //clear form
  $(this).find('input').val('');
}
