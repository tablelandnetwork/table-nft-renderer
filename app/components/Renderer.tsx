import React, 
{ useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
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
import chains from '../../lib/chains.js';
import { Validator } from '@tableland/sdk';

function App() {
  const {
    loading,
  } = useSelector((store: RootState) => store);  

  let [searchParams] = useSearchParams();
  const chain = searchParams.get("chain");
  const tableId = searchParams.get("id");
  const query = searchParams.get("query");
  const dispatch = useDispatch();

  useEffect(() => {
    if(query) {
      var finalQuery = query;
      dispatch(queryTableland({query: finalQuery}) as any);
      dispatch(setQuery(finalQuery));
    } else if(chain && tableId) {
      const network = chains[parseInt(chain)].mainnet ? "" : "testnets.";
      const validator = new Validator({baseUrl: `https://${network}tableland.network/api/v1`});
      validator.getTableById({ chainId: parseInt(chain), tableId: tableId })
        .then(r => {
          if(r.name===undefined) return;
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
