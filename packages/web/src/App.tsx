import React, { useEffect } from "react";
import "./App.scss";
import "destyle.css";
import { ReduxUtils } from "~Utils";
import PageHelmet from "~FeatureComponents/PageHelmet/PageHelmet";
import Navigation from "~Navigation/Navigation";

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