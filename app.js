const data = require('./js/home_data');
const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');
const usersModel = require('./modelsmssql/users');
const matchModel = require('./modelsmssql/match');
const matchListModel = require('./modelsmssql/match_participants');
const bodyParser = require('body-parser');
//aa
const url = require('url');


// Below establishes a connection to our SQL Server, hosted
// by Microsoft on Azure.
const sequelize = new Sequelize('GotNextDB', 'kobebryant', '123Cats$', {
    host: 'gotnextdb.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true
        }
    }
});

// Promises to ensure that our connection is made successfully.
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the databse:', err);
});


// Below creates the schema we need.
const users = usersModel(sequelize, Sequelize);
const matches = matchModel(sequelize, Sequelize);
const matchParticipants = matchListModel(sequelize, Sequelize);


//Below is the routing via express.
const app = express();


//All static allocations.
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/pics', express.static(path.join(__dirname, 'pics')));
app.use('/js', express.static(path.join(__dirname, 'js')));



//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////ALL ROUTING DONE BELOW///////////////////
/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// Routing for the home-page.
app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'home.html'));
});


// Routing for the match-making page.
app.get('/gamelandscape.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'gamelandscape.html'));
});


// Landing page.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// The routing for the create game page.
app.get('/creategame.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'creategame_landscape.html'));
});

// The routing for the find game page.
app.get('/findgame.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'findgame.html'));
});

// The routing for the profile page.
app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'profile.html'));
});

// The routing for the 'About Us' page.
app.get('/aboutus.html', (req, res) => {
   res.sendFile(path.join(__dirname, 'html', 'aboutme.html')); 
});



//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////ALL AJAX SERVER-SIDE CODE BELOW////////////////
/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());


// The POST request to create a new user and insert it into our SQL database.
app.post('/create-user', (req, res) => {
    console.log(req.body);
    sequelize.query(`INSERT INTO USERS (user_id, user_name, honor_point, rank_point, rank_point2, rank_point 3) VALUES ('${req.body.user_id}', '${req.body.user_name}', 0, 0, 0, 0)`, {
        model: users
    }).then(function (users) {

    }).catch(function (err) {
        // print the error details
    });

});


// An AJAX POST request for creating a match, taking data from the user in the form of a JavaScript
// object, holding the following properties: user_id, lat, lng, date, time, and sport.
// It then inserts the relevant data into the SQL database, using sequelize to query. 
app.post('/create-match', (req, res) => {
    console.log(req.body);

    // Query to insert a unique primary key and match for the database, with the relevant host.
    sequelize.query(`INSERT INTO MATCH_PARTICIPANTS (user_id, is_host) VALUES ('${req.body.host_id}', 1)`, {
        model: matchParticipants
    }).then(function (match) {
        console.log('Host and match_id successfully assigned!');
        var matchId = 0;
        
        // Upon successful creation of a match, this query to get the primary key is ran.
        sequelize.query(`SELECT TOP (1) * FROM MATCH_PARTICIPANTS ORDER BY match_id DESC`, {
                model: matchParticipants
            })
            .then(function (match) {
                console.log('match_id of recently created match obtained!');
                matchId = match[0].dataValues.match_id;
                
                //This query inserts the match's full details into the database, complete with coordinates.
                sequelize.query(
                    `INSERT INTO MATCH (match_id, lat, lng, time, date, sport) VALUES (${matchId}, ${req.body.lat}, ${req.body.lng}, '${req.body.time}', '${req.body.date}', '${req.body.sport}')`, {
                        model: matches
                    }).then(function (users) {
                    console.log('Successfully created our match!', users);
                }).catch(function (err) {
                    console.log('ERROR CREATING MATCH:', err);
                });

            }).catch(function (err) {
                console.log('ERROR GETTING ID OF RECENT MATCH CREATED', err);
            });


    }).catch(function (err) {
        console.log('ERROR CREATING MATCH:', err);
    });


});


app.post('/join-match', (req, res) => {
    console.log(req.body);
    sequelize.query(`SET IDENTITY_INSERT MATCH_PARTICIPANTS ON INSERT INTO MATCH_PARTICIPANTS (user_id, match_id, is_host) VALUES ('${req.body.user_id}', ${req.body.match_id}, 0)`, {
        model: matchParticipants
    }).then(function (match) {
        console.log('SUCCESSFULLY JOINED MATCH!', match);
    }).catch(function (err) {
       console.log('ERROR JOINING MATCH: ', err); 
    });
    // Query to insert the current user into the match being played.
    

    
});

// The below AJAX call takes the user's current selected sport and date,
// and then queries to find relevant matches, before sending that data
// back to the client-side to be placed on the map as markers.
app.get('/get-matches', (req, res) => {
    
    let sport = req.query['sport'];
    let time = req.query['time'];
    let date = req.query['date'];
    console.log(sport);
    console.log('ajax', time);
    console.log('ajax', date);
    sequelize.query(`SELECT * FROM MATCH WHERE sport LIKE '%${sport}%' AND date >= '${date}'`, {
                model: matches
            }).then(match => {
                    console.log(match);
                    res.send(match);    
    }).catch(err => {
       console.log('ERROR CAUGHT WHILE TRYING TO RETRIEVE MATCHES:', err); 
    });
});


