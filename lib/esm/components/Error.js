import React from 'react';
import { useSelector } from 'react-redux';
import inIframe from '../lib/inIframe';
function Error(props) {
    var _a = useSelector(function (store) { return store; }), error = _a.error, typeOfQuery = _a.typeOfQuery;
    if (typeOfQuery === "write" && inIframe()) {
        return React.createElement("div", { className: 'message' }, "To modify a table, please visit https://console.tableland.xyz");
    }
    if (!error)
        return null;
    return (React.createElement("div", { className: "error" }, "".concat(error)));
}
export default Error;
