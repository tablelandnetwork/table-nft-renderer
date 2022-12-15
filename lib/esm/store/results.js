import { createSlice } from '@reduxjs/toolkit';
import { queryTableland } from './queryTableland';
var initialResults = { columns: [], rows: [] };
var initialState = {
    columns: [],
    rows: [],
    table: null,
    tx: null
};
var resultsSlice = createSlice({
    name: 'results',
    initialState: initialState,
    reducers: {
        setResults: function (state, action) {
            return action.payload;
        },
        resetResults: function (state, action) {
            return initialResults;
        },
    },
    extraReducers: function (builder) {
        builder.addCase(queryTableland.fulfilled, function (state, action) {
            if (action.payload.results) {
                return action.payload.results;
            }
        }),
            builder.addCase(queryTableland.pending, function (state, action) {
                return initialResults;
            });
        builder.addCase(queryTableland.rejected, function (state, action) {
            return initialResults;
        });
    }
});
export var setResults = resultsSlice.actions.setResults;
export default resultsSlice.reducer;
