import { createSlice } from '@reduxjs/toolkit';
var messageSlice = createSlice({
    name: 'message',
    initialState: '',
    reducers: {
        setMessage: function (state, action) {
            return action.payload;
        },
    }
});
export var setMessage = messageSlice.actions.setMessage;
export default messageSlice.reducer;
