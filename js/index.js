$(document).ready(function() {

    
    
    
    //The carousel selections are handled by the following lines of code.
    $('#carouselSelection').on('click', '.circleSelection', function(){
        $('.currentSelection').addClass('circleSelection').removeClass('currentSelection');
        $(this).removeClass('circleSelection').addClass('currentSelection');
        
        if ($(this).is("#firstCarImage")) {
            $('#carousel').css('background-image', 'url("./Pics/Landing_Pics/carouselOne.jpg")');
        }
        if ($(this).is("#secondCarImage")) {
            $('#carousel').css('background-image', 'url("./Pics/Landing_Pics/carouselTwo.jpg")');
        }
        if ($(this).is("#thirdCarImage")) {
            $('#carousel').css('background-image', 'url("./Pics/Landing_Pics/carouselThree.jpg")');
        }
    });
    
    $('#createAccount').on('click', function() {
        $('#landingPageWrap').hide();
    });
        
    
    
    
});


