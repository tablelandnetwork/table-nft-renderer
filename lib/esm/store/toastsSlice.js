var _a;
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
var toastsSlice = createSlice({
    name: 'toasts',
    initialState: [],
    reducers: {
        activateToast: function (state, action) {
            action.payload.id = uuidv4();
            action.payload.active = true;
            state.push(action.payload);
        },
        removeToast: function (state, action) {
            var i = state.findIndex(function (item) { return item.id === action.payload.id; });
            state[i].active = false;
        }
    }
});
export var activateToast = (_a = toastsSlice.actions, _a.activateToast), removeToast = _a.removeToast;
export default toastsSlice.reducer;
