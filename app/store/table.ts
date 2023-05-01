import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "tableName",
  initialState: "",
  reducers: {
    setTableName(state, action) {
      return action.payload;
    },
  },
});

export const { setTableName } = tableSlice.actions;
export default tableSlice.reducer;
