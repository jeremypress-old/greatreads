var USER_ID = "32376874";
var DEV_KEY = "4jzSxoAEeuI6HcD0HSCgjA";
var MAX_ITEMS = 10;

var url = "http://www.goodreads.com/review/list/" + USER_ID + "?format=xml&key=" + DEV_KEY + "&sort=shelves&v=2"; 
var numItems;
$( document ).ready(function() {

    //API Call, Using yahoo to avoid CORS issues.
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + '&format=xml&callback=?';
    $.getJSON(yql, function(data){
        parseXML(data.results[0]);
        setSelectedItem('item-0', true);
        $(".myreads-item").click(myreadsItemClick);

    });    
});

function parseXML(data) {
    xmlDoc = $.parseXML(data)
    $xml = $(xmlDoc);
    titles = $xml.find("book").find("title");
    shelves = [];
    $xml.find('shelves').find('shelf').each(function() {
        shelves.push($(this).attr("name"));
    });
    authors = $xml.find("book").find("authors").find("author").find("name");
    covers = $xml.find("book").find("image_url");
    rating = $xml.find("book").find("average_rating");
    numItems = 0;

    //Building the myreads items.
    for (i = 0; i < titles.length; i++) {
        console.log(i);
        console.log(covers[i].innerHTML);
        if ((shelves[i] === "read" || shelves[i] === "currently-reading") && numItems < MAX_ITEMS) {
            $(".myreads").append("<div class='myreads-item' id='item-" + numItems + "'>"
                + "<img class='cover' src='#' />"
                + "<p class='book-title'>" + titles[i].innerHTML  + " </p>"
                + "<p class ='author'>" + authors[i].innerHTML  + "</p>"
                + "<div class='rating'> </div>"
                + "<div class='read'> </div>"
                + "</div>");
            numItems += 1;
        }
    }
}

function setSelectedItem(itemNumber, isInit) {
    $(".myreads-item").css("height", (75/(numItems - 1)) + "%");
    $('.author').css("opacity", "0");
    $('#' + itemNumber).css("height", 25 + "%");
    $('#' +itemNumber + "> .author").css("opacity", "1");
}

function myreadsItemClick(event) {
    console.log('onclic');
    var clickedId = this.id;
    setSelectedItem(clickedId, false);
}




