export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    toasts: never[];
    results: any;
    query: string;
    error: any;
    loading: any;
    message: string;
    tableName: string;
    typeOfQuery: any;
}, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<{
    toasts: never[];
    results: any;
    query: string;
    error: any;
    loading: any;
    message: string;
    tableName: string;
    typeOfQuery: any;
}, import("redux").AnyAction, undefined>]>;
export declare type RootState = ReturnType<typeof store.getState>;
export default store;
