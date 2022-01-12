import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express();

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'cinema',
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected');
})

app.post('/create', (req, res) => {
    db.query("INSERT INTO ticket (id_order, id_screening, id_seat, kind, price) values ('2', '6', '5', 'normal', '20')");
    db.query("insert into movies (title, director, release_year, genre) values ('Film3', '1', '1995', 'Horror'),");
})

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.listen(3001, () => {
    console.log("Running on port 3001");
})