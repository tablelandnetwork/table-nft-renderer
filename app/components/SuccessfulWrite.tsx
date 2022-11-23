import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../store/query';
import { queryTableland } from '../store/queryTableland';
import { RootState } from '../store/store';


function SuccessfulWrite(props) {
  
  const results = useSelector((store: RootState) => store.results);
  const dispatch = useDispatch();

  if(!results.table) return;

  return (
    <div className="successful-write">
      Transaction: {results.hash}
      <br />
      Table: {results.table}
      <br />
      <button onClick={() => {
        const query = `SELECT * FROM ${results.table} LIMIT 50;`;
        dispatch(setQuery(query));
        dispatch(queryTableland({query}) as any);
      }}>
        View table
      </button>
    </div>
  );
}
export default SuccessfulWrite;