// The below AJAX call takes the match id in question and then queries it to
// find all participants.
app.get('/get-match-participants', (req, res) => {
    
    let matchId = req.query['matchId'];
    
    sequelize.query(`SELECT *, MATCH_PARTICIPANTS.is_host FROM USERS JOIN MATCH_PARTICIPANTS ON (USERS.user_id = MATCH_PARTICIPANTS.user_id) WHERE MATCH_PARTICIPANTS.match_id = ${matchId}`, {
        model: matchParticipants
    }).then(players => {
        console.log(players);
        res.send(players);
    }).catch(err => {
        console.log(`ERROR CAUGHT WHILE TRYING TO GET PARTICIPANTS FOR ${matchID}`, err);
    });
    
    
});



// The current user and his details are obtained 
// through this AJAX call, using their firebase id
// as the primary key.
// app.get('/get-user-profile', (req, res) => {
    
//     let userId = req.query['userId'];
    
//     sequelize.query(`SELECT * FROM USERS WHERE user_id LIKE '%${userId}%'`, {
//         model: users
//     }).then(profile => {
//         res.send(profile);
//     }).catch(err => {
//         console.log('ERROR CAUGHT WHILE ATTEMPTING TO OBTAIN CURRENT USER PROFILE:', err);
//     });
    
// });


// The below AJAX call gets the details for the current user, using their firebase UID as the
// primary key.
app.get('/ajax-GET-Profile', function (req, res) {
    //aa
    let q = url.parse(req.url, true);
    console.log(q.query["name"]);
    // set the type of response:
    res.setHeader('Content-Type', 'application/json');

    let qs = 'SELECT user_name, honor_point, rank_point, rank_point2, rank_point3 FROM USERS WHERE user_id = ' + '\'' + q.query["name"] + '\'';

    sequelize.query(qs, { model: users })
        .then(function (userdata) {
            console.log(userdata);
            let userInfo = userdata[0].dataValues;
            console.log(userInfo);
            res.send(userInfo);
        }).catch(function (err) {
            console.log('ERROR ENCOUNTERED WHEN OBTAINING USERS: ', err);
            res.sendStatus(500);
    });
    
});

app.get('/ajax-GET-History', function (req, res) {
    //aa
    let q = url.parse(req.url, true);
    console.log(q.query["name"]);
    // set the type of response:
    res.setHeader('Content-Type', 'application/json');

    let qs2 = 'SELECT MATCH.match_id, lat, lng, time, date, sport FROM MATCH LEFT JOIN MATCH_PARTICIPANTS ON MATCH_PARTICIPANTS.match_id = MATCH.match_id WHERE MATCH_PARTICIPANTS.user_id =' + '\'' + q.query["name"] + '\'' + 'ORDER BY date, time DESC';
    sequelize.query(qs2, { model: matches })
    .then(function (matchdata) {
        console.log(matchdata);
        res.send({"stuff": matchdata});
    }).catch(function (err) {
        console.log('ERROR ENCOUNTERED WHEN OBTAINING USERS: ', err);
        res.sendStatus(500);
    });
});

// The below AJAX call takes the user's current selected sport and date,
// and then queries to find relevant matches, before sending that data
// back to the client-side to be placed on the relevant div container for
// displaying a match/event list for the user on the homepage.
app.get('/ajax-GET-match-data', function (req, res) {
        let formatOfResponse = req.query['format'];
        let dataList2 = null;

        
//        if(formatOfResponse == 'json-match-list') {
//            res.setHeader('Content-Type', 'text/html');
//            sequelize.query(`SELECT * FROM USERS`, { model: users }).then(function(users) {
//                res.send(users);
//                console.log(users);
//                console.log(users[0].dataValues.user_id);
//            }).catch(function(err) {
//                console.log("Error occurred at Ajax-get", err);
//                        // print the error details
//            });

        let userId = req.query['userId'];
        let date = req.query['date'];
        res.setHeader('Content-Type', 'text/html');
        sequelize.query(`SELECT * FROM MATCH JOIN MATCH_PARTICIPANTS ON (MATCH.match_id = MATCH_PARTICIPANTS.match_id)
WHERE MATCH_PARTICIPANTS.user_id = '${userId}' AND MATCH.date >= '${date}'`, { model: matches }).then(function(match) {
            res.send(match);
            console.log(match);
        }).catch(function(err) {
            console.log("Error occurred at Ajax-get", err);
                    // print the error details
        });
//        }

//            res.send(dataList2);
//            console.log('testing', dataList2);

});

// The below AJAX call that queries for the users friends and associated 
// avatar, before sending that data back to the client-side to be placed on //the relevant div container for displaying a users friend list for the user
//on the homepage.
app.get('/ajax-GET-friends-data', function (req, res) {
    let formatOfResponse = req.query['format'];
    let friendsData = null;
    
    if(formatOfResponse == 'json-friends-list') {
        res.setHeader('Content-Type', 'text/html');
//        sequelize.query(`liasuhiaubdg;iuasdu`)
    } else {
        res.send({msg: 'Wrong Format'});
    }
});

// The below AJAX call that queries for the users recently played players and associated avatar, before sending that data back to the client-side to be //placed on the relevant div container for displaying a users friend list for //the user's on the homepage.
app.get('/ajax-GET-recentlyPlayed-data', function (req, res) {
    let formatOfResponse = req.query['format'];
    let friendsData = null;
    
    if(formatOfResponse == 'json-recentlyPlayed-list') {
        res.setHeader('Content-Type', 'text/html');
//        sequelize.query(`liasuhiaubdg;iuasdu`)
    } else {
        res.send({msg: 'Wrong Format'});
    }
});





const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Engines running on port ${PORT}`));
