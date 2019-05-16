$(document).ready(function(){
    $.ajax({
        url: "/ajax-GET-data2",
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
                console.log('esketit', data);
                console.log(data[0].user_name + " ");
                $('.2').html(data[0].user_name + "  " + data[0].honor_point);
            }
    });
    
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
    
    
    $('.test2').on('click', function() {
        $.ajax({
            url: "/ajax-GET-data",
            type: "GET",
            dataType: "json",
            data: {format: 'json-list4'},
            success: function(data) {
                               console.log("Test2 SUCCESS JSON:", data);
                var user = data; 
                var firstName = user.firstName;
                console.log(user);
                let friendsOuterDiv = "";
                for(let i = 1; i < 2; i++) {
                    friendsOuterDiv = document.createElement('div');
                    friendsOuterDiv.className += 'friends';

                    var avatar = document.createElement('div');
                    avatar.className += 'avatar';

                    var userName = document.createElement('div');
                    userName.className += 'userName U2';

                    friendsOuterDiv.appendChild(avatar);
                    friendsOuterDiv.appendChild(userName);

                    $('.friendsBTN').before(friendsOuterDiv);
                }
                console.log("does this output???", data);
                console.log(data);
                $('.userName').html(data.firstName);
                
            }
        });
    });
        
});