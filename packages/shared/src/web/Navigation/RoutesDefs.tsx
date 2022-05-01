import React from "react";
import { BrowserRouter as Router, Routes, Route, RouteProps } from "react-router-dom";
import { AsyncComponent } from "./Navigation";

/* Type for object of area names with string key and string value */
type TAreaNames = {[key: string]: string};

type TAreaPageWithFullData = {
	/* Area that page is nested within */
	parentArea: string;
	/* Page without Area prefix */
	partialPath: string;
	/* Full Page path with Area prefix */
	fullPath: string;
}

type TAreaPageWithPathOnly = {
	path: string;
}

/* Type for object of Areas with all the pages nested within each area */
type TAreas<AreaNames extends TAreaNames, PageNames extends string, PageData extends {} = TAreaPageWithFullData> = {
    [AreaNameKey in keyof AreaNames]: {
        name: AreaNames[AreaNameKey];
		/* Dynamic import must use 'any' type since there isn't 
		a generic return type used for dynamic imports */
		areaDynamicImport: () => Promise<any>;
        pages: {
            [key in PageNames]: PageData
        }
    }
}

type TGenericAreas = TAreas<any, string>;

type TAreasWithPagePathOnly<AreaNames extends TAreaNames, PageNames extends string> = TAreas<AreaNames, PageNames, TAreaPageWithPathOnly>;

/**
 * Holds data of all route paths for site.  Takes in obj of Areas and data for nested pages 
 * within each area for use in rendering <Route>'s and navigating the site
 */
type InternalRouteDefsParams<AreaNames extends TAreaNames, TPageNames extends string> = {
    AreaNames: { [key: string]: string };
    Areas: TAreasWithPagePathOnly<AreaNames, TPageNames>;
}

export class InternalRouteDefs<AllAreaNames extends TAreaNames, TPageNames extends string> {
	public AreaNames;
	public Areas: TAreas<AllAreaNames, TPageNames>;

	constructor(params: InternalRouteDefsParams<AllAreaNames, TPageNames>) {
		this.AreaNames = params.AreaNames;
		this.Areas = InternalRouteDefs.getAreasWithFullData(params.Areas);

	}

	// Returns modified Areas obj with full page data based on partial path provided
	private static getAreasWithFullData(areas: TAreasWithPagePathOnly<any, string>) {
		const modifiedAreas: TGenericAreas = {} as TGenericAreas;

		// iterate over all areas in areas obj
		for (const areaKey in areas) {
			const area = areas[areaKey];

			// iterate over nested routes within area
			for (const pageKey in area.pages) {
				const page = area.pages[pageKey];

				const pageData = {
					fullPath: `/${area.name}/${page.path}`,
					parentArea: area.name,
					partialPath: `/${page.path}`
				}
				
				modifiedAreas[areaKey] = {
					...area,
					pages: {
						...(modifiedAreas[areaKey]?.pages ?? {}),
						[pageKey]: pageData
					}
				}
			}
		}

		return modifiedAreas;
	}

	/* returns Areas obj as array of areas */
	public get AreasArr() {
		const areasArr: TGenericAreas[string][] = [];

		for (const areaKey in this.Areas) {
			const area = this.Areas[areaKey];

			areasArr.push(area);
		}

		return areasArr;
	}

	/* Maps over areas and returns the appropriate <Route> as a loadable comonent with a dynamic import to introduce code splitting */
	public renderAreaRoutes = () => {
		return this.AreasArr.map(area => (
			<Route
				key={area?.name}
				path={`/${area?.name}/*`}
				element={<AsyncComponent lazyComponentDynamicImport={area?.areaDynamicImport} />}
			/>
		))
	}
}