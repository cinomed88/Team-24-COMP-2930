var userId = 0;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userId = firebase.auth().currentUser.uid;
        // console.log(userId);
    } else {

    }
});


$(document).ready(function () {
    console.log("hihi");
    //aa // should change by userId
    let userID = "C3fd4AdJhTQmrvzYmaQIHpcyTsZ2";
    $.ajax({
        url: "/ajax-GET-Profile",
        dataType: "json",
        type: "GET",
        data: { name: userID },
        success: function (data) {
            console.log("data load success");
            console.log(data);
            $("#p1").text(data[user_name]);
            console.log("SUCCESS:", data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#p1").text(jqXHR.statusText);
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }

    });

});
