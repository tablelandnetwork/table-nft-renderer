import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function Loading(props) {
  const loading = useSelector((store: RootState) => store.loading);

  if (!loading) return null;

  return <div className="lds-dual-ring"></div>;
}
export default Loading;
