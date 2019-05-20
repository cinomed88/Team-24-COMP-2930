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
                    //var userId = "C3fd4AdJhTQmrvzYmaQIHpcyTsZ2";
                },
                // data: { name: userId },
                success: function (data) {
                    console.log("data load success");
                    console.log(data);
                    $("#user_name").text(data.user_name);
                    
                    var honor_lev = parseInt(data.honor_point/100) + 1;
                    console.log(honor_lev);
                    document.getElementById("honor_img").src="../Pics/Profile_Pics/honor_rank0" +honor_lev.toString()+".png";
                    $("#user_honor_lev").text("Honer Lev. " + honor_lev);
                    $("#user_honor_pt").text((data.honor_point) % 100 + " pt");
                    console.log("SUCCESS:", data);
    
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
