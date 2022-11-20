import React from 'react';

function Table(props) {

  return (
    <div className="table-wrapper">
      <table className="tabula-rasa">
        <thead>
          <tr>
            {props.results.columns.map(column => {
              return <th key={column.name}>{column.name}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {props.results.rows.map((row, rowKey) => {
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
