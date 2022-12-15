import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProvider, useSigner } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { startTableLand } from '../lib/useTableland';
import CodeEditor from './CodeEditor';
import Loading from './Loading';
import ProvidersComponent from './Providers';
import Table from './Table';
import Error from '../components/Error';
import { queryTableland } from '../store/queryTableland';
import SuccessfulWrite from '../components/SuccessfulWrite';
import { setQuery } from '../store/query';
import Toasts from '../components/Toasts';
var i = 0;
function App() {
    var _a = useSelector(function (store) { return store; }), loading = _a.loading, message = _a.message;
    var searchParams = useSearchParams()[0];
    var chain = searchParams.get("chain");
    var tableId = searchParams.get("id");
    var query = searchParams.get("query");
    var dispatch = useDispatch();
    var prov = useProvider();
    var signer = useSigner();
    startTableLand(prov, signer.data);
    useEffect(function () {
        if (chain && tableId) {
            fetch("https://testnet.tableland.network/chain/".concat(chain, "/tables/").concat(tableId))
                .then(function (r) { return r.json(); })
                .then(function (r) {
                var finalQuery = query ? query : "SELECT * FROM ".concat(r.name, " LIMIT 50;");
                dispatch(queryTableland({ query: finalQuery }));
                dispatch(setQuery(finalQuery));
            });
        }
    }, []);
    return (React.createElement("div", { className: "application-wrapper ".concat(loading ? "loading" : "") },
        React.createElement("div", null,
            React.createElement(Error, null),
            React.createElement(Table, null),
            React.createElement(SuccessfulWrite, null)),
        React.createElement(CodeEditor, null),
        React.createElement(Loading, null),
        React.createElement(Toasts, null)));
}
function Renderer(props) {
    return (React.createElement(ProvidersComponent, null,
        React.createElement(App, null)));
}
export default Renderer;
