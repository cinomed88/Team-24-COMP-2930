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
                    $("#user_honor_lev").text("Honer Lev. " + honor_lev);
                    $("#user_honor_pt").text((data.honor_point) % 100 + " pt");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#user_name").text(jqXHR.statusText);
                    console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }
    
            })

        } else {
            //no user connected    
        }
    });

    
});
