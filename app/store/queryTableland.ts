import { createAsyncThunk } from "@reduxjs/toolkit";

import { Database } from "@tableland/sdk";

function transformTableData(obj) {
  if (obj.length < 1) return { columns: [], rows: [] };
  const columns = Object.keys(obj[0]).map((key) => ({ name: key }));
  const rows = obj.map((row) => Object.values(row));
  return { columns, rows };
}

export const queryTableland = createAsyncThunk(
  "results/fetchResults",
  async (action: any) => {
    const { query } = action;
    let results = {};
    let error = null;

    const db = new Database();

    try {
      const r = await db.prepare(query).all();
      const resy = r.results;
      results = transformTableData(resy);
    } catch (e) {
      error = `${e}`;
    }

    return {
      results,
      error,
    };
  }
);
