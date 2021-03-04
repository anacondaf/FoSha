import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import custom pages
import Homepage from "./pages/Homepage";
import Newsfeed from "./pages/Newsfeed";

//import custom component
import Navbar from "./components/Navbar";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Homepage />
				</Route>
				<Route path="/newfeed">
					<Navbar />
					<Newsfeed />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
