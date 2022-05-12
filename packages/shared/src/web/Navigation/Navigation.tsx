import React from "react";
import { RouteProps } from "react-router-dom";
import loadable from "@loadable/component";

interface AsyncComponentProps extends Omit<RouteProps, "component"> {
	lazyComponentDynamicImport: () => Promise<any>;
	fallbackComponent: JSX.Element;
}

export const AsyncComponent = (props: AsyncComponentProps) => {
	const { lazyComponentDynamicImport, fallbackComponent, ...rest } = props;

	// TODO: create fallback component
	const LazyComponent = loadable(lazyComponentDynamicImport, { fallback: fallbackComponent });

	return (<LazyComponent {...rest} />)
}