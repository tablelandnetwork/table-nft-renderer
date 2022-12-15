import React from 'react';
import { setQuery } from '../store/query';
import CustomConnectButton from './CustomConnectButton';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import CodeHighlighter from './CodeHighlighter';
import { queryTableland } from '../store/queryTableland';
import { findType } from '../store/type';
import Logo from './Logo';
function CodeEditor(props) {
    var isConnected = useAccount().isConnected;
    var dispatch = useDispatch();
    var _a = useSelector(function (store) { return store; }), loading = _a.loading, query = _a.query, typeOfQuery = _a.typeOfQuery;
    return (React.createElement("div", { className: "editor-wrapper" },
        React.createElement(CodeHighlighter, { code: query, placeholder: "// SQL QUERY HERE", onChange: function (val) {
                dispatch(setQuery(val));
                dispatch(findType({ query: val }));
            } }),
        React.createElement("div", { className: 'footer' },
            React.createElement(Logo, null),
            (isConnected || typeOfQuery === "read") ? (React.createElement("button", { className: "secondary", disabled: loading, onClick: function (e) {
                    if (loading)
                        return;
                    dispatch(queryTableland({ query: query }));
                } }, typeOfQuery === "read" ? "Query" : "Write")) : (React.createElement(CustomConnectButton, null)))));
}
export default CodeEditor;
