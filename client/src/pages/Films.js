import React from "react";
import "../App.css";
import "../styles/Films.css";
import { useState } from "react";
import Axios from "axios";

function Films() {
	const [title, setTitle] = useState("");
	const [director, setDirector] = useState("");
	const [genre, setGenre] = useState("");
	const [release_year, setReleaseYear] = useState(0);
	const [duration, setDuration] = useState(0);

	const [newDuration, setNewDuration] = useState(0);

	const [filmList, setFilmList] = useState([]);

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
		Axios.delete(`http://localhost:3001/deleteFilm/${id}`).ther((response) => {
			setFilmList(
				filmList.filter((val) => {
					return val.id != id;
				})
			);
		});
	};

	return (
		<div className="films">
			<div className="addFilm">
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
				<input
					className="longInput"
					type="text"
					onChange={(event) => {
						setGenre(event.target.value);
					}}
				/>
				<label>Release Year:</label>
				<input
					className="longInput"
					type="number"
					onChange={(event) => {
						setReleaseYear(event.target.value);
					}}
				/>
				<label>Duration:</label>
				<input
					className="longInput"
					type="text"
					onChange={(event) => {
						setDuration(event.target.value);
					}}
				/>

				<button className="longButton" onClick={addFilm}>
					Add Film
				</button>
			</div>

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
									type="number"
									placeholder="224200"
									onChange={(event) => {
										setNewDuration(event.target.value);
									}}
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
