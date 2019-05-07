$(document).ready(function() {
    $('body').prepend('<header></header');
    $('header').append('<div class="navi-bar-desktop"></div>');
    
    $('.navi-bar-desktop').append('<a href="profile.html"><div>Profile</div></a>');
    $('.navi-bar-desktop').append('<a><div>Store</div></a>');
    $('.navi-bar-desktop').append('<a><div>Sign-in</div></a>');
    $('.navi-bar-desktop').append('<a href="./index.html"><div>Sign-out</div></a>');    
    
    $('body').append('<div class="navi-bar-mobile-2"></div>');
    $('.navi-bar-mobile-2').append('<div class="backBTN"><a href="./Home.html"><<</a></div>');

});