import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ImageUtils } from "../../utils/ImageUtils";
import styles from "./ParallaxWrapper.module.scss";

type ParallaxWrapperProps = {
	/* speed at which element should parallax relative 
	to window scroll speed (1 = same as page scroll speed) */
	parallaxFactor: number;
	img: string;
	/* if true, removes parallax event listener */
	isStatic?: boolean;
	classes?: {
		wrapper?: string;
		img?: string;
	};
	/* Point at which the top of the img is exactly at the top of it's wrapper.
	(e.g. 0 = top of screen; 0 = bottom of screen) */
	relativeOriginPoint?: number;
}

/**
 * Applies parallax effect to an image
 * @param props 
 * @returns 
 */
export default function ParallaxWrapper(props: ParallaxWrapperProps) {
	const { parallaxFactor, classes, img, isStatic, relativeOriginPoint } = props;

	const wrapperRef = useRef<null | HTMLDivElement>(null);
	const imgRef = useRef<null | HTMLDivElement>(null);

	const [imgTransform, setImgTransform] = useState<string | undefined>(undefined);

	useEffect(() => {
		// make sure event listener is removed on unmount
		return removeScrollListener;
	}, [])

	useEffect(() => {
		if (isStatic) {
			removeScrollListener();
			setImgTransform(undefined);
		} else {
			updateParallaxTransform();
			addScrollListener();
		}
	}, [isStatic])

	const addScrollListener = () => {
		document.addEventListener("scroll", handleScroll)
	}

	const removeScrollListener = () => {
		document.removeEventListener("scroll", handleScroll);
	}

	const handleScroll = useCallback(() => {
		requestAnimationFrame(updateParallaxTransform)
	}, [])

	const updateParallaxTransform = () => {
		/* px y position on the screen at which the top of the image is at the top of it's wrapper */
		const parallaxStartPoint = window.innerHeight * (relativeOriginPoint ?? 0);

		const wrapperRect = wrapperRef.current?.getBoundingClientRect();
		const wrapperTopDistFromStartPoint = (wrapperRect?.top ?? 0) - parallaxStartPoint;

		const modifiedParallaxAmnt = wrapperTopDistFromStartPoint * parallaxFactor * -1;
		const parallaxTranslation = `translateY(${modifiedParallaxAmnt}px)`;

		setImgTransform(parallaxTranslation);
	}

	return (
		<div className={classNames(styles.parallaxWrapper, classes?.wrapper)} ref={wrapperRef}>
			<div 
				ref={imgRef} 
				className={classNames(styles.img, classes?.img)} 
				style={{ 
					backgroundImage: ImageUtils.getBgImageUrl(img),
					transform: imgTransform
				}}
			/>
		</div>
  )
}