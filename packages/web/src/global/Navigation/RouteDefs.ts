/* Nothing should be imported from any other files within the web workspace
to avoid loading more files than necessary at any given point in time */
import { InternalRouteDefs } from "@tempfit/shared/src/web/Navigation/RoutesDefs";

const AreaNames = {
	AreaOne: "AreaOnex"
} as const;

type TAreaOnePageNames = "PageOne" | "PageTwo";

type TPageNames = TAreaOnePageNames;

export const RouteDefs = new InternalRouteDefs<typeof AreaNames, TPageNames>({ AreaNames, Areas: {
	AreaOne: {
		name: AreaNames.AreaOne,
		areaDynamicImport: () => import("../../Areas/AreaOne/AreaOne"),
		pages: {
			PageOne: { path: "PageOneX" },
			PageTwo: { path: "PageTwoY" }
		}
	}
}});
