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
			{/* <button data-analytics-id={"asdf"}>Click me No Event</button>
			<a data-analytics-id={"lkj"} href={"/"}>home</a> */}
		</>
	);
}

export default App;