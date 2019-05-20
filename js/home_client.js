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
                
//                console.log(data[z].user_name);
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
            let greaterOuterDiv = "";
            greaterOuterDiv = document.createElement('div');
            greaterOuterDiv.className += 'greaterOuterDiv';
            
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
                    greaterOuterDiv.appendChild(outerDiv);

                    $('.scheduleTitleOverLay').after(greaterOuterDiv);
                
                console.log(data[z].user_name);
                $(scheduleData).html(data[z].user_name + "  " + data[z].honor_point);
                }
                console.log('esketit', data);

            }
        });
    });
    //Removes all divs from the schedule container --Raging--
    $('.scheduleButtonOverLay').on('click', () => {
        $('.greaterOuterDiv').html('');
    });
    
    $.ajax({
        url: "/ajax-GET-friends-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-friends-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
            for(let z = 0; z <= data.length && z <= 3; z++){
                let outerFriendsDiv = "";
                    outerFriendsDiv = document.createElement('div');
                    outerFriendsDiv.className += 'friends' + " " + z;

                    var avatar = document.createElement('div');
                    sport.className += 'avatar' + " " + z;

                    var userNameData = document.createElement('div');

                    scheduleData.className += 'userName' + " " + z;
                    outerDiv.appendChild(avatar);
                    outerDiv.appendChild(userNameData);

                    $('.friendsBTN').before(outerDiv);
                
//                console.log(data[z].user_name);
                $(userNameData).html(data[z].user_name + "  " + data[z].honor_point);
                }
                console.log('esketit', data);
        }
    });
    $('.friendsButton').on('click', () => {
    $.ajax({
        url: "/ajax-GET-friends-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-friends-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
            let greaterOuterDiv = "";
            greaterOuterFriendsDiv = document.createElement('div');
            greaterOuterFriendsDiv.className += 'greaterOuterFriendsDiv';
            
            for(let z = 0; z <= data.length; z++){
                let outerFriendsDiv = "";
                    outerFriendsDiv = document.createElement('div');
                    outerFriendsDiv.className += 'friendsOverLay' + " " + z;

                    var avatar = document.createElement('div');
                    sport.className += 'avatarOverLay' + " " + z;

                    var userNameData = document.createElement('div');

                            scheduleData.className += 'userNameOverLay' + " " + z;
                    outerDiv.appendChild(avatar);
                    outerDiv.appendChild(userNameData);
                    greaterOuterFriendsDiv.appendChild(outerFriendsDiv);

                    $('.friendsTitleOverLay').after(greaterOuterFriendsDiv);
                
                console.log(data[z].user_name);
                $(userNameData).html(data[z].user_name + "  " + data[z].honor_point);
                }
                console.log('esketit', data);

            }
        });
    });
    //Removes all divs from the friends container --Raging--
    $('.friendsButtonOverLay').on('click', () => {
        $('.greaterOuterFriendsDiv').html('');
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
