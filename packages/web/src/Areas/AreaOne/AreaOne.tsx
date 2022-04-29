import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteDefs } from "../../global/Navigation/Routes";

const AreaPaths = RouteDefs.Areas.AreaOne.subRoutes;

export default function AreaOne() {
	return (
		<Router>
			<Routes>
				<Route path={AreaPaths.PageOne.path} element={<h1>Page One</h1>}/>
			</Routes>
		</Router>
	)
}