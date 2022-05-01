import React, { useEffect } from "react";
import "./App.scss";
import PageHelmet from "./global/components/PageHelmet/PageHelmet";
import Navigation from "./global/Navigation/Navigation";
import { ReduxUtils } from "./utils/ReduxUtils";

function App() {
	useEffect(() => {
		ReduxUtils.InitializeDataStores();
	}, [])

	return (
		<>
			{/* applies default meta values to every page */}
			<PageHelmet/>
			<Navigation/>
		</>
	);
}

export default App;