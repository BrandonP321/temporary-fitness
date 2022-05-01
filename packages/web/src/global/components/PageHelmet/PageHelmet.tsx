import React from "react";
import { PageHelmetTemplateProps, PageHelmetTemplate, PageHelmetPropsWithoutDefaults } from "@tempfit/shared/src/web/components/PageHelmet/PageHelmet";

type PageHelmetProps = PageHelmetPropsWithoutDefaults & {
}

export default React.memo(function PageHelmet(props: PageHelmetProps) {
	// TODO: update default values
	const helmetDefaults: PageHelmetTemplateProps["defaultValues"] = {
		title: "Temporary Fitness",
		description: "",
		image: "",
		keywords: "default, keywords"
	}

	return (
		<PageHelmetTemplate {...props} defaultValues={helmetDefaults}/>
	)
})