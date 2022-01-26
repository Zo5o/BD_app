import "./App.css";
import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Screenings from "./pages/Screenings";
import Rooms from "./pages/Rooms";
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

Axios.defaults.withCredentials = true;


function App() {

	const [connectionFlag, setConnectionFlag] = useState(null);

	useEffect(() => {
		axios.get("http://localhost:3001/flagcheck").then((response) => {
			console.log(response.data)
			if (response.data == 'checked') {
				setConnectionFlag(true);
			}
		});
	});

	if (connectionFlag) {
		return (
			<div className="App">
				<Router>
					<Navbar />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/films" exact component={Films} />
						<Route path="/screenings" exact component={Screenings} />
						<Route path="/rooms" exact component={Rooms} />
						<Route path="/profile" exact component={Profile} />
						<Route path="/sign_in" exact component={SignIn} />
					</Switch>
				</Router>
			</div>
		);
	} else {
		return (
			<div className="App">
				<h1>Fatal Error</h1>
				Database is not connected!
			</div>
		);
	}

}

export default App;
