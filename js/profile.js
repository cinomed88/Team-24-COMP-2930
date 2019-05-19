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
                    console.log("beforeSend function");
                    //var userId = "C3fd4AdJhTQmrvzYmaQIHpcyTsZ2";
                },
                // data: { name: userId },
                success: function (data) {
                    console.log("data load success");
                    console.log(data);
                    $("#user_name").text(data.user_name);
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
