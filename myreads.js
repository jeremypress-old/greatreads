var USER_ID = "32376874";
var DEV_KEY = "4jzSxoAEeuI6HcD0HSCgjA";

var url = "http://www.goodreads.com/review/list/" + USER_ID + "?format=xml&key=" + DEV_KEY + "&v=2";
var numItems = 8;

$( document ).ready(function() {

    //API Call, Using yahoo to avoid CORS issues.
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + '&format=xml&callback=?';
    $.getJSON(yql, function(data){
        parseXML(data.results[0]);
    });

    //Building the myreads items.
    for (i = 0; i < numItems; i++) {
        $(".myreads").append("<div class='myreads-item' id='item-" + i + "'>"
            + "<img class='cover' src='#' />"
            + "<p class='book-title'> </p>"
            + "<p class ='author'> </p>"
            + "<div class='rating'> </div>"
            + "<div class='read'> </div>"
            + "</div>");
    }

    //Set the initial css, the first item is selected.
    setSelectedItem('item-0');
    $(".myreads-item").click(myreadsItemClick);
});

function parseXML(data) {
    xmlDoc = $.parseXML(data),
    $xml = $(xmlDoc),
    $title = $xml.find("book").children('title').text();
    console.log($title);
}

function setSelectedItem(itemNumber) {
    $(".myreads-item").css("height", (70/(numItems - 1)) + "%");
    $('#' + itemNumber).css("height", 30 + "%");
}

function myreadsItemClick(event) {
    var clickedId = this.id;
    setSelectedItem(clickedId);
}


