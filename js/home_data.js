var bballObj = {"sport":"Basketball", "location":"Burnaby", "date":"April", "time":"9:00"};
var baseballObj = {"sport":"Baseball", "location":"Jas's Backyard", "date":"May", "time":"4:00"};
var badmintonObj = {"sport":"Badminton", "location":"FML", "date":"December", "time":"21:00"};
var oneOfMyFewFriends = {"firstName":"Jas", "lastName":"Chahal"};

module.exports = {
    getJSON1: function() {
        console.log("woo it worked!");
        return bballObj;
    },
    getJSON2: function() {
        console.log("yay this worked too!");
        return baseballObj;
    },
    getJSON3: function() {
        console.log("guess we're doing something right!");
        return badmintonObj;
    },
    getJSON4: function() {
        console.log("woo it worked again for this one!");
        return oneOfMyFewFriends;
    }
};