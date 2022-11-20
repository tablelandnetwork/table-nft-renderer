import React, { useState, useEffect } from 'react';
import { connect } from '@tableland/sdk';
import CodeEditor from './components/codeEditor';
import reactDom from 'react-dom/client';
import { useSearchParams } from 'react-router-dom';
import Loading from './Loading';
import Header from './components/Header';
import ProvidersComponent from './components/Providers';
import Table from './components/Table';
import { useProvider, useAccount } from 'wagmi';
import CustomConnectButton from './components/CustomConnectButton';

const tbl = connect({
  chain: "polygon"
});

import init from "@tableland/sqlparser";
import { getTablelandConnection, startTableLand } from './hooks/useTableland';
init();

let i = 0;


function App(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [initQuery, setInitQuery] = useState(true);
  const chain = searchParams.get("chain");
  const tableId = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [sendQuery, setSendQuery] = useState(true);
  const [results, setResults ] = useState({columns: [], rows: []});
  const [type, setType] = useState("read");
  const { isConnected } = useAccount(); 
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function updateCode() {
    let type;
    try {
      type = (await sqlparser.normalize(code)).type;
    } catch(e) {
      type = "read";
    }
    setType(type);
  }

  const prov = useProvider();

  startTableLand(prov);
  

  useEffect(() => {

    async function queryTableland(query) {
      const tbl = getTablelandConnection();
      let type;
      try {
        type = (await sqlparser.normalize(query)).type;
      } catch(e) {
        type = "read";
      }

      if(i===1) return;
      if(type==='read') {
        tbl.read(query).then(r => {
          setCode(query);
          setResults(r);
          setLoading(false);
          setMessage("");
        }).catch(e => {
          setError(e);
          setResults({columns: [], rows: []});
        }).finally(() => {
          setLoading(false);
          i = 0;
          setMessage("");         
        });

      } else {
        i = 1;
        tbl.write(query).then(r => {
          setCode(query);
          setMessage(`Query successfully sent to network:${query}`);
        }).catch(e => {
          setError(e);
          setMessage("");
        }).finally(() => {
          setLoading(false);
          setResults({columns: [], rows: []});
          i = 0;
        });
      }
      setType(type);
    
      setLoading(true);

    }

    if(sendQuery) {
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
      setSendQuery(false);
      


    }
  });

  return (
    <div className="application-wrapper">
      <Header />
      <div>
        {error && <div className="error">{`${error}`}</div>}
        {message}
        <Table results={results} />
      </div>

      <div className="editor-wrapper">
        
        <div className="code-editor-wrapper">
          <CodeEditor code={code} placeholder="// SQL QUERY HERE" onChange={(val) => {
            setCode(val);
            updateCode();
          }} />
        </div>
        {(isConnected || type==="read") ? (
        <button className="secondary" disabled={loading} onClick={e => {
          if(loading) return;
          setSendQuery(true);
        }}>
          {type==="read" ? "Query" : "Write"}
        </button>
        ) : (
          <CustomConnectButton />
        )}

        {loading ? <Loading /> : ""}
      </div>


    </div>
  );
}



document.addEventListener("DOMContentLoaded", () => {
  reactDom
    .createRoot(document.getElementById("app"))
    .render(
      (
        <ProvidersComponent>
          <App />
        </ProvidersComponent>
      )
    );
});
