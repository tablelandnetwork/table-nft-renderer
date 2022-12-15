import { createSlice } from '@reduxjs/toolkit';
var querySlice = createSlice({
    name: 'query',
    initialState: '',
    reducers: {
        setQuery: function (state, action) {
            return action.payload;
        },
    }
});
export var setQuery = querySlice.actions.setQuery;
export default querySlice.reducer;
