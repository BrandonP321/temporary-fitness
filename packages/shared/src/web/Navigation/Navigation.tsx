import React from "react";
import { RouteProps } from "react-router-dom";
import loadable from "@loadable/component";

interface AsyncComponentProps extends Omit<RouteProps, "component"> {
	lazyComponentDynamicImport: () => Promise<any>;
}

export const AsyncComponent = (props: AsyncComponentProps) => {
	const { lazyComponentDynamicImport, ...rest } = props;

	// TODO: create fallback component
	const LazyComponent = loadable(lazyComponentDynamicImport, { fallback: <div /> });

	return (<LazyComponent {...rest} />)
}