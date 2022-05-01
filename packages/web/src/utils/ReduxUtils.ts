import { Responsive } from "../global/features/slices/ResponsiveSlice/Resonsive";
import {ReduxUtils as SharedReduxUtils} from "@tempfit/shared/src/web/utils/ReduxUtils";

/**
 * Extends ReduxUtils class from shared workspace of monorepo
 */
export class ReduxUtils extends SharedReduxUtils {
	/* initialized redux data stores for slices that apply */
	public static InitializeDataStores = () => {
		Responsive.startDataStoreListeners();
	}
}