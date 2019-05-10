$(document).ready(function() {
    $('body').prepend('<header></header');   
    
    $('header').after('<div class="navi-bar-mobile-2"></div>');
    $('header').css("display", "none");
    $('.navi-bar-mobile-2').append('<div id="backBTN"></div>');
    $('#backBTN').append('<img class="backBTN" src="../Pics/General_Pics/back_button.png">');
    
    $('#backBTN').on('click', () => {
        if($(this).is('.findgame.html')){
            window.location.href = '../html/gamepage.html';
        } else {
        window.location.href = '../html/Home.html';
        }
    });
   

});