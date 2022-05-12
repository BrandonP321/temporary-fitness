import React, { useEffect } from "react";
import "./App.scss";
import "destyle.css";
import { ReduxUtils } from "~Utils";
import PageHelmet from "~FeatureComponents/PageHelmet/PageHelmet";
import Navigation from "~Navigation/Navigation";
import { LoadingSpinnerContainer } from "~UIComponents/LoadingSpinner/LoadingSpinner";

function App() {
	useEffect(() => {
		ReduxUtils.InitializeDataStores();
	}, [])

	return (
		<>
			{/* applies default meta values to every page */}
			<PageHelmet/>

			{/* Loading spinner covering all content. Controlled via redux state */}
			<LoadingSpinnerContainer/>

			<Navigation/>
			{/* <button data-analytics-id={"asdf"}>Click me No Event</button>
			<a data-analytics-id={"lkj"} href={"/"}>home</a> */}
		</>
	);
}

export default App;