import React from "react";
import { RouteProps } from "react-router-dom";
import loadable from "@loadable/component";

interface AsyncComponentProps extends Omit<RouteProps, "component"> {
	lazyComponentDynamicImport: () => Promise<any>;
	// fallbackComponent: JSX.Element;
}