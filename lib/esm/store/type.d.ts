export declare const findType: import("@reduxjs/toolkit").AsyncThunk<"read" | "write" | "create" | "acl", any, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setType: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "type/setType">;
declare const _default: import("redux").Reducer<any, import("redux").AnyAction>;
export default _default;
