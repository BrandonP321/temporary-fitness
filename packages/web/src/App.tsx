import React from "react";
import "./App.scss";
import Navigation from "./global/Navigation/Navigation";
import { RouteDefs } from "./global/Navigation/Routes";

function App() {
	return (
		<>
			<Navigation RouteDefs={RouteDefs}/>
		</>
	);
}

export default App;