import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function Table() {

  const results = useSelector((store: RootState) => store.results);

  if(!results.columns) return null;

  return (
    <div className="table-wrapper">
      <table className="tabula-rasa">
        <thead>
          <tr>
            {results.columns.map(column => {
              return <th key={column.name}>{column.name}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {results.rows.map((row, rowKey) => {
            return (
              <tr key={rowKey}>
                {row.map((cell, cellKey) => {
                  return (
                    <td key={cellKey}>
                      {cell}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
