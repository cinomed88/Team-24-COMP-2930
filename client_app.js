const data = require('./js/home_data');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();



//All static allocations.
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/pics', express.static(path.join(__dirname, 'pics')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


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


        
app.get('/ajax-GET-data', function (req, res) {
        let formatOfResponse = req.query['format'];
        let dataList = null;
        
        if(formatOfResponse == 'json-list') {
            res.setHeader('Content-Type', 'text/html');
            dataList = data.getJSON1();
            res.send(dataList);
            console.log(dataList);
            
        } else {
            res.send({msg: 'Wrong Format'});
        }
    
});

app.get('/ajax-GET-data', function (req, res) {
        let formatOfResponse = req.query['format'];
        let dataList = null;

        if(formatOfResponse == 'json-list4'){
            res.setHeader('Content-Type', 'text/html');
            dataList = data.getJSON4();
            res.send(dataList);
            console.log(dataList);
       
    } else {
            res.send({msg: 'Wrong Format'});
        }
    });

let port = 8000;
app.listen(port, function () {
    console.log('Listening on port ' + port + '!');
});



