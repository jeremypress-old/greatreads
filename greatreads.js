var USER_ID = "Your ID here";
var DEV_KEY = "Your Key Here";

var url = "http://www.goodreads.com/review/list/" + USER_ID + "?format=xml&key=" + DEV_KEY + "&v=2&shelf=read";


$( document ).ready(function() {
    console.log( "ready!" );
    console.log(url)
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + '&format=xml&callback=?';
  $.getJSON(yql, function(data){
    console.log(data.results[0]);
  });
});


site = 'http://goo.gl/9iQWyG';

