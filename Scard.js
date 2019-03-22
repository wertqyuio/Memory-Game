var random_cards = []
var gummy_images = []
var clicked_cards = {}
var clicks = 0
var solves = 0
var solved = []
var total_clicks = 0;
var proper_clicks = true;

function my_java() {
    load_images();
    random_6();
}

function load_images() {
    gummy_images.push("Bears.jpeg");
    gummy_images.push("Worms.jpeg");
    gummy_images.push("Rings.jpg");
}

function random_6() {
    var cards = [1,1,2,2,3,3]; //No. 1 - Image 1 is gummy worms, Image 2 is gummy bears and Image 3 is gummy bears
    while (cards.length>0) {
        var rand_int = Math.floor(Math.random()*cards.length);
        random_cards.push(cards.splice(rand_int,1));
    }
    for (var i=0; i<6; i++) { //No. 2 - Revise next lines to current image, but create if statements referring to random_cards[i]
        var current_image = "image_"+(i+1);
        document.getElementById(current_image).src = gummy_images[random_cards[i]-1];
    }
}

function clicked_card() {//to keep track of valid clicks
    var card_number = parseInt(event.target.id[event.target.id.length-1])
    var current_image = "image_" + card_number.toString();
    if(solved.indexOf(event.target.src) === -1 && proper_clicks === true) { //No. 3 change to event target image id
        clicks++; //only counts as clicking if it hasn't been solved yet.
        total_clicks++;
        document.getElementById("Score").innerHTML = total_clicks;
    }
    if (clicks === 1 && solved.indexOf(event.target.src)=== -1 && proper_clicks === true) {
        clicked_cards[card_number] = parseInt(random_cards[card_number-1],10); //creates k-v pair of card number to the mapped image
        document.getElementById(current_image).style.display = "inline";
    }
    else if (clicks === 2 && proper_clicks === true) 
    {
        proper_clicks = false;
        for (let key in clicked_cards) { 
            if (parseInt(random_cards[card_number-1],10) === parseInt(clicked_cards[key],10) && parseInt(key,10) !== parseInt(card_number,10)) {
                document.getElementById(current_image).style.display = "inline";
                console.log("Both matched!")
                solved.push(clicked_cards[key]);
                solves++;
                clicked_cards = {};
                clicks = 0;
                setTimeout(function(){proper_clicks = true},1000);
                setTimeout(function(){if (solves === 3) alert("You won in only "+total_clicks+" clicks!!");},1000);
            }
            else if (parseInt(key,10) === parseInt(card_number,10)) { //Need to figure out how to not flip over a solved image
                clicks = 1;
                total_clicks--;
                document.getElementById("Score").innerHTML = total_clicks;
                proper_clicks = true;
            }
            else {//No. 7 change to image
                document.getElementById(current_image).style.display = "inline";
                setTimeout(function() {
                    var clicked_key = "image_" + key.toString();
                    document.getElementById(current_image).style.display = "";
                    document.getElementById(clicked_key).style.display = "";
                    clicked_cards = {}
                    setTimeout(function(){proper_clicks = true},1000);
                },1000)
                clicks = 0;
            }
        }
    }
}

function reset_cards() {
    random_cards.length = 0;
    solved.length = 0;
    solves = 0;
    total_clicks = 0;
    document.getElementById("Score").innerHTML = "0"
    for (var i=6; i>0; i--) {
        var current_image = "image_" + i.toString();
        document.getElementById(current_image).style.display = "";
    }
    my_java();
}

//window.addEventListener("load",my_java) optional piece to use via event listener
//use first index and last index to add attributes to the "random cards"
//next: figure out how to keep track of what's been clicked
//at any given time, only two items can be clicked
//before that, need to use event listener to identify which card has been clicked
