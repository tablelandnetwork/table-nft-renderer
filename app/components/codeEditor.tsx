import React from 'react';
import { setQuery } from '../store/query';
import CustomConnectButton from './CustomConnectButton';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount} from 'wagmi';
import CodeHighlighter from './CodeHighlighter';
import { queryTableland } from '../store/queryTableland';


function CodeEditor(props) {

  const { isConnected } = useAccount();

  const dispatch = useDispatch();
  const {
    loading,
    query,
    typeOfQuery
  } = useSelector((store: RootState) => store);

  return (
    <div className="editor-wrapper">        
      <CodeHighlighter code={query} placeholder="// SQL QUERY HERE" onChange={(val) => {
        dispatch(setQuery(val));
      }} />
      {(isConnected || typeOfQuery==="read") ? (
      <button className="secondary" disabled={loading} onClick={e => {
        if(loading) return;
        dispatch(queryTableland({query}) as any);
      }}>
        {typeOfQuery==="read" ? "Query" : "Write"}
      </button>
      ) : (
        <CustomConnectButton />
      )}

    </div>
  );
}

export default CodeEditor;
