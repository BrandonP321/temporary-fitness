import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "~ReduxHooks";
import { hideLoadingSpinner, showLoadingSpinner } from "~ReduxSlices/PageLoadingSlice/pageLoadingSlice";
import { RouteDefs } from "./RouteDefs";

export default React.memo(function Navigation() {
	const dispatch = useAppDispatch();

	return (
		<Router>
			<Routes>
				{/* Renders all Areas <Route>'s as loadable 
				components with dynamic imports for code splitting */}
				{/* {RouteDefs?.renderAreaRoutes(<FallbackComponent dispatch={dispatch}/>)} */}
				{RouteDefs?.renderAreaRoutes()}
				
				{/* 404 route for all uncaught urls */}
				<Route path={"*"} element={<h1>404</h1>}/>
			</Routes>
		</Router>
	)
})

/* Fallback component that shows loading spinner on mount and hides on unmount */
const FallbackComponent = (props: { dispatch: ReturnType<typeof useAppDispatch> }) => {
	const { dispatch } = props;

	useEffect(() => {
		// show loading spinner on mount
		dispatch(showLoadingSpinner());

		// hide loading spinner when unmounted
		return hideSpinner;
	}, [])

	const hideSpinner = () => {
		dispatch(hideLoadingSpinner())
	}

	return (
		<></>
	)
}