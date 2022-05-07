export class BrowserUtils {
	/* Locks scroll by hiding overflow of <body> */
	public static LockScroll = () => {
		/* first set width of <body> to vw - scrollbar width (which is equal to it's current width)
		to prevent page content from shifting when the scrollbar is hidden*/
		const scrollbarWidth = window.innerWidth - document.body.clientWidth;
		document.body.style.width = `100vw - ${scrollbarWidth}px`;

		document.body.style.overflow = "hidden";
	}

	/* Unlocks scroll by un-hiding overflow of <body> */
	public static UnlockScroll = () => {
		// revert overfow and width styles
		document.body.style.width = "initial";
		document.body.style.overflow = "initial";
	}
}