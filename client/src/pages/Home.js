import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/cinema.jpg";
import "../styles/Home.css";

function Home() {
	return (
		<div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
			<div className="headerContainer">
				<h1> Kino kinowe </h1>
				<p> Filmy na posesji </p>
				<Link to="screenings">
					<button> Zobacz seanse </button>
				</Link>
			</div>
		</div>
	);
}

export default Home;
