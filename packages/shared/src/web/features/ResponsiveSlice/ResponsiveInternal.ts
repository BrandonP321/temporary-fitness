import { breakpointHit, ResponsiveState } from "./ResponsiveSlice";
import { ReduxStoreWithSlice } from "../../utils/ReduxUtils";

class MediaQuery {
	private _maxWidth;
	private _query;
	public lastMatchValue = false;

	public get query() { return this._query };

	public get maxWidth() { return this._maxWidth };

	constructor(maxWidth: number) {
		this._maxWidth = maxWidth;
		this._query = window.matchMedia(`screen and (max-width: ${maxWidth}px)`);
	}

	public testQuery = () => {
		return this._query.matches;
	}

	public updateLastMatchValued = (matches: boolean) => {
		this.lastMatchValue = matches;
	}
};

/**
 * Handles logic for keeping track of media query breakpoints and updating redux store 
 * to reflect which breakpoints are true
 */
export class ResponsiveInternal {
	/* redux store instanced passed in to constructor */
	private store;

	/* All media queries */
	private queries: { [key in keyof ResponsiveState]: MediaQuery } = {
		max: new MediaQuery(1664),
		large: new MediaQuery(1200),
		medium: new MediaQuery(992),
		mobile: new MediaQuery(768),
		tiny: new MediaQuery(480),
		pico: new MediaQuery(350),
	}

	/* getters to quickly return a boolean value of whether the media query is valid */
	public get max() { return this.queries.max.testQuery() };
	public get large() { return this.queries.large.testQuery() };
	public get medium() { return this.queries.medium.testQuery() };
	public get mobile() { return this.queries.mobile.testQuery() };
	public get tiny() { return this.queries.tiny.testQuery() };
	public get pcio() { return this.queries.pico.testQuery() };

	constructor(store: ReduxStoreWithSlice<ResponsiveState>) {
		this.store = store;
	}

	/* Adds resize event listener to window to check media query responsiveness */
	private addMediaQueryListeners = () => {
		// make initial check on all queries
		this.checkMediaQueries();

		window.addEventListener("resize", this.checkMediaQueries)
	}

	/* Checks all media queries and dispatches any changed breakpoints to redux store */
	private checkMediaQueries = () => {
		let queryKey: keyof typeof this.queries;
		for (queryKey in this.queries) {
			const mq = this.queries[queryKey];

			const matches = mq.query.matches;

			// if boolean match value of query has changed, dispatch new value to redux state
			if (matches !== mq.lastMatchValue) {
				this.handleMediaQueryChange({ breakpoint: queryKey, matches });
				// update matches value on MediaQuery
				mq.updateLastMatchValued(matches);
			}
		}
	}

	/* Dispatches new media query match boolean value to redux state */
	private handleMediaQueryChange = ({ breakpoint, matches }: { breakpoint: keyof ResponsiveState, matches: boolean }) => {
		this.store.dispatch(breakpointHit({ breakpoint, matches }))
	}

	public startDataStoreListeners = () => {
		this.addMediaQueryListeners();
	}
}