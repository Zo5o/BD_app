import React from "react";
import "../App.css";
import { useState } from "react";
import Axios from "axios";

function Screenings() {
	const [id_film, setId_film] = useState(0);
	const [id_room, setId_room] = useState(0);
	const [date, setDate] = useState(0);
	const [time, setTime] = useState(0);

	const [newTime, setNewTime] = useState(0);

	const [screeningList, setScreeningList] = useState([]);

	const addScreening = () => {
		Axios.post("http://localhost:3001/createScreening", {
			id_film: id_film,
			id_room: id_room,
			date: date,
			time: time,
		}).then(() => {
			console.log("succes");
			setScreeningList([
				...screeningList,
				{
					id_film: id_film,
					id_room: id_room,
					date: date,
					time: time,
				},
			]);
		});
	};

	const getScreenings = () => {
		Axios.get("http://localhost:3001/screenings").then((response) => {
			console.log(response);
			setScreeningList(response.data);
		});
	};

	const updateScreeningTime = (id) => {
		Axios.put("http://localhost:3001/updateScreening", {
			time: newTime,
			id: id,
		}).then((response) => {
			alert("update");
			setScreeningList(
				screeningList.map((val) => {
					return val.id == id
						? {
								id_film: id_film,
								id_room: id_room,
								date: date,
								time: newTime,
						  }
						: val;
				})
			);
		});
	};

	const deleteScreening = (id) => {
		Axios.delete(`http://localhost:3001/deleteScreening/${id}`).ther(
			(response) => {
				setScreeningList(
					screeningList.filter((val) => {
						return val.id != id;
					})
				);
			}
		);
	};

	return (
		<div className="App">
			<div className="information">
				<label>ID Film:</label>
				<input
					type="text"
					onChange={(event) => {
						setId_film(event.target.value);
					}}
				/>
				<label>ID Room:</label>
				<input
					type="text"
					onChange={(event) => {
						setId_room(event.target.value);
					}}
				/>
				<label>Date:</label>
				<input
					type="number"
					onChange={(event) => {
						setDate(event.target.value);
					}}
				/>
				<label>Time:</label>
				<input
					type="number"
					onChange={(event) => {
						setTime(event.target.value);
					}}
				/>

				<button onClick={addScreening}>Add Screening</button>
			</div>

			<div className="employees">
				<button onClick={getScreenings}>Show Screenings</button>
				{screeningList.map((val, key) => {
					console.log("want to show");
					return (
						<div className="employee">
							<div>
								<h3>ID Film: {val.id_film}</h3>
								<h3>ID Room: {val.id_room}</h3>
								<h3>Date: {val.date}</h3>
								<h3>Time: {val.time}</h3>
							</div>
							<div>
								{" "}
								<input
									type="text"
									placeholder="2000..."
									onChange={(event) => {
										setNewTime(event.target.value);
									}}
								/>
								<button
									onClick={() => {
										updateScreeningTime(val.id);
									}}
								>
									Update Time
								</button>
								<button
									onClick={() => {
										deleteScreening(val.id);
									}}
								>
									Delete this screening
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Screenings;
