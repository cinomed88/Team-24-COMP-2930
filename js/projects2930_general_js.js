$(document).ready(function() {
    $('body').prepend('<header></header');
    $('header').append('<div class="navi-bar-desktop"></div>');
    
    $('.navi-bar-desktop').append('<a><div>Map</div></a>');
    $('.navi-bar-desktop').append('<a><div>Profile</div></a>');
    $('.navi-bar-desktop').append('<a><div>Store</div></a>');
    $('.navi-bar-desktop').append('<a><div>Sign-in</div></a>');
    $('.navi-bar-desktop').append('<a><div>Sign-out</div></a>');
    
    $('header').append('<div class="navi-bar-mobile"></div>');
    $('.navi-bar-mobile').append('<div id="hamburger" class="naviAnim"><span></span><span></span><span></span></div>')
    $('.navi-bar-mobile').append('<div id="overlay"</div>');
    $('.navi-bar-mobile').append('<div id="naviwrap"></div>');
    
    $('#naviwrap').append('<a><div>Map</div></a>');
    $('#naviwrap').append('<a><div>Profile</div></a>');
    $('#naviwrap').append('<a><div>Store</div></a>');
    $('#naviwrap').append('<a><div>Sign-in</div></a>');
    $('#naviwrap').append('<a><div>Sign-out</div></a>');
});

