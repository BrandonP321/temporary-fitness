import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DOMUtils } from "@tempfit/shared/src/web/utils/DOMUtils";
import { LocalStorageUtils } from "../../../../utils/LocalStorageUtils";

export type TSiteTheme = "light" | "dark";

const setHTMLThemeAttribute = (theme: TSiteTheme) => {
	DOMUtils.setHTMLDataAttribute("theme", theme);
}

// get and set user saved theme from local storage, defaulting to 'light' if none found
export const getInitialThemeState = () => {
	const userSavedTheme = LocalStorageUtils.getItem(LocalStorageUtils.StorageKeys.siteTheme, "light") as TSiteTheme

	// we must also set the 'data-theme' attribute on <html> for css styling
	setHTMLThemeAttribute(userSavedTheme);

	return userSavedTheme;
}

export interface ThemeState {
	theme: TSiteTheme
}

const initialState: ThemeState = {
	theme: getInitialThemeState()
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<TSiteTheme>) => {
			state.theme = action.payload;
			setHTMLThemeAttribute(action.payload);
			// update local storage with new theme for future page visits
			LocalStorageUtils.setItem(LocalStorageUtils.StorageKeys.siteTheme, action.payload);
		}
    }
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;