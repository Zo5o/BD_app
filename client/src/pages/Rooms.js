import React from "react";
import "../App.css";
import "../styles/Rooms.css";
import { useState } from "react";
import Axios from "axios";

function Rooms() {
	const [name, setName] = useState("");
	const [seats_number, setSeats_number] = useState(0);

	const [newSeats_number, setNewSeats_number] = useState(0);

	const [roomList, setRoomList] = useState([]);

	const addRoom = () => {
		Axios.post("http://localhost:3001/createRoom", {
			name: name,
			seats_number: seats_number,
		}).then(() => {
			console.log("succes");
			setRoomList([
				...roomList,
				{
					name: name,
					seats_number: seats_number,
				},
			]);
		});
	};

	const getRooms = () => {
		Axios.get("http://localhost:3001/rooms").then((response) => {
			console.log(response);
			setRoomList(response.data);
		});
	};

	const updateRoomSeatsNumber = (id) => {
		Axios.put("http://localhost:3001/updateRoom", {
			seats_number: newSeats_number,
			id: id,
		}).then((response) => {
			alert("update");
			setRoomList(
				roomList.map((val) => {
					return val.id == id
						? {
								name: name,
								seats_number: seats_number,
						  }
						: val;
				})
			);
		});
	};

	const deleteRoom = (id) => {
		Axios.delete(`http://localhost:3001/deleteRoom/${id}`).ther((response) => {
			setRoomList(
				roomList.filter((val) => {
					return val.id != id;
				})
			);
		});
	};

	return (
		<div className="rooms">
			<div className="addRoom">
				<h1>Add new room</h1>
				<label>Name:</label>
				<input
					className="longInput"
					type="text"
					onChange={(event) => {
						setName(event.target.value);
					}}
				/>
				<label>Seats number:</label>
				<input
					className="longInput"
					type="number"
					onChange={(event) => {
						setSeats_number(event.target.value);
					}}
				/>
				<button className="longButton" onClick={addRoom}>
					Add Room
				</button>
			</div>

			<div className="listRoom">
				<h1>Show list of rooms</h1>
				<button className="longButton" onClick={getRooms}>
					Show Rooms
				</button>
				{roomList.map((val, key) => {
					console.log("want to show");
					return (
						<div className="listRoomItem">
							<div className="roomData">
								<h3>Name: {val.name}</h3>
								<h3>Seats number: {val.seats_number}</h3>
							</div>
							<div className="roomEdit">
								{" "}
								<input
									className="shortInput"
									type="text"
									placeholder="2000..."
									onChange={(event) => {
										setNewSeats_number(event.target.value);
									}}
								/>
								<button
									className="shortButton"
									onClick={() => {
										updateRoomSeatsNumber(val.id);
									}}
								>
									Update Seats number
								</button>
							</div>
							<div>
								<button
									className="shortButton"
									onClick={() => {
										deleteRoom(val.id);
									}}
								>
									Delete this room
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Rooms;
