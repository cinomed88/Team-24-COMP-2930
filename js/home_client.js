$('.test').on('click', function() {
    $.ajax({
        url: "/ajax-GET-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
                let outerDiv = "";
                    for(let i = 2; i < 3; i++) {
                    outerDiv = document.createElement('div');
                    outerDiv.className += 'schedule' + i;

                    var sport = document.createElement('div');
                    sport.className += 'sport';
                    
                    var scheduleData = document.createElement('div');
                        
                        for(let k = 2; k < 3; k++) {
                            scheduleData.className += 'scheduleData' + " " + k;
                        }
                    outerDiv.appendChild(sport);
                    outerDiv.appendChild(scheduleData);

                    $('.button').before(outerDiv);
                }
                console.log(data.sport);
                $('.2').html(data.sport);
            }
    });
});
      