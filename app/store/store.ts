import { configureStore } from "@reduxjs/toolkit";
import results from "./results";
import error from "./error";
import loading from "./loading";
import message from "./message";
import tableName from "./table";
import typeOfQuery from "./type";
import query from "./query";
import toasts from "./toastsSlice";

export const store = configureStore({
  reducer: {
    toasts,
    results,
    query,
    error,
    loading,
    message,
    tableName,
    typeOfQuery,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
