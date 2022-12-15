import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '../store/toastsSlice';
function Toast(props) {
    var _a = props.toast, type = _a.type, message = _a.message, id = _a.id, active = _a.active;
    var _b = useState(false), activeStarted = _b[0], setActive = _b[1];
    var dispatch = useDispatch();
    useEffect(function () {
        setTimeout(function () {
            setActive(true);
        }, 50);
        setTimeout(function () {
            dispatch(removeToast({ id: id }));
        }, 8000);
    }, []);
    return (React.createElement("div", { className: "toast ".concat(type, " ").concat(active && activeStarted ? "active" : "") },
        message,
        React.createElement("span", { className: 'close-toast', onClick: function () {
                dispatch(removeToast({ id: id }));
            } },
            React.createElement("i", { className: "fa-solid fa-x" }))));
}
function Toasts(props) {
    var toasts = useSelector(function (store) { return store.toasts; });
    return (React.createElement("div", { className: 'toasts' }, toasts.map(function (toast) { return React.createElement(Toast, { toast: toast }); })));
}
export default Toasts;
