import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "cinema",
});

db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("Connected");
});

app.post("/createFilm", (req, res) => {
	const title = req.body.title;
	const director = req.body.director;
	const genre = req.body.genre;
	const release_year = req.body.release_year;
	const duration = req.body.duration;

	db.query(
		"INSERT INTO film (title, director, genre, release_year, duration) VALUES (?,?,?,?,?)",
		[title, director, genre, release_year, duration],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values inserted");
			}
		}
	);
});

app.get("/films", (req, res) => {
	db.query("SELECT * FROM film", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.put("/updateFilm", (req, res) => {
	const id = req.body.id;
	const duration = req.body.duration;
	db.query(
		"UPDATE film SET duration = ? WHERE id = ?",
		[duration, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.delete("/deleteFilm/:id", (req, res) => {
	const id = req.params.id;
	console.log(id);
	db.query("DELETE FROM film WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post("/create", (req, res) => {
	db.query(
		"INSERT INTO ticket (id_order, id_screening, id_seat, kind, price) values ('2', '6', '5', 'normal', '20')"
	);
	db.query(
		"insert into movies (title, director, release_year, genre) values ('Film3', '1', '1995', 'Horror'),"
	);
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.listen(3001, () => {
	console.log("Running on port 3001");
});
