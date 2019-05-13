$(document).ready(function() {
    $('body').prepend('<header></header');   
    
    $('header').after('<div class="navi-bar-mobile-2"></div>');
    $('header').css("display", "none");
    $('.navi-bar-mobile-2').append('<div id="backBTN"></div>');
    $('#backBTN').append('<img class="backBTN" src="../Pics/General_Pics/back_button.png">');
    
    $('#backBTN').on('click', () => {
        var currentURL = window.location.href;
        var urlPath = '/findgame.html';
        var urlPath2 = '/creategame_landscape.html';
        if((currentURL).includes(urlPath) || (currentURL).includes(urlPath2)) {
            window.location.href = '../html/gamelandscape.html';
            console.log("yay it worked!");
        } else {
        window.location.href = '../html/Home.html';
            console.log("Why does this work?");
        }
    });
   

});