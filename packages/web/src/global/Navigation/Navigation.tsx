import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteDefs } from "./RouteDefs";

export default React.memo(function Navigation() {
	return (
		<Router>
			<Routes>
				{/* Renders all Areas <Route>'s as loadable 
				components with dynamic imports for code splitting */}
				{RouteDefs?.renderAreaRoutes()}
				
				{/* 404 route for all uncaught urls */}
				<Route path={"*"} element={<h1>404</h1>}/>
			</Routes>
		</Router>
	)
})