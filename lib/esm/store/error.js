import { createSlice } from '@reduxjs/toolkit';
import { queryTableland } from './queryTableland';
var errorSlice = createSlice({
    name: 'error',
    initialState: '',
    reducers: {
        setError: function (state, action) {
            return action.payload;
        },
    },
    extraReducers: function (builder) {
        builder.addCase(queryTableland.fulfilled, function (state, action) {
            return action.payload.error;
        }),
            builder.addCase(queryTableland.rejected, function (state, action) {
                console.log(action.payload);
            });
    }
});
export var setError = errorSlice.actions.setError;
export default errorSlice.reducer;
