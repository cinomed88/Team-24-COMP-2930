const data = require('./home_data');
const express = require('express');
const { JSDOM } = require('jsdom');
const path = require('path');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');


app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/pics', express.static(path.join(__dirname, 'pics')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
    let doc = fs.readFileSync('../html/Home.html', "utf8");
    res.send(doc);
});

app.use(bodyParser.json());

        
app.get('/ajaxa-GET-data', function (req, res) {
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

let port = 8000;
app.listen(port, function () {
    console.log('Listening on port ' + port + '!');
});



