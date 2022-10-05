import React, { useState, useEffect } from 'react';
import { connect } from '@tableland/sdk';
import CodeEditor from './codeEditor';
import reactDom from 'react-dom/client';
import { BrowserRouter, useSearchParams } from 'react-router-dom';

const tbl = connect({

});

function Table(props) {



  return (
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
  )
}

function App(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [initQuery, setInitQuery] = useState(true);
  const chain = searchParams.get("chain");
  const tableId = searchParams.get("id");

  

  const [code, setCode] = useState("");
  const [sendQuery, setSendQuery] = useState(true);
  const [results, setResults ] = useState({columns: [], rows: []});

  useEffect(() => {
    function queryTableland(query) {
      tbl.read(query).then(r => {
        setCode(query);
        setResults(r);
      });
    }

    if(sendQuery) {
      setSendQuery(false);
      if(initQuery) {
        setInitQuery(false);
        fetch(`https://testnet.tableland.network/chain/${chain}/tables/${tableId}`)
          .then(r => r.json())
          .then(r => {
            queryTableland(`SELECT * FROM ${r.name} LIMIT 50;`);
          });
      } else {
        queryTableland(code);
      }
      


    }
  });

  return (
    <>
      <div className="editor-wrapper"  >
        <CodeEditor code={code} onChange={(val) => {
          setCode(val);
        }} />
        <button onClick={e => {
          setSendQuery(true);
        }}>
          Query
        </button>
      </div>
      <Table results={results} />

    </>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  reactDom
    .createRoot(document.getElementById("app"))
    .render(
      (
      <BrowserRouter>
        <App />
      </BrowserRouter>
      )
    );
});
