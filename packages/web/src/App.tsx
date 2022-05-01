import React, { useEffect } from "react";
import "./App.scss";
import Navigation from "./global/Navigation/Navigation";
import { ReduxUtils } from "./utils/ReduxUtils";

function App() {
	useEffect(() => {
		ReduxUtils.InitializeDataStores();
	}, [])

	return (
		<>
			<Navigation/>
		</>
	);
}

export default App;