import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTablelandConnection, tablelandConnection } from '../hooks/useTableland';

export const queryTableland = createAsyncThunk('results/fetchResults', async (action:any) => {
  const { query } = action;
  let results;
  let error = null;


  const tbl = getTablelandConnection();


  
  try {
    let { type, table } = await sqlparser.normalize(query);
    results = type === "read" ? await tbl.read(query) : await tbl.write(query);
    results.table = table;
  } catch (e) {
    error = `${e}`;
    results = {};
  }
  
  return { 
    results,
    error,
  };
});
