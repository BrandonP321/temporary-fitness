import classNames from "classnames";
import React, { useEffect, useState } from "react"
import styles from "./LazyLoadedImg.module.scss";
import { ImageUtils } from "@tempfit/shared/src/web/utils/ImageUtils"

type LazyLoadedImgProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
	/* Regular resolution image */
	image: string;
	/* Low res image to load until regular image has rendered */
	lowResImg: string;
	/* Optional eager load if image needs to be rendered quickly, such as an 'above-the-fold' image */
	eagerLoadImage?: boolean;
	classes?: {
		wrapper?: string;
		img?: string;
	}
}

/**
 * Renders blurred, low res image until full res image has rendered.
 * Important to note that image is wrapped in a div for styling purposes
 */
export const LazyLoadedImg = function (props: LazyLoadedImgProps) {
	const { image, lowResImg, classes, eagerLoadImage, ...rest } = props;

	const [isFullResLoaded, setIsFullResLoaded] = useState(false);

	const handleFullResImgLoaded = () => {
		setIsFullResLoaded(true);
	}

	const imgLoading = eagerLoadImage ? "eager" : "lazy";

	return (
		<div className={classNames(styles.imgWrapper, {[styles.blur]: !isFullResLoaded})}>
			<img {...rest} loading={imgLoading} src={lowResImg} className={classNames(styles.lowResImg, classes?.img)}/>
			<img {...rest} loading={imgLoading} src={image} className={classNames(styles.fullResImg, classes?.img)} onLoad={handleFullResImgLoaded}/>
			<div className={styles.blurOverlay}/>
		</div>
	)
}

type LazyLoadedDivBgProps = {
	image: string;
	lowResImg?: string;
	children?: React.ReactNode;
	classes?: {
		root?: string;
	}
}

/**
 * Renders a div with a low res background image, which has a full res image that loads directly on top of it's background image.
 * Allowing the low resolution image (<20kb) to render extremely quickly while the large image lazy loads to the page
 * @param props 
 * @returns 
 */
export const LazyLoadedDivBg = (props: LazyLoadedDivBgProps) => {
	const { image, lowResImg, children, classes } = props;

	useEffect(() => {
		// preLoadFullImg();
	}, [])

	return (
		<div className={classNames(styles.bgDiv, classes?.root)} style={{ backgroundImage: ImageUtils.getBgImageUrl(lowResImg) }}>
			{/* Have full res image load directly on top of low res image */}
			<div className={classNames(styles.bgDivFullImg, classes?.root)} style={{ backgroundImage: ImageUtils.getBgImageUrl(image) }}/>
			<div className={styles.childrenWrapper}>
				{children};
			</div>
		</div>
	)
}