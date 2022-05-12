import classNames from "classnames";
import React, { useEffect } from "react";
import { BrowserUtils } from "../../utils/BrowserUtils";
import styles from "./LoadingContainer.module.scss";

export type LoadingContainerInternalProps = {
	loading: boolean;
	spinner: JSX.Element;
	fadeInOutDurationMs: number;
}

/* Loading spinner to be displayed on top of all other content of page */
export const LoadingContainerInternal = React.memo(function LoadingSpinnerContainer(props: LoadingContainerInternalProps) {
	const { loading, fadeInOutDurationMs, spinner: SpinnerEle } = props;

	useEffect(() => {
		if (loading) {
			lockScroll();
		} else {
			unlockScroll()
		}
	}, [loading]);

	// lock scroll the instant loading spinner is displayed
	const lockScroll = () => {
		BrowserUtils.LockScroll();
	}

	// unlock scroll as soon as the loading spinner has faded out
	const unlockScroll = () => {
		setTimeout(() => {
			BrowserUtils.UnlockScroll();
		}, fadeInOutDurationMs ?? 300)
	}

	/* Must ensure that loading duraiton is set to 0 to instantly dispay spinner as soon as user leaves one page */
	const currentAnimationDuration = loading ? 0 : fadeInOutDurationMs

	const spinnerContainerStyles: React.CSSProperties = {
		// set spinner fade in/out transition duration in seconds
		transition: `opacity ${currentAnimationDuration / 1000}s`
	}

	return (
		<div className={classNames(styles.spinnerContainer, { [styles.loading]: loading })} style={spinnerContainerStyles}>
			{SpinnerEle}
		</div>
	)
})