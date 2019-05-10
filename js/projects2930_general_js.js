$(document).ready(function() {
    $('body').prepend('<header></header');
    $('header').append('<div class="navi-bar-desktop"></div>');
    
    $('.navi-bar-desktop').append('<a href="profile.html"><div>Profile</div></a>');
    $('.navi-bar-desktop').append('<a><div>Store</div></a>');
    $('.navi-bar-desktop').append('<a><div>Sign-in</div></a>');
    $('.navi-bar-desktop').append('<a href="./index.html"><div>Sign-out</div></a>');
    
    $('header').after('<div class="navi-bar-mobile"></div>');
    $('.navi-bar-mobile').append('<div id="hamburgerMenu"></div>');
    $('#hamburgerMenu').append('<div id="hamburger" class="homePageHamburger"><span></span><br><span></span><br><span></span></div>');
    $('header').after('<div id="overlay"></div>');
    $('.navi-bar-mobile').append('<div id="naviwrap"></div>');
    
    $('#naviwrap').append('<a><div>Sign-in</div></a>');
    $('#naviwrap').append('<a href="./index.html"><div>Sign-out</div></a>');
    
    
     $('.homePageHamburger').click(function(){
        if($(this).hasClass('open') ){
            $(this).removeClass('open');
            $('#overlay').hide();
            $('#naviwrap').hide();
            //Normalizes the visibility of Store & Profile when overlay is hidden --Raging--//
            $('.profileLink').css("opacity", "1");
            $('.storeLink').css("opacity", "1");
        } else {
            $(this).addClass('open');
            $('#naviwrap').show();
            $('#overlay').show();
            //Decreases the visibility of Store & Profile when overlay is shown --Raging--//
            $('.profileLink').css("opacity", ".5");
            $('.storeLink').css("opacity", ".5");
            $('.startGameLink').css("opacity",".5",);
        }
    });
    
    
});

