import { createSlice } from '@reduxjs/toolkit';
import { queryTableland } from './queryTableland';
var loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        setLoading: function (state, action) {
            return action.payload;
        },
    },
    extraReducers: function (builder) {
        builder.addCase(queryTableland.pending, function (store, action) {
            return true;
        }),
            builder.addCase(queryTableland.fulfilled, function (store, action) {
                return false;
            }),
            builder.addCase(queryTableland.rejected, function (store, action) {
                return false;
            });
    }
});
export var setLoading = loadingSlice.actions.setLoading;
export default loadingSlice.reducer;
