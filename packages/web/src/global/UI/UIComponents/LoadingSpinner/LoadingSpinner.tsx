import React from "react"
import styles from "./LoadingSpinner.module.scss";
import { LoadingContainerInternal, LoadingContainerInternalProps } from "@tempfit/shared/src/web/components/LoadingContainer/LoadingContainer";
import { useAppSelector } from "~ReduxHooks";

export const LoadingSpinner = function LoadingSpinner() {

  return (
    // TODO: add actual spinner styles when design is ready
    <div className={styles.spinner}/>
  )
}

interface LoadingSpinnerContainerProps extends Omit<LoadingContainerInternalProps, "spinner" | "fadeInOutDurationMs" | "loading"> {

}

/* Uses redux state to show/hide loading spinner */
export const LoadingSpinnerContainer = (props: LoadingSpinnerContainerProps) => {
  const { loading } = useAppSelector(state => state.pageLoading);

  const { ...rest } = props;

  return (
    <LoadingContainerInternal {...rest} spinner={<LoadingSpinner />} fadeInOutDurationMs={200} loading={loading}/>
  )
}