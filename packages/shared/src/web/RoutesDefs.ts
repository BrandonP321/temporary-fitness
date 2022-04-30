/* Type for object of area names with string key and string value */
type TAreaNames = {[key: string]: string};

/* Type for object of Areas with all the pages nested within each area */
type TAreas<AreaNames extends TAreaNames, PageNames extends string> = {
    [AreaNameKey in keyof AreaNames]: {
        name: AreaNames[AreaNameKey];
		/* Dynamic import must use 'any' type since there isn't 
		a generic return type used for dynamic imports */
		areaDynamicImport: () => Promise<any>;
        pages: {
            [key in PageNames]: {
                path: string;
            }
        }
    }
}

type InternalRouteDefsParams<AreaNames extends TAreaNames, TPageNames extends string> = {
    AreaNames: { [key: string]: string };
    Areas: TAreas<AreaNames, TPageNames>;
}

export class InternalRouteDefs<AllAreaNames extends TAreaNames, TPageNames extends string> {
	public AreaNames;
	public Areas;

	constructor(params: InternalRouteDefsParams<AllAreaNames, TPageNames>) {
		this.AreaNames = params.AreaNames;
		this.Areas = params.Areas;

		// convert short urls of each route nested within each area to url's with the area name prepended to it
		this.mapFullRoutePaths();
	}

	// converts paths of pages of areas to full path strings
	private mapFullRoutePaths = () => {
		// iterate over all areas in areas obj
		for (const areaKey in this.Areas) {
			const area = this.Areas[areaKey];

			// iterate over nested routes within area
			for (const subRouteKey in area.pages) {
				const subRoute = area.pages[subRouteKey];
				// prepend area name to nested route's path
				subRoute.path = `${area.name}/${subRoute.path}`;
			}
		}
	}

	/* returns Areas obj as array of areas */
	public get AreasArr() {
		const areasArr: TAreas<any, string>[string][] = [];

		for (const areaKey in this.Areas) {
			const area = this.Areas[areaKey];

			areasArr.push(area);
		}

		return areasArr;
	}
}