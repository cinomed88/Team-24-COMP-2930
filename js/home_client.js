$(document).ready(function(){
    $.ajax({
        url: "/ajax-GET-match-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-match-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
            for(let z = 0; z <= data.length && z <= 3; z++){
                let outerDiv = "";
                    outerDiv = document.createElement('div');
                    outerDiv.className += 'schedule' + " " + z;

                    var sport = document.createElement('div');
                    sport.className += 'sport' + " " + z;

                    var scheduleData = document.createElement('div');

                            scheduleData.className += 'scheduleData' + " " + z;
                    outerDiv.appendChild(sport);
                    outerDiv.appendChild(scheduleData);

                    $('.button').before(outerDiv);
                
                console.log(data[z].user_name);
                $(scheduleData).html(data[z].user_name + "  " + data[z].honor_point);
                }
                console.log('esketit', data);

        }
    });
    $('.scheduleButton').on('click', () => {
    $.ajax({
        url: "/ajax-GET-match-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-match-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
            for(let z = 0; z <= data.length; z++){
                let outerDiv = "";
                    outerDiv = document.createElement('div');
                    outerDiv.className += 'scheduleOverLay' + " " + z;

                    var sport = document.createElement('div');
                    sport.className += 'sportOverLay' + " " + z;

                    var scheduleData = document.createElement('div');

                            scheduleData.className += 'scheduleDataOverLay' + " " + z;
                    outerDiv.appendChild(sport);
                    outerDiv.appendChild(scheduleData);

                    $('#scheduleContainerOverLay').append(outerDiv);
                
                console.log(data[z].user_name);
                $(scheduleData).html(data[z].user_name + "  " + data[z].honor_point);
                }
                console.log('esketit', data);

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