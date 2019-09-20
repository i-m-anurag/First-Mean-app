const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const task = require('./routes/tasks');

const port = 5000;

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'client')));

//body parser middle ware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/',index);
app.use('/api',task);

app.listen(port, ()=>{
    console.log("server started")
})
