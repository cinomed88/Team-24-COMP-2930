$(document).ready(function() {
    $('body').prepend('<header></header');
//    $('header').append('<div class="navi-bar-desktop"></div>');
//    
//    $('.navi-bar-desktop').append('<a href="profile.html"><div>Profile</div></a>');
//    $('.navi-bar-desktop').append('<a><div>Store</div></a>');
//    $('.navi-bar-desktop').append('<a><div>Sign-in</div></a>');
//    $('.navi-bar-desktop').append('<a href="./index.html"><div>Sign-out</div></a>');    
    
    $('header').after('<div class="navi-bar-mobile-2"></div>');
    $('header').css("display", "none");
    $('.navi-bar-mobile-2').append('<div id="backBTN"></div>');
    $('#backBTN').append('<img class="backBTN" src="../Pics/General_Pics/back_button.png">');
    
    $('#backBTN').on('click', () => {
        if($(this).is('.findMatch')){
            
        }
        window.location.href = '../html/Home.html';
    });
   

});