var USER_ID = "32376874";
var DEV_KEY = "4jzSxoAEeuI6HcD0HSCgjA";

var url = "http://www.goodreads.com/review/list/" + USER_ID + "?format=xml&key=" + DEV_KEY + "&v=2";


$( document ).ready(function() {
    console.log( "ready!" );
    console.log(url)
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + '&format=xml&callback=?';
  $.getJSON(yql, function(data){
    console.log(data.results[0]);
    parseXML(data.results[0]);
  });

  var numItems = 3;
$(document).ready(function() {
  for (i = 0; i < numItems; i++) {
    $(".myreads").append("<div class='myreads-item'>"
      + "<img class='cover' src='#' />"
      + "<p class='book-title'> </p>"
      + "<p class ='author'> </p>"
      + "<div class='rating'> </div>"
      + "<div class='read'> </div>"
      + "</div>");
  }
  $(".myreads-item").css("height", (70/(numItems - 1)) + "%");
  $(".myreads-item:first-child").css("height", 30 + "%");

});
});

function parseXML(data) {
  xmlDoc = $.parseXML(data),
  $xml = $(xmlDoc),
  $title = $xml.find("book").children('title').text();
  console.log($title);
}

site = 'http://goo.gl/9iQWyG';

