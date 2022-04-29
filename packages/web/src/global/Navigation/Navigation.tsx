import React from "react";
import { BrowserRouter as Router, Routes, Route, RouteProps } from "react-router-dom";
import loadable from "@loadable/component";
import { InternalRouteDefs } from "@tempfit/shared/src/web/RoutesDefs";

interface NavigationProps {
	RouteDefs: InternalRouteDefs<{}, string>;
}

export default React.memo(function Navigation(props: NavigationProps) {
	const { RouteDefs } = props;

	return (
		<Router>
			<Routes>
				{RouteDefs?.AreasArr?.map((area) => {
					return (
						<Route
							key={area?.name}
							path={`/${area?.name}`}
							element={<AsyncComponent lazyComponentDynamicImport={area?.areaDynamicImport}/>}
						/>
					)
				})}
			</Routes>
		</Router>
	)
})

interface AsyncComponentProps extends Omit<RouteProps, "component"> {
	lazyComponentDynamicImport: () => Promise<any>;
}

export const AsyncComponent = (props: AsyncComponentProps) => {
	const { lazyComponentDynamicImport, ...rest } = props;

	// TODO: create fallback component
	const LazyComponent = loadable(lazyComponentDynamicImport, { fallback: <div/> });

	return (<LazyComponent {...rest}/>)
}