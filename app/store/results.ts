import { createSlice } from '@reduxjs/toolkit'
import { queryTableland } from './queryTableland';
import store from './store';

const initialResults = {columns: [], rows: []};


const initialState = {
  columns: [], 
  rows: [],
  table: null,
  tx: null
}; 

const resultsSlice = createSlice({
  name: 'results',
  initialState, 
  reducers: {
    setResults (state, action) {
      return action.payload
    },
    resetResults(state, action) {
      return initialResults;
    },
  },
  extraReducers(builder) {
    builder.addCase(queryTableland.fulfilled, (state, action) => {  
      if(action.payload.results) {
        return action.payload.results;
      } 


    }),
    builder.addCase(queryTableland.pending, (state, action) => {
      return initialResults;

    });
    builder.addCase(queryTableland.rejected, (state, action) => {
      return initialResults;

    });
  }
});

export const { setResults } = resultsSlice.actions;
export default resultsSlice.reducer;
