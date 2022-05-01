import { ResponsiveInternal } from "@tempfit/shared/src/web/features/ResponsiveSlice/ResponsiveInternal"
import { store } from "../../store";

/**
 * Since the Responsive slice exists in the shared folder of the monorepo, all we need 
 * to do here is create an instance of ResponsiveInternal so it can start updating the 
 * breakpoint values in the global redux state
 */
export const Responsive = new ResponsiveInternal(store);
