import { configureStore } from '@reduxjs/toolkit'
import results from './results';
import error from './error';
import loading from './loading';
import message from './message';
import tableName from './table';
import typeOfQuery from './type';
import query from './query';

export const store = configureStore({
  reducer: {
    results,
    query,
    error,
    loading,
    message,
    tableName,
    typeOfQuery
  }
});

export type RootState = ReturnType<typeof store.getState>;


export default store;
