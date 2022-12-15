import { configureStore } from '@reduxjs/toolkit';
import results from './results';
import error from './error';
import loading from './loading';
import message from './message';
import tableName from './table';
import typeOfQuery from './type';
import query from './query';
import toasts from './toastsSlice';
export var store = configureStore({
    reducer: {
        toasts: toasts,
        results: results,
        query: query,
        error: error,
        loading: loading,
        message: message,
        tableName: tableName,
        typeOfQuery: typeOfQuery
    }
});
export default store;
