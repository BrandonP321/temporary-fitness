import React from "react"
import styles from "./LoadingSpinner.module.scss";
import { LoadingContainerInternal, LoadingContainerInternalProps } from "@tempfit/shared/src/web/components/LoadingContainer/LoadingContainer";

export const LoadingSpinner = function LoadingSpinner() {

  return (
    // TODO: add actual spinner styles when design is ready
    <div className={styles.spinner}/>
  )
}

interface LoadingSpinnerContainerProps extends Omit<LoadingContainerInternalProps, "spinner" | "fadeInOutDurationMs"> {

}

export const LoadingSpinnerContainer = (props: LoadingSpinnerContainerProps) => {
  const { ...rest } = props;

  return (
    <LoadingContainerInternal {...rest} spinner={<LoadingSpinner />} fadeInOutDurationMs={300} />
  )
}