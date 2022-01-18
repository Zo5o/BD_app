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

// SCREENINGS
app.post("/createScreening", (req, res) => {
	const id_film = req.body.id_film;
	const id_room = req.body.id_room;
	const date = req.body.date;
	const time = req.body.time;

	db.query(
		"INSERT INTO screening (id_film, id_room, date, time) VALUES (?,?,?,?)",
		[id_film, id_room, date, time],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values inserted");
			}
		}
	);
});

app.get("/screenings", (req, res) => {
	db.query("SELECT * FROM screening", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.put("/updateScreening", (req, res) => {
	const id = req.body.id;
	const time = req.body.time;
	db.query(
		"UPDATE screening SET time = ? WHERE id = ?",
		[time, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.delete("/deleteScreening/:id", (req, res) => {
	const id = req.params.id;
	console.log(id);
	db.query("DELETE FROM screening WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// ROOMS
app.post("/createRoom", (req, res) => {
	const name = req.body.name;
	const seats_number = req.body.seats_number;

	db.query(
		"INSERT INTO room (name, seats_number) VALUES (?,?)",
		[name, seats_number],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values inserted");
			}
		}
	);
});

app.get("/rooms", (req, res) => {
	db.query("SELECT * FROM room", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.put("/updateRoom", (req, res) => {
	const id = req.body.id;
	const seats_number = req.body.seats_number;
	db.query(
		"UPDATE room SET seats_number = ? WHERE id = ?",
		[seats_number, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.delete("/deleteRoom/:id", (req, res) => {
	const id = req.params.id;
	console.log(id);
	db.query("DELETE FROM room WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// SignIn

app.post('/register', (req, res) => {

	const username = req.body.username;
	const password = req.body.password;
	const firstName = req.body.firstName;
	const secondName = req.body.secondName;
	const email = req.body.email;
	const birthDate = req.body.birthDate;
	const type = "User";

	db.query("INSERT INTO person (first_name, second_name, email, birth_date) VALUES (?,?,?,?)",
		[firstName, secondName, email, birthDate],
		(err, result) => {
			console.log(err);
		})

	db.query("INSERT INTO account (username, password, type) VALUES (?,?,?)",
		[username, password, type],
		(err, result) => {
			console.log(err);
		});
});

app.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	db.query("SELECT * FROM account WHERE username = ? AND password = ?",
		[username, password],
		(err, result) => {
			if (err) { res.send({ err: err }) }
			if (result.length > 0) {
				res.send(result);
			}
			else {
				res.send({ message: "Wrong!" });
			}

		});
})

// OLD
app.delete("/delete/:id", (req, res) => {
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