import { TBlokWithoutDefaultProps } from "@tempfit/shared/src/utils/StoryBlokFetcher";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { StoryBlokHomePage } from "~StoryBlokTypes";
import { RouteDefs } from "~Navigation/RouteDefs";
import { StoryBlokFetcher } from "~Utils";
import { useAppDispatch } from "~ReduxHooks";
import { hideLoadingSpinner, showLoadingSpinner } from "~ReduxSlices/PageLoadingSlice/pageLoadingSlice";
import { Link } from "react-router-dom";
import Modal from "~UIComponents/Modal/Modal";

const Pages = RouteDefs.Areas.AreaOne.pages

export default function AreaOne() {

	return (
		<Routes>
			<Route path={Pages.PageOne.partialPath} element={<PageOne/>}/>
			<Route path={Pages.PageTwo.partialPath} element={<PageTwo/>}/>
		</Routes>
	)
}

const PageOne = () => {
	const dispatch = useAppDispatch();
	const [data, setData] = useState<TBlokWithoutDefaultProps<StoryBlokHomePage> | null>(null);

	useEffect(() => {
		dispatch(showLoadingSpinner());
		StoryBlokFetcher.fetchContent<StoryBlokHomePage>("home_page_slug")
			.then(res => {
				setData(res);
				dispatch(hideLoadingSpinner());
			});
	}, [])

	const {
		Title
	} = data ?? {}

	return (
		<div>
			<h1 style={{ fontSize: "5rem", textAlign: "center" }}>{Title}</h1>
			<Link to={"/AreaOneX/PageTwoY"}>Go To Page Two</Link>
		</div>
	)
}

const tempText = Array(30).fill("Page Two").join(" ");

const PageTwo = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<h1 style={{ fontSize: "5rem", textAlign: "center" }}>Page Two</h1>
			<h1 style={{ fontSize: "5rem", textAlign: "center" }}>{tempText}</h1>
			<button onClick={() => setShowModal(true)}>show modal</button>
			<Link to={"/AreaOneX/PageOneX"}>Go To Page One</Link>
			<Modal hide={() => setShowModal(false)} show={showModal}>
				<div style={{

				}}>
					<h1 style={{ fontSize: "5rem", textAlign: "center" }}>My Modal</h1>
				</div>
			</Modal>
		</div>
	)
}