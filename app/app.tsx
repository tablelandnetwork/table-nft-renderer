import React, { useEffect } from 'react';
import reactDom from 'react-dom/client';
import { useSearchParams } from 'react-router-dom';
import { useProvider, useSigner} from 'wagmi';
import init from "@tableland/sqlparser";
import {  useDispatch, useSelector } from 'react-redux';

import { startTableLand } from './hooks/useTableland';

import CodeEditor from './components/CodeEditor';
import Loading from './components/Loading';
import Header from './components/Header';
import ProvidersComponent from './components/Providers';
import Table from './components/Table';
import { RootState } from './store/store';

import Error from './components/Error';
import { queryTableland } from './store/queryTableland';
import SuccessfulWrite from './components/SuccessfulWrite';

init();

let i = 0;

function App() {

  const {
    loading,
    message
  } = useSelector((store: RootState) => store);


  let [searchParams] = useSearchParams();
  const chain = searchParams.get("chain");
  const tableId = searchParams.get("id");

  const dispatch = useDispatch();

  const prov = useProvider();
  const signer = useSigner();

  startTableLand(prov, signer.data);

  useEffect(() => {
    if(chain && tableId) {
      fetch(`https://testnet.tableland.network/chain/${chain}/tables/${tableId}`)
        .then(r => r.json())
        .then(r => {
          dispatch(queryTableland({query: `SELECT * FROM ${r.name} LIMIT 50;`}) as any);
        });
    } 
  }, []);


  return (
    <div className={`application-wrapper ${loading ? "loading" : ""}`}>
      <Header />
      <div>
        <Error />
        <Table />
        <SuccessfulWrite />
      </div>
      <CodeEditor />
      <Loading />
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
