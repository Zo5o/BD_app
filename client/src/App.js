import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Screenings from "./pages/Screenings";
import Rooms from "./pages/Rooms";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
				</Switch>
			</Router>
		</div>
	);
}

export default App;
