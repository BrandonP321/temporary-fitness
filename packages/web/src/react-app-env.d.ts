/// <reference types="react-scripts" />

import "react";

declare module "react" {
	// custom attributes for all react intrinsic elements
	interface HTMLAttributes<T> {
		/* analytics id for GTM tracking */
		"data-analytics-id"?: string;
	}
}