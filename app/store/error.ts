import { createSlice } from "@reduxjs/toolkit";
import { queryTableland } from "./queryTableland";

const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    setError(state, action) {
      return action.payload;
    },
  },
  extraReducers(builder) {
    // eslint-disable-next-line no-unused-expressions
    builder.addCase(queryTableland.fulfilled, (state, action) => {
      return action.payload.error;
    });
    builder.addCase(queryTableland.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
