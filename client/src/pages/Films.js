import React from "react";
import "../App.css";
import "../styles/Films.css";
import { useState } from "react";
import Axios from "axios";

import "../styles/Popup.css"
import Popup from "../components/Popup";


function Films() {
	const [title, setTitle] = useState("");
	const [director, setDirector] = useState("");
	const [genre, setGenre] = useState("");
	const [release_year, setReleaseYear] = useState(0);
	const [duration, setDuration] = useState(0);

	const [newDuration, setNewDuration] = useState("");

	const [filmList, setFilmList] = useState([]);

	const [addPopup, setAddPopup] = useState(false);
	const [deletePopup, setDeletePopup] = useState(false);

	const addFilm = () => {
		Axios.post("http://localhost:3001/createFilm", {
			title: title,
			director: director,
			genre: genre,
			release_year: release_year,
			duration: duration,
		}).then(() => {
			console.log("succes");
			setFilmList([
				...filmList,
				{
					title: title,
					director: director,
					genre: genre,
					release_year: release_year,
					duration: duration,
				},
			]);
		});
		// }).catch(error => {
		// 	//alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
		// });
	};

	const getFilms = () => {
		Axios.get("http://localhost:3001/films").then((response) => {
			console.log(response);
			setFilmList(response.data);
		});
	};

	const updateFilmDuration = (id) => {
		Axios.put("http://localhost:3001/updateFilm", {
			duration: newDuration,
			id: id,
		}).then((response) => {
			alert("update");
			setFilmList(
				filmList.map((val) => {
					return val.id == id
						? {
							id: val.id,
							title: val.title,
							director: val.director,
							genre: val.genre,
							release_year: val.release_year,
							duration: newDuration,
						}
						: val;
				})
			);
		});
	};

	const deleteFilm = (id) => {
		Axios.delete(`http://localhost:3001/deleteFilm/${id}`).then((response) => {
			setFilmList(
				filmList.filter((val) => {
					return val.id != id;
				})
			);
		});
	};

	return (
		<div className="films">

			<form className="addFilm">
				<h1>Add new film</h1>
				<label>Title:</label>
				<input
					className="longInput"
					type="text"
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<label>Director:</label>
				<input
					className="longInput"
					type="text"
					onChange={(event) => {
						setDirector(event.target.value);
					}}
				/>
				<label>Genre:</label>
				<select
					name="selectBoxGenre"
					onChange={(event) => {
						setGenre(event.target.value);
					}}
				>
					<option value="">--Please choose an option--</option>
					<option value="Comedy">Comedy</option>
					<option value="Drama">Drama</option>
					<option value="Horror">Horror</option>
					<option value="Thriller">Thriller</option>
					<option value="Biographical">Biographical</option>
					<option value="Fantasy">Fantasy</option>
					<option value="SciFi">SciFi</option>
					<option value="Documentary">Documentary</option>
				</select>
				<label>Release Year:</label>
				<input
					className="longInput"
					type="number"
					min="1950"
					max="2030"
					step="1"
					onChange={(event) => {
						setReleaseYear(event.target.value);
					}}
				/>
				<label>Duration:</label>
				<input
					className="longInput"
					type="text"
					pattern="[0-5]:[0-5][0-9]$"
					placeholder="H:MM"
					onChange={(event) => {
						setDuration(event.target.value);
					}}
				/>

				{ title != '' && director != '' && genre != '' && release_year != '' && duration != '' &&
					<button className="longButton" onClick={() => {
						addFilm();
						setAddPopup(true);
					}}>
						Add Film
					</button>
				}
				<Popup trigger={addPopup} setTrigger={setAddPopup}>
					<h1>Dodano nowy Film</h1>
				</Popup>
			</form>


			<div className="listFilm">
				<h1>List of films</h1>
				<button onClick={getFilms}>Show Films</button>
				{filmList.map((val, key) => {
					console.log("want to show");
					return (
						<div className="listFilmItem">
							<div className="filmData">
								<h3>Title: {val.title}</h3>
								<h3>Director: {val.director}</h3>
								<h3>Genre: {val.genre}</h3>
								<h3>Release Year: {val.release_year}</h3>
								<h3>Duration: {val.duration}</h3>
							</div>
							<div className="filmEdit">
								{" "}
								<input
									className="shortInput"
									type="text"
									pattern="([0-5]):[0-5][0-9]$"
									placeholder="H:MM"
								/>
								<button
									className="shortButton"
									onClick={() => {
										updateFilmDuration(val.id);
									}}
								>
									Update duration
								</button>
							</div>
							<div>
								<button
									className="shortButton"
									onClick={() => {
										deleteFilm(val.id);
									}}
								>
									Delete this film
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Films;
