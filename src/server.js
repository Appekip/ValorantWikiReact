const express = require('express');
const mysql = require('mysql');
const response = require("body-parser");
const app = express();

//Create connection to sql

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '1234',
    database: 'valorant'
});

//Connect
db.connect((err) => {
    if (err){
        throw err;
    }

    console.log("Connection was succesfull");
});


app.use(express.static('./'));

//Method for creating the database in the app.

app.get('/createdb', (req, res) =>{
    let sql = 'CREATE DATABASE valorant';
    db.query(sql, (err, result) =>{
        if (err){
            throw err;
            console.log(result);
            console.log("Database created")
        }
    })
    console.log("Database is ready");

    let tbl = 'CREATE TABLE searchLog(id int AUTO_INCREMENT, ip VARCHAR(64), country VARCHAR(64), search VARCHAR(64), date VARCHAR(64), PRIMARY KEY(id))';
    db.query(tbl, (err, result) => {
        if (err) {
            throw err;
            console.log(result);
            console.log("Tables created")
        }
    });
});
app.use(express.static('public'));
app.use(express.json());

//Add data to the table
app.post('/Data', (req, res) => {
    console.log(req.body);
    console.log("Post happens");
    const data = req.body;
    let sqldata = {ip: data.ip, country: data.country, search: data.search, date: data.date};
    let sql = 'INSERT INTO searchLog SET ?';
    let query = db.query(sql, sqldata, (err, result) =>{
        if (err) throw err;
        console.log(result);
    })


});

app.listen('4000', () => {
    console.log('Server started on port 4000');
});