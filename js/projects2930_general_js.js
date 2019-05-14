$(document).ready(function() {
    $('body').prepend('<header></header');
    $('header').append('<div class="navi-bar-desktop"></div>');
    
    $('.navi-bar-desktop').append('<a href="profile.html"><div>Profile</div></a>');
    $('.navi-bar-desktop').append('<a><div>Store</div></a>');
    $('.navi-bar-desktop').append('<a href="#" onclick="firebase.auth().signOut()"><div>Sign-out</div></a>');
    
    $('header').after('<div class="navi-bar-mobile"></div>');
    $('.navi-bar-mobile').append('<div id="hamburgerMenu"></div>');
    $('#hamburgerMenu').append('<div id="hamburger" class="homePageHamburger"><span></span><br><span></span><br><span></span></div>');
    $('header').after('<div id="overlay"></div>');
    $('.navi-bar-mobile').append('<div id="naviwrap"></div>');
    
    $('#naviwrap').append('<a href="#" onclick="firebase.auth().signOut()"><div class="sing-out">Sign-out</div></a>');
    
     $('.homePageHamburger').click(function(){
        if($(this).hasClass('open') ){
            $(this).removeClass('open');
            $('#overlay').hide();
            $('#naviwrap').hide();
            //Normalizes the visibility of Store & Profile when overlay is hidden --Raging--//
            $('.profileLink').css("opacity", "1");
            $('.storeLink').css("opacity", "1");
            $('.startGameLink').css("opacity","1");
            $('.scheduleData').css("opacity", "1");
            $('.sport').css("opacity", "1");
            $('.avatar').css("opacity", "1");
            $('.userName').css("opacity", "1");
            $('.matchAvatar').css("opacity", "1");
            $('.matchUser').css("opacity", "1");
            $('.recentPlayers > span').css("opacity", "1");
            
        } else {
            $(this).addClass('open');
            $('#naviwrap').show();
            $('#overlay').show();
            //Decreases the visibility of Store & Profile when overlay is shown --Raging--//
            $('.profileLink').css("opacity", ".5");
            $('.storeLink').css("opacity", ".5");
            $('.startGameLink').css("opacity",".5");
            $('.scheduleData').css("opacity", ".25");
            $('.sport').css("opacity", ".25");
            $('.avatar').css("opacity", ".25");
            $('.userName').css("opacity", ".25");
            $('.matchAvatar').css("opacity", ".25");
            $('.matchUser').css("opacity", ".25");
            $('.recentPlayers > span').css("opacity", ".35");
        }
    });
    
     $('.scheduleButton').click(function(){
        if($(this).hasClass('open') ){
            $(this).removeClass('open');
            $('#overlay').hide();
            $('#scheduleWrapperOverLay').hide();
            //Normalizes the visibility of Store & Profile when overlay is hidden --Raging--//
            $('.profileLink').css("opacity", "1");
            $('.storeLink').css("opacity", "1");
            $('.startGameLink').css("opacity","1");
            $('.scheduleData').css("opacity", "1");
            $('.sport').css("opacity", "1");
            $('.avatar').css("opacity", "1");
            $('.userName').css("opacity", "1");
            $('.matchAvatar').css("opacity", "1");
            $('.matchUser').css("opacity", "1");
            $('.recentPlayers > span').css("opacity", "1");
        } else{
            $(this).addClass('open');
            $('.scheduleButtonOverLay').addClass('open');
            $('#overlay').show();
            $('#scheduleWrapperOverLay').show();
            //Decreases the visibility of Store & Profile when overlay is shown --Raging--//
            $('.profileLink').css("opacity", ".5");
            $('.storeLink').css("opacity", ".5");
            $('.startGameLink').css("opacity",".5");
            $('.scheduleData').css("opacity", ".25");
            $('.sport').css("opacity", ".25");
            $('.avatar').css("opacity", ".25");
            $('.userName').css("opacity", ".25");
            $('.matchAvatar').css("opacity", ".25");
            $('.matchUser').css("opacity", ".25");
            $('.recentPlayers > span').css("opacity", ".35");
        }
    });
 
    $('.scheduleButtonOverLay').click(function(){
        if($(this).hasClass('open') ){
            $(this).removeClass('open');
            $('.scheduleButton').removeClass('open');
            $('#overlay').hide();
            $('#scheduleWrapperOverLay').hide();
            //Normalizes the visibility of Store & Profile when overlay is hidden --Raging--//
            $('.profileLink').css("opacity", "1");
            $('.storeLink').css("opacity", "1");
            $('.startGameLink').css("opacity","1");
            $('.scheduleData').css("opacity", "1");
            $('.sport').css("opacity", "1");
            $('.avatar').css("opacity", "1");
            $('.userName').css("opacity", "1");
            $('.matchAvatar').css("opacity", "1");
            $('.matchUser').css("opacity", "1");
            $('.recentPlayers > span').css("opacity", "1");
        } else{
            $(this).addClass('open');
            $('#overlay').show();
            $('#scheduleWrapperOverLay').show();
            //Decreases the visibility of Store & Profile when overlay is shown --Raging--//
            $('.profileLink').css("opacity", ".5");
            $('.storeLink').css("opacity", ".5");
            $('.startGameLink').css("opacity",".5");
            $('.scheduleData').css("opacity", ".25");
            $('.sport').css("opacity", ".25");
            $('.avatar').css("opacity", ".25");
            $('.userName').css("opacity", ".25");
            $('.matchAvatar').css("opacity", ".25");
            $('.matchUser').css("opacity", ".25");
            $('.recentPlayers > span').css("opacity", ".35");
        }
    });
 
    $('.friendsButton').click(function(){
        if($(this).hasClass('open') ){
            $(this).removeClass('open');
            $('#overlay').hide();
            $('#friendsWrapperOverLay').hide();
            //Normalizes the visibility of Store & Profile when overlay is hidden --Raging--//
            $('.profileLink').css("opacity", "1");
            $('.storeLink').css("opacity", "1");
            $('.startGameLink').css("opacity","1");
            $('.scheduleData').css("opacity", "1");
            $('.sport').css("opacity", "1");
            $('.avatar').css("opacity", "1");
            $('.userName').css("opacity", "1");
            $('.matchAvatar').css("opacity", "1");
            $('.matchUser').css("opacity", "1");
            $('.recentPlayers > span').css("opacity", "1");
        } else {
            $(this).addClass('open');
            $('.friendsButtonOverLay').addClass('open');
            $('#overlay').show();
            $('#friendsWrapperOverLay').show();
            //Decreases the visibility of Store & Profile when overlay is shown --Raging--//
            $('.profileLink').css("opacity", ".5");
            $('.storeLink').css("opacity", ".5");
            $('.startGameLink').css("opacity",".5");
            $('.scheduleData').css("opacity", ".25");
            $('.sport').css("opacity", ".25");
            $('.avatar').css("opacity", ".25");
            $('.userName').css("opacity", ".25");
            $('.matchAvatar').css("opacity", ".25");
            $('.matchUser').css("opacity", ".25");
            $('.recentPlayers > span').css("opacity", ".35");
        }
    });
    $('.friendsButtonOverLay').click(function(){
        if($(this).hasClass('open') ){
            $(this).removeClass('open');
            $('.friendsButton').removeClass('open');
            $('#overlay').hide();
            $('#friendsWrapperOverLay').hide();
            //Normalizes the visibility of Store & Profile when overlay is hidden --Raging--//
            $('.profileLink').css("opacity", "1");
            $('.storeLink').css("opacity", "1");
            $('.startGameLink').css("opacity","1");
            $('.scheduleData').css("opacity", "1");
            $('.sport').css("opacity", "1");
            $('.avatar').css("opacity", "1");
            $('.userName').css("opacity", "1");
            $('.matchAvatar').css("opacity", "1");
            $('.matchUser').css("opacity", "1");
            $('.recentPlayers > span').css("opacity", "1");
        } else {
            $(this).addClass('open');
            $('#overlay').show();
            $('#friendsWrapperOverLay').show();
            //Decreases the visibility of Store & Profile when overlay is shown --Raging--//
            $('.profileLink').css("opacity", ".5");
            $('.storeLink').css("opacity", ".5");
            $('.startGameLink').css("opacity",".5");
            $('.scheduleData').css("opacity", ".25");
            $('.sport').css("opacity", ".25");
            $('.avatar').css("opacity", ".25");
            $('.userName').css("opacity", ".25");
            $('.matchAvatar').css("opacity", ".25");
            $('.matchUser').css("opacity", ".25");
            $('.recentPlayers > span').css("opacity", ".35");
        }
    });
    $('.recentButton').click(function(){
        if($(this).hasClass('open') ){
            $(this).removeClass('open');
            $('#overlay').hide();
            $('#recentlyWrapperOverLay').hide();
            //Normalizes the visibility of Store & Profile when overlay is hidden --Raging--//
            $('.profileLink').css("opacity", "1");
            $('.storeLink').css("opacity", "1");
            $('.startGameLink').css("opacity","1");
            $('.scheduleData').css("opacity", "1");
            $('.sport').css("opacity", "1");
            $('.avatar').css("opacity", "1");
            $('.userName').css("opacity", "1");
            $('.matchAvatar').css("opacity", "1");
            $('.matchUser').css("opacity", "1");
            $('.recentPlayers > span').css("opacity", "1");
        } else {
            $(this).addClass('open');
            $('.recentButtonOverLay').addClass('open');
            $('#overlay').show();
            $('#recentlyWrapperOverLay').show();
            //Decreases the visibility of Store & Profile when overlay is shown --Raging--//
            $('.profileLink').css("opacity", ".5");
            $('.storeLink').css("opacity", ".5");
            $('.startGameLink').css("opacity",".5");
            $('.scheduleData').css("opacity", ".25");
            $('.sport').css("opacity", ".25");
            $('.avatar').css("opacity", ".25");
            $('.userName').css("opacity", ".25");
            $('.matchAvatar').css("opacity", ".25");
            $('.matchUser').css("opacity", ".25");
            $('.recentPlayers > span').css("opacity", ".35");
        }
    });
    $('.recentButtonOverLay').click(function(){
        if($(this).hasClass('open') ){
            $(this).removeClass('open');
            $('.recentButton').removeClass('open');
            $('#overlay').hide();
            $('#recentlyWrapperOverLay').hide();
            //Normalizes the visibility of Store & Profile when overlay is hidden --Raging--//
            $('.profileLink').css("opacity", "1");
            $('.storeLink').css("opacity", "1");
            $('.startGameLink').css("opacity","1");
            $('.scheduleData').css("opacity", "1");
            $('.sport').css("opacity", "1");
            $('.avatar').css("opacity", "1");
            $('.userName').css("opacity", "1");
            $('.matchAvatar').css("opacity", "1");
            $('.matchUser').css("opacity", "1");
            $('.recentPlayers > span').css("opacity", "1");
        } else {
            $(this).addClass('open');
            $('#overlay').show();
            $('#recentlyWrapperOverLay').show();
            //Decreases the visibility of Store & Profile when overlay is shown --Raging--//
            $('.profileLink').css("opacity", ".5");
            $('.storeLink').css("opacity", ".5");
            $('.startGameLink').css("opacity",".5");
            $('.scheduleData').css("opacity", ".25");
            $('.sport').css("opacity", ".25");
            $('.avatar').css("opacity", ".25");
            $('.userName').css("opacity", ".25");
            $('.matchAvatar').css("opacity", ".25");
            $('.matchUser').css("opacity", ".25");
            $('.recentPlayers > span').css("opacity", ".35");
        }
    });
});

