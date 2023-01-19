import React, 
{ useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProvider, useSigner } from 'wagmi';
import {  useDispatch, useSelector } from 'react-redux';

import { startTableLand } from '../lib/useTableland';

import CodeEditor from './CodeEditor';
import Loading from './Loading';
import ProvidersComponent from './Providers';
import Table from './Table';
import { RootState } from '../store/store';

import Error from '../components/Error';
import { queryTableland } from '../store/queryTableland';
import SuccessfulWrite from '../components/SuccessfulWrite';
import { setQuery } from '../store/query';
import Toasts from '../components/Toasts';


let i = 0;

function App() {


  const {
    loading,
    message
  } = useSelector((store: RootState) => store);


  let [searchParams] = useSearchParams();
  const chain = searchParams.get("chain");
  const tableId = searchParams.get("id");
  const query = searchParams.get("query");

  const dispatch = useDispatch();

  const prov = useProvider();
  const signer = useSigner();

  startTableLand(prov, signer.data);

  useEffect(() => {
    if(query) {
      var finalQuery = query;
      dispatch(queryTableland({query: finalQuery}) as any);
      dispatch(setQuery(finalQuery));
    } else if(chain && tableId) {
      fetch(`https://testnet.tableland.network/chain/${chain}/tables/${tableId}`)
        .then(r => r.json())
        .then(r => {
          var finalQuery = query ? query : `SELECT * FROM ${r.name} LIMIT 50;`;
          dispatch(queryTableland({query: finalQuery}) as any);
          dispatch(setQuery(finalQuery));
        });
    } 
  }, []);


  return (
    <div className={`application-wrapper ${loading ? "loading" : ""}`}>
      <div>
        <Error />
        <Table />
        <SuccessfulWrite />
      </div>
      <CodeEditor />
      <Loading />
      <Toasts />
    </div>
  );
}


function Renderer(props) {

  return (
    <ProvidersComponent>
      <App />
    </ProvidersComponent>   
  );
}
export default Renderer;
