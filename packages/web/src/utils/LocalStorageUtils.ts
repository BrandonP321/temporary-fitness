import { LocalStorageUtilsInternal } from "@tempfit/shared/src/web/utils/LocalStorageUtils";

export const LocalStorageKeys = {
	siteTheme: "site-theme",
} as const;

export const LocalStorageUtils = new LocalStorageUtilsInternal<typeof LocalStorageKeys>(LocalStorageKeys)