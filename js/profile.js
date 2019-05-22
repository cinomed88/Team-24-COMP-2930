$(document).ready(function () {
    console.log("request start");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            console.log(userId + ": <--user id");

            $.ajax({
                url: "/ajax-GET-Profile?name=" + userId,
                dataType: "json",
                type: "GET",
                beforeSend: function () {
                    //console.log("beforeSend function");
                },
                // data: { name: userId },
                success: function (data) {
                    console.log("SUCCESS:", data);
                    console.log(data);
                    $("#user_name").text(data.user_name);
                    
                    var rank01_lev = parseInt(data.rank_point/100) + 1;
                    var rank02_lev = parseInt(data.rank_point2/100) + 1;
                    var rank03_lev = parseInt(data.rank_point3/100) + 1;
                    rank01_lev = (rank01_lev > 7) ? 7 : rank01_lev;
                    rank02_lev = (rank02_lev > 7) ? 7 : rank02_lev;
                    rank03_lev = (rank03_lev > 7) ? 7 : rank03_lev;

                    var rank01_LP = (data.rank_point) % 100;
                    var rank02_LP = (data.rank_point2) % 100;
                    var rank03_LP = (data.rank_point3) % 100;
                    rank01_LP = (rank01_lev == 7) ? 0 : rank01_LP;
                    rank02_LP = (rank02_lev == 7) ? 0 : rank02_LP;
                    rank03_LP = (rank03_lev == 7) ? 0 : rank03_LP;

                    document.getElementById("user_rank01_img").src="../Pics/Profile_Pics/rank0" + rank01_lev.toString() + ".png";
                    document.getElementById("user_rank02_img").src="../Pics/Profile_Pics/rank0" + rank02_lev.toString() + ".png";
                    document.getElementById("user_rank03_img").src="../Pics/Profile_Pics/rank0" + rank03_lev.toString() + ".png";
                    $("#user_rank01").text("Lev. " + rank01_lev);
                    $("#user_rank01_LP").text("LP " + rank01_LP);
                    $("#user_rank02").text("Lev. " + rank02_lev);
                    $("#user_rank02_LP").text("LP " + rank02_LP);
                    $("#user_rank03").text("Lev. " + rank03_lev);
                    $("#user_rank03_LP").text("LP " + rank03_LP);

                    var honor_lev = parseInt(data.honor_point/100) + 1;
                    honor_lev = (honor_lev > 5) ? 5 : honor_lev;

                    document.getElementById("honor_img").src="../Pics/Profile_Pics/honor_rank0" + honor_lev.toString() + ".png";
                    $("#user_honor_lev").text("Honor Lev. " + honor_lev);
                    $("#user_honor_pt").text((data.honor_point) % 100 + " pt");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }
    
            })

            $.ajax({
                url: "/ajax-GET-History?name=" + userId,
                dataType: "json",
                type: "GET",
                beforeSend: function () {
                    //console.log("beforeSend function");
                },
                success: function (data) {
                    console.log("SUCCESS:", data);
                    console.log("Match Array length: " + data.stuff.length);
                    //print time                   
                    for (var i = 0; i < data.stuff.length && i < 3; i++){
                        document.getElementById("history_sport" + i.toString()).src="../Pics/Profile_Pics/sports" + i.toString() + ".png";

                        $("#match_history_time" +i.toString()).text(data.stuff[i].date + ", " + (data.stuff[i].time).toString().substring(11,11+5));

                    };
                    //print location
                    for (var i = 0; i < data.stuff.length && i < 3; i++){
                        var latlng = new google.maps.LatLng(data.stuff[i].lat, data.stuff[i].lng);
                        var geocoder = new google.maps.Geocoder;
                        var j = 0;
                        geocoder.geocode({'latLng': latlng}, (results, status) => {
                            if (status == google.maps.GeocoderStatus.OK) {
                                console.log(results);
                                if (results[0]) {
                                    var address = results[0].formatted_address;
                                    console.log(results[0].formatted_address);
                                    var short_address = address.split(",");
                                    console.log(short_address);
                                    $("#match_history_location" + j.toString()).text(short_address[0]);
                                }
                            }
                            j++;
                        });
                    };
                    //print results
                    for (var i = 0; i < data.stuff.length && i < 3; i++){
                        if(data.stuff[i].score !== null){
                            if(data.stuff[i].does_win === 1) {
                                $("#match_result" + i.toString()).text(data.stuff[i].score + " - WIN");
                            } else {
                                $("#match_result" + i.toString()).text(data.stuff[i].score + " - LOSE");
                            }
                        }
                        else {
                            // not played yet
                        }                        
                    }
                    //result? its db? or dummy?
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }
    
            })

        } else {
            //no user connected    
        }
    });

    
});
