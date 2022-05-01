import { AnyAction, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "redux-thunk";

/* Returns the type of a redux store with a given slice; for anootating type of store parameters in functions/classes */
export type ReduxStoreWithSlice<SliceState = {}> = EnhancedStore<{
	responsive: SliceState;
}, AnyAction, [ThunkMiddleware<{
	responsive: SliceState;
}, AnyAction, undefined>]>

export class ReduxUtils {
	
}