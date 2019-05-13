$('.test').on('click', function() {
    $.ajax({
        url: "/ajax-GET-data",
        dataType: "json",
        type: "GET",
        data: {format: "json-list"},
        success: function(data) {
            console.log("SUCCESS JSON:", data);
                let OuterDiv = "";
                    for(let i = 0; i <= 1; i++) {
                    var outerDiv = document.createElement('div');
                    outerDiv.className += 'schedule1';

                    var sport = document.createElement('div');
                    sport.className += 'sport';
                    
                    var scheduleData = document.createElement('div');
                        
                        for(let k = 0; k <= i; k++) {
                            scheduleData.className += 'scheduleData' + k;
                        }
                    outerDiv.appendChild(sport);
                    outerDiv.appendChild(scheduleData);

                    $('.button').before(OuterDiv);
                }
                $('.scheduleData1').html(data);
            }
    });
});
      