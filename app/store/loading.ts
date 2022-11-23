import { createSlice } from '@reduxjs/toolkit'
import { queryTableland } from './queryTableland';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false, 
  reducers: {
    setLoading (state, action) {
      return action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(queryTableland.pending, (store, action) => { 
      return true;
     }),
    builder.addCase(queryTableland.fulfilled, (store, action) => { 
     return false;
    }),
    builder.addCase(queryTableland.rejected, (store, action) => { 
      return false;
    })
  }
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
