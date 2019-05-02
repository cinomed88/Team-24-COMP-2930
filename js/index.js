$(document).ready(function() {

    $('.circleSelection').on('click', 'div', function(){
        
        $('.currentSelection').addClass('circleSelection').removeClass('currentSelection');
        $(this).removeClass('circleSelection').addClass('currentSelection');
        
    });    
    
    
});


