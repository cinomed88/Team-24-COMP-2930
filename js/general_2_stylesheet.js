$(document).ready(function() {
    $('body').prepend('<header></header');
    $('header').append('<div class="navi-bar-desktop"></div>');
    
    $('.navi-bar-desktop').append('<a href="./findgame.html"><div>Map</div></a>');
    $('.navi-bar-desktop').append('<a><div>Profile</div></a>');
    $('.navi-bar-desktop').append('<a><div>Store</div></a>');
    $('.navi-bar-desktop').append('<a><div>Sign-in</div></a>');
    $('.navi-bar-desktop').append('<a><div>Sign-out</div></a>');    
});