const data = require('./js/home_data');
const express = require('express');
const { JSDOM } = require('jsdom');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

app.get('/', => (req, res) {
    let doc = fs.readFileSync('./html/Home.html', "utf8");
    res.send(doc);
}

app.use('/js', express.static('js'));
app.use(bodyParser.json());

        
app.get('/home_data', function (req, res)) {
        let formatOfResponse = req.query['format'];
        let dataList = null;
        
        if(formatOfResponse == 'json-list')
    }




