import classNames from "classnames";
import React, { useEffect } from "react"
import { BrowserUtils } from "../../utils/BrowserUtils";
import styles from "./Modal.module.scss";

export type ModalInternalProps = {
	show?: boolean;
	hide: () => void;
	children?: React.ReactNode;
	transitionDuration: string;
	classes?: {
		wrapper?: string;
		pageOverlay?: string;
		modal?: string;
	}
}

export default function ModalInternal(props: ModalInternalProps) {
	const { hide, children, show, classes, transitionDuration } = props;

	useEffect(() => {
		if (show) {
			BrowserUtils.LockScroll();
		} else {
			BrowserUtils.UnlockScroll();
		}
	}, [show])

	const transitionStyle: React.CSSProperties = {
		transition: `opacity ${transitionDuration}, transform ${transitionDuration}`,
	}

	return (
		<div className={classNames(styles.outerWrapper, {[styles.show]: show }, classes?.wrapper)} style={transitionStyle}>
			<div className={classNames(styles.pageOverlay, classes?.pageOverlay)} onClick={hide}/>
			<div className={classNames(styles.modal, classes?.modal)} style={transitionStyle}>
				{children}
			</div>
		</div>
	)
}