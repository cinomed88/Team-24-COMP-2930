$(document).ready(function(){
    //START - Schedule container ajax
    //Ansynchronous call to the database to request user's match/event data.

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            console.log(userId + ": <--user id");
                        
            
            // The below few lines of code take the current time and date and converts
            // it to the time and date format used by Transact-SQL.
            var todayDate = new Date();
            var time = `${todayDate.getHours()}:00:00.0000000`;
            var month = todayDate.getMonth() + 1;
            var date = 0;
            
            // Checks if a trailing zero is required or not for the full SQL date.
            if (month < 10) {
                date = `${todayDate.getFullYear()}-0${month}-${todayDate.getDate()}`;
            } else {
                date = `${todayDate.getFullYear()}-${month}-${todayDate.getDate()}`;
            };
            
                       
            
            $.ajax({
                url: "/ajax-GET-match-data",
                type: "GET",
                dataType: "json",
                data: {userId: userId,
                       date: date},
                success: function(data) {
                    console.log("SUCCESSFUL JSON:", data); 
                    
                    let x = data.length;
                    
                    if(x <= 4) {
                        $('.scheduleButton').css('visibility', 'hidden');
                    } else {
                        $('.scheduleButton').css('visibility', 'visible');
                    }
                    
                    for(let z = 0; z < data.length && z <= 3; z++){
                        let outerDiv = "";
                            outerDiv = document.createElement('div');
                            outerDiv.className += 'schedule' + " " + z;

                            var sport = document.createElement('img');
                            sport.className += 'sport' + " " + z;

                            var sportCode;
                            if( data[z].sport == "Soccer"){
                                sportCode = 1;
                            } else if (data[z].sport == "Basketball"){
                                sportCode = 0;
                            } else {
                                sportCode = 2;
                            }

                            console.log(data[z].sport + "askjdgakwld");
                            //$(sport).css('background-image','url(../Pics/Home_Pics/female3.jpg)');
                            //$(sport).css('background-image','url(../Pics/Profile_Pics/sports' + z.toString() + '.png)');
                            sport.src = "../Pics/Profile_Pics/sports" + sportCode.toString() + ".png";

                            var scheduleData = document.createElement('div');
                            scheduleData.className += 'scheduleData';
                            
                            var location = document.createElement('div');
                            location.className = 'location';
                            outerDiv.appendChild(sport);
                            outerDiv.appendChild(location);
                            outerDiv.appendChild(scheduleData);
                            $('.button').before(outerDiv);

                        console.log(data[z].sport);
                        
                        let x = data[z].time;
                        let time = x.substring(11, 16);
                        
                        $(scheduleData).html("<div>" + data[z].sport + "</div>" + "<div>" + "<b>Date: </b>" + data[z].date + "&nbsp" + "<b> Time: </b>" + time + "</div>");
                        
                        console.log('esketit', data);                     
                    }
                    
//                    let x = data.length;
//                    
//                    if(x < 5) {
//                        $('.scheduleButton').css('visibility', 'hidden');
//                    } else {
//                        $('.scheduleButton').css('visibility', 'visible');
//                    }
                
                    
                }
            });

        }
    
    });

    //Method that shows more match/event data.
    //Ansynchronous call to the database to request user's match data.
    $('.scheduleButton').on('click', () => {
        firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            console.log(userId + ": <--user id");
            // The below few lines of code take the current time and date and converts
            // it to the time and date format used by Transact-SQL.
            var todayDate = new Date();
            var time = `${todayDate.getHours()}:00:00.0000000`;
            var month = todayDate.getMonth() + 1;
            var date = 0;
            
            // Checks if a trailing zero is required or not for the full SQL date.
            if (month < 10) {
                date = `${todayDate.getFullYear()}-0${month}-${todayDate.getDate()}`;
            } else {
                date = `${todayDate.getFullYear()}-${month}-${todayDate.getDate()}`;
            }
            
                        
        $.ajax({
            url: "/ajax-GET-match-data",
            type: "GET",
            dataType: "json",
            data: {userId: userId,
                  date: date},
            success: function(data) {
                console.log("SUCCESSFUL JSON:", data); 
                let greaterOuterDiv = "";
                greaterOuterDiv = document.createElement('div');
                greaterOuterDiv.className += 'greaterOuterDiv';

                for(let z = 0; z < data.length; z++){
                    let outerDiv = "";
                        outerDiv = document.createElement('div');
                        outerDiv.className += 'scheduleOverLay' + " " + z;

                        var sport = document.createElement('img');
                            sport.className += 'sportOverLay' + " " + z;

                            var sportCode;
                            if( data[z].sport == "Soccer"){
                                sportCode = 1;
                            } else if (data[z].sport == "Basketball"){
                                sportCode = 0;
                            } else {
                                sportCode = 2;
                            }

                            console.log(data[z].sport + "askjdgakwld");
                            //$(sport).css('background-image','url(../Pics/Home_Pics/female3.jpg)');
                            //$(sport).css('background-image','url(../Pics/Profile_Pics/sports' + z.toString() + '.png)');
                            sport.src = "../Pics/Profile_Pics/sports" + sportCode.toString() + ".png";
                    
                        var scheduleData = document.createElement('div');

                                scheduleData.className += 'scheduleDataOverLay' + " " + z;
                        outerDiv.appendChild(sport);
                        outerDiv.appendChild(scheduleData);
                        greaterOuterDiv.appendChild(outerDiv);

                        $('.scheduleTitleOverLay').after(greaterOuterDiv);

                    console.log(data[z].sport);
                    
                    let x = data[z].time;
                    let time = x.substring(11, 16);

                    $(scheduleData).html("<span>" + data[z].sport + "</span>" + "<br>" +"<span>" + "<b>Date: </b>" + data[z].date + " <b> Time: <b>" + time + "</span>");
                    console.log('esketit', data);
                    }

                }
            });
    };
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
});
    

