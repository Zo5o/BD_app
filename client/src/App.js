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
import  Axios  from "axios";

Axios.defaults.withCredentials = true;

function App() {
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
}

export default App;
