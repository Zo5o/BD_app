import React, { useState } from "react";
import Logo from "../assets/cinemaLogo.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import "../styles/Navbar.css";

function Navbar() {
	const [openLinks, setOpenLinks] = useState(false);

	const toggleNavbar = () => {
		setOpenLinks(!openLinks);
	};

	return (
		<div className="navbar">
			<div className="leftSide" id={openLinks ? "open" : "close"}>
				<img src={Logo} />
				<div className="hiddenLinks">
					<Link to="/"> Home </Link>
					<Link to="/films"> Films </Link>
					<Link to="/screenings"> Screeenings </Link>
					<Link to="/rooms"> Rooms </Link>
					<Link to="/sign_in"> Sign In </Link>
				</div>
			</div>
			<div className="rightSide">
				<Link to="/"> Home </Link>
				<Link to="/films"> Films </Link>
				<Link to="/screenings"> Screeenings </Link>
				<Link to="/rooms"> Rooms </Link>
				<Link to="/sign_in"> Sign In </Link>
				<button onClick={toggleNavbar}>
					<ReorderIcon />
				</button>
			</div>
		</div>
	);
}

export default Navbar;
