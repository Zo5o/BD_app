import "./App.css";
import Navbar from "./components/Navbar";
import Films from "./pages/Films";
import Screenings from "./pages/Screenings";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Switch>
					<Route path="/" exact component={Films} />
					<Route path="/films" exact component={Films} />
					<Route path="/screenings" exact component={Screenings} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
