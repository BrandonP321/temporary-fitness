import { configureStore } from "@reduxjs/toolkit";
import responsiveReducer from "@tempfit/shared/src/web/features/ResponsiveSlice/ResponsiveSlice"
import themeReducer from "./slices/ThemeSlice/ThemeSlice";
import pageLoadingReducer from "./slices/PageLoadingSlice/pageLoadingSlice";

export const store = configureStore({
	/* object of slice reducers to be combined */
	reducer: {
		responsive: responsiveReducer,
		theme: themeReducer,
		pageLoading: pageLoadingReducer,
	}
})

// Infer the `RootState` and `AppDispatch` from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type of reducers object for dispatch
export type AppDispatch = typeof store.dispatch;