import { TBlokWithoutDefaultProps } from "@tempfit/shared/src/utils/StoryBlokFetcher";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { StoryBlokHomePage } from "~StoryBlokTypes";
import { RouteDefs } from "~Navigation/RouteDefs";
import { StoryBlokFetcher } from "~Utils";
import { LoadingSpinnerContainer } from "~UIComponents/LoadingSpinner/LoadingSpinner";

const Pages = RouteDefs.Areas.AreaOne.pages

export default function AreaOne() {

	return (
		<Routes>
			<Route path={Pages.PageOne.partialPath} element={<PageOne/>}/>
			<Route path={Pages.PageTwo.partialPath} element={<h1/>}/>
		</Routes>
	)
}

const PageOne = () => {
	const [data, setData] = useState<TBlokWithoutDefaultProps<StoryBlokHomePage> | null>(null);

	useEffect(() => {
		StoryBlokFetcher.fetchContent<StoryBlokHomePage>("home_page_slug").then(setData);
	}, [])

	const {
		Title
	} = data ?? {}

	return (
		<LoadingSpinnerContainer loading={!data}>
			<h1 style={{ fontSize: "5rem", textAlign: "center" }}>{Title}</h1>
		</LoadingSpinnerContainer>
	)
}