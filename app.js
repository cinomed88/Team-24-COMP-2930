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


app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'profile.html'));
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// The POST request to create a new user and insert it into our SQL database.
app.post('/create-user', (req, res) => {
    console.log(req.body);
    sequelize.query(`INSERT INTO USERS (user_id, user_name, honor_point, rank_point) VALUES ('${req.body.user_id}', '${req.body.user_name}', 0, 0)`, {
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





app.get('/ajax-GET-data', function (req, res) {
    let formatOfResponse = req.query['format'];
    let dataList = null;

    if (formatOfResponse == 'json-list') {
        res.setHeader('Content-Type', 'text/html');
        dataList = data.getJSON1();
        res.send(dataList);
        console.log(dataList);

    } else if (formatOfResponse == 'json-list4') {
        res.setHeader('Content-Type', 'text/html');
        dataList = data.getJSON4();
        res.send(dataList);
        console.log(dataList);
    } else {
        res.send({
            msg: 'Wrong Format'
        });
    }

});


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


app.get('/ajax-GET-Profile', function (req, res) {

    //aa
    let q = url.parse(req.url, true);
    console.log(q.query["name"]);
    // set the type of response:
    res.setHeader('Content-Type', 'application/json');

    let qs = 'SELECT user_name, honor_point, rank_point FROM USERS WHERE user_id = ' + '\'' + q.query["name"] + '\'';

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

})


app.get('/ajax-GET-match-data', function (req, res) {
        let formatOfResponse = req.query['format'];
        let dataList2 = null;
        
        if(formatOfResponse == 'json-match-list') {
            res.setHeader('Content-Type', 'text/html');
            sequelize.query(`SELECT * FROM USERS`, { model: users }).then(function(users) {
                res.send(users);
                console.log(users);
                console.log(users[0].dataValues.user_id);
            }).catch(function(err) {
                console.log("Error occurred at Ajax-get2", err);
                        // print the error details
            });
//            res.send(dataList2);
//            console.log('testing', dataList2);
            
    } else {
            res.send({msg: 'Wrong Format'});
        }
    
});

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





const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Engines running on port ${PORT}`));
