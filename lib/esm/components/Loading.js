import React from 'react';
import { useSelector } from 'react-redux';
function Loading(props) {
    var loading = useSelector(function (store) { return store.loading; });
    if (!loading)
        return null;
    return (React.createElement("div", { className: "lds-dual-ring" }));
}
export default Loading;
