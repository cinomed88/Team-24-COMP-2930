const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');
const usersModel = require('./modelsmssql/users');
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
app.get('/gamepage.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'gamepage.html'));
});


//Landing page.
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Create a new user.
app.post('/create-user', (req, res) => {
    console.log(req.body);
    sequelize.query(`INSERT INTO USERS (user_id, user_name, honor_point, rank_point) VALUES ('${req.body.user_id}', '${req.body.user_name}', 0, 0)`,
                    { model: users }).then(function(users){
        
    }).catch(function(err) {
        // print the error details
    });
    
});



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Engines running on port ${PORT}`));