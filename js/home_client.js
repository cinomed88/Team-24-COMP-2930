$(document).ready(function(){
    //START - Schedule container ajax
    //Ansynchronous call to the database to request user's match/event data.
    $.ajax({
        url: "/ajax-GET-match-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-match-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
            for(let z = 0; z < data.length && z <= 3; z++){
                let outerDiv = "";
                    outerDiv = document.createElement('div');
                    outerDiv.className += 'schedule' + " " + z;

                    var sport = document.createElement('div');
                    sport.className += 'sport' + " " + z;
                    $(sport).css('background-image','url(../Pics/Home_Pics/female3.jpg)');

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
    //Method that shows more match/event data.
    //Ansynchronous call to the database to request user's match data.
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
            
            for(let z = 0; z < data.length; z++){
                let outerDiv = "";
                    outerDiv = document.createElement('div');
                    outerDiv.className += 'scheduleOverLay' + " " + z;

                    var sport = document.createElement('div');
                    sport.className += 'sportOverLay' + " " + z;
                    $(sport).css('background-image','url(../Pics/Home_Pics/female_4.jpg)');

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
    //END - schedule container ajax
    
    
    //START - friends list ajax
    //Ansynchronous call to the database to request user's friends list.
    $.ajax({
        url: "/ajax-GET-match-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-match-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
            for(let z = 0; z < data.length && z <= 3; z++){
                let outerFriendsDiv = "";
                    outerFriendsDiv = document.createElement('div');
                    outerFriendsDiv.className += 'friends' + " " + z;

                    var avatar = document.createElement('div');
                    avatar.className += 'avatar' + " " + z;
                    $(avatar).css('background-image','url(../Pics/Home_Pics/male2.jpg)');

                    var userNameData = document.createElement('div');

                    userNameData.className += 'userName' + " " + z;
                    outerFriendsDiv.appendChild(avatar);
                    outerFriendsDiv.appendChild(userNameData);

                    $('.friendsBTN').before(outerFriendsDiv);
                
//                console.log(data[z].user_name);
                $(userNameData).html(data[z].user_name + "  " + data[z].honor_point);
                }
                console.log('esketit', data);
        }
    });
    
    //Method that shows more of the users friends list
    //Ansynchronous call to the database to request user's friends list.
    $('.friendsButton').on('click', () => {
    $.ajax({
        url: "/ajax-GET-match-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-match-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
            let greaterOuterDiv = "";
            greaterOuterFriendsDiv = document.createElement('div');
            greaterOuterFriendsDiv.className += 'greaterOuterFriendsDiv';
            
            for(let z = 0; z < data.length; z++){
                let outerFriendsDiv = "";
                    outerFriendsDiv = document.createElement('div');
                    outerFriendsDiv.className += 'friendsOverLay' + " " + z;

                    var avatar = document.createElement('div');
                    avatar.className += 'avatarOverLay' + " " + z;
                    $(avatar).css('background-image','url(../Pics/Home_Pics/male2.jpg)');

                    var userNameData = document.createElement('div');

                    userNameData.className += 'userNameOverLay' + " " + z;
                    outerFriendsDiv.appendChild(avatar);
                    outerFriendsDiv.appendChild(userNameData);
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
    //END - friends list container ajax
    
    
    //START - Recently played ajax
    //Ansynchronous call to the database to request user's recently played
    //players data.
    $.ajax({
        url: "/ajax-GET-match-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-match-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
            for(let z = 0; z < data.length && z <= 3; z++){
                let outerRecentlyDiv = "";
                    outerRecentlyDiv = document.createElement('div');
                    outerRecentlyDiv.className += 'recentlyPlayed' + " " + z;

                    var matchAvatar = document.createElement('div');
                    matchAvatar.className += 'matchAvatar' + " " + z;
                    $(matchAvatar).css('background-image','url(../Pics/Home_Pics/male2.jpg)');

                    var matchUserData = document.createElement('div');
                    matchUserData.className += 'matchUser' + " " + z;
                
                    outerRecentlyDiv.appendChild(matchAvatar);
                    outerRecentlyDiv.appendChild(matchUserData);

                    $('.recentBTN').before(outerRecentlyDiv);
                
//                console.log(data[z].user_name);
                $(matchUserData).html(data[z].user_name + "  " + data[z].honor_point);
                }
                console.log('esketit', data);
        }
    });
    
    //Method that shows more of the users recently played players
    //Ansynchronous call to the database to request user's list of recently
    //played players.
    $('.recentButton').on('click', () => {
    $.ajax({
        url: "/ajax-GET-match-data",
        type: "GET",
        dataType: "json",
        data: {format: 'json-match-list'},
        success: function(data) {
            console.log("SUCCESS JSON:", data); 
            let greaterOuterRecentlyDiv = "";
            greaterOuterRecentlyDiv = document.createElement('div');
            greaterOuterRecentlyDiv.className += 'greaterOuterRecentlyDiv';
            
            for(let z = 0; z < data.length; z++){
                let outerRecentlyDiv = "";
                    outerRecentlyDiv = document.createElement('div');
                    outerRecentlyDiv.className += 'recentlyPlayedOverLay' + " " + z;

                    var matchAvatar = document.createElement('div');
                    matchAvatar.className += 'matchAvatarOverLay' + " " + z;
                    $(matchAvatar).css('background-image','url(../Pics/Home_Pics/female3.jpg)');

                    var matchUserData = document.createElement('div');
                    matchUserData.className += 'matchUserOverLay' + " " + z;
                
                    outerRecentlyDiv.appendChild(matchAvatar);
                    outerRecentlyDiv.appendChild(matchUserData);
                    greaterOuterRecentlyDiv.appendChild(outerRecentlyDiv);

                    $('.recentPlayersOverLay').after(greaterOuterRecentlyDiv);
                
                console.log(data[z].user_name);
                $(matchUserData).html(data[z].user_name + "  " + data[z].honor_point);
                }
                console.log('esketit', data);

            }
        });
    });
    //Removes all divs from the friends container --Raging--
    $('.recentButtonOverLay').on('click', () => {
        $('.greaterOuterRecentlyDiv').html('');
    });
    //END - recently played ajax

    });
