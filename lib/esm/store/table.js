import { createSlice } from '@reduxjs/toolkit';
var tableSlice = createSlice({
    name: 'tableName',
    initialState: '',
    reducers: {
        setTableName: function (state, action) {
            return action.payload;
        },
    }
});
export var setTableName = tableSlice.actions.setTableName;
export default tableSlice.reducer;
