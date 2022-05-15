import React from "react"
import styles from "./Modal.module.scss";
import ModalInternal, { ModalInternalProps } from "@tempfit/shared/src/web/components/Modal/Modal";

type ModalProps = Omit<ModalInternalProps, "transitionDuration"> & {

}

export default function Modal(props: ModalProps) {
	const { children, ...rest } = props;

	return (
		<ModalInternal 
			{...rest} 
			classes={{
				modal: styles.modal,
				pageOverlay: styles.pageOverlay,
				wrapper: styles.outerWrapper
			}}
			transitionDuration={"0.2s"}
		>
			{/* // TODO: Update default modal UI */}
			<span onClick={props.hide} style={{ position: "absolute", top: "1rem", right: "1rem" }}>X</span>
			{children}
		</ModalInternal>
	)
}