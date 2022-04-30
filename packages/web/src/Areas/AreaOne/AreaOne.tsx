import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouteDefs } from "../../global/Navigation/RouteDefs";

const Pages = RouteDefs.Areas.AreaOne.pages

export default function AreaOne() {
	console.log("areaone");
	console.log(Pages.PageOne.partialPath)
	return (
		<Routes>
			<Route path={Pages.PageOne.partialPath} element={<h1/>}/>
			<Route path={Pages.PageTwo.partialPath} element={<h1/>}/>
		</Routes>
	)
}