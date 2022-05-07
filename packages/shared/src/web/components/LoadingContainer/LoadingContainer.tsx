import classNames from "classnames";
import React, { useEffect } from "react";
import { BrowserUtils } from "../../utils/BrowserUtils";
import styles from "./LoadingContainer.module.scss";

export type LoadingContainerInternalProps = {
	loading: boolean;
	spinner: JSX.Element;
	fadeInOutDurationMs: number;
	children?: React.ReactNode;
  }
  

/* Container to wrap around content of page, passed in as children, to display a loading spinner */
export const LoadingContainerInternal = React.memo(function LoadingSpinnerContainer(props: LoadingContainerInternalProps) {
	const { loading, children, fadeInOutDurationMs, spinner: SpinnerEle } = props;
  
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

	const spinnerContainerStyles: React.CSSProperties = {
		// set spinner fade in/out transition duration in seconds
		transition: `opacity ${fadeInOutDurationMs / 1000}s`
	}
	
	return (
	  <div className={classNames(styles.contentContainer, {[styles.loading]: loading})}>
		<div className={styles.spinnerContainer} style={spinnerContainerStyles}>
		  {SpinnerEle}
		</div>
		{children}
	  </div>
	)
  })