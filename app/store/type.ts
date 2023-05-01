import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const findType = createAsyncThunk(
  "type/findType",
  async (action: any) => {
    return "read";
  }
);

const typeSlice = createSlice({
  name: "type",
  initialState: "read",
  reducers: {
    setType(state, action) {
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(findType.fulfilled, (store, action) => {
      return action.payload;
    });
  },
});

export const { setType } = typeSlice.actions;
export default typeSlice.reducer;
