import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeToast } from "../store/toastsSlice";

function Toast(props) {
  const { type, message, id, active } = props.toast;
  const [activeStarted, setActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
    setTimeout(() => {
      dispatch(removeToast({ id }));
    }, 8000);
  }, []);

  return (
    <div className={`toast ${type} ${active && activeStarted ? "active" : ""}`}>
      {message}

      <span
        className="close-toast"
        onClick={() => {
          dispatch(removeToast({ id }));
        }}
      >
        <i className="fa-solid fa-x"></i>
      </span>
    </div>
  );
}

function Toasts(props) {
  const toasts = useSelector((store: RootState) => store.toasts);

  return (
    <div className="toasts">
      {toasts.map((toast) => (
        <Toast toast={toast} />
      ))}
    </div>
  );
}
export default Toasts;
