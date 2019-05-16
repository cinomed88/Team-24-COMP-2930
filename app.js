const data = require('./js/home_data');
const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');
const usersModel = require('./modelsmssql/users');
const matchModel = require('./modelsmssql/match');
const matchListModel = require('./modelsmssql/match_participants');
const bodyParser = require('body-parser');


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


//Landing page.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/creategame.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'creategame_landscape.html'));
});


app.get('/findgame.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'findgame.html'));
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

app.post('/create-match', (req, res) => {
    console.log(req.body);

    sequelize.query(`INSERT INTO MATCH_PARTICIPANTS (user_id, is_host) VALUES ('${req.body.host_id}', 1)`, {
        model: matchParticipants
    }).then(function (match) {
        console.log('Successful creation of match particpants!');
        var matchId = 0;

        sequelize.query(`SELECT TOP (1) * FROM MATCH_PARTICIPANTS ORDER BY match_id DESC`, {
                model: matchParticipants
            })
            .then(function (match) {
                console.log('Success!');
                matchId = match[0].dataValues.match_id;
                sequelize.query(
                    `INSERT INTO MATCH (match_id, lat, lng, time, date, sport) VALUES (${matchId}, ${req.body.lat}, ${req.body.lng}, '${req.body.time}', '${req.body.date}', '${req.body.sport}')`, {
                        model: matches
                    }).then(function (users) {
                    console.log('Success!');
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


app.post('/assign-host', (req, res) => {
    sequelize.query(`SELECT TOP (1) * FROM MATCH ORDER BY match_id DESC`, {
        model: match
    }).then(function (match) {
        console.log(match);
        recentMatch = match[0].dataValues.match_id;
    }).catch(function (err) {
        console.log('ERROR OBTAINING MATCH ID WHEN ASSIGNING HOST:', err);
    });

    sequelize.query(`INSERT INTO MATCH_PARTICIPANTS (user_id, match_id, is_host) VALUES ('${req.body.host_id}', '${recentMatch}', 1)`, {
        model: matchListModel
    }).then(function (matchCreation) {
        console.log('Success!');
    }).catch(function (err) {
        console.log('ERROR ASSIGNING HOST TO MATCH:', err);
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



});






const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Engines running on port ${PORT}`));
