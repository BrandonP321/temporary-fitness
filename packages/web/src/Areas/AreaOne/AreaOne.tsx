import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { RouteDefs } from "../../global/Navigation/RouteDefs";
import { LoadingSpinnerContainer } from "../../global/UI/UIComponents/LoadingSpinner/LoadingSpinner";

const Pages = RouteDefs.Areas.AreaOne.pages

const mockText = Array(300).fill(";alksjdf;aslkf;asjfk").join(" ");

export default function AreaOne() {

	return (
		<Routes>
			<Route path={Pages.PageOne.partialPath} element={<PageOne/>}/>
			<Route path={Pages.PageTwo.partialPath} element={<h1/>}/>
		</Routes>
	)
}

const PageOne = () => {
	const [loading, setLoading] = useState(true);

	return (
		<LoadingSpinnerContainer loading={loading}>
			<h1>{mockText}</h1>
			<button onClick={() => setLoading(!loading)} style={{ position: "fixed", top: "1rem", left: "1rem" }}>Load change</button>
		</LoadingSpinnerContainer>
	)
}