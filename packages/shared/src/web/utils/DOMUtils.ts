/**
 * Utility class for programmatically manipulating the DOM when only abolutely necessary
 * if using React's synthetic element props doens't work for the given task
 */
export class DOMUtils {
	/**
	 * Programmatically sets the value for a given attribute on <html>
	 * @param attribute data attribute with out the 'data-' prefix
	 */
	public static setHTMLDataAttribute = (attribute: string, value: string) => {
		const htmlEle = document.querySelector("html");

		if (htmlEle?.dataset) {
			htmlEle.dataset[attribute] = value;
		}

		return !!htmlEle;
	}
}