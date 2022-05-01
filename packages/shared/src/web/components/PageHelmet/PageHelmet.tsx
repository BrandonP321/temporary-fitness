import React from "react";
import { Helmet } from "react-helmet-async";

export type PageHelmetTemplateProps = {
	title?: string;
	image?: string;
	description?: string;
	keywords?: string;
	defaultValues: PageHelmetPropsWithoutDefaults;
}

/* Returns array of keywords as a comma separated string */
export const joinKeywordsArray = (keywords: (string | undefined)[]) => {
	return keywords?.filter(kw => !!kw)?.join(", ") ?? "";
}

export type PageHelmetPropsWithoutDefaults = Omit<PageHelmetTemplateProps, "defaultValues">;

/* Template page helmet designed to exist within another <PageHelmet> 
component in each workspace with custom default values */
export const PageHelmetTemplate = React.memo(function PageHelmetTemplate(props: PageHelmetTemplateProps) {
	const {
		title, image, description, keywords, defaultValues
	} = props;

	// override any default values provided through props
	const currentValues: PageHelmetPropsWithoutDefaults = {
		title: title ?? defaultValues?.title,
		description: description ?? defaultValues?.description,
		image: image ?? defaultValues?.image,
		keywords: joinKeywordsArray([defaultValues?.keywords, keywords]),
	}

	return (
		<Helmet>
			{/* SEO */}
			<title>{currentValues.title}</title>
            <meta name={"description"} content={currentValues.description}/>
			<meta name={"keywords"} content={currentValues.keywords}/>

			{/* SOCIAL MEDIA */}
			<meta property={"og:title"} content={currentValues.title}/>
            <meta property={"og:description"} content={currentValues.image}/>
            <meta property={"og:image"} content={currentValues.description}/>
			{/* // TODO: update these social meta values */}
			{/* <meta property={"og:site_name"} content={}/> */}
            {/* <meta property={"twitter:image:alt"} content={imageAlt || defaultMeta.imageAlt}/> */}
            {/* <meta property={"fb:app_id"} content={}/> */}
            {/* <meta property={"twitter:site"} content={}/> */}

			{/* HTML */}
		</Helmet>
	)
})
