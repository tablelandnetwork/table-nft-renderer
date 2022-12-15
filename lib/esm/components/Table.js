import React from 'react';
import { useSelector } from 'react-redux';
function Table() {
    var results = useSelector(function (store) { return store.results; });
    if (!results.columns)
        return null;
    return (React.createElement("div", { className: "table-wrapper" },
        React.createElement("table", { className: "tabula-rasa" },
            React.createElement("thead", null,
                React.createElement("tr", null, results.columns.map(function (column) {
                    return React.createElement("th", { key: column.name }, column.name);
                }))),
            React.createElement("tbody", null, results.rows.map(function (row, rowKey) {
                return (React.createElement("tr", { key: rowKey }, row.map(function (cell, cellKey) {
                    var finalCell = typeof cell === 'object' ? JSON.stringify(cell) : cell;
                    return (React.createElement("td", { key: cellKey }, finalCell));
                })));
            })))));
}
export default Table;
