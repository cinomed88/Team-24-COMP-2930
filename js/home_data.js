var bballObj = {"sport":"Basketball", "location":"Burnaby", "date":"April", "time":"9:00"};
var baseballObj = {"sport":"Baseball", "location":"Jas's Backyard", "date":"May", "time":"4:00"};
var badmintonObj = {"sport":"Badminton", "location":"FML", "date":"December", "time":"21:00"};

module.exports = {
    getJSON: function() {
        console.log("woo it worked!");
        return bballObj;
    }
}