var USER_ID = "32376874";
var DEV_KEY = "DEV KEY HERE";
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
    allCovers = $xml.find("book").find("image_url");
    covers = []
    //have to filter out the author images (every other image)
    for (var i = 0; i < allCovers.length; i++) {
        if (i % 2 === 0) {
            covers.push(allCovers[i]);
        }
    }
    rating = $xml.find("book").find("average_rating");
    numItems = 0;

    //Building the myreads items.
    for (i = 0; i < titles.length; i++) {
        if ((shelves[i] === "read" || shelves[i] === "currently-reading") && numItems < MAX_ITEMS) {
            ratingsDiv = makeRatingsDiv(Math.floor(rating[i].innerHTML));
            $(".myreads").append("<div class='myreads-item' id='item-" + numItems + "'>"
                + "<img class='cover' src=" + covers[i].innerHTML + " />"
                + "<div class='info-container'>"
                + "<p class='book-title'>" + titles[i].innerHTML  + " </p>"
                + "<p class ='author'>" + authors[i].innerHTML  + "</p>"
                + ratingsDiv
                + "<div class='read'> </div>"
                +"</div>"
                + "</div>");
            numItems += 1;
        }
    }
}


function setSelectedItem(itemNumber, isInit) {
    $(".myreads-item").css("height", (75/(numItems - 1)) + "%");
    hideElements([".author", ".rating", ".cover", ".title"]);
    $('#' + itemNumber).css("height", 25 + "%");
    showElements(itemNumber, isInit);
}

function myreadsItemClick(event) {
    console.log('onclic');
    var clickedId = this.id;
    setSelectedItem(clickedId, false);
}

function hideElements(elementList) {
    for (var element in elementList) {
        console.log(elementList[element]);
        $(elementList[element]).css("opacity", "0");
        $(elementList[element]).css("display", "none");
    }
    $(elementList[2]).css({
        "height": "0",
        "width": "0",
        "display": "none",
    });
}

function showElements(itemNumber, isInit) {
    var title = '#' + itemNumber + " > div > .book-title";
    var author = '#' + itemNumber + " > div > .author";
    var rating = '#' + itemNumber + " > div > .rating";
    var cover = '#' + itemNumber + " > .cover";
    elementList = [author, rating, cover];
    if (isInit) {
        for (var element in elementList) {
            $(elementList[element]).css("opacity", "1");
            $(elementList[element]).css("display", "block");

        }
        $("#" + itemNumber + " > .info-container").css({
            "top": "50%",
            "transform": "translateY(-50%)",
        });
        $(elementList[2]).css({
            "height": "111px",
            "width": "73.5px"
        });

    } else {
        $(title).css("display", "block");
        $(title).css("opacity", "0");
        $(author).css("display", "block");
        $(rating).css("display", "block");
        $(author).animate({
            opacity: "1"}, 
            500
        );
        $(title).animate({
            opacity: "1"}, 
            500
        );
        $(rating).animate({
            opacity: "1"},
            500,
            function() {
                $(cover).css("display", "inline");
                $(cover).css("height", "111px");
                $(cover).animate({
                    opacity: "1",
                    width: "73.5px"},
                    250
                );
            }
        );
    }
}

function makeRatingsDiv(numStars) {
    var ratingsDiv = "<div class='rating'>";
    for (j = 0; j < 5; j++) {
        if (numStars > 0) {
            ratingsDiv += "<span>&#9733;</span>"
            numStars -= 1
        } else {
            ratingsDiv += "<span>&#9734;</span>"
        }
    }
    ratingsDiv += "</div>"
    return ratingsDiv;
}