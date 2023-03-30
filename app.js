const express = require("express");
const app = express();
const session = require('express-session')
const port = 3000;
var count = 0;
app.set("view engine", "ejs");
// const { MongoClient } = require('mongodb');


// // Connection URL
// const url = 'mongodb://0.0.0.0:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'myProject';
// client.connect().then(function () {
//     db = client.db(dbName);
// })

//router
const {connection} = require("./service/connection");
connection();

const router = require("./routes/router");




app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { name } = require("ejs");
const { json } = require("express");


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(router);


app.get('*', (req, res) => {
    res.send(404);
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
})