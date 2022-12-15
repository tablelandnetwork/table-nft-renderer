import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../store/query';
import { queryTableland } from '../store/queryTableland';
function SuccessfulWrite(props) {
    var results = useSelector(function (store) { return store.results; });
    var dispatch = useDispatch();
    if (!results.table)
        return;
    return (React.createElement("div", { className: "successful-write" },
        "Transaction: ",
        results.hash,
        React.createElement("br", null),
        "Table: ",
        results.table,
        React.createElement("br", null),
        React.createElement("button", { onClick: function () {
                var query = "SELECT * FROM ".concat(results.table, " LIMIT 50;");
                dispatch(setQuery(query));
                dispatch(queryTableland({ query: query }));
            } }, "View table")));
}
export default SuccessfulWrite;
